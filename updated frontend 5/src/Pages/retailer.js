import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NotificationManager } from "react-notifications";
import { Table } from "react-bootstrap";

import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate, useLocation } from "react-router-dom";

export default function Retailer() {
  const [cart] = useState([]);
  const [productId, setProductId] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);

  const setPId = (e) => {
    setProductId(e.target.value);
  };
  const setPQuantity = (e) => {
    setProductQuantity(e.target.value);
  };

  //----------------------------------------------------------

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

  const columns = [
    {
      name: "ProductId",
      selector: (row) => row.productId,
      width: "300px",
    },
    {
      name: "ProductName",
      selector: (row) => row.productName,
      sortable: true
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
      sortable: true
    },
  ];

  //modals for view and edit
  //Retailer Profile
  const location = useLocation();
  const [retailerId] = useState(location.state.retailerId);
  const [retailerName, setRetailerName] = useState(location.state.retailerName);
  const [retailerEmail, setRetailerEmail] = useState(location.state.retailerEmail);
  const [retailerPassword] = useState(location.state.retailerPassword);
  const [retailerCompany, setRetailerCompany] = useState(location.state.retailerCompany);
  const [retailerContactNumber, setRetailerContactNumber] = useState(location.state.retailerContactNumber);

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

  //----------------------------------------------------------

  //cart functions
  function addToCart() {
    var prodName = products.find((t) => t.productId === productId).productName;
    console.log(prodName);
    var cartdata = {
      productName: prodName,
      productQuantity: productQuantity,
    };
    console.log(cartdata);
    cart.push(cartdata);
    console.log(cart);
    let tab = `<tr>
                    <th> Name </th>
                    <th> Quantity </th>
                    </tr>`;
    for (let p of cart) {
      tab += `<tr>
                            <td>${p.productName}</td>
                            <td>${p.productQuantity}</td>
                        </tr>`;
    }
    document.getElementById("cart-items").innerHTML = tab;
    return cart;
  }

  async function sendRequest(e) {
    e.preventDefault();
    var items = cart;
    var cartItems=[];
    console.log("Items recieved from carts are - ");
    for(let p of items){
      //console.log(p.productName+"\t"+p.productQuantity);
      cartItems.push(p);
    }
    console.log("***********************************");
    console.log(retailerName);
    console.log(cartItems);

    const requestBody={
      "retailerName":retailerName,
      "orderDescription":"This order is from "+retailerName,
      "cartItems":cartItems
    }

    const data = await axios.post("http://localhost:3004/order/placeorder", requestBody).then(response=>response.data);
    console.log(data);
    NotificationManager.success("Your order is under process","Please check after some time",2000);

  }

  const navigateOrderHistory=()=>{
    navigate("/orderhistory",{
      state:{
        retailerId: retailerId,
        retailerName: retailerName
      }
    })
  }

  return (
    <div className="dashboard-Container">
      <Navbar id="navbar">
        <Container>
          <Navbar.Brand id="navtitle" href="/">
            SUPPLY CHAIN MANAGEMENT
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <div id="navmargin">
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              
              <NavDropdown title="Profile" id="collasible-nav-dropdown">
                <NavDropdown.Item onClick={handleShow}>
                  View My Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={editHandleShow}>
                  Edit Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={navigateOrderHistory}>
                  Order History
                </NavDropdown.Item>
                </NavDropdown>
                
              <Nav></Nav>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
      <div className="main">
        <div className="left-main-aside">
          <div className="form-group mt-3">
            <input
              className="form-control mt-1 input"
              type="text"
              id="productId"
              placeholder="Product Id"
              onChange={(e) => setPId(e)}
            />
          </div>
          <div className="form-group mt-3">
            <input
              className="form-control mt-1 input"
              type="number"
              id="productQuantity"
              placeholder="Product Quantity"
              onChange={(e) => setPQuantity(e)}
            />
          </div>
          <button
            className="btn btn-primary "
            id="addbtn"
            type="button"
            onClick={(e) => addToCart(e)}
          >
            Add to Cart
          </button>
          <Table
            className="form-inline"
            striped
            bordered
            hover
            variant="light"
            id="cart-items"
          ></Table>
        </div>
        <div className="main-right-content">
          <DataTable
            title="Inventory"
            columns={columns}
            data={filterProducts}
            className="data-table"
            pagination
            fixedHeader
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
          <button
            className="btn btn-primary "
            id="reqbtn"
            type="button"
            onClick={(e)=>sendRequest(e)}
            // onClick={(e) => sendRequest(e)}
          >
            Send Request Button
          </button>
          {/* view profile model */}
          <Modal show={show} onHide={handleClose} centered>
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
          <Modal show={editShow} onHide={editHandleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
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
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter Updated Name"
                    value={retailerName}
                    onChange={(e) => setName(e)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Organization</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter new Organization"
                    value={retailerCompany}
                    onChange={(e) => setCompany(e)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
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
              <Button variant="secondary" onClick={editRetailerProfile}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
