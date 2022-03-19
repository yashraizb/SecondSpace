import React from "react";

export default function CreateFolderModal(props) {
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Folder
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={props.handleModalClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
                <div className="conatiner" align="center"><input placeholder="Enter folder name"/></div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={props.handleModalClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
