import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ImMenu } from "react-icons/im";
import { BiArchiveIn } from 'react-icons/bi';
import { BiSolidUserAccount } from 'react-icons/bi';
import FilteringData from "./FilteringData";

import './index.css'
import axios from "../api/axios";
import Cookies from 'universal-cookie';
import { useContext } from "react";
import { MyAppContext } from "../App";
import Searchbar from './searchbar'
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";


function Admin() {
  
  const navigate = useNavigate()

    AOS.init();
    const { collapseSidebar } = useProSidebar();arguments

 const {Isauthenticated,setAuthenticated} = useContext(MyAppContext)

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
    const HandleLogout = () => {
      setAuthenticated(null)
    
      navigate("/") 
    
      axios.post('/logout',{},{
        
        headers:{
          Authorization :`Bearer ${new Cookies().get("Authorization")}` 
        }
      }) .then((response)=> {
        localStorage.clear()
        Toast.fire({
          icon: "success",
          title: "Anda Berhasil Logout"
        });
        console.log("Logout SuccessFully",response.data);
      }).catch((error)=> {
        console.log("Logout Failed",error);
      })
    }
    return (
      
      <div className="adminStyle" style={({ height: "100vh" }, { display: "flex" })}>
     
        <Sidebar 
        
         backgroundColor= "rgb(190, 189, 189)"
          style={{  height: "100vh"}}>
          
          <Menu data-aos="zoom-in">
            <MenuItem
            
              icon={<ImMenu />}
              onClick={() => {
                collapseSidebar();
              }}
              style={{textAlign: "end" }}
              
            >
         
              
        <div className="logoside">
          Admin 
    
        </div>
            
            </MenuItem>
            <MenuItem className="menuItem" icon={<BiSolidUserAccount/>}href="/admin">User </MenuItem>
           

            <MenuItem className="menuItem" icon={<BiArchiveIn/>} onClick={HandleLogout} >Logout</MenuItem>
            {/* <MenuItem onClick={HandleLogout} className="menuItem" icon={<IoIosLogOut/>} href="/">Logout</MenuItem> */}
{/* 
            <ListItemIcon >
            <Logout  fontSize="small" />
          </ListItemIcon>
        <Link to="/" onClick={HandleLogout}> Logout</Link> */}
           
          </Menu>
          
        </Sidebar>
              <FilteringData/>
              <br />
              <br />
              <Searchbar/>
     
      </div>
    );
}

export default Admin