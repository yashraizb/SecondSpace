# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
import os
from pathlib import Path
from flask import Flask, jsonify, request
from flask_cors import CORS
import json

# Flask constructor takes the name of
# current module (__name__) as argument.
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# The route() function of the Flask class is a decorator,
# which tells the application which URL should call
# the associated function.


def create_dir_structure(dir_structure, path):
    try:
        for file_obj in os.listdir(path):
            full_file_path = "{}/{}".format(path, file_obj)
            if os.path.isdir(full_file_path):
                dir_structure[file_obj] = {
                    "location": full_file_path,
                    "is_file": False,
                    "folder_content": {}
                }
                create_dir_structure(dir_structure[file_obj]["folder_content"], full_file_path)
            else:
                dir_structure[file_obj] = {
                    "location": full_file_path,
                    "is_file": True
                }
    except Exception as e:
        # print(e)
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
        
        Path(path).mkdir(exist_ok=True, parents=True)
        create_dir_structure(dir_structure, path)
        
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


# main driver function
if __name__ == '__main__':

    # run() method of Flask class runs the application
    # on the local development server.
    app.run(host="0.0.0.0", port=8080, debug=True)
