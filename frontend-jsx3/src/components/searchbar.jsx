import  { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { data } from './data';
import { Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';

function Filtering() {

  const [search, setSearch] = useState('');
  return (
    <div className='Table'>
      <Container>
        <h1 >testtt</h1>
        <Form>
          <InputGroup className='my-3'>
          
          <Col xs="5">
            {/* onChange for search */}
            <Form.Control xs="10"
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search'
              className=" mr-sm-2"
              
              
            />
            </Col>
        
          </InputGroup>
        </Form>
        <Table striped="columns">
          <thead>
            <tr>
              <th>Role</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) => {
                return search.toLowerCase() === ''
                  ? item
                  : item.first_name.toLowerCase().includes(search);
              })
              .map((item, index) => (
                <tr key={index}>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td><Button>🗑</Button>&nbsp;<Button>✏</Button></td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
      <br />
      <Link to="/addData">
      <button className='butonAtas' > Tambah Data +</button>
      </Link>
    </div>
  );
}

export default Filtering