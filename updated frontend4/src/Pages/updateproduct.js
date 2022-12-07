import { useState } from "react";
import { useLocation} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";


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
    <div>
      <Form onSubmit={e=>handleProductUpdate(e)}>
        <Form.Group className="mb-3">
          <Form.Label>ProductId</Form.Label>
          <Form.Control
            type="text"
            placeholder="This field is non editable"
            value={productId}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
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
            type="number"
            placeholder="Input updated price"
            value={productPrice}
            onChange={e=>setProductPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Input updated quantity"
            value={productQuantity}
            onChange={e=>setProductQuantity(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Input updated type"
            value={productType}
            onChange={e=>setProductType(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UpdateProduct;
