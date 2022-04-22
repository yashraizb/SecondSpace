import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {actionCreators} from '../state/index'

export default function CreateFolderModal(props) {

  const currentDirectory = useSelector(state => state.currentDirectory)
  const errorMsg = useSelector(state => state.folderError)

  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);

  const handleCreateFolder = (event) => {

    var folderName = document.getElementById("folderName").value;
    // setErrorMsg("")

    console.log("Printing create folder error msg : ", errorMsg)

    fetch("/createFolder", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location:  currentDirectory,
        folder_name: folderName
      }),
    }).then((response) => {
      response.json().then((data) => {
        actions.folderErrorMessage(data.status)
        actions.setDirectoryStructure(data.dir_structure)
      })
    })
  }

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
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
                <div className="conatiner" align="center"><input placeholder="Enter folder name" id="folderName"/></div>
                {
                  (errorMsg !== "Success" && errorMsg !== "") ? (
                    <div className="container mt-4 bg-danger p-2" align="center" style={{color: "white"}} >Error occured</div>
                  ) : (
                    (errorMsg === "Success") ? (
                      <>
                        {document.getElementById("closeCreateFolder").click()}
                        {props.updateCurrentDirectory(currentDirectory)}
                      </>
                    ) : (<></>)
                    
                  )
                }
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                id="closeCreateFolder"
                onClick={props.handleModalClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleCreateFolder}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
