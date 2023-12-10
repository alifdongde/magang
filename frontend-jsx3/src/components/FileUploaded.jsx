import axios from "../api/axios";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { MyAppContext } from "../App";
import Cookies from "universal-cookie";
import Form from "react-bootstrap/Form";
import File from "./file";
import { useState } from "react";
import Navbar from "./navcomponent";
import { Button, Modal } from "react-bootstrap";

const FileUploaded = () => {
  // const navigate = useNavigate()
  const { Isauthenticated, setAuthenticated } = useContext(MyAppContext);

  const [file, setFile] = useState(null);
  const [access_type, setAccess_type] = useState("");
  // const navigate = useNavigate();
  // const [uploaded_by, setUploaded_by] = useState("");
  // const [uploaded_by,setUploaded_by ] = useState("");

  const { folderId } = useParams();
  const [folder_id, setFolder] = useState("");

  const handleFileUploaded = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("access_type", access_type);

    const authToken = localStorage.getItem("name");
    if (!authToken) {
      console.error("Authentication not found");
      return;
    }
    formData.append("uploaded_by", authToken);
    axios
      .post(`/folder/${folderId}/upload`, formData, {
        // file,
        // access_type,
        headers: {
          Authorization: `Bearer ${new Cookies().get("Authorization")}`,
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        setAuthenticated(null);
        console.log(response.data);
        setFolder(folderId);
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Tambah File
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Navbar />

      <br />

      {/* TambahFile */}
      <Button
        style={{ width: "4cm", height: "45px", backgroundColor: "grey" }}
        onClick={handleShow}
      >
        Tambah File +
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Upload File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select
            style={{ width: "100px" }}
            onChange={(e) => setAccess_type(e.target.value)}
          >
            <option>access_type</option>
            <option value="all">all</option>
            <option value="user">user</option>
            <option value="user1">User1</option>
            <option value="user2">User2</option>
            <option value="user3">User3</option>
          </Form.Select>

          <input type="file" onChange={handleFileUploaded} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {folder_id}
      <br />
      <br />
      <div style={{ margin: "30px" }}>
        <File />
      </div>
    </div>
  );
};

export default FileUploaded;
