import {React,useEffect,useState} from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import logo from  "../assets/logo.png"
import axios from "axios";
import { Server } from "../Constants";

// const products = [
//   {
//     _id: "67d853838a23d8ecfacf063d",
//     imageUrl: "https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_3.png",
//     discount: 5,
//     title: "School Bag",
//     rating: 4.5,
//     price: 676,
//   },
//   {
//     _id: 2,
//     imageUrl: "https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_4.png",
//     discount: 5,
//     title: "TeddyBea adsdddddddddddddddddddd ddddrr",
//     rating: 3.5,
//     price: 676,
//   },
//   {
//     _id: 3,
//     imageUrl: "https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_5.png",
//     discount: 0,
//     title: "Baby Truck",
//     rating: 4.5,
//     price: 676,
//   },
//   {
//     _id: 4,
//     imageUrl: "https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_6.png",
//     discount: 5,
//     title: "Scooter",
//     rating: 4,
//     price: 676,
//   },
//   {
//     _id: 5,
//     imageUrl: "https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_4.png",
//     discount: 0,
//     title: "Teddy Bear",
//     rating: 3.5,
//     price: 676,
//   },
//   {
//     _id: 6,
//     imageUrl: "https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_4.png",
//     discount: 0,
//     title: "Teddy Be",
//     rating: 3.5,
//     price: 676,
//   },
// ];

function HomePage() {
  const [swiper, setSwiper] = useState(null);
  const [swiper1, setSwiper1] = useState(null);
  const [swiper2, setSwiper2] = useState(null);
  const [products, setProducts] = useState({});
  const [specialproducts, setSpecialproducts] = useState([]);
  const Categories = ['Groceries','Home and Furniture','Stationary']

  const fetchProductswithCategory = async (Category)=>{
    
    try {
      const res = await axios.get(`${Server}/product/getproducts?category=${Category}`);
      if (res.data.statusCode === 200){
        setProducts(prev => ({
          ...prev,
          [Category] : res.data.data.products
        }))
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const fetchSpecialProducts = async ()=>{
    try {
      const res = await axios.get(`${Server}/product/getproducts?discount=2`);
      if (res.data.statusCode === 200){
        setSpecialproducts(res.data.data.products)
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    for (let i in Categories){
      fetchProductswithCategory(Categories[i]);
    }
    fetchSpecialProducts();
  },[])



  return (
    <>
      <div className="relative w-full mt-16 h-64 sm:h-85 md:h-100 lg:h-100 bg-[url(/public/banner.jpg)] bg-cover bg-center">
        <Link
          to="/search/all"
          className="absolute hidden md:right-80 font-semibold sm:block sm:bottom-46 sm:right-52 bg-white text-orange-500 text-bold px-5 py-3 rounded shadow-xl transition-all"
        >
          Get your Groceries now
        </Link>
        <div className="sm:hidden relative -right-38 w-36 top-26"><img src={logo} alt="" /></div>
      </div>
      <div className="py-5 md:py-10 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden">
        <div className="container px-4 mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-2">
            Special Offers
          </h2>
          <div className="flex flex-row overflow-x-auto scroll-auto">
            {specialproducts.map((product,index) => (
              <div key={index}>
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
      </div>
      <div className="py-5 md:py-10 ps-4 ">
        <div className="container px-4 mx-auto">
          <div className="text-2xl md:text-4xl font-bold text-blue-900">
            Shop By Categories
          </div>
          {
            Object.keys(products).map((Category,index) => (
              (products[Category].length > 0) &&
              <div key={Category} className="relative py-3 w-full mx-auto">
                <h2 className="text-xl md:text-3xl font-bold">{Category}</h2>
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={0}
                  breakpoints={{
                    325: { slidesPerView: 1.35 },
                    500: { slidesPerView: 2 },
                    800: { slidesPerView: 2.5 },
                    1200: { slidesPerView: 4 },
                    1308: { slidesPerView: 4.5 },
                    1450: { slidesPerView: 5 },
                  }}
                  loop={true}
                  onSwiper={(index==0)?setSwiper:(index==1)?setSwiper1:setSwiper2}
                  pagination={{ clickable: true }}
                  className="py-6"
                >
                  {products[Category].map((product) => (
                    <SwiperSlide key={product.id}>
                      <div>
                        <ProductCard
                          id={product._id}
                          key={product.id}
                          title={product.title}
                          discount={product.discount}
                          price={product.price}
                          image={product.images[0]}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="absolute top-1/2 left-2 lg:left-4 z-10">
                  <button variant="outline" onClick={() => {
                    if(index==0){
                      swiper?.slidePrev();
                    }else if(index==1){
                      swiper1?.slidePrev();
                    }else{
                      swiper2?.slidePrev();
                    }
                    
                    }}>
                    <FaArrowCircleLeft size={30} />
                  </button>
                </div>
                <div className="absolute top-1/2 right-2 lg:right-4 z-10">
                  <button variant="outline" onClick={() => {
                    if (index == 0) {
                      swiper?.slideNext();
                    } else if (index == 1) {
                      swiper1?.slideNext();
                    } else {
                      swiper2?.slideNext();
                    }
                    }}>
                    <FaArrowCircleRight size={30} />
                  </button>
                </div>
              </div>
            ))
}
          <hr></hr>
        </div>
      </div>
    </>
  );
}

export default HomePage;
