import Profile from "./Profile";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Folder from "./Folder";
import MenuBawah from "./MenuBawah";
import Example from "./Modal";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TFolder from "./TFolder";

import Swal from "sweetalert2";
import Card from "react-bootstrap/Card";
import {
  MDBContainer,
  MDBCollapse,
  MDBNavbarToggler,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import axios from "../api/axios";
import Cookies from "universal-cookie";
import "./index.css";
import Burger from "./burger";
function Konten() {
  const [folder, setFolder] = useState([]);

  //Filter Folder Berdasarkan Tahun
  const [tahunOptions, setTahunOptions] = useState([]);
  const [tahun, setTahun] = useState("");
  const navigate = useNavigate();

  // var Fold = localStorage.getItem("fold");

  // useEffect(() => {
  //   const getFolder = () => {
  //     fetch("http://localhost:8000/api/view")
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((response) => {
  //         setFolder(response.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
  //   getFolder();
  // }, []);
  // //alert
  // const Toast = Swal.mixin({
  //   toast: true,
  //   position: "top-end",
  //   showConfirmButton: false,
  //   timer: 3000,
  //   timerProgressBar: true,
  //   didOpen: (toast) => {
  //     toast.onmouseenter = Swal.stopTimer;
  //     toast.onmouseleave = Swal.resumeTimer;
  //   },
  // });

  // const deleteFolder = async (id) => {
  //   try {
  //     const response = await axios.get(`/folder/${id}/delete`, {
  //       headers: {
  //         Authorization: `Bearer ${new Cookies().get("Authorization")}`,
  //         "Access-Control-Allow-Origin": "*",
  //         "Cache-Control": "no-cache",
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //     }); // Sesuaikan dengan endpoint yang sesuai

  //     // console.log(response.data);
  //     window.location.reload(true);
  //     Toast.fire({
  //       icon: "success",
  //       title: "Hapus Folder Berhasil",
  //     });
  //   } catch (error) {
  //     console.error("Error deleting file:", error);
  //   }
  // };

  //show tahun
  useEffect(() => {
    // Fungsi untuk mendapatkan data folder dari server
    const getFolder = async () => {
      try {
        const response = await axios.get(`/view?tahun=${tahun}`);
        setFolder(response.data.data);

        //     console.log(sortedFolders);
        //     const fold = response.data
        //     localStorage.setItem("fold", JSON.stringify(response.data.data.name))
        // localStorage.getItem("fold")
        // console.log(fold);

        // setFolder(response.data.data);
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    // Memanggil fungsi getFolders saat komponen pertama kali dimuat dan setiap kali 'tahun' berubah
    getFolder();
  }, [tahun]);

  // Fungsi untuk menangani perubahan input tahun
  useEffect(() => {
    // Fungsi untuk mendapatkan opsi tahun dari server
    const getTahunOptions = async () => {
      try {
        const response = await axios.get("/tahun-options"); // Sesuaikan dengan rute yang sesuai
        setTahunOptions(response.data.data);
      } catch (error) {
         console.error("Error fetching tahun options:", error);
      }
    };
    // Memanggil fungsi getTahunOptions saat komponen pertama kali dimuat
    getTahunOptions();
  }, []);

  // Fungsi untuk menangani perubahan input tahun
  const handleTahunChange = (event) => {
    setTahun(event.target.value);

    // localStorage.setItem("tahun", event.target.value);
    // navigate("/dashboard/:option/");
  };

  return (
    <div className="app">
      <Burger />
      <div style={{ display: "flex", position: "absolute", left: "1300px" }}>
        <TFolder />
      </div>
      <br />
      <br />

      <div
        style={{ display: "inline-table" }}
        value={tahun}
        onChange={handleTahunChange}
      >
        {tahunOptions.map((option) => (
          <div
            className="logo"
            key={option}
            value={option}
            style={{ textAlign: "center", color: "black" }}
          >
            {/* <Link to={`/dashboard/${option}`}> 
                <Folder/>
                </Link> 
                <br /> */}

            <Card
              style={{
                width: "10rem",
                backgroundColor: "rgba(102, 217, 255, 0.500)",
                margin: "10px",
                marginLeft: "20px",
              }}
            >
              <Card.Body>
                <Card.Title style={{ width: "10px" }}>
                  <section className="mb-3"></section>
                </Card.Title>
                <Card.Title>
                  <Link to={`/dashboard/${option}`}>
                    <Folder size={1500} />
                    <br />
                  </Link>
                  {option}
                </Card.Title>

                <Card.Subtitle style={{ color: "black" }}></Card.Subtitle>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* <div className="marginfolder">
        {tahunOptions.map((option) => (
          console.log(option),
          <label key={option}>
            <input
              style={{ display: "none" }}
              type="radio"
              value={option}
              checked={tahun === option}
              onChange={handleTahunChange}
            />

            <Folder />
            <br />
            {option}
          </label>
        ))}
      </div> */}
      <br />

      <br />
      <br />

      {/* <MenuBawah /> */}
    </div>
  );
}

export default Konten;
