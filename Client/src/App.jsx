import { Route } from "react-router-dom"
import Layout from "./layout/layout"
import HomePage from "./pages/HomePage"
import { RouterProvider } from "react-router-dom"
import { createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import ErrorPage from "./pages/ErrorPage"
import ProductPage from "./pages/ProductPage"
import Dashboard from "./pages/Dashboard"
import { useEffect } from "react"
import axios from "axios"
import { Server } from "./Constants"
import { useLogin } from "./store/context/LoginContextProvider"
import SearchResult from "./pages/SearchResult"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/product/:productId" element={<ProductPage />} />
      <Route path="/notifications/:userId" element={<Dashboard />} />
      <Route path="/profile/:userId" element={<Dashboard/>} />
      <Route path="/orders/:userId" element={<Dashboard/>} />
      <Route path="/cart/:userId" element={<Dashboard/>} />
      <Route path="/manageorders/:userId" element={<Dashboard/>} />
      <Route path="/manageproducts/:userId" element={<Dashboard/>} />
      <Route path="/managecoupons/:userId" element={<Dashboard/>} />
      <Route path="/search/:search" element={<SearchResult/>}/>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);


function App() {
  const loginCtx = useLogin();

  const verifyUser = async()=>{
    if (localStorage.getItem("Token")){
      try {
        const res = await axios.get(`${Server}/users/verify-token`,{
          headers : {
            Authorization : 
              "Bearer "+ localStorage.getItem("Token")
          }
        })
        
        if (res.data.statusCode === 200){
          console.log("halwa");
          loginCtx.login(res.data.data.user);
          localStorage.setItem("Token",res.data.data.Token);
        }
        
      } catch (error) {
        console.log(error);
      }
    }

  }
  useEffect(()=>{
    verifyUser()
  },[])
  
  return (
    <>     
        <RouterProvider router={router}/>
    </>
  )
}

export default App

