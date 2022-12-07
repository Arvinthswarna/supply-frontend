import { useState } from "react";
import { useLocation} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";



function UpdateProduct() {
  const location = useLocation();

  const [productId] = useState(location.state.productId);
  const [productName,setProductName] = useState(location.state.productName);
  const [productPrice,setProductPrice] = useState(location.state.productPrice);
  const [productQuantity,setProductQuantity] = useState(location.state.productQuantity);
  const [productType,setProductType] = useState(location.state.productType);

  const handleProductUpdate=(e)=>{
    e.preventDefault();
    axios.put('http://localhost:3003/inventory/updateProduct/'+productName,{
        productId: productId,
        productName: productName,
        productQuantity:productQuantity,
        productPrice:productPrice,
        productType: productType
    }).then(response=>response.data).then(resp=>{
        if(resp.length===0){
            alert("Update Failer");
        }else{
            alert("Update success!");
            
        }
    })
  }

  return (
    <div className="Container">
      <Navbar id='navbar'>
                <Container>
                <Navbar.Brand id='navtitle' href="/">SUPPLY CHAIN MANAGEMENT</Navbar.Brand>
                
                </Container>
            </Navbar>
      <div className='Auth-form-container'>
      <Form onSubmit={e=>handleProductUpdate(e)}>
        <Form.Group className="mb-3">
          <Form.Label>ProductId</Form.Label>
            <Form.Control
              id = "retailerCompany"
            type="text"
            placeholder="This field is non editable"
            value={productId}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
            <Form.Control
              id = "retailerCompany"
            type="text"
            placeholder="Input Name"
            value={productName}
            onChange={e=>setProductName(e.target.value)}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Price</Form.Label>
            <Form.Control
              id = "retailerCompany"
            type="number"
            placeholder="Input updated price"
            value={productPrice}
            onChange={e=>setProductPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Quantity</Form.Label>
            <Form.Control
              id = "retailerCompany"
            type="number"
            placeholder="Input updated quantity"
            value={productQuantity}
            onChange={e=>setProductQuantity(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Type</Form.Label>
            <Form.Control
              id = "retailerCompany"
            type="text"
            placeholder="Input updated type"
            value={productType}
            onChange={e=>setProductType(e.target.value)}
          />
        </Form.Group>
        <Button id="btn" type="submit">
          Submit
        </Button>
        </Form>
        </div>
    </div>
  );
}

export default UpdateProduct;
