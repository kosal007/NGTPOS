import { Home, Package, Barcode, Warehouse, Users, DollarSign, ShoppingCart, BarChart, Settings } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">


        <div className="flex items-center  space-x-0.5 rounded-md overflow-hidden p-8">
          <span className="bg-green-900 rounded-xl text-white px-2 py-1 text-sm font-bold">NGT</span>
          <span className="bg-teal-400 rounded-xl text-white px-2 py-1 text-sm font-bold flex items-center">
            POS <span className="ml-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
          </span>
        </div>


        <nav>
          <ul className="space-y-4">
            <li className="flex items-center space-x-2 text-gray-700 hover:text-black cursor-pointer">
              <Link href="/Admin/Dashboard">
                <div className="flex items-center space-x-4">
                  <Home size={20} /> <span>Dashboard</span>
                </div>
              </Link>
            </li>
            <li className="flex items-center space-x-2 text-gray-700 hover:text-black cursor-pointer">
              <Link href="/Admin/Products">
                <div className="flex items-center space-x-4">
                  <Package size={20} /> <span>Products</span>
                </div>
              </Link>
            </li>
            <li className="flex items-center space-x-2 text-gray-700 hover:text-black cursor-pointer">
              <Link href="/label-generation">
                <div className="flex items-center space-x-4">
                  <Barcode size={20} /> <span>Label Generation</span>
                </div>
              </Link>
            </li>
            <li className="flex items-center space-x-2 text-gray-700 hover:text-black cursor-pointer">
              <Link href="/warehouses">
                <div className="flex items-center space-x-4">
                  <Warehouse size={20} /> <span>Warehouses</span>
                </div>
              </Link>
            </li>
            <li className="flex items-center space-x-2 text-gray-700 hover:text-black cursor-pointer">
              <Link href="/suppliers">
                <div className="flex items-center space-x-4">
                  <Users size={20} /> <span>Suppliers</span>
                </div>
              </Link>
            </li>
            <li className="flex items-center space-x-2 text-gray-700 hover:text-black cursor-pointer">
              <Link href="/expenses">
                <div className="flex items-center space-x-4">
                  <DollarSign size={20} /> <span>Expenses</span>
                </div>
              </Link>
            </li>
            <li className="flex items-center space-x-2 text-gray-700 hover:text-black cursor-pointer">
              <Link href="/sales-orders">
                <div className="flex items-center space-x-4">
                  <ShoppingCart size={20} /> <span>Sales Orders</span>
                </div>
              </Link>
            </li>
            <li className="flex items-center space-x-2 text-gray-700 hover:text-black cursor-pointer">
              <Link href="/reports">
                <div className="flex items-center space-x-4">
                  <BarChart size={20} /> <span>Reports</span>
                </div>
              </Link>
            </li>
            <li className="flex items-center space-x-2 text-gray-700 hover:text-black cursor-pointer">
              <Link href="/settings">
                <div className="flex items-center space-x-4">
                  <Settings size={20} /> <span>Settings</span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}

    </div>
  );
}
