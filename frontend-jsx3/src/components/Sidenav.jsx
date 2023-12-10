import { Sidebar, Menu, MenuItem,SubMenu } from "react-pro-sidebar";
import "./Login.css"
import Aos from "aos";
import 'aos/dist/aos.css';
import Konten from "./Konten";
import TFolder from "./TFolder";
import "./index.css"
import {BiArchiveIn} from'react-icons/bi';
import { BsFillCalendar2MonthFill,BsCalendar2Date } from "react-icons/bs";
import { Navbar,Container, Nav, NavDropdown, Button } from "react-bootstrap";
import Profile from "./Profile";
import Babi from "../assets/babiiii.jpg"
import Burger from "./burger";

function Sidenav() {
    Aos.init()
    return (
    
        <div className="app" >

           <Navbar  className="border-bottom-py-3 shadow-sm">
    
      
        <Navbar.Collapse >
<Nav>
     
      <img className="imageb" src={Babi} alt="" />
            <Nav.Link >  <Profile /> </Nav.Link>
           
         
          </Nav>
        </Navbar.Collapse>
 
    </Navbar>
          
          {/* <Sidebar 
          
           backgroundColor= "rgba(102, 217, 255, 0.500)"
            style={{  height: "100vh" }}>
            
            <Menu data-aos="zoom-in">
              <MenuItem
              
                // icon={<ImMenu />}
              
                style={{textAlign: "start" }}
                
              >
                <br />
              <div className="logoNav">
              <img src="../public/drive.png" />&nbsp; Drive
           
              </div>
         
             
              </MenuItem>
             
              <br />
              <TFolder/>
            
              <MenuItem className="menuItem" icon={<BiArchiveIn/>} href="/konten">Drive Saya</MenuItem>
              <SubMenu className="menuItem" icon={<BsFillCalendar2MonthFill />} label="Tahun File">
                <MenuItem icon={<BsCalendar2Date />}>2020</MenuItem>
                <MenuItem icon={<BsCalendar2Date />}>2021</MenuItem>
                <MenuItem icon={<BsCalendar2Date />}>2022</MenuItem>
          </SubMenu>
             
            </Menu>
    
            
          </Sidebar> */}
     

          <Konten/>
  
         
         
        </div>
      );
}

export default Sidenav