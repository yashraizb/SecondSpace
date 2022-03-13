import React, { useEffect, useState } from "react";
import FileTable from "./FileTable";
// export const directoryStructure = {}

export default function Landing(props) {
  const [user_no, setUserNo] = useState("");
  const [dirStructure, setDirStruc] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [apiStatus, setApiStattus] = useState("");

  const backend_url = "http://192.168.29.172:8080";

  const handleClick = () => {
    // console.log("user_no : " + user_no)
    // document.getElementById("landing").classList.toggle("visually-hidden");
    // document.getElementById("tableDiv").classList.toggle("visually-hidden");
    fetch("/checkUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_no: user_no }),
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          setApiStattus(data.status);
          if (data.status === "SUCCESS") {
            setDirStruc(data.dir_structure);
          } else {
            setErrMsg(data.message);
          }
        });
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    let nameValue = event.target.value;
    setUserNo(nameValue);
    console.log("No value is : " + nameValue);
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

      {Object.keys(dirStructure).length === 0 ? (
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
        <FileTable data={dirStructure} />
      )}
    </>
  );
}