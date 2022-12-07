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
        retailerEmail: encode(retailerEmail),
        retailerPassword: encode(retailerPassword)
        }
        console.log(data.retailerEmail,data.retailerPassword);
        

        await axios.post('http://localhost:3001/retailer/signin',data)
        .then( response => {console.log(response.data);
        if (response.data==="valid"){
            console.log("Welcome !")
            NotificationManager.success('Logged In Sucessfully', 'Successful!', 2000);
            navigateRetailer(e);
            
        }
        else if (response.data === "Account Not Found")
        {
            NotificationManager.error('Incorrect Password!', 'Error!');
        }
        else if(response.data==="Account Not Found"){
            NotificationManager.error('No Account Found!', 'Error!');
        }
        else{
            NotificationManager.error('Please Verify Credentials!', 'Error!');
        }
        })
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