
import React from 'react'
import { useDialog } from '../store/context/DialogContextProvider'
import ProductCard from '../components/ProductCard'

function HomePage() {
  const dialogCtx = useDialog()
  return (
    
    <>
      <ProductCard title={"Nike Shoes"} price={50} discount={5} image={"http://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1720251780/sr9iq4iri4xazy4ysmrl.webp"}/>
    </>
  )
}

export default HomePage
