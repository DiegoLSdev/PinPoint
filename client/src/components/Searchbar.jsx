import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Searchbar = () => {
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

    // Automatically focus the input field when the component is loaded
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Handle search action
    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            window.location.href = googleSearchUrl;
        }
    };

    return (
        <div className="">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className=""
            >
                {/* Search Form */}
                <form onSubmit={handleSearch} className="flex flex-row items-center">
                    <input
                        type="text"
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search Google..."
                        className="  w-full p-1 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className=" p-1 m-2 bg-blue-600 text-white  rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Search
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Searchbar;
