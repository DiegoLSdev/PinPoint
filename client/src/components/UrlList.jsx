import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import Searchbar from '../components/Searchbar';

const localhost = "http://localhost:4000";
// const deployedUrl = "https://pinpoint-3.onrender.com"; OLD URL ON RENDER
const deployedUrl = "https://pin-point-nine.vercel.app";


const UrlList = () => {
    const [urls, setUrls] = useState([]);
    const [colorScheme, setColorScheme] = useState('default');
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedTheme = localStorage.getItem('colorScheme') || 'default';
        setColorScheme(storedTheme);

        const fetchUrls = async () => {
            try {
                const response = await axios.get(`${deployedUrl}/api/urls`, {
                    withCredentials: true,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                });
                setUrls(response.data);
            } catch (error) {
                if (error.response.status === 401) {
                    navigate('/login');
                }
                console.error('Error fetching URLs:', error);
            }
        };
        fetchUrls();
    }, [navigate]);

    useEffect(() => {
        const groupedUrls = urls.reduce((acc, url) => {
            if (!acc[url.category]) {
                acc[url.category] = [];
            }
            acc[url.category].push(url);
            return acc;
        }, {});

        // Sort categories by number of URLs (ascending order)
        const sortedCategories = Object.entries(groupedUrls).sort((a, b) => a[1].length - b[1].length);
        setCategories(sortedCategories);
    }, [urls]);

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${deployedUrl}/api/logout`, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                navigate('/login');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteUrl = async (urlId) => {
        try {
            await axios.delete(`${deployedUrl}/api/url/${urlId}`, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
            });
            setUrls(urls.filter((url) => url._id !== urlId));
        } catch (error) {
            console.error('Error deleting URL:', error);
        }
    };

    const toggleColorScheme = () => {
        setColorScheme(prev => {
            const newScheme = prev === 'default' ? 'scheme1' : prev === 'scheme1' ? 'scheme2' : 'default';
            localStorage.setItem('colorScheme', newScheme);
            return newScheme;
        });
    };

    const themeStyles = {
        default: {
            AppContainer: 'bg-[#343a40]',
            urlContainer: 'bg-[#495057] text-[#f8f9fa]',
            urlItem: 'bg-[#adb5bd] text-[#343a40] hover:bg-[#6c757d] hover:text-[#f8f9fa]'
        },
        scheme1: {
            AppContainer: 'bg-[#0f4c75]',
            urlContainer: 'bg-[#3282b8] text-[#bbe1fa]',
            urlItem: 'bg-[#bbe1fa] text-[#0f4c75] hover:bg-[#1b262c] hover:text-[#bbe1fa]'
        },
        scheme2: {
            AppContainer: 'bg-[#4c1f03]',
            urlContainer: 'bg-[#783d06] text-[#ffe94a]',
            urlItem: 'bg-[#f8a225] text-[#4c1f03] hover:bg-[#b06714] hover:text-[#ffe94a]',
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className={`p-8 ${themeStyles[colorScheme].AppContainer}`}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            >
                <div className="flex justify-between items-center mb-8">
                    <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link
                            to="/add-url"
                            className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out"
                        >
                            Add URL
                        </Link>
                    </motion.div>

                    <Searchbar />

                    <div className='flex justify-center items-center gap-6'>
                        <motion.div
                            className=""
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Link
                                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300 ease-in-out"
                                onClick={handleLogout}
                            >
                                Logout
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* URL Categories */}
                {categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {categories.map(([category, urlsInCategory]) => (
                            <div
                                key={category}
                                className={`border p-4 rounded-lg m-1 max-w-[50%] h-fit  ${themeStyles[colorScheme].urlContainer}`}
                            >
                                <Disclosure defaultOpen>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex justify-between w-full text-sm font-medium text-left">
                                                <span>
                                                    {category} ({urlsInCategory.length})
                                                </span>
                                                <ChevronUpIcon
                                                    className={`w-5 h-5 ${open ? 'transform rotate-180' : ''}`}
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm">
                                                <div className="flex flex-wrap gap-1">
                                                    {urlsInCategory.map((url) => (
                                                        <motion.div
                                                            key={url._id}
                                                            className={`relative rounded-md transition duration-300 ease-in-out w-fit group ${themeStyles[colorScheme].urlItem}`}
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                        >
                                                            <div>
                                                                <a
                                                                    href={url.url}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="flex items-center p-1"
                                                                >
                                                                    <img
                                                                        src={url.favicon}
                                                                        alt="favicon"
                                                                        className="w-6 h-6 rounded-full"
                                                                        onError={(e) =>
                                                                            (e.target.src =
                                                                                'https://img.icons8.com/?size=100&id=9918&format=png&color=000000')
                                                                        }
                                                                    />
                                                                    <span className="text-lg">{url.title}</span>
                                                                </a>
                                                            </div>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleDeleteUrl(url._id);
                                                                }}
                                                                className="absolute -top-1 -right-1 rounded-full opacity-0 group-hover:opacity-100 focus:outline-none transition duration-200"
                                                            >
                                                                <img
                                                                    width="16"
                                                                    height="16"
                                                                    src="https://img.icons8.com/color/48/close-window.png"
                                                                    alt="delete"
                                                                />
                                                            </button>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default UrlList;
