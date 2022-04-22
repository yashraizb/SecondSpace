import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import FileTable from "./FileTable";

export default function Landing() {
  const [user_no, setUserNo] = useState("");
  const directoryStructure = useSelector(state => state.directoryStructure)
  const [errMsg, setErrMsg] = useState("");
  const [apiStatus, setApiStattus] = useState("");

  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);

  console.log("landing directoryStructure: ", directoryStructure)

  const [user_id, setUserId] = useState("");


  const handleClick = () => {
    console.log("user_id: ", user_id)
    setUserNo(user_id)
    console.log(user_no)
    fetch("/checkUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_no: user_id }),
    })
      .then((res) => {
        res.json().then((data) => {
          // console.log(data);
          setApiStattus(data.status);
          if (data.status === "SUCCESS") {
            actions.setDirectoryStructure(data.dir_structure)
          } else {
            setErrMsg(data.message);
          }
        });
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    let nameValue = event.target.value;
    setUserId(nameValue)
    console.log("No value is : " + nameValue, user_id);
  };  

  return (
    <>
      <div className="container" id="landing">
        <form className="d-flex mt-5 mb-4">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Enter you phone no."
            aria-label="Search"
            onChange={handleChange}
          />
        </form>
        <button className="btn btn-primary" onClick={handleClick}>
          GO
        </button>
      </div>
      
      {Object.keys(directoryStructure).length === 0 ? (
        apiStatus !== "SUCCESS" ? (
          apiStatus === "" ? (
            <></>
          ) : (
            <div className="container mt-4 bg-danger p-2" align="center" style={{color: "white"}}>{errMsg}</div>
          )
        ) : (
          <></>
        )
      ) : apiStatus !== "SUCCESS" ? (
        <div className="container mt-4 bg-danger p-2" align="center" style={{color: "white"}}>{errMsg}</div>
      ) : (
        
        <FileTable homeDirectory={user_no}/>
      )}

    </>
  );
}
