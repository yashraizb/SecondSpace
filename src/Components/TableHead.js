import React from "react";

export default function TableHead(props) {
  return (
    <div id="tableHead">
      {props.columns.map((element, index) => {
        return (
          <div key={element}>
            <a>{element}</a>
          </div>
        );
      })}
    </div>
  );
}
