import { Route } from "react-router-dom"
import Layout from "./layout/layout"
import HomePage from "./pages/HomePage"
import { RouterProvider } from "react-router-dom"
import { createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import ErrorPage from "./pages/ErrorPage"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="*" element={<ErrorPage/>}/>
    </Route>
  )
)


function App() {
  return (
    <>     
        <RouterProvider router={router}/>
    </>
  )
}

export default App

