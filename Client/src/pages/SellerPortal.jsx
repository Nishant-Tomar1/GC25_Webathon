import React, { useEffect, useState } from "react";
import axios from "axios";
import { Server } from "../Constants.jsx";
import { useLogin } from "../store/context/LoginContextProvider";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { Product } from "../../../Server/src/models/product.model.js";

function SellerPortal() {
  const [products, setProducts] = useState([
    { title: "", stock: "", price: "", category: "" },
  ]);
  const loginCtx = useLogin();
  // console.log(loginCtx.user);
 const [newProductID,setNewProductID] = useState("");
 const [form , setform ]  = useState(true);
  useEffect(async ()=>{
    const res = await axios.post(
      `${Server}/product/getproductsbyid`,
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      }
      
    );
    console.log(res.data);
    setProducts(res.data.data.products);
  },[])


  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    brand: "",
    price: "",
    category: "",
    images: [],
    seller: loginCtx.user,
    stock: "",
    discount: "",
  });

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const key in newProduct) {
      if (newProduct[key] === "") {
        console.log("warning", `${key} is required!`);
        return;
      }
    }
    if (newProduct.price < 50 || newProduct.price > 50000) {
      console.log("warning", `Price must be between 50 to 50000`);
      return;
    }
    const file1 = document.getElementById("image").files[0];
    console.log(newProduct);
    try {
      // loadingCtx.setLoading(true);
      const formData = new FormData();
      for (const key in newProduct) {
        formData.append(key, newProduct[key]);
      }
      formData.append("images", file1);
      let res;
      if(form){
        res = await axios.post(`${Server}/product/addproduct`, formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        });
      }
      else{
         res = await axios.patch(
          `${Server}/product/updateproductdetails/${newProductID}`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          }
        );
      }


      const formData2 = new FormData();
      formData2.append("images",file1);
      if(res.data.statusCode === 200) {
        const res2 = await axios.patch(
          `${Server}/product/addproductimages/${res.data.data._id}`,
          formData2,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          }
        );
        for (var key of formData.entries()) {
          console.log(key[0] + ", " + key[1]);
        }

         console.log(res2);
         setform(true);
         setNewProduct((prev) => ({
           ...prev,
           title: "",
           description: "",
           brand: "",
           price: "",
           category: "",
           images: [],
           seller: loginCtx.user,
           stock: "",
           discount: "",
         }));
      }
    } catch (error) {
      console.log(error);
      // loadingCtx.setLoading(false);
      // alertCtx.setToast("error", "Something went wrong");
    }
  };

  const handleEdit = (product) => {
    setNewProductID(product._id);
    setNewProduct(product);
    setform(false);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl text-center font-bold mb-4">Manage Products</h1>

      {/* Product Form */}
      <div className="p-4 mb-6 border rounded-lg shadow">
        <h2 className="text-xl text-center font-semibold mb-2">
          {/* {form.id ? "Edit Product" : "Add Product"} */}
        </h2>
        <form onSubmit={handleSubmit} className="grid gap-1">
          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Product Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Whole Grain Brown Bread"
              value={newProduct.title}
              onChange={handleChange}
              required
              className="w-full border text-sm border-gray-300 rounded-md px-3 py-2 outline-none cursor-pointer"
            />
          </div>

          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              type="text"
              name="description"
              placeholder="Soft, fresh, and made with 100% whole grains, this brown bread is a healthy choice for your daily meals."
              value={newProduct.description}
              onChange={handleChange}
              required
              className="w-full border text-sm border-gray-300 rounded-md px-3 py-2 outline-none cursor-pointer"
            />
          </div>

          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              placeholder="Amul"
              value={newProduct.brand}
              onChange={handleChange}
              required
              className="w-full border text-sm border-gray-300 rounded-md px-3 py-2 outline-none cursor-pointer"
            />
          </div>

          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="50"
              value={newProduct.price}
              onChange={handleChange}
              required
              className="w-full border text-sm border-gray-300 rounded-md px-3 py-2 outline-none cursor-pointer"
            />
          </div>

          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              placeholder="Apparel"
              value={newProduct.category}
              onChange={handleChange}
              required
              className="w-full border text-sm border-gray-300 rounded-md px-3 py-2 outline-none cursor-pointer"
            />
          </div>

          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="w-full border text-sm border-gray-300 rounded-md px-3 py-2 outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:bg-gray-100 file:text-gray-600 cursor-pointer"
            />
          </div>

          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              placeholder="5"
              value={newProduct.stock}
              onChange={handleChange}
              required
              className="w-full border text-sm border-gray-300 rounded-md px-3 py-2 outline-none cursor-pointer"
            />
          </div>

          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Stock
            </label>
            <input
              type="number"
              name="discount"
              placeholder="5%"
              value={newProduct.discount}
              onChange={handleChange}
              className="w-full border text-sm border-gray-300 rounded-md px-3 py-2 outline-none cursor-pointer"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
          >
            {!form ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      {/* Product List */}
      
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Title</th>
            <th className="p-2">Price ($)</th>
            <th className="p-2">Category</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-t">
              <td className="p-2">{product.title}</td>
              <td className="p-2">{product.price}</td>
              <td className="p-2">{product.category}</td>
              <td className="p-2">{product.stock}</td>
              <td className="p-2 flex gap-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded"
                  onClick={() => handleEdit(product)}
                >
                  <FaEdit size={16} />
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                  onClick={() => handleDelete(product.id)}
                >
                  <FaTrash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default SellerPortal;
