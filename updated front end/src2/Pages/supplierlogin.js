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

export default function SupplierLogin()
{
    const [supplierEmail,setSupplierEmail] = useState('');
    const [supplierPassword, setSupplierPassword] = useState('');
    
    const navigate =useNavigate();
    const setSuEmail = (e) => {
        setSupplierEmail(e.target.value);
    };
    const setPass = (e) => {
        setSupplierPassword(e.target.value);
    };

    async function validate(e) {
        e.preventDefault();
        const navigateSupplier = (e) =>
        {
            // 👇️ navigate to /
            navigate("/supplier");
        };
        
        let data = {
        supplierEmail:supplierEmail,
        supplierPassword: encode(supplierPassword)
        }
        console.log(data.supplierEmail,data.supplierPassword);
        

        await axios.post('http://localhost:3002/supplier/signin',data)
        .then( response => {console.log(response.data);
        if (response.data==="valid"){
            console.log("Welcome !")
            NotificationManager.success('Logged In Sucessfully', 'Successful!', 2000);
            navigateSupplier(e);
            
        }
        else if (response.data === "Invalid Password")
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
                        <h3 className='Auth-form-title'>Supplier</h3>
                        
                        <div className='form-group mt-3'>
                            <input className='form-control mt-1 input' type="text" id="supplierEmail" placeholder='Supplier Email' onChange={(e) => setSuEmail(e) }/>
                        </div>
                        <div className='form-group mt-3'>
                            <input className='form-control mt-1 input' type="password" id="supplierPassword" placeholder='Supplier Password' onChange={(e) => setPass(e) }/>
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