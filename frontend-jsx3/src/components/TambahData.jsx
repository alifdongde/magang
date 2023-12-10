import Form from "react-bootstrap/Form";
// import { Button } from "react-bootstrap";
import { useContext} from "react";
import axios from "../api/axios";
import Cookies from "universal-cookie";
import { MyAppContext } from "../App";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
 
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Swal from "sweetalert2";

function TambahData() {
  const [name,setName] = useState("")
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [role,setRole] = useState("")
  const navigate = useNavigate()

const {Isauthenticated,setAuthenticated} = useContext(MyAppContext)

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});
  const saveUser = async (e) => {
    e.preventDefault(e);
    setAuthenticated(null)
   
    axios.post('/create/create',{
      
       role,
       name,
      username,
      password,
      
       },{
        // withCredentials:true,
           headers:{
        Authorization :`Bearer ${new Cookies().get("Authorization")}` 
      }})
      .then(()=> {
        Toast.fire({
          icon: "success",
          title: "Tambah Data Berhasil"
        });
        window.location.reload(true)
        
      
      })
      navigate("/admin")
  }




  return (
   
 
    <MDBContainer className="login" fluid>
      <div className="logoside">
        <img src="../public/icloud.png" />
        &nbsp; Awan File
      </div>
      
      <MDBRow className="d-flex justifyContent-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className=" my-5 mx-auto"
            style={{ borderRadius: "2rem", maxWidth: "500px", backgroundColor:'rgba(175, 205, 255 , 0.900)'}}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Tambah Data</h2>
              <p className="text-dark-50 mb-5">
                Silahkan menambahkan data
                {/* {role} */}
              </p>
          <Form.Select onChange={(e)=>setRole(e.target.value)}>
          <option> pilih role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="user1">User1</option>
          <option value="user2">User2</option>
          <option value="user3">User3</option>
         
          </Form.Select>
          <br />

              <MDBInput
              onChange={(e)=>setName(e.target.value)}
              value={name}
                wrapperClass="mb-4 mx-4 w-100"
                labelClass="text-white"
                
                label="name"
                id="name"
                type="text"
                size="lg"
            
              />
              <MDBInput
              
              
                wrapperClass="mb-4 mx-4 w-100"
                labelClass="text-white"
                value={username} 
                onChange={(e)=>setUsername(e.target.value)}
                label="Username"
                id="username"
                type="text"
                size="lg"
            
              />
              <MDBInput
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Password"
                id="password"
                type="password"
                required
                size="lg"
              />

             
              {/* <Link to="/menu"> */}
              <br />
              <br />
              <button
              onClick={saveUser}
                style={{
                  backgroundColor: "rgb(39, 38, 48)",
                  borderRadius: "8px",
                  fontSize: "20px",
                  fontFamily: "sans-serif",
                  fontWeight: "bolder",
                  color: "grey",
                  width: "170px",
                }}
              >
                Tambah Data +
              </button>
              {/* </Link> */}
              <div className="d-flex flex-row mt-3 mb-5">
                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-3"
                  style={{ color: "white" }}
                >
                 
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-3"
                  style={{ color: "white" }}
                >
                 
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-3"
                  style={{ color: "white" }}
                >
                 
                </MDBBtn>
              </div>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default TambahData;
