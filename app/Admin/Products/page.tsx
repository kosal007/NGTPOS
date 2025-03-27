// app/components/ProductsTable.tsx
'use client';

import { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiInfo, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import Modal from './Modal/Modal';
import ProductForm from './ProductForm/page';


import AddProduct from "./add-product/page";

interface Product {
  productid: number;
  productname: string;
  category: string;
  supplier: string;
  warehouse: string;
  price: number;
  cost: number;
  initialquantity: number;
  sku: string;
  barcode: string;
  image: string;
  createdat: string;
}

export default function ProductsTable() {
  // State for products data and UI control
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ 
    key: 'productname', 
    direction: 'asc' 
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 1. Function to fetch products data
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/getProduct');
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Function to handle sorting
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort products based on configuration
  const sortedProducts = [...products].sort((a, b) => {
    const aValue = a[sortConfig.key as keyof Product];
    const bValue = b[sortConfig.key as keyof Product];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // 3. Function to handle product update
  const handleUpdate = async (updatedProductData: Partial<Product>) => {
    if (!selectedProduct) return;
    
    try {
      const response = await fetch(`/api/getProduct/${selectedProduct.productid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProductData),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      // Refresh the product list after successful update
      await fetchProducts();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // 4. Function to handle product deletion
  const handleDelete = async (product: Product) => {
    if (!selectedProduct) return;
    
    try {
      const response = await fetch(`/api/getProduct/${selectedProduct.productid}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Refresh the product list after successful deletion
      await fetchProducts();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

//informaion
  function handleInfo(product: Product): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <AddProduct/>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('productname')}
              >
                <div className="flex items-center">
                  PRODUCT NAME
                  {sortConfig.key === 'productname' && (
                    sortConfig.direction === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center">
                  CATEGORY
                  {sortConfig.key === 'category' && (
                    sortConfig.direction === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('supplier')}
              >
                <div className="flex items-center">
                  SUPPLIER
                  {sortConfig.key === 'supplier' && (
                    sortConfig.direction === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('warehouse')}
              >
                <div className="flex items-center">
                  WAREHOUSE
                  {sortConfig.key === 'warehouse' && (
                    sortConfig.direction === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center">
                  PRICE
                  {sortConfig.key === 'price' && (
                    sortConfig.direction === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : sortedProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center">
                  No products found
                </td>
              </tr>
            ) : (
              sortedProducts.map((product) => (
                <tr key={product.productid} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {product.image && (
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={product.image}
                            alt={product.productname}
                          />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.productname}
                        </div>
                        <div className="text-sm text-gray-500">
                          #{product.sku}
                        </div>
                        <div className="text-xs text-gray-400">
                          Added at: {formatDate(product.createdat)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.supplier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.warehouse}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${product.price}
                    </div>
                    <div className="text-xs text-gray-500">
                      Cost: ${product.cost}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleInfo(product)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View details"
                      >
                        <FiInfo size={18} />
                      </button>
                      <button
                        onClick={() => handleUpdate(product)}
                        className="text-yellow-600 hover:text-yellow-900"
                        title="Edit"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Edit Product</h2>
          {selectedProduct && (
            <ProductForm 
              product={selectedProduct} 
              onSuccess={() => {
                fetchProducts();
                setIsEditModalOpen(false);
              }} 
            />
          )}
        </div>
      </Modal>

      {/* Info Modal */}
      <Modal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Product Details</h2>
          {selectedProduct && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                {selectedProduct.image && (
                  <img
                    className="h-20 w-20 rounded-full object-cover"
                    src={selectedProduct.image}
                    alt={selectedProduct.productname}
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold">{selectedProduct.productname}</h3>
                  <p className="text-sm text-gray-500">SKU: #{selectedProduct.sku}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Category</p>
                  <p>{selectedProduct.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Supplier</p>
                  <p>{selectedProduct.supplier}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Warehouse</p>
                  <p>{selectedProduct.warehouse}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Initial Quantity</p>
                  <p>{selectedProduct.initialquantity}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Cost</p>
                  <p>${selectedProduct.cost.toFixed(3)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Price</p>
                  <p>${selectedProduct.price.toFixed(3)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Barcode</p>
                  <p>{selectedProduct.barcode}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Added On</p>
                  <p>{formatDate(selectedProduct.createdat)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      {/* <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
          <p className="mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal> */}
    </div>
  );
}