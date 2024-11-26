import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/favicon.png';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="flex justify-center items-center mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-4xl text-indigo-400">
            Welcome to
            <span className=" p-2  text-5xl pacifico-font font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 ml-2 mr-1">
              Pin Point
            </span>
          </h1>
          <motion.img 
            className="h-10 w-10 ml-2"
            src={logo} 
            alt="Pin Point Logo"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, ease: "easeInOut", loop: Infinity }}
          />
        </motion.div>
        <motion.p 
          className="text-lg text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Save and organize your important URLs effortlessly.
        </motion.p>
      </motion.div>
      <motion.div 
        className="mt-8 flex space-x-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
      >
        <a
          href="/login"
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </a>
        <a
          href="/register"
          className="bg-fuchsia-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Register
        </a>
      </motion.div>
    </div>
  );
};

export default Home;
