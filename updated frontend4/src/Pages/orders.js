import React,{ useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";
import NotificationManager from "react-notifications/lib/NotificationManager";
import {useNavigate} from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const[search,setSearch]=useState('');
  const[filterOrder,setFilterOrders]=useState([]);
  const navigate = useNavigate();

  const items=[];

  async function getOrders() {
    const data = await axios
      .get("http://localhost:3004/order/findallorders/")
      .then((response) => response.data);
    setOrders(data);
    console.log(data);
  }

  useEffect(() => {
    getOrders();
  }, []);

  //filter orders based on reatiler name
  useEffect(() => {
    const result = orders.filter((order) => {
      return order.retailerName.toLowerCase().match(search.toLowerCase());
    });

    setFilterOrders(result);
  }, [search, orders]);

  
  //display the cart items
  const showCartItems=(e,cartItems)=>{
    e.preventDefault();
    for(let p of cartItems){
      items.push(p);
    }
    console.log(items);
    let cart = "";

    for(let p of items){
      cart=cart+p.productName+"\t"+p.productQuantity+"\n";
    }
    alert(cart);
    cart="";
    items.length=0;
  }
  
  //reject Order
  const rejectOrder=(e,orderId)=>{
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            "http://localhost:3004/order/delete/" + orderId
          )
          .then((response) => console.log(response));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
    navigate("/orders");
  }

  //accept order
  const acceptOrder=async(e,orderId)=>{
    e.preventDefault();
    await axios.get("http://localhost:3003/inventory/acceptRejectOrder/"+orderId)
    .then(response=>response.data)
    
    NotificationManager.success("Order Status updated !"," Refersh the page to check status",3000);

    navigate("/orders");
  }

  const columns = [
    {
      name: "RetailerName",
      selector: (row) => row.retailerName,
      width: "150px",
    },
    {
      name: "Order Description",
      selector: (row) => row.orderDescription,
      width: "300px",
    },
    {
      name:"Requested Items",
      selector:(row)=><i class="bi bi-cart-check-fill" onClick={e=>showCartItems(e,row.cartItems)}></i>,
      width:"160px"

    },
    {
      name: "Accept Order",
      selector:(row)=><i class="bi bi-check-square-fill" onClick={e=>acceptOrder(e,row.orderNumber)}></i>,
      width:"150px",
    },
    {
      name: "Reject Order",
      selector:(row)=><i class="bi bi-x-square-fill" onClick={e=>rejectOrder(e,row.orderNumber)}></i>,
      width:"150px",
    },
    {
      name: "Order Status",
      selector: (row) => row.orderStatus,
      width: "450px",
    },
    {
      name: "Order Bill",
      selector: (row) => row.orderBill,
    },

  ];


  return (
    <div>
      <DataTable
        title="Orders"
        columns={columns}
        data={filterOrder}
        className="data-table"
        pagination
        fixedHeader
        highlightOnHover
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Enter the Retailer Name"
            value={search}
            className="form-control"
            onChange={(e) => setSearch(e.target.value)}
          />
        }
      />
    </div>
  );
}

export default Orders;
