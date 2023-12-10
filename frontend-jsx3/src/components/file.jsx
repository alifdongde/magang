import { useEffect, useState } from 'react';
import axios from "../api/axios";
import {  Link, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Filecomponent from './filecomponent'
import Card from "react-bootstrap/Card";
import {
  MDBContainer,
  MDBCollapse,
  MDBNavbarToggler,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { CardBody } from 'react-bootstrap';

function File() {
  const [files, setFiles] = useState([]);
  const { folderId} = useParams();
  const authToken = localStorage.getItem('Roles');
  const authToken1 = localStorage.getItem('name');
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mengambil nilai dari local storage
        const accessType = ("access_type", authToken);
        const uploadedBy = ("uploaded_by", authToken1);
        const folder = ("folder_id", folderId);

        console.log(folderId);
        const response = await axios
          .post(
            "/folder/showfiles",
            {
              folder,
              accessType,
              uploadedBy,
              search: searchTerm,
            },
            {
              headers: {
                Authorization: `Bearer ${new Cookies().get("Authorization")}`,
              },
            }
          )
          .then((response) => {
            console.log("show Files", response.data.data);

            setFiles(response.data.data);
          })
          .catch((error) => {
            console.log("Error Created Folder", error);
          });

        console.log(response.data.data);
      } 
      catch (error) {
        // console.error("Error fetching files:", error);
      }
    };

    fetchData();
  }, [authToken, authToken1, folderId,searchTerm]);

  const deleteFile = async (fileId) => {
    try {
      const response = await axios.delete(`/file/${fileId}/delete`,{
        headers: {
          Authorization: `Bearer ${new Cookies().get('Authorization')}`,
          'Access-Control-Allow-Origin' : '*',    
          "Cache-Control": "no-cache",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        

      }); // Sesuaikan dengan endpoint yang sesuai
      window.location.reload(true)
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }


  return (
    <div  >
<input
          type="text"
          placeholder="Search Files"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />  


      {files.length > 0 ? (
        <ul>
         
          {files
          .filter((file) => file.folder_id === parseInt(folderId) && file.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((file) => (
            <div style={{ display:'inline-table' }} key={file.id}>
              <Card
           style={{
          
      
            margin: "10px"
          }}>
          <Card.Title>
          <section className="mb-3">
                    <MDBContainer fluid>
                      <MDBNavbarToggler
                      type="button"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick ={(()=>setShow(!show))}
                      >
                        <MDBIcon
                          style={{ fontSize: "15px" }}
                          icon="ellipsis-vertical"
                        />
                      </MDBNavbarToggler>
                    </MDBContainer>

                    <MDBCollapse
                      style={{ width: "120px", lineHeight:'35px'}}
                      show={show}
                  

                    >
                     
                       
                        <MDBBtn  onClick={() => deleteFile(file.id)} >
                          Hapus
                        </MDBBtn>
                    
                    </MDBCollapse>
                  </section>
          {/* <button onClick={() => deleteFile(file.id)}>🗑️</button>  */}
          </Card.Title>
          <Link to={`http://localhost:8000/${file.path}`}>
          <Card.Body style={{ textAlign:'center', alignContent:'center',alignItems:'center' }}>
         


          <Filecomponent/>  
          <br />
          <a   target='blank'>{file.name}</a>

          </Card.Body>
          </Link>
          </Card>
            
    
      
              </div>
          ))}
        </ul>
      ) : (
        <p>No files found.</p>
      )}  
    </div>
  );
}

export default File;