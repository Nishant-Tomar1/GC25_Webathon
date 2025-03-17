import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Server } from '../Constants';
import ProductCard from "../components/ProductCard"

function SearchResult() {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const search = location.pathname.split("/")[2];

    const fetchProducts = async ()=>{
        try {
          const res = await axios.get(`${Server}/product/getproducts?search=${(search === "all") ? "" : search}`);
          if (res.data.statusCode === 200){
            setProducts(res.data.data.products)
          }
          
        } catch (error) {
          console.log(error); 
        }
      }

    useEffect(()=>{
        fetchProducts();
    },[search])

  return (
    <>
    <div className='w-full pt-20'>
        <h1 className='w-full text-center font-semibold mt-4 text-2xl'>Search Results</h1>
    <div className="flex flex-wrap justify-center gap-4 p-5 w-full">
        {!products.length && <>No results</>}
    {products.map((product, index) => (
      <div key={index} className="max-w-sm bg-white">
        <ProductCard
                  key={product._id}
                  id ={product._id}
                  title={product.title}
                  discount={product.discount}
                  price={product.price}
                  image={product.images?.[0]}
                />
      </div>
    ))}
  </div>
  </div>
  </>
  )
}

export default SearchResult
