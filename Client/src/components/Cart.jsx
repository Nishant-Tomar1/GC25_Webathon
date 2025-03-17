import React, { useEffect, useState } from "react";
import axios from "axios";
import { Server } from "../Constants.jsx";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";

function Cart() {
  const [carts, setCarts] = useState([
    {
      product: {
        title: "",
        stock: "",
        price: "",
        category: "",
        description: "",
        images: [null],
      },
      quantity: 0,
    },
  ]);
  const [originalprice, setOriginalprice] = useState(0);
  const [discountprice, setDiscountprice] = useState(0);
  const [finalprice, setFinalprice] = useState(0);
  const [coupondiscount, setCoupondiscount] = useState(0);

  const fetchData = async () => {
    const res = await axios.get(`${Server}/cart/get-user-cart`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    });
    console.log(res.data.data);
    // var cart = [];
    // res.data.data.map((c)=>{cart.push(c.product)});
    setCarts(res.data.data);
    let price = 0,
      discount = 0;
    res.data.data.map((val) => {
      price += val.product.price;
      discount += (val.product.price * val.product.discount) / 100;
    });
    setFinalprice(price - discount);
    setOriginalprice(price);
    setDiscountprice(discount);
  };

  const handleRemove = async (id) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = async () => {
    try {
      const res = await axios.delete(`${Server}/cart/remove-item/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="bg-white p-8 antialiased md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl text-bold text-center text-gray-900 sm:text-2xl">
            Shopping Cart
          </h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {carts.map((cart, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 md:p-6"
                  >
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <a href="#" className="shrink-0 md:order-1">
                        <img
                          className="h-20 w-20 dark:hidden"
                          src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                          alt="imac image"
                        />
                        <img
                          className="hidden h-20 w-20 dark:block"
                          src={cart.product.images[0]}
                          alt="imac image"
                        />
                      </a>

                      <label htmlFor="counter-input" className="sr-only">
                        Choose quantity:
                      </label>
                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <button
                            type="button"
                            id="decrement-button"
                            data-input-counter-decrement="counter-input"
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300  focus:outline-none focus:ring-2 focus:ring-gray-100 cursor-pointer"
                          >
                            <CiSquareMinus />
                          </button>
                          <input
                            type="text"
                            id="counter-input"
                            data-input-counter
                            className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0    "
                            placeholder=""
                            value={cart.quantity}
                            required
                          />
                          <button
                            type="button"
                            id="increment-button"
                            data-input-counter-increment="counter-input"
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300  focus:outline-none focus:ring-2 focus:ring-gray-100 cursor-pointer"
                          >
                            <CiSquarePlus />
                          </button>
                        </div>
                        <div className="text-end md:order-4 md:w-32">
                          <p className="text-base font-bold text-gray-900    ">
                            Rs {cart.product.price}
                          </p>
                        </div>
                      </div>

                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <h5 className="text-base text-gray-900 ">
                          {cart.product.title}
                        </h5>
                        <p className="text-base text-gray-900">
                          {cart.product.description}
                        </p>

                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => {
                              handleRemove(cart.product._id);
                            }}
                            type="button"
                            className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700    sm:p-6">
                <p className="text-xl font-semibold text-gray-900    ">
                  Order summary
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Original price
                      </dt>
                      <dd className="text-base text-sm font-medium text-gray-900    ">
                        Rs {originalprice}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Discount
                      </dt>
                      <dd className="text-base text-sm font-medium text-green-600">
                        -Rs {discountprice}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Coupon
                      </dt>
                      <dd className="text-base text-sm font-medium text-green-600  ">
                        -Rs {coupondiscount}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Tax
                      </dt>
                      <dd className="text-base text-sm font-medium text-gray-900    ">
                        (15% GST) Rs{" "}
                        {(
                          (originalprice - discountprice - coupondiscount) *
                          0.15
                        ).toFixed(2)}
                      </dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900    ">
                      Total
                    </dt>
                    <dd className="text-base text-sm font-bold text-gray-900    ">
                      Rs {(finalprice * 1.15).toFixed(2)}
                    </dd>
                  </dl>
                </div>

                <button
                  onClick={handleCheckout}
                  className="flex w-full items-center border justify-center hover:bg-gray-700 hover:text-white rounded-lg px-5 py-2.5 text-sm font-medium"
                >
                  Checkout
                </button>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {" "}
                    or{" "}
                  </span>
                  <a
                    href="/"
                    title=""
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                  >
                    Continue Shopping
                  </a>
                </div>
              </div>

              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 ">
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="voucher"
                      className="mb-2 block text-sm font-medium text-gray-900    "
                    >
                      {" "}
                      Do you have a voucher or gift card?{" "}
                    </label>
                    <input
                      type="text"
                      id="voucher"
                      className="block w-full border rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm "
                      placeholder=""
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center border justify-center rounded-lg px-5 py-2.5 text-sm font-medium"
                  >
                    Apply Code
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
