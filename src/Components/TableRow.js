import React from "react";

export default function TableRow(props) {
    // console.log(JSON.stringify(props.dataObject))
    var i = props.objectPath.search("/")
    var objectPath = props.objectPath.slice(i+1)
    var rowData = props.rowData.slice(0, props.rowData.length - 1)
  return (
    <div id="tableRow">
      {rowData.map((element, index) => {
        return (
          <div key={element} className="border-bottom border-info">
              {(index === 0) ? (
                (props.isFile) ? (
                    <a key={index} onClick={props.handleRowClick} objectpath={objectPath} >{element}</a>
                ) : (
                    <a href="#" key={index} onClick={props.handleRowClick} objectpath={objectPath}>{element}</a>
                )
              ) : (
                <a key={index} >{element}</a>
              )}
          </div>
        );
      })}
    </div>
  );
}
