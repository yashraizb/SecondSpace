import React, { useState } from "react";
import CreateFolderModal from "./CreateFolderModal";
import MyBreadCrumb from "./MyBreadCrumb";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

export default function FileTable(props) {
  const [directoryStructure] = useState(props.data);
  const [objectPathArray, setPathArray] = useState([props.homeDirectory]);
  const listOfColumns = ["File Name", "size", "Last modifed"];
  const [rowData, setRowData] = useState(initialRowData(directoryStructure));
  const [rowObject, setRowObject] = useState(directoryStructure);

  var varObject = directoryStructure;

  function initialRowData(directoryStructure) {
    var temp2D = [];
    Object.keys(directoryStructure).map((key) => {
      var temp = [
        directoryStructure[key]["file_name"],
        directoryStructure[key]["size"],
        directoryStructure[key]["last_modified"],
        directoryStructure[key]["location"].replace(
          props.homeDirectory,
          "Home"
        ),
      ];
      temp2D.push(temp);
      return 0;
    });
    return temp2D;
  }

  function updateRowData(directoryStructure) {
    setRowData([]);
    var temp2D = [];
    Object.keys(directoryStructure).map((key) => {
      var temp = [
        directoryStructure[key]["file_name"],
        directoryStructure[key]["size"],
        directoryStructure[key]["last_modified"],
        directoryStructure[key]["location"].replace(
          props.homeDirectory,
          "Home"
        ),
      ];
      temp2D.push(temp);
      return 0;
    });
    return temp2D;
  }

  const handleRowClick = (event) => {
    varObject = directoryStructure;
    var objectPath = event.target.attributes.objectpath.value;
    var curr = props.homeDirectory + "/" + objectPath;
    // console.log("curr : " + curr)
    var isFile = false;
    setPathArray(curr.split("/"));
    // console.log(objectPathArray)
    var tempArr = objectPath.split("/");
    for (var i = 0; i < tempArr.length; i++) {
      isFile = varObject[tempArr[i]]["is_file"];
      if (!isFile) {
        varObject = varObject[tempArr[i]]["folder_content"];
      } else {
        break;
      }
    }
    if (!isFile) {
      setRowObject(varObject);
      setRowData(updateRowData(varObject));
      // console.log("function ending")
    }
  };

  const handleBreadCrumbClick = (event) => {
    console.log(event.target.attributes.objectpath.value);
    var objectPath = event.target.attributes.objectpath.value;
    var varObject = directoryStructure;
    var curr = props.homeDirectory + "/" + objectPath;
    setPathArray(curr.split("/"));
    if (objectPath !== "") {
      var tempArr = objectPath.split("/");
      for (var i = 0; i < tempArr.length; i++) {
        varObject = varObject[tempArr[i]]["folder_content"];
      }
    } else {
      setPathArray([props.homeDirectory])
    }
    setRowObject(varObject);
    setRowData(updateRowData(varObject));
    console.log("Bread crumb click : ", objectPathArray)
  };

  const handleModalOpen = () => {
    document.getElementById("exampleModal").style.display="block"
    document.getElementById("exampleModal").classList.add("show")
    console.log(document.getElementById("modalDiv").style.display="block")
  }

  const handleModalClose = () => {
    document.getElementById("exampleModal").style.display="none"
    document.getElementById("exampleModal").classList.remove("show")
    document.getElementById("modalDiv").style.display="none"
  }

  return (
    <div className="container">
      <div id="modalDiv"></div>
      <div className="container" align="right">
        <button className="btn btn-primary btn-sm mx-2">Upload</button>
        <button className="btn btn-primary btn-sm mx-2" onClick={handleModalOpen} >Create Folder</button>
        <div>
          <CreateFolderModal handleModalOpen={handleModalOpen} handleModalClose={handleModalClose}/>
        </div>
      </div>
      <div className="container pt-3">
        <MyBreadCrumb
          path={objectPathArray}
          directoryStructure={directoryStructure}
          breadCrumbClick={handleBreadCrumbClick}
        />
      </div>
      <div className="container mt-4 bg-light" id="tableHeadDiv">
        <TableHead columns={listOfColumns} />
      </div>
      
      <div className="container mt-2 border rounded" id="rowDiv">
        {rowData.map((element, index) => {
          return (
            <TableRow
              rowData={element}
              key={index}
              objectPath={element[3].slice(1)}
              handleRowClick={handleRowClick}
              isFile={rowObject[element[0]]["is_file"]}
            />
          );
        })}
      </div>
    </div>
  );
}
