import DataTable from "react-data-table-component";
import {useState,useEffect} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NotificationManager } from 'react-notifications';
import { Table } from 'react-bootstrap';

export default function Retailer()
{
    const [cart, setCart] = useState([]);
    const [productId, setProductId] = useState('');
    const [productQuantity, setProductQuantity] = useState(0);
    const [products, setProducts] = useState([]);
    const [search,setSearch]= useState("");
    const [filterProducts,setFilterProducts] = useState([]);
    
    const setPId = (e) =>
    {
        setProductId(e.target.value);
    }
    const setPQuantity = (e) =>
    {
        setProductQuantity(e.target.value);
    }


//----------------------------------------------------------
    


    async function getInventory() {
    try {
        const url = "http://localhost:9025/inventory/findall";
        const response = await axios.get(url).then((resp) => resp.data);
        setProducts(response);
    } catch (error) {
        console.log(error);
    }
    }

    useEffect(() => {
    getInventory();
    }, []);

    //filter the data
    useEffect(()=>{
    const result = products.filter(product=>{
        return product.productName.toLowerCase().match(search.toLowerCase());
    });

    setFilterProducts(result);
    },[search,products]);

    const columns = [
    {
        name: "ProductId",
        selector: (row) => row.productId,
        width:"300px"    
    },
    {
        name: "ProductName",
        selector: (row) => row.productName,
    },
    {
        name: "Type",
        selector: (row) => row.productType,
        sortable: true,
    },
    {
        name: "Quantity",
        selector: (row) => row.productQuantity,
        sortable: true,
    },
    {
        name: "Price",
        selector: (row) => row.productPrice,
    },
    ];
    
    
    
    
//----------------------------------------------------------



    

    // async function showInventory(e)
    // {
    //     e.preventDefault();

    //     const resp = await fetch('http://localhost:9025/inventory/findall',{method:"GET"});
    //     var data = await resp.json();
    //     const columns = {

    //     }
        
                
            
        


    // }
    async function sendRequest(e)
    {
        var orderData = {
        }
        e.preventDefault();
        await axios.post('http://localhost:9025/order/placeorder',orderData)
        .then( response => {console.log(response.data);
        if (response.data==="added"){
            console.log("You're all set!!!")
            NotificationManager.success("You're all set!!!", 'Successful!', 2000);
            
            
        }
        else if (response.data === "Error")
        {
            NotificationManager.error('Enter All Data', 'Error!');
        }
        else{
            NotificationManager.error('Oops! Something went wrong', 'Error!');
        }
        })



    }

    

    function addToCart()
    {
        var prodName = products.find(t => t.productId === productId).productName
        console.log(prodName)
        var cartdata = {
            "productName":prodName,
            "productQuantity":productQuantity
        }
        console.log(cartdata)
        cart.push(cartdata);
        console.log(cart)
        let tab = `<tr>
                    <th> Name </th>
                    <th> Quantity </th>
                    </tr>`;
                    for( let p of cart){
                        tab += `<tr>
                            <td>${p.productName}</td>
                            <td>${p.productQuantity}</td>
                        </tr>`
                    }
                    document.getElementById("cart-items").innerHTML = tab;
    }


    return (
        <div className='dashboard-Container'>
            <Navbar id='navbar'>
                <Container>
                <Navbar.Brand id='navtitle' href="/">SUPPLY CHAIN MANAGEMENT</Navbar.Brand>
                
                </Container>
            </Navbar>
            <div className="main">
                <div className='left-main-aside'>
                    <div className='form-group mt-3'>
                            <input className='form-control mt-1 input' type="text" id="productId" placeholder='Product Id' onChange={(e) => setPId(e) }/>
                    </div>
                    <div className='form-group mt-3'>
                            <input className='form-control mt-1 input' type="number" id="productQuantity" placeholder='Product Quantity' onChange={(e) => setPQuantity(e) }/>
                    </div>
                    <button className='btn btn-primary ' id='addbtn' type='button' onClick={e => addToCart(e)} >Add to Cart</button>
                    <Table className="form-inline" striped bordered hover variant="light" id="cart-items"></Table>
                </div>
                <div className='main-right-content'>
                <DataTable
                        title="Inventory"
                        columns={columns}
                        data={filterProducts}
                        className='data-table'
                        pagination
                        fixedHeader
                        highlightOnHover
                        subHeader
                        subHeaderComponent={
                            <input 
                            type="text"
                            placeholder="Enter the product to be searched"
                            value={search}
                            className="form-control"
                            onChange={(e)=>setSearch(e.target.value)}
                            />
                        }
                    />
                    <button  className='btn btn-primary ' id='reqbtn' type='button' onClick={e => sendRequest(e)} >Send Request Button</button>
                </div>
                
            </div>
        </div>
    )
}