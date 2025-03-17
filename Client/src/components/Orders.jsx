
const orders = [
  {
    seller: "John Doe",
    buyer: "Jane Smith",
    product: "65f3a4b1234abcde56789f03",
    price: 150.75,
    status: "Ordered",
    delivery: "2025-03-25T10:00:00.000Z",
  },
  {
    seller: "Alice Johnson",
    buyer: "Bob Williams",
    product: "65f3a4b1234abcde56789f06",
    price: 299.99,
    status: "Packed",
    delivery: "2025-03-26T12:00:00.000Z",
  },
  {
    seller: "Charlie Brown",
    buyer: "David Miller",
    product: "65f3a4b1234abcde56789f09",
    price: 99.5,
    status: "Out for Delivery",
    delivery: "2025-03-27T15:00:00.000Z",
  },
  {
    seller: "Emma Wilson",
    buyer: "Frank Harris",
    product: "65f3a4b1234abcde56789f12",
    price: 450.0,
    status: "Delivered",
    delivery: "2025-03-20T09:00:00.000Z",
  },
  {
    seller: "Grace Martinez",
    buyer: "Henry Clark",
    product: "65f3a4b1234abcde56789f15",
    price: 175.25,
    status: "Cancelled",
    delivery: null,
  },
];

function Orders() {
  return (
    <>
      <div className="py-10 relative">
        <div className="w-full max-w-7xl mx-auto md:px-4">
          <h2 className="font-manrope font-extrabold text-3xl lead-10 text-black mb-9">
            Order History
          </h2>
          <div className="flex sm:flex-col lg:flex-row sm:items-center justify-between">
            <ul className="flex max-sm:flex-col sm:items-center gap-x-14 gap-y-3">
              <li className="font-medium text-lg leading-8 cursor-pointer text-indigo-600 transition-all duration-500 hover:text-indigo-600">
                All Order
              </li>
              <li className="font-medium text-lg leading-8 cursor-pointer text-black transition-all duration-500 hover:text-indigo-600">
                Summary
              </li>
              <li className="font-medium text-lg leading-8 cursor-pointer text-black transition-all duration-500 hover:text-indigo-600">
                Completed
              </li>
              <li className="font-medium text-lg leading-8 cursor-pointer text-black transition-all duration-500 hover:text-indigo-600">
                Cancelled
              </li>
            </ul>
            <div className="flex max-sm:flex-col items-center justify-end gap-2 max-lg:mt-5">
              <div className="flex rounded-full py-3 px-4 border border-gray-300 relative">
                <input
                  type="date"
                  name="from-dt"
                  id="from-dt"
                  className="font-semibold px-2 text-sm text-gray-900 outline-0 appearance-none flex flex-row-reverse cursor-pointer w-28 placeholder-gray-900"
                />
              </div>
              <p className="font-medium text-lg leading-8 text-black">To</p>
              <div className="flex rounded-full py-3 px-4 border border-gray-300 relative">
                <input
                  type="date"
                  name="to-dt"
                  id="to-dt"
                  className="font-semibold px-2 text-sm text-gray-900 outline-0 appearance-none flex flex-row-reverse cursor-pointer w-28 placeholder-gray-900"
                />
              </div>
            </div>
          </div>

          {orders.map((order) => (
            <div className="mt-7 border border-gray-300 pt-9">
              <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
                <div className="data">
                  <p className="font-medium text-lg leading-8 text-black whitespace-nowrap">
                    Order : order._id
                  </p>
                  <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">
                    Order Payment : order.timestamps
                  </p>
                </div>
              </div>
              <hr className="py-5 " />

              <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
                <div className="grid grid-cols-4 w-full">
                  <div className="col-span-4 sm:col-span-1">
                    <img
                      src="https://pagedone.io/asset/uploads/1705474774.png"
                      alt=""
                      className="max-sm:mx-auto object-cover"
                    />
                  </div>
                  <div className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                    <h6 className="font-manrope font-semibold text-2xl leading-9 text-black mb-3 whitespace-nowrap">
                      order.product
                    </h6>
                    <p className="font-normal text-lg leading-8 text-gray-500 mb-8 whitespace-nowrap">
                      By: order.seller
                    </p>
                    <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                      <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                        Qty: 1
                      </span>
                      <p className="font-semibold text-xl leading-8 text-black whitespace-nowrap">
                        Price $
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-around w-full  sm:pl-28 lg:pl-0">
                  <div className="flex flex-col justify-center items-start max-sm:items-center">
                    <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                      Status
                    </p>
                    <p className="font-semibold text-lg leading-8 text-green-500 text-left whitespace-nowrap">
                      order.status
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-start max-sm:items-center">
                    <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                      Delivery Expected by
                    </p>
                    <p className="font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">
                      23rd March 2021
                    </p>
                  </div>
                </div>
              </div>

              <hr className="py-5"/>

              <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
                <div className="grid grid-cols-4 w-full">
                  <div className="col-span-4 sm:col-span-1">
                    <img
                      src="https://pagedone.io/asset/uploads/1705474672.png"
                      alt=""
                      className="max-sm:mx-auto object-cover"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-around w-full sm:pl-28 lg:pl-0">
                  <div className="flex flex-col justify-center items-start max-sm:items-center">
                    <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                      Status
                    </p>
                    <p className="font-semibold text-lg leading-8 text-red-500 text-left whitespace-nowrap">
                      Cancelled
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-start max-sm:items-center">
                    <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                      Delivery Expected by
                    </p>
                    <p className="font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">
                      23rd March 2021
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-3 md:px-11 flex items-center justify-between max-sm:flex-col-reverse">
                <div className="flex max-sm:flex-col-reverse items-center">
                  <button className="flex items-center gap-3 py-10 pr-8 sm:border-r border-gray-300 font-normal text-xl leading-8 text-gray-500 group transition-all duration-500 hover:text-indigo-600">
                    X cancel order
                  </button>
                  <p className="font-normal text-xl leading-8 text-gray-500 sm:pl-8">
                    Payment Is Succesfull
                  </p>
                </div>
                <p className="font-medium text-xl leading-8 text-black max-sm:py-4">
                  {" "}
                  <span className="text-gray-500">Total Price: </span>{" "}
                  &nbsp;$200.00
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Orders;
