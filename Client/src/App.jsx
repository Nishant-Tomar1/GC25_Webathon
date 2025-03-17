import { Route } from "react-router-dom"
import Layout from "./layout/layout"
import HomePage from "./pages/HomePage"
import { RouterProvider } from "react-router-dom"
import { createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import ErrorPage from "./pages/ErrorPage"
import OrderHistory from "./pages/OrderHistory"
import Cart from "./pages/Cart"
import ProductDetail from "./pages/ProductDetail"
import Notifications from "./components/Notifications"
import SellerPortal from "./pages/SellerPortal"
import ProductCard from "./pages/productPage"
import MyProfile from "./pages/myprofile"


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/orderhistory" element={<OrderHistory />} />
      <Route path="/cart/:userId" element={<Cart />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/product" element={<ProductCard/>}></Route>
      <Route path="/notifications/:userId" element={<Notifications />} />
      <Route path="/seller/:userId" element={<SellerPortal />} />
      <Route path="/myprofile" element={<MyProfile />} />
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

