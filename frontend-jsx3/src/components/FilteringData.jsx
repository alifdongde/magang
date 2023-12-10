import  { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Data } from './Data';
// import { Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext } from 'react';
import { MyAppContext } from '../App';
import axios from '../api/axios';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';




function FilteringData() {
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
  const {Isauthenticated,setAuthenticated} = useContext(MyAppContext)
    // const [search, setSearch] = useState('');
   
    const deleteData = (id) => {
      setAuthenticated(null)
      axios.delete(`/create/create/${id}`,{
        headers:{
          Authorization :`Bearer ${new Cookies().get("Authorization")}` 
        }
      })
      .then(()=> {
        window.location.reload(true)
        Toast.fire({
          icon: "success",
          title: "Hapus Data Berhasil"
        });
      }).catch((error)=> {
        console.error("Error Deleting Data",error)
      })
    }




    const [data,setData] = useState([])
    useEffect(()=>{
      const getData =()=>{
        fetch("http://localhost:8000/api/me") 
        .then(res=>{return res.json()})
        .then(response=>{
          console.log(response.data);
          setData(response.data)
        
        })
        .catch(error=>{console.log(error);})
      }
      getData()
    },[])




    
    return (
        <div className='Table'>
          <Container>
            <h1 ></h1>
            <Form>
              <InputGroup className='my-3'>
             
            
              </InputGroup>
            </Form>
            <Table striped="columns">
              <thead>
                <tr>

                <th>Id</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Username</th>
                  <th>Action</th>
                
                </tr>
              </thead>
              <tbody>
                {
                data.map((pdata,index)=>(
                  <tr key={index}>
                    <td>{pdata.id}</td>
                    <td>{pdata.name}</td>
                    <td>{pdata.role}</td>
                    <td>{pdata.username}</td> 
                    <td ><button onClick={()=>deleteData(pdata.id)} style={{  backgroundColor:'blue' , borderRadius:'7px' }}>🗑️</button></td> 
                    <Link to ={`/UpdateData/${pdata.id}`} className='btn btn-success mx-2'>✏️</Link>
                    {/* <td ><button onClick={()=>UpdateData(pdata.id)} style={{  backgroundColor:'blue' , borderRadius:'7px' }}>✏️</button></td>  */}
                  </tr>
                ))
                }
              </tbody>
            </Table>
          </Container>
          <br />
          <Link to="/addData">
          <button className='butonAtas'> Tambah Data +</button>
          </Link>
        </div>
      );
}

export default FilteringData