import { useState } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './index.css'
import { useContext } from "react";
import { MyAppContext } from "../App";
import axios from "../api/axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


function TFolder() {
  const navigate = useNavigate()
  //alert
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const {Isauthenticated,setAuthenticated} = useContext(MyAppContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    setAuthenticated(null)
    axios.post('/folder/create',{
      folder_name,
    },{
      headers:{
        Authorization :`Bearer ${new Cookies().get("Authorization")}` 
      } 
    })
    .then((response)=> {
      console.log("Add Folder Successfully",response);
      window.location.reload(true)
      navigate('/menu')
      Toast.fire({
        icon: "success",
        title: "Tambah Folder"
      });
    }).catch((error)=>{
      console.log("Error Created Folder",error);
    })
  }


  const [folder_name,setName] = useState()
 

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);





  
  
  return (
    <>
      <Button className='btnFolder' onClick={handleShow}>
      + Folder
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nama Folder"
                autoFocus
                value={folder_name}
              onChange={(e)=>setName(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Inputkan Tahun</Form.Label>
              <Form.Control as="textarea" rows={1}   value={tahun}
              onChange={(e)=>setTahun(e.target.value)} />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TFolder