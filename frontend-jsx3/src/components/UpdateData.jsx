import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { MyAppContext } from '../App'
import { useParams } from 'react-router-dom'
import axios from '../api/axios'
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
  import Form from "react-bootstrap/Form";
  import Cookies from 'universal-cookie'




const UpdateData = () => {
    const { Isauthenticated, setAuthenticated } = useContext(MyAppContext);

    const {id} = useParams()

    const [name,setName] = useState('')
    const [username,setUserName] = useState('')
    const [role,setRole] = useState('')

    useEffect(()=> {
        axios.get('/me/')
        .then((response)=> {
            console.log(response);
        }).catch((error)=> {
            console.error(error);
        })
    },[id])

    const formData = new FormData()
    formData.append("name",name)
    formData.append("username",username)
    formData.append("role",role)
    const handleSubmit = (e) => {
        e.preventDefault
        axios.put(`/create/create/${id}`,formData,{
            headers:{
                Authorization :`Bearer ${new Cookies().get("Authorization")}`, 
                'Access-Control-Allow-Origin' : '*',    
                "Cache-Control": "no-cache",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((response)=> {
            setAuthenticated(null)
            console.log("Update Data Successfully",response);
        }).catch((error)=> {
            console.log("Rename Data Denied",error);
        })
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
            <h2 className="fw-bold mb-2 text-uppercase">Update Data </h2>
            <p className="text-dark-50 mb-5">
              Silahkan Mengupdate Data
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
              onChange={(e)=>setUserName(e.target.value)}
              label="Username"
              id="username"
              type="text"
              size="lg"
          
            />
       

           
            {/* <Link to="/menu"> */}
            <br />
            <br />
            <button
            onClick={handleSubmit}
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
             Update Data + 
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
  )
}

export default UpdateData