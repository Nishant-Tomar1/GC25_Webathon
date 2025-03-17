import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

function SellerPortal() {
  const [products, setProducts] = useState([
    { 
      id: 1, 
      title: "Apples", 
      description: "Fresh red apples", 
      price: 2.5, 
      category: "Groceries", 
      images: ["apple.jpg"], 
      seller: "12345", 
      stock: 50, 
      discount: 5, 
      ratings: [], 
      reviews: []
    },
    { 
      id: 2, 
      title: "Bananas", 
      description: "Organic bananas", 
      price: 1.2, 
      category: "Groceries", 
      images: ["banana.jpg"], 
      seller: "67890", 
      stock: 30, 
      discount: 0, 
      ratings: [], 
      reviews: []
    }
  ]);
  const [form, setForm] = useState({ id: null, title: "", description: "", price: "", category: "", images: [], seller: "", stock: "", discount: "", ratings: [], reviews: [] });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      setProducts(
        products.map((product) =>
          product.id === form.id ? { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) } : product
        )
      );
    } else {
      setProducts([...products, { ...form, id: Date.now(), price: parseFloat(form.price), stock: parseInt(form.stock) }]);
    }
    setForm({ id: null, title: "", description: "", brand: "", price: "", category: "", images: [], seller: "", stock: "", discount: "", ratings: [], reviews: [] });
  };

  const handleEdit = (product) => {
    setForm(product);
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
          {form.id ? "Edit Product" : "Add Product"}
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
              value={form.title}
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
              value={form.description}
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
              value={form.price}
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
              value={form.category}
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
              value={form.stock}
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
              value={form.discount}
              onChange={handleChange}
              className="w-full border text-sm border-gray-300 rounded-md px-3 py-2 outline-none cursor-pointer"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
          >
            {form.id ? "Update Product" : "Add Product"}
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
            <tr key={product.id} className="border-t">
              <td className="p-2">{product.title}</td>
              <td className="p-2">{product.price.toFixed(2)}</td>
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