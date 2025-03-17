import { Fragment, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useDialog } from "../store/context/DialogContextProvider";
import { FaSearch } from "react-icons/fa";
import Auth from "./Auth";
import DialogBox from "./DialogBox";
import { useLogin } from "../store/context/LoginContextProvider";
import { LuBell } from "react-icons/lu";
import { LuBellDot } from "react-icons/lu";
import { RiShoppingCartLine } from "react-icons/ri";

const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Dresses", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Denim", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Significant Other", href: "#" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dialogCtx = useDialog();
  const loginCtx = useLogin()

  return (
    <div className="bg-white">

      <header className="relative bg-white">

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">

              {/* Logo */}
              <div className=" lg:flex ml-0 hidden">
                <Link to="/">
                  <img alt="logo" src={logo} className="w-16 lg:w-24" />
                </Link>
              </div>

              

              <div className="lg:ml-auto flex items-center">
                <div class="flex rounded-md lg:ml-6 border-2 mr-8 border-black-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
                  <input
                    placeholder="Find Something..."
                    class="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3"
                  />
                  <button
                    type="button"
                    class="flex items-center justify-center bg-[#fff] px-5"
                  >
                    <FaSearch />
                  </button>
                </div>


                {/* Login */}
                {!loginCtx.isLoggedIn && <div className="flex lg:flex-1 pr-2 justify-center lg:items-center lg:justify-end lg:space-x-6">
                  <Link
                    to="/"
                    onClick={() => {
                      dialogCtx.toggleDialog();
                    }}
                    className="text-lg font-semibold text-gray-700 hover:text-gray-800"
                  >
                    Login
                  </Link>
                </div>}
                  

                {loginCtx.isLoggedIn && <div className="text-2xl flex text-black">
                    <LuBell/>
                    {/* <span className="text-red-600"> <LuBellDot/> </span> */}
                </div>}

                {/* Cart */}
                {loginCtx.isLoggedIn && <div className="ml-4 flow-root lg:ml-6">
                  <a href={`/cart/${loginCtx.user?._id}`} className="group -m-2 flex items-center p-2">
                    <span className="text-2xl "><RiShoppingCartLine/></span>
                    <span className="ml-2 text-sm font-medium text-black group-hover:text-gray-800">
                      0
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>}


              </div>
            </div>
          </div>
        </nav>
      </header>

      <DialogBox>
        <Auth/>
      </DialogBox>
    </div>
  );
}
