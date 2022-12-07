import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function OrderHistory() {
  const location = useLocation();
  const [retailerName] = useState(location.state.retailerName);
  const [orders, setOrders] = useState([]);

  async function getOrdersOfRetailer() {
    //e.preventDeafult();
    const url =
      "http://localhost:3004/order/getorderbyretailername/" + retailerName;
    const response = await axios.get(url).then((response) => response.data);
    console.log(response);
    setOrders(response);
  }

  useEffect(() => {
    getOrdersOfRetailer();
  });

  return (
    <div className="Container">
      <Navbar id='navbar'>
                <Container>
                <Navbar.Brand id='navtitle' href="/">SUPPLY CHAIN MANAGEMENT</Navbar.Brand>
                
                </Container>
      </Navbar>
      <div id="content">
      {orders.map((order, key) => {
        return (
          <Card className="card-item">
            <Card.Header key={key}>
              <center>Order Number: {order.orderNumber}</center>
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item key={key}>
                <b>Description : </b> <i>{order.orderDescription}</i>
              </ListGroup.Item>
              <ListGroup.Item key={key}>
                <b>Billing:</b> <i>{order.orderBill}</i>
              </ListGroup.Item>
              <ListGroup.Item key={key}>
                <b>Order Status:</b> <i>{order.orderStatus}</i>
              </ListGroup.Item>
              <ListGroup.Item>
                Cart Items : <br />
                {order.cartItems.map((item) => {
                  return (
                    <div>
                      <table className="cartItems">
                        <tr>
                          <td>{item.productName}    </td>
                          <td>{item.productQuantity}(Qty)  </td>
                          <td>{item.productPrice}(Price per unit)</td>
                          {/* <td>{item.productQuantity}*{item.productPrice}</td> */}
                        </tr>
                      </table>
                    </div>
                  );
                })}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        );
      })}
        </div>
    </div>
  );
}

export default OrderHistory;
