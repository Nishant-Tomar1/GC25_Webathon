import React, { useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDialog } from "../store/context/DialogContextProvider";

const DialogBox = ({children}) => {
  const dialogCtx = useDialog();
  useEffect(()=>{},[dialogCtx])

  return (
    <div className="relative">

      {dialogCtx.open && (
        <div className="fixed inset-0 bg-trasparent bg-opacity-50 backdrop-brightness-40 flex items-center justify-center z-50 px-2">
          {/* Dialog Box */}
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            {/* Back Button */}
            <button
            onClick={()=>{dialogCtx.setDialog(false);}} 
            className="w-10 p-1 absolute top-4 left-4 text-gray-500 hover:text-gray-700"
            >
              <FaArrowLeftLong/>
            </button>
            {/* Logo */}
            <div className="flex justify-center mb-4">
              {/* <img
                src={logo} // Replace with your logo URL
                alt="Logo"
                className="w-16"
              /> */}
            </div>
            <div>
                {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DialogBox;
