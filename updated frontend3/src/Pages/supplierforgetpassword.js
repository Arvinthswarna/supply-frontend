import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { NotificationManager } from 'react-notifications';


function SupplierForgetPassword(){
    const [supplierEmail,setSupplierEmail] = useState('');
    const [supplierPassword, setSupplierPassword] = useState('');
    const[confirmPassword,setConfirmPassword]=useState('');

    const navigate =useNavigate();

    const setSuEmail = (e) => {
        setSupplierEmail(e.target.value);
    };
    const setPass = (e) => {
        setSupplierPassword(e.target.value);
    };

    const setConfPass=(e)=>{
        setConfirmPassword(e.target.value);
    }

    //main logic
    const getSupplier=async(supplierEmail,supplierPassword)=>{
        const url = 'http://localhost:3002/supplier/findByEmail/'+supplierEmail;
        const supplier = await axios.get(url).then(response=>response.data);

       const updateUrl = 'http://localhost:3002/supplier/updateByEmail/'+supplierEmail;
       const resp = await axios.put(updateUrl,{
            supplierId: supplier.supplierId,
            supplierEmail: supplier.supplierEmail,
            supplierPassword:supplierPassword
       })
       console.log(resp.data);
       NotificationManager.success("Relogin to continue","Your password has been updated!",5000);
       navigate("/SupplierLogin");
    }


    const forgetPassword=(e)=>{
        e.preventDefault();

        let data={
            supplierEmail: supplierEmail,
            supplierPassword: supplierPassword,
            confirmPassword: confirmPassword
        }

        console.log(data);
        if(data.supplierPassword!==data.confirmPassword){
            NotificationManager.error("Passwords do not match!","Error",5000);
        }else{
            getSupplier(supplierEmail,supplierPassword);
        }
    }

    return(
        <div className='Container'>
        <Navbar id='navbar'>
            <Container>
            <Navbar.Brand id='navtitle' href="/">SUPPLY CHAIN MANAGEMENT</Navbar.Brand>
            
            </Container>
        </Navbar>
        <div className='Auth-form-container'>
            <form className='Auth-form' onSubmit={e => forgetPassword(e)}>
                <div className='Auth-form-content'>
                    <h3 className='Auth-form-title'>Supplier Reset Password</h3>
                    
                    <div className='form-group mt-3'>
                        <input className='form-control mt-1 input' type="text" id="supplierEmail" placeholder='Supplier Email' onChange={(e) => setSuEmail(e) }/>
                    </div>
                    <div className='form-group mt-3'>
                        <input className='form-control mt-1 input' type="password" id="supplierPassword" placeholder='Supplier Password' onChange={(e) => setPass(e) }/>
                    </div>

                    <div className='form-group mt-3'>
                        <input className='form-control mt-1 input' type="password" id="confirmSupplierPassword" placeholder='Retype Password' onChange={(e) => setConfPass(e) }/>
                    </div>
        
                    <div className='d-grid gap-2 mt-3 justify-content-center align-content-center'>
                        <button  className='btn btn-primary ' id='btn' type="submit" >Reset Password</button>
                    </div>
                    
                </div>
            </form>
        </div>
    </div>
    )

}

export default SupplierForgetPassword;