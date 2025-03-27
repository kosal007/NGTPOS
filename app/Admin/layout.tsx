import Sidebar from "../components/page";
import React, { ReactNode } from 'react';
import { FaCreditCard, FaDollarSign, FaGlobe , FaShoppingCart } from 'react-icons/fa';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex min-h-screen bg-gray-100">
          {/* Sidebar on the right */}
          <div className="flex-none w-64 bg-gray-400">
                <Sidebar />
            </div>
            {/* Main content area */}
            <div className="flex-1 p-6 bg-gray-300">
                {/* Icon container - aligned to top right */}
                <div className="flex justify-end space-x-4 mb-6">
                    {/* Card Icon */}
                    <a 
                        href="/payments"
                        className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer hover:bg-blue-50"
                    >
                        <FaShoppingCart className="text-green-600 text-xl" />
                    </a>

                    {/* Dollar Icon */}
                    <a 
                        href="/transactions"
                        className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer hover:bg-green-50"
                    >
                        <FaDollarSign className="text-green-600 text-xl" />
                    </a>

                    {/* Globe Icon */}
                    <a 
                        href="/international"
                        className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer hover:bg-indigo-50"
                    >
                        <FaGlobe className="text-indigo-600 text-xl" />
                    </a>
                </div>
                
                {/* Page content */}
                {children}
            </div>
            
            
        </div>
    );
};

export default Layout;