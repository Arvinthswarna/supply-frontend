import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NotificationManager } from 'react-notifications';

function encode(data){
    const md5 = require('md5')
    let Data = md5(data);
    return Data;
}

export default function RetailerLogin()
{
    const [retailerEmail,setRetailerEmail] = useState('');
    const [retailerPassword,setRetailerPassword] = useState('');
    const navigate =useNavigate();
    const setReEmail = (e) => {
        setRetailerEmail(e.target.value);
    };
    const setPass = (e) => {
        setRetailerPassword(e.target.value);
    };

    async function validate(e) {
        e.preventDefault();
        const navigateRetailer = (e) =>
        {
            // 👇️ navigate to /
            navigate("/retailer");
        };
        
        let data = {
        retailerEmail: retailerEmail,
        retailerPassword: retailerPassword
        }

        console.log(data);
        const url = 'http://localhost:3001/retailer/signin/'
        await axios.post(url,data)
        .then(resp=>resp.data)
        .then(resp=>{
            if(resp.length===0){
                NotificationManager.error("Invalid Credentials!","Enter proper Email/Password",5000);
            }else{
                NotificationManager.success("Login Successfull!","Welcome Back",5000);
                navigate("/Retailer",{
                    state:{
                        retailerId: resp.retailerId,
                        retailerName: resp.retailerName,
                        retailerEmail: resp.retailerEmail,
                        retailerPassword:resp.retailerPassword,
                        retailerCompany:resp.retailerCompany,
                        retailerContactNumber: resp.retailerContactNumber
                    }
                })
            }
        });
        
        
    };
    return (
        <div className='Container'>
            <Navbar id='navbar'>
                <Container>
                <Navbar.Brand id='navtitle' href="/">SUPPLY CHAIN MANAGEMENT</Navbar.Brand>
                
                </Container>
            </Navbar>
            <div className='Auth-form-container'>
                <form className='Auth-form' onSubmit={e => validate(e)}>
                    <div className='Auth-form-content'>
                        <h3 className='Auth-form-title'>Retailer</h3>
                        <div className='text-center'>
                            Not Registered?{" "}
                            <span className='link-primary'>
                                <Link id="link" to='/signup'>Sign Up</Link>
                            </span>
                        </div>
                        <div className='form-group mt-3'>
                            <input className='form-control mt-1 input' type="text" id="retailerEmail" placeholder='Retailer Email' onChange={(e) => setReEmail(e) }/>
                        </div>
                        <div className='form-group mt-3'>
                            <input className='form-control mt-1 input' type="password" id="retailerPassword" placeholder='Retailer Password' onChange={(e) => setPass(e) }/>
                        </div>
                        <div className='form-group mt-3'>
                        <Link to="/RetailerForgetPassword">Reset Password</Link>
                        </div>
                        <div className='d-grid gap-2 mt-3 justify-content-center align-content-center'>
                            <button  className='btn btn-primary ' id='btn' type="submit" >SignIn</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}