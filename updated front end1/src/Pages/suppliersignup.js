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

export default function SignUp1()
{
    const [supplierEmail,setSupplierEmail] = useState('');
    const [supplierPassword, setSupplierPassword] = useState('');
    const [supplierId, setSupplierId] = useState('');
    const [supplierName, setSupplierName] = useState('');
   
    const navigate = useNavigate();
    
    const setReEmail = (e) => {
        setSupplierEmail(e.target.value);
    };
    const setPass = (e) => {
        setSupplierPassword(e.target.value);
    };
    const setId = (e) => {
        setSupplierId(e.target.value);
    };
    const setName = (e) => {
        setSupplierName(e.target.value);
    };
    

    async function validate(e) {
        e.preventDefault();
        const navigateSignin = (e) =>
        {
            // 👇️ navigate to /
            navigate("/supplierlogin");
        };
        
        let data = {
            supplierId: supplierId,
            supplierName: supplierName,
            supplierEmail: supplierEmail,
            supplierPassword: encode(supplierPassword),
            
            
        }
        console.log(data.supplierId,data.supplierName,data.supplierEmail,data.supplierPassword);
        

        await axios.post('http://localhost:3001/retailer/signup',data)
        .then( response => {console.log(response.data);
        if (response.data==="added"){
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
                <form className='Auth-form' onSubmit={e => validate(e)}>
                    <div className='Auth-form-content'>
                        <h3>Sign Up</h3>
                        <div className='form-group mt-3'>
                            <input className='form-control mt-1 input' type="number" id="supplierId" placeholder='Supplier Id' onChange={(e) => setId(e) }/>
                        </div>
                        <div className='form-group mt-3'>
                            <input className='form-control mt-1 input' type="text" id="supplierName" placeholder='Supplier Name' onChange={(e) => setName(e) }/>
                        </div>
                        
                        <div className='form-group mt-3'>
                            <input className='form-control mt-1 input' type="text" id="supplierEmail" placeholder='Supplier Email' onChange={(e) => setReEmail(e) }/>
                        </div>
                        <div className='form-group mt-3'>
                            <input className='form-control mt-1 input' type="password" id="supplierPassword" minLength="5" maxlength="15" placeholder='Supplier Password' onChange={(e) => setPass(e) }/>
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