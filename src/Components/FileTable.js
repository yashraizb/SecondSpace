import React, { useState } from "react";
import TableHead from "./TableHead";

export default function FileTable(props) {
  const [directoryStructure, setDirStruc] = useState(
    Object.keys(props.data).length !== 0 ? props.data : {}
  );

  const listOfColumns = ["File Name", "size", "Last modifed", "Location"];

  return (
    <>
      <div className="container mt-4 bg-light" id="tableHeadDiv">
        <TableHead columns={listOfColumns} />
      </div>
      <div className="container pt-3">
      <TableHead columns={listOfColumns} />
      <TableHead columns={listOfColumns} />
      </div>
    </>
  );
}
