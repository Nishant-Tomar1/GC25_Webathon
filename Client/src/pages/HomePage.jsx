import {React,useState} from "react";
import { useDialog } from "../store/context/DialogContextProvider";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "@headlessui/react";

const products = [
  {
    id: 1,
    imageUrl: "https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_3.png",
    discount: 5,
    title: "School Bag",
    rating: 4.5,
    price: 676,
  },
  {
    id: 2,
    imageUrl: "https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_4.png",
    discount: 5,
    title: "TeddyBea adsdddddddddddddddddddd ddddrr",
    rating: 3.5,
    price: 676,
  },
  {
    id: 3,
    imageUrl: "https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_5.png",
    discount: 5,
    title: "Baby Truck",
    rating: 4.5,
    price: 676,
  },
  {
    id: 4,
    imageUrl: "https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_6.png",
    discount: 5,
    title: "Scooter",
    rating: 4,
    price: 676,
  },
  {
    id: 5,
    imageUrl: "https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_4.png",
    discount: 5,
    title: "Teddy Bear",
    rating: 3.5,
    price: 676,
  },
  {
    id: 6,
    imageUrl: "https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_4.png",
    discount: 5,
    title: "Teddy Be",
    rating: 3.5,
    price: 676,
  },
];

function HomePage() {
  const [swiper, setSwiper] = useState(null);
  const dialogCtx = useDialog();
  return (
    <>
      <div class="relative w-full h-64 sm:h-85 md:h-100 lg:h-100 bg-[url(/public/banner.jpg)] bg-cover bg-center">
        <Link
          to="/list"
          class="absolute hidden md:right-80 font-semibold sm:block sm:bottom-40 sm:right-55 bg-white text-orange-500 text-bold px-5 py-3 rounded shadow-xl transition-all"
        >
          Get your Groceries now
        </Link>
      </div>
      <div className="py-5 md:py-10 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden">
        <div className="container px-4 mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-2">
            Special Offers
          </h2>
          <div className="flex flex-row overflow-x-auto scroll-auto">
            {products.map((product) => (
              <div>
                <ProductCard
                  key={product.id}
                  title={product.title}
                  discount={product.discount}
                  price={product.price}
                  image={product.imageUrl}
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
          <div className="relative py-3 w-full mx-auto">
            <h2 className="text-xl md:text-3xl font-bold">Toys</h2>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={0}
              breakpoints={{
                500: { slidesPerView: 2 },
                800: { slidesPerView: 2.5 },
                1200: { slidesPerView: 4.75 },
                1308: { slidesPerView: 5.5 },
              }}
              loop={true}
              onSwiper={setSwiper}
              pagination={{ clickable: true }}
              className="py-6"
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <div>
                    <ProductCard
                      key={product.id}
                      title={product.title}
                      discount={product.discount}
                      price={product.price}
                      image={product.imageUrl}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="absolute top-1/2 left-4 z-10 ">
              <button variant="outline" onClick={() => swiper?.slidePrev()}>
                <FaArrowCircleLeft size={30} />
              </button>
            </div>
            <div className="absolute top-1/2 right-4 z-10 ">
              <button variant="outline" onClick={() => swiper?.slideNext()}>
                <FaArrowCircleRight size={30} />
              </button>
            </div>
          </div>
          <hr></hr>
        </div>
      </div>
    </>
  );
}

export default HomePage;
