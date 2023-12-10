import { useContext } from "react";
import { MyAppContext } from "../App";
import {  useNavigate, useParams } from "react-router-dom";
import Cookies from 'universal-cookie'
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../api/axios";
// import axios from '../api/axios';
import Swal from "sweetalert2";

function RenameFolder() {
  const { Isauthenticated, setAuthenticated } = useContext(MyAppContext);


  const { folderId } = useParams();

const [new_folder_name,setNew_Folder_Name] = useState('')
const navigate = useNavigate()
    //alert
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

useEffect(()=> {
  axios.get('/view/')
  .then((response)=> {
      console.log(response);
    // setFolderName(response.data.name)
  }).catch((error)=>{
    console.log("Error Rename Folder",error);
  })
},[folderId])

const formData = new FormData();
formData.append("new_folder_name",new_folder_name)
const handleSubmit = (e) => {
  e.preventDefault()

  axios.post(`/folder/${folderId}/rename`,formData,{

    headers:{
      Authorization :`Bearer ${new Cookies().get("Authorization")}`, 
      'Access-Control-Allow-Origin' : '*',    
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
  .then((response)=> {
    setAuthenticated(null)
    console.log("Rename Folder Successfully",response);
    Toast.fire({
      icon: "success",
      title: "Successfully rename folder"
    });
  })
  .catch((error)=> {
    console.log(error);
  })
}

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-8 mt-4">
            <h5>Rename Folder</h5>

            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <label className="col-sm-3">Rename Folder</label>
                  <div className="col-sm-9">
                    <input  type="text" className="form-control" name="name" value={new_folder_name}   onChange={(e)=>setNew_Folder_Name(e.target.value)} />
                  </div>
                
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3"></label>
                <div className="col-sm-9">
                  <button type="submit" className="btn btn-success">Submit</button>
                  
                </div>
              </div>


            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RenameFolder;
