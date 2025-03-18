import React, { useState } from "react";
import axios from "axios";
import { Server } from "../Constants.jsx";
import { useLogin } from "../store/context/LoginContextProvider";


function SellerCoupons() {
  const loginCtx = useLogin();
  // console.log(loginCtx.user);
  const [newProductID, setNewProductID] = useState("");
  const [form, setform] = useState(true);

  const [newCoupon, setNewCoupon] = useState([
    { code: "", discount: "", category: "", minAmount: "" },
  ]);

  const handleChange = (e) => {
    setNewCoupon({ ...newCoupon, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const key in newCoupon) {
      if (newCoupon[key] === "") {
        console.log("warning", `${key} is required!`);
        return;
      }
    }
    if (newCoupon.price < 50 || newCoupon.price > 50000) {
      console.log("warning", `Price must be between 50 to 50000`);
      return;
    }
    const file1 = document.getElementById("image").files[0];
    console.log(newCoupon);
    try {
      // loadingCtx.setLoading(true);
      const formData = new FormData();
      for (const key in newCoupon) {
        formData.append(key, newCoupon[key]);
      }
      formData.append("images", file1);
      let res;
      if (form) {
        res = await axios.post(`${Server}/product/addproduct`, formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        });
      } else {
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
      formData2.append("images", file1);
      if (res.data.statusCode === 200) {
        const res2 = await axios.patch(
          `${Server}/product/addproductimages/${res.data.data._id}`,
          formData2,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          }
        );
        for (var key of formData.entries()) {
          console.log(key[0] + ", " + key[1]);
        }

        console.log(res2);
        setform(true);
        setNewCoupon((prev) => ({
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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl text-center font-bold mb-4">Manage Discount Coupon</h1>

      {/* Product Form */}
      <div className="p-4 mb-6 border rounded-lg shadow">
        <h2 className="text-xl text-center font-semibold mb-2">
          {/* {form.id ? "Edit Product" : "Add Product"} */}
        </h2>
        <form onSubmit={handleSubmit} className="grid gap-1">
          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Coupon code
            </label>
            <input
              type="text"
              name="title"
              placeholder="HEALTHY25"
              value={newCoupon.code}
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
              placeholder="Groceries"
              value={newCoupon.category}
              onChange={handleChange}
              required
              className="w-full border text-sm border-gray-300 rounded-md px-3 py-2 outline-none cursor-pointer"
            />
          </div>

          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Discount
            </label>
            <input
              type="number"
              name="discount"
              placeholder="5%"
              value={newCoupon.discount}
              onChange={handleChange}
              className="w-full border text-sm border-gray-300 rounded-md px-3 py-2 outline-none cursor-pointer"
            />
          </div>

          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              name="minAmount"
              placeholder="Applicable above Rs 200"
              value={newCoupon.minAmount}
              onChange={handleChange}
              required
              className="w-full border text-sm border-gray-300 rounded-md px-3 py-2 outline-none cursor-pointer"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
          >
            Add Coupon
          </button>
        </form>
      </div>
    </div>
  );
}
export default SellerCoupons;
