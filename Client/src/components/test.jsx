import React, { useState } from "react";
import { motion } from "framer-motion";

const Test = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Animated Heading */}
      <motion.h1
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Search Anything
      </motion.h1>

      {/* Animated Search Box */}
      <motion.div
        className="relative w-80"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          placeholder="Type to search..."
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-yellow-400"
        />
        {/* Placeholder Animation */}
        <motion.span
          className="absolute left-4 top-2 text-gray-400 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: searchValue ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          Search...
        </motion.span>
      </motion.div>
    </div>
  );
};

export default Test;
