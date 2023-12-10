import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Login.css";
import { useEffect, useRef, useState} from "react";
import Cookies from "universal-cookie";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyAppContext } from "../App";
import Swal from "sweetalert2";

const Login = () => {
const inputUsername = useRef(null)
const inputPassword = useRef(null)

const navigate = useNavigate(null)
const [role,setRole] = useState()
const [isLoggedIn,setIsLoggedIn] = useState(false)
const [isLogin,setIsLogin] = useState(false)

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

const {Isauthenticated,setAuthenticated} = useContext(MyAppContext)
  
  const handleSubmit = async () => {
   
    const username = inputUsername.current.value
    const password = inputPassword.current.value
    const cookies =  new Cookies()


    console.log({username,password});

    await axios.get('/csrf-cookie')


    axios.post('/login',{
      username:username,password:password
    })
    .then((response)=> {
      cookies.set("Authorization",response.data.token)
      cookies.set("Roles",response.data.user.role)
      localStorage.setItem("Roles",response.data.user.role)
      localStorage.setItem("name",response.data.name)   
      localStorage.setItem("user",response.data.token)
      Toast.fire({
        icon: "success",
        title: "Anda Berhasil Login"
      });
      axios.get('/user',{
       headers:{
        Authorization : `Bearer ${cookies.get("Authorization")}`
       }
      })
      .then((response)=> {
      setAuthenticated(response.data.user)

        var roles = response.data.role;  
        console.log(roles);

        setRole(roles);
        if (roles ==='admin') {
          setIsLoggedIn(true)
          localStorage.setItem("isLoggedIn",true)
            navigate('/admin')
            
        }
        else {
          setIsLogin(true)
          localStorage.setItem("isLogin",true)
          navigate('/menu')
        } 
      })
    
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
            style={{ borderRadius: "2rem", maxWidth: "400px", backgroundColor:'rgba(175, 205, 255 , 0.723)'}}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-dark-50 mb-5">
                Please enter your login and password!
                {/* {role} */}
              </p>

              <MDBInput
               ref={inputUsername}
                wrapperClass="mb-4 mx-4 w-100"
                labelClass="text-white"
                
                label="Email address"
                id="username"
                type="text"
                size="lg"
            
              />
              <MDBInput
              ref={inputPassword}
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Password"
                id="password"
                type="password"
                required
                size="lg"
              />

              <p className="small mb-3 pb-lg-2">
                <a className="text-white-50" href="#!">
                  Forgot password?
                </a>
              </p>
              {/* <Link to="/menu"> */}
              <button
              onClick={handleSubmit}
                style={{
                  backgroundColor: "rgb(39, 38, 38)",
                  borderRadius: "8px",
                  fontSize: "20px",
                  fontFamily: "sans-serif",
                  fontWeight: "bolder",
                  color: "grey",
                  width: "90px",
                }}
              >
                Login
              </button>
              {/* </Link> */}
              <div className="d-flex flex-row mt-3 mb-5">
                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-3"
                  style={{ color: "white" }}
                >
                  <MDBIcon fab icon="facebook-f" size="lg" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-3"
                  style={{ color: "white" }}
                >
                  <MDBIcon fab icon="twitter" size="lg" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-3"
                  style={{ color: "white" }}
                >
                  <MDBIcon fab icon="google" size="lg" />
                </MDBBtn>
              </div>

              <div>
                <p className="mb-0">
                  Dont have an account?{" "}
                  {/* <a href="/admin" className="text-white-50 fw-bold">
                    Admin
                  </a> */}
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    
    </MDBContainer>
   
  );
};

export default Login;
