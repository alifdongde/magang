//import { useState } from "react";
//import {
//  MDBContainer,
//  MDBCollapse,
//  MDBNavbarToggler,
//  MDBIcon,
//  MDBBtn,
//} from "mdb-react-ui-kit";
//import { Link } from "react-router-dom";
//import { useEffect } from "react";
//
//export default function App() {
//  const [showCustomIcons4, setShowCustomIcons4] = useState(false);
//  const [renamefolder, setRenameFolder] = useState([]);
//  const apiurl = "http://localhost:8000/api/view";
//
//  useEffect(() => {
//    const RenameFolder = () => {
//      fetch(apiurl)
//        .then((res) => {
//          return res.json();
//        })
//        .then((response) => {
//          console.log(response.data);
//          setRenameFolder(response.data);
//        })
//        .catch((error) => {
//          console.log(error);
//        });
//    };
//    RenameFolder();
//  },[]);
//
//  return (
//    <>
//
//      
//      <section className="mb-3">
//        <MDBContainer fluid>
//          <MDBNavbarToggler
//            aria-expanded="false"
//            aria-label="Toggle navigation"
//            onClick={() => setShowCustomIcons4(!showCustomIcons4)}>
//            <MDBIcon style={{ fontSize: "15px" }} icon="ellipsis-vertical" />
//          </MDBNavbarToggler>
//        </MDBContainer>
//
//        
//        <MDBCollapse style={{ width: "160px" }}  show={showCustomIcons4}>
//        
//                    <div style={{ backgroundColor: "white", borderRadius: "10px" }}>
//                    <MDBBtn block className="border-bottom p-1" color="link">
//                      
//                       
//               
//                    
//                    </MDBBtn>
//                  </div>
//                 
//        </MDBCollapse>
//       
//      </section>
//      
//      
//    </>
//  );
//}
