# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from importlib.resources import path
import os
from pathlib import Path
from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import time
import traceback
# Flask constructor takes the name of
# current module (__name__) as argument.
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

class CustomException(Exception):
    def __init__(self, msg):
        self.msg = msg
# The route() function of the Flask class is a decorator,
# which tells the application which URL should call
# the associated function.


def find_unit(size):
    unit_list = ["bytes", "KB", "MB", "GB", "TB"]
    unit_index = 0
    while(size > 1023):
        size /= 1024
        unit_index += 1
        if unit_index == 4:
            break
    return "{} {}".format(size, unit_list[unit_index])


def create_dir_structure(dir_structure, path):
    try:
        for file_obj in os.listdir(path):
            full_file_path = "{}/{}".format(path, file_obj)
            details = os.stat(full_file_path)
            size = find_unit(details.st_size)
            last_modified = time.ctime(details.st_mtime)
            if os.path.isdir(full_file_path):
                dir_structure[file_obj] = {
                    "location": full_file_path[14:],
                    "is_file": False,
                    "folder_content": {},
                    "size": size,
                    "last_modified": last_modified,
                    "file_name": file_obj
                }
                create_dir_structure(dir_structure[file_obj]["folder_content"], full_file_path)
            else:
                dir_structure[file_obj] = {
                    "location": full_file_path[14:],
                    "is_file": True,
                    "size": size,
                    "last_modified": last_modified,
                    "file_name": file_obj
                }
    except Exception as e:
        # print(e)
        raise e

def validate_request_body(request_body):
    try:
        if type(request_body["folder_name"]) != str:
            raise CustomException("Invalid DataType for folder_name, should be a string")
        if len(request_body["folder_name"].strip()) == 0:
            raise CustomException("Invalid Value provided for folder_name")
        if type(request_body["location"]) != str:
            raise CustomException("Invalid DataType for location, should be a string")
        if len(request_body["location"].strip()) == 0:
            raise CustomException("Invalid Value provided for location")
    except CustomException as e:
        e.msg = "Error Occured in validate request body: {}".format(e.msg)
        raise e

@app.route('/')
def health_check():
    return jsonify({"status": "Health check successfull"}), 200


@app.route('/checkUser', methods=["POST"])
def check_user():
    try:
        request_body = request.json
        
        # Request body validation
        if "user_no" not in request_body:
            return {
                "status": "BAD REQUEST",
                "message": "Key user_no not present in request body"    
            }, 404
        
        user_no = request_body["user_no"]

        if len(user_no.replace(" ", "")) == 0:
            return {
                "status": "BAD REQUEST",
                "message": "Invalid value provided for phone number",
                "dir_structure": {1: 2}
            }, 404

        user_no = user_no.replace(" ", "_")
        path = "../UserStorage/{}".format(user_no)
        scan = False
        dir_structure = {}

        if not Path(path).exists():
            return {
                "status": "BAD REQUEST",
                "message": "User does not exists",
                "dir_structure": {1: 2}
            }, 500
        
        # Path(path).mkdir(exist_ok=True, parents=True)
        create_dir_structure(dir_structure, path)
        print("path: {}".format(path))
        
        # print(json.dumps(dir_structure, indent=4))

        return {
            "status": "SUCCESS",
            "message": "Check user is working fine",
            "dir_structure": dir_structure
        }, 200
    except Exception as e:
        # print(e)
        return {
            "status": "INTERNAL SERVER ERROR",
            "message": e.__str__()
        }, 500


@app.route('/createFolder', methods=["POST"])
def create_folder():
    try:
        request_body = request.json
        location = request_body["location"]
        print("location: {}".format(location))
        folder_name = request_body["folder_name"]
        print("Validating request body")
        dir_structure = {}
        validate_request_body(request_body)
        
        user_no = location.split("/")[0]
        path = "../UserStorage/{}".format(user_no)
        location = "../UserStorage/" + location

        print("Request body validation successful.")
        print("Creating folder at location : {} with folder_name : {}".format(location, folder_name))
        
        os.mkdir("{}/{}".format(location, folder_name))
        create_dir_structure(dir_structure, path)

        print("Folder created successcully at location: {}".format(location))

        response = {
            "status": "Success",
            "message": "Directory created successfully",
            "dir_structure": dir_structure
        } 
        return response, 200

    except KeyError as key:
        msg = "Key {} is missing from request body".format(key)
        print(msg)
        return {
                "status": "BAD REQUEST",
                "message": msg
            }, 400
    except CustomException as e:
        print(e.msg)
        print(traceback.format_exc())
        return {
                "status": "BAD REQUEST",
                "message": e.msg
            }, 400
   
    except Exception as e:
        print(e)
        print(traceback.format_exc())

        return {
            "status": "INTERNAL SERVER ERROR",
            "message": e.__str__()
        }, 500
    

# main driver function
if __name__ == '__main__':

    # run() method of Flask class runs the application
    # on the local development server.
    app.run(host="0.0.0.0", port=8080, debug=True)
