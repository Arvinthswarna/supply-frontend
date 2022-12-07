import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

function Supplier() {
  const [products, setProducts] = useState([]);
  const[search,setSearch]=useState("");
  const[filterProducts,setFilterProducts]=useState([]);

  async function getInventory() {
    try {
      const url = "http://localhost:3003/inventory/findall";
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
      name: "ProductName",
      selector: (row) => row.productName,
    },
    {
      name: "Type",
      selector: (row) => row.productType,
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
  return (
    <div>
      <DataTable
        title="List Of All Products Available"
        columns={columns}
        data={filterProducts}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="300px"
        selectableRows
        selectableRowsHighlight
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
    </div>
  );
}

export default Supplier;
