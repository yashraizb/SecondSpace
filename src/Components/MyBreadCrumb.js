import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export default function MyBreadCrumb(props) {
  var lengthOfCrumb = props.path.length;
  // console.log("length of crumb array : ", lengthOfCrumb);
  props.path[0] = "Home";

  return (
    <div>
      <Breadcrumb>
        {props.path.map((element, index) => {
          return index === lengthOfCrumb - 1 ? (
            <Breadcrumb.Item active key={element}>
              {element}
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item to="#" key={element}>
              <a
                onClick={props.breadCrumbClick}
                objectpath={props.path.slice(1, index + 1).join("/")}
              href="#">
                {element}
              </a>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
}
