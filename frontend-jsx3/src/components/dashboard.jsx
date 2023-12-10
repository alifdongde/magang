import { useState } from "react";
import Folder from "./Folder";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import TFolder from "./TFolder";
import Card from "react-bootstrap/Card";
import Swal from "sweetalert2";
import "./index.css";
import { Navbar, Nav } from "react-bootstrap";
import Babi from "../assets/babiiii.jpg"
import { IoIosArrowBack } from "react-icons/io";
import {
  MDBContainer,
  MDBCollapse,
  MDBNavbarToggler,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import axios from "../api/axios";
import Cookies from "universal-cookie";

import { TextField } from "@mui/material";

function dashboard() {

  const [folder, setFolder] = useState([]);
  // //Filter Folder Berdasarkan Tahun
  // const [tahunOptions, setTahunOptions] = useState([]);
  
  const [show, setShow] = useState(false);
 
  const {option} = useParams()
  const [tahun, setTahun] = useState("")

  const [name, setName] = useState("")
  const [hasil,setHasil] = useState('')


  // const [search, setSearch] = useState([]);


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
    },
  });

  const deleteFolder = async (id) => {
    try {
      const response = await axios.get(`/folder/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${new Cookies().get("Authorization")}`,
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }); // Sesuaikan dengan endpoint yang sesuai
      console.log(response.data);
      window.location.reload(true);
      Toast.fire({
        icon: "success",
        title: "Hapus Folder Berhasil",
      });
    } catch (error) {
      console.error("Error deleting file:", error);
      Toast.fire({
        icon: "success",
        title: "Gagal menghapus Folder",
      });
    }
  };

  //show tahun
  useEffect(() => {
    // Fungsi untuk mendapatkan data folder dari server
    const getFolder = async () => {
      try {
        const response = await axios.get(`/view?tahun=${option}`);
        setTahun(option)
        setFolder(response.data.data);
      } catch (error) {
      
        console.error("Error fetching folders:", error);
      }
    };

    // Memanggil fungsi getFolders saat komponen pertama kali dimuat dan setiap kali 'tahun' berubah
    getFolder();
  }, [tahun]);


  const handleCari = async () => {
    try {
      const response = await axios.get(`/${option}/search?name=${name}`);
      const hasilPencarian = response.data.hasil;
  
      if (Array.isArray(hasilPencarian) && hasilPencarian.length > 0) {
        setFolder(hasilPencarian);
        setTahun(option);
        setHasil(name);
      } else {
        setFolder([]); // Mengosongkan folder jika hasil pencarian kosong
        setHasil(`No results found for '${name}'`);
      }
    } catch (error) {
      console.error(error);
    }
  };



  // Fungsi untuk menangani perubahan input tahun



  return (
    <div className="app">
      <div>
      <Navbar  className="border-bottom-py-3 shadow-sm">
    
      
    <Navbar.Collapse >
<Nav>

  <img className="imageb" src={Babi} alt="" />
      </Nav>
    </Navbar.Collapse>

</Navbar>
      </div>
      <br />
      <div style={{ textAlign:'left' }}>
      <Link to={'/menu'}>
      
      <IoIosArrowBack size={25}  />Dashboard
      </Link>
      </div>
     
     
       <div style={{ display: "flex", position: "absolute", left: "1200px" }}>
     
        <TFolder />
       
      </div>
      <br />
      <br />


      <br />

      <input
  type="text"
  value={name}
  placeholder="Masukkan Nama"
  onChange={(e) => setName(e.target.value)}
  onKeyUp={handleCari} // Pemanggilan handleCari saat mengetik
/>
  
    
   
     
  
 
      {(Array.isArray(folder) && folder.length > 0) ? (
      folder.map((pfolder, index) => (
        <div
          className="logo"
          key={index}
          style={{ textAlign: "center", color: "black" }}
        >
          <Card
            style={{
              width: "10rem",
              backgroundColor: "rgba(102, 217, 255, 0.500)",
              margin: "10px",
              marginLeft:'20px'
            }}
          >
            <Card.Body>
              <Card.Title style={{ width: "10px" }}>
                <section className="mb-3">
                  <MDBContainer fluid>
                    <MDBNavbarToggler
                      type="button"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                      onClick={() => setShow(!show)}
                    >
                      <MDBIcon
                        style={{ fontSize: "15px" }}
                        icon="ellipsis-vertical"
                      />
                    </MDBNavbarToggler>
                  </MDBContainer>

                  <MDBCollapse
                    style={{ width: "120px", lineHeight: "35px" }}
                    show={show}
                  >
                    <MDBBtn
                      style={{ fontSize: "medium" }}
                      href={`/renameFolder/${pfolder.id}`}
                    >
                      Rename
                    </MDBBtn>
                    <br />

                    <MDBBtn onClick={() => deleteFolder(pfolder.id)}>
                      Hapus
                    </MDBBtn>
                  </MDBCollapse>
                </section>
              </Card.Title>
              <Card.Title >
                <Link to={`/uploadFile/${pfolder.id}`}>
                  <Folder size={1500} />
                  <br />
                </Link>
              </Card.Title>

              <Card.Subtitle style={{ color: "black" }}>
                {" "}
                {pfolder.name}
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </div>
      ))
    ) : (
      <p>No results found for </p>
    )}
    {/* Display the search result text */}
    {/* <p>{hasil}</p> */}
  </div>
  );
}

export default dashboard;