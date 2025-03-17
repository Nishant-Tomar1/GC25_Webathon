import { Route } from "react-router-dom"
import Layout from "./layout/layout"
import HomePage from "./pages/HomePage"
import { RouterProvider } from "react-router-dom"
import { createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import ErrorPage from "./pages/ErrorPage"
import OrderHistory from "./pages/OrderHistory"
import Cart from "./pages/Cart"
import ProductDetail from "./pages/ProductDetail"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/orderhistory" element={<OrderHistory />} />
      <Route path="/cart/:userId" element={<Cart />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);


function App() {
  return (
    <>     
        <RouterProvider router={router}/>
    </>
  )
}

export default App

