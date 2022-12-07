import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";

// function encode(data){
//     const md5 = require('md5')
//     let Data = md5(data);
//     return Data;
// }
function encode(data){
  const md5 = require('md5')
  let Data = md5(data);
  return Data;
}
export default function SupplierLogin() {
  const [supplierEmail, setSupplierEmail] = useState("");
  const [supplierPassword, setSupplierPassword] = useState("");

  const navigate = useNavigate();
  const setSuEmail = (e) => {
    setSupplierEmail(e.target.value);
  };
  const setPass = (e) => {
    setSupplierPassword(e.target.value);
  };

  async function validate(e) {
    e.preventDefault();

    let data = {
      supplierEmail: supplierEmail,
      supplierPassword: encode(supplierPassword)
    };
    console.log(data.supplierEmail, data.supplierPassword);

    await axios
      .post("http://localhost:3002/supplier/signin", data)
      .then((response) => response.data)
      .then((resp) => {
        if (resp.length === 0) {
          NotificationManager.error(
            "Signup failed!",
            "Something went wrong",
            2000
          );
        } else {
          NotificationManager.success(
            "Signup Success",
            "Login to continue",
            2000
          );
          navigate("/supplier", {
            state: {
              supplierId: resp.supplierId,
              supplierName: resp.supplierName,
              supplierEmail: resp.supplierEmail,
              supplierPassword: resp.supplierPassword,
            },
          });
        }
      });
  }
  return (
    <div className="Container">
      <Navbar id="navbar">
        <Container>
          <Navbar.Brand id="navtitle" href="/">
            SUPPLY CHAIN MANAGEMENT
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={(e) => validate(e)}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Supplier</h3>

            <div className="form-group mt-3">
              <input
                className="form-control mt-1 input"
                type="text"
                id="supplierEmail"
                placeholder="Supplier Email"
                onChange={(e) => setSuEmail(e)}
                required
              />
            </div>
            <div className="form-group mt-3">
              <input
                className="form-control mt-1 input"
                type="password"
                id="supplierPassword"
                placeholder="Supplier Password"
                onChange={(e) => setPass(e)}
                required
              />
            </div>
            <div className="form-group mt-3">
              <Link to="/SupplierForgetPassword" id="link">Reset Password</Link>
            </div>

            <div className="d-grid gap-2 mt-3 justify-content-center align-content-center">
              <button className="btn btn-primary " id="btn" type="submit">
                SignIn
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
