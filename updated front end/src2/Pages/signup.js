import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NotificationManager } from 'react-notifications';

function encode(data){
    const md5 = require('md5')
    let Data = md5(data);
    return Data;
}

export default function SignUp()
{
    const [retailerEmail,setRetailerEmail] = useState('');
    const [retailerPassword, setRetailerPassword] = useState('');
    const [retailerId, setRetailerId] = useState('');
    const [retailerName, setRetailerName] = useState('');
    const [retailerCompany, setRetailerCompany] = useState('');
    const [retailerContactNumber, setRetailerContactNumber] = useState('');

    const navigate = useNavigate();
    
    const setReEmail = (e) => {
        setRetailerEmail(e.target.value);
    };
    const setPass = (e) => {
        setRetailerPassword(e.target.value);
    };
    const setId = (e) => {
        setRetailerId(e.target.value);
    };
    const setName = (e) => {
        setRetailerName(e.target.value);
    };
    const setCompany = (e) => {
        setRetailerCompany(e.target.value);
    };
    const setContactNumber = (e) => {
        setRetailerContactNumber(e.target.value);
    };

    async function signup(e) {
        e.preventDefault();
        const navigateSignin = (e) =>
        {
            // 👇️ navigate to /
            navigate("/retailerlogin");
        };
        
        let data = {
            retailerId: retailerId,
            retailerEmail: retailerEmail,
            retailerPassword: encode(retailerPassword),
            retailerCompany: retailerCompany,
            retailerName: retailerName,
            retailerContactNumber: retailerContactNumber
        }
        console.log(data.retailerId,data.retailerCompany,data.retailerName,data.retailerContactNumber,data.retailerEmail,data.retailerPassword);
        console.log(data)

        await axios.post('http://localhost:3001/retailer/signup',data)
        .then( response => {console.log(response.data);
        if (response.data==="Added"){
            console.log("You're all set!!!")
            NotificationManager.success("You're all set!!!", 'Successful!', 2000);
            navigateSignin(e);
            
        }
        else if (response.data === "Error")
        {
            NotificationManager.error('Enter All Data', 'Error!');
        }
        else{
            NotificationManager.error('Oops! Something went wrong', 'Error!');
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
                <form className='Auth-form' onSubmit={e => signup(e)}>
                    <div className='Auth-form-content'>
                        <h3>Sign Up</h3>
                        <div className='form-group mt-3'>
                            <input className='form-control mt-1 input' type="number" id="retailerId" placeholder='Retailer Id' onChange={(e) => setId(e) }/>
                        </div>
                        <div className='form-group mt-3'>
                            <input className='form-control mt-1 input' type="text" id="retailerName" placeholder='Retailer Name' onChange={(e) => setName(e) }/>
                        </div>
                        <div className='form-group mt-3'>
                            <input className='form-control mt-1 input' type="text" id="retailerCompany" placeholder='Retailer Company' onChange={(e) => setCompany(e) }/>
                        </div>
                        <div className='form-group mt-3'>
                            <input className='form-control mt-1 input' type="text" id="retailerEmail" placeholder='Retailer Email' onChange={(e) => setReEmail(e) }/>
                        </div>
                        <div className='form-group mt-3'>
                            <input className='form-control mt-1 input' type="password" id="retailerPassword" minLength="5" maxLength="15" placeholder='Retailer Password' onChange={(e) => setPass(e) }/>
                        </div>
                        <div className='form-group mt-3'>
                            <input className='form-control mt-1 input' type="tel" maxLength="10" minLength="8" id="retailerContactNumber" placeholder='Contact Number' onChange={(e) => setContactNumber(e) }/>
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