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

function Retailer() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);

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
  ];

  //Retailer Profile
  const location = useLocation();
  const [retailerId] = useState(location.state.retailerId);
  const [retailerName, setRetailerName] = useState(location.state.retailerName);
  const [retailerEmail, setRetailerEmail] = useState(
    location.state.retailerEmail
  );
  const [retailerPassword] = useState(location.state.retailerPassword);
  const [retailerCompany, setRetailerCompany] = useState(
    location.state.retailerCompany
  );
  const [retailerContactNumber, setRetailerContactNumber] = useState(
    location.state.retailerContactNumber
  );

  //view profile
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //edit profile
  const [editShow, setEditShow] = useState(false);
  const editHandleClose = () => setEditShow(false);
  const editHandleShow = () => setEditShow(true);

  const setName = (e) => {
    setRetailerName(e.target.value);
  };
  const setMail = (e) => {
    setRetailerEmail(e.target.value);
  };

  const setCompany = (e) => {
    setRetailerCompany(e.target.value);
  };

  const setContact = (e) => {
    setRetailerContactNumber(e.target.value);
  };

  //update retailer details under profile tab
  const editRetailerProfile = async (e) => {
    e.preventDefault();
    let data = {
      retailerEmail: retailerEmail,
      retailerName: retailerName,
      retailerPassword: retailerPassword,
      retailerCompany: retailerCompany,
      retailerContactNumber: retailerContactNumber,
    };

    //form data
    console.log(data);

    const response = await axios
      .get("http://localhost:3001/retailer/findByEmail/" + retailerEmail)
      .then((resp) => resp.data);
    console.log(response);

    const updatedDetails = await axios
      .put("http://localhost:3001/retailer/updateByEmail/" + retailerEmail, {
        retailerId: retailerId,
        retailerName: data.retailerName,
        retailerEmail: data.retailerEmail,
        retailerPassword: retailerPassword,
        retailerCompany: data.retailerCompany,
        retailerContactNumber: data.retailerContactNumber,
      })
      .then((resp) => resp.data);
    console.log(updatedDetails);
    NotificationManager.success(
      "Your details have been updated successfully!",
      "Success",
      5000
    );
  };

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };

  //cart items
  const [cart, setCart] = useState([]);
  const [productId, setProductId] = useState('');
  const [productQuantity, setProductQuantity] = useState(0);

  const setPId = (e) =>{
    setProductId(e.target.value);
  }
  const setPQuantity = (e) =>{
    setProductQuantity(e.target.value);
  }

  
    

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>RETAILER PAGE</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <NavDropdown title="Profile Tab" id="collasible-nav-dropdown">
                <NavDropdown.Item onClick={handleShow}>
                  View My Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={editHandleShow}>
                  Edit Profile
                </NavDropdown.Item>
              </NavDropdown>
              <Nav></Nav>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
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

      {/* view profile model */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <center>Profile Summary</center>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Name : {retailerName}
          <br />
          Email : {retailerEmail}
          <br />
          Password: {retailerPassword}
          <br />
          Organization: {retailerCompany}
          <br />
          Contact Number: {retailerContactNumber}
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={editShow} onHide={editHandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={retailerEmail}
                autoFocus
                onChange={(e) => setMail(e)}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Updated Name"
                value={retailerName}
                onChange={(e) => setName(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Organization</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter new Organization"
                value={retailerCompany}
                onChange={(e) => setCompany(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter updated contact number"
                value={retailerContactNumber}
                onChange={(e) => setContact(e)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={editHandleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editRetailerProfile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Retailer;
