
import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { NotificationManager } from "react-notifications";


function Supplier() {

    const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);
  //view supplier profile
  const location = useLocation();

  const supplierId = useState(location.state.supplierId);
  const supplierName = useState(location.state.supplierName);
  const supplierEmail = useState(location.state.supplierEmail);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  async function getInventory() {
    try {
      const url = "http://localhost:3003/inventory/findall";
      const response = await axios.get(url).then((resp) => resp.data);
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getInventory();
  }, []);

  //filter the data
  useEffect(() => {
    const result = products.filter((product) => {
      return product.productName.toLowerCase().match(search.toLowerCase());
    });

    setFilterProducts(result);
  }, [search, products]);

  //data table columns
  const columns = [
    {
      name: "ProductName",
      selector: (row) => row.productName,
    },
    {
      name: "Type",
      selector: (row) => row.productType,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.productQuantity,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.productPrice,
    },

    {
        name: "Update",
        selector: (row) => row.Update,
        
        },

        {
            name: "Delete",
            selector: (row) => row.Update,
            },
  ];

    

  
  
  return (


    
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand>SUPPLY CHAIN MANAGEMENT</Navbar.Brand>
          <Navbar.Toggle />
          
          <Nav.Link href="/orders">Orders</Nav.Link>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link onClick={handleShow}>Profile</Nav.Link>
              <Nav.Link href="/">Logout </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      

      <DataTable
  title="List Of All Products Available"
  columns={columns}
  data={filterProducts}
  pagination
  fixedHeader
  fixedHeaderScrollHeight="300px"
  selectableRowsHighlight
  highlightOnHover
  subHeader
  subHeaderComponent={
    <input
      type="text"
      placeholder="Enter the product to be searched"
      value={search}
      className="form-control"
      onChange={(e) => setSearch(e.target.value)}

     
     
  
        
    />
  }
/>

      {/* view Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <center>Profile Summary</center>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Id: {supplierId}
          <br />
          Name : {supplierName}
          <br />
          Email : {supplierEmail}
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Supplier;