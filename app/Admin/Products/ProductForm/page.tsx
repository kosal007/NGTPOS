// app/components/ProductForm.tsx
'use client';

import { useState, useEffect } from 'react';

interface ProductFormProps {
  product?: any;
  onSuccess: () => void;
}

export default function ProductForm({ product, onSuccess }: ProductFormProps) {
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    supplier: '',
    warehouse: '',
    cost: '',
    price: '',
    initialQuantity: '',
    sku: '',
    barcode: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.productname,
        category: product.category,
        supplier: product.supplier,
        warehouse: product.warehouse,
        cost: product.cost.toString(),
        price: product.price.toString(),
        initialQuantity: product.initialquantity.toString(),
        sku: product.sku,
        barcode: product.barcode
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = product 
        ? `/api/getProduct/${product.productid}`
        : '/api/getProduct';
      
      const method = product ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: formData.productName,
          category: formData.category,
          supplier: formData.supplier,
          warehouse: formData.warehouse,
          cost: parseFloat(formData.cost),
          price: parseFloat(formData.price),
          initialQuantity: parseInt(formData.initialQuantity),
          sku: formData.sku,
          barcode: formData.barcode
        }),
      });

      if (response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const categories = ["Electronics", "Clothing", "Food", "Furniture"];
  const suppliers = ["Supplier A", "Supplier B", "Supplier C", "Asjafar On"];
  const warehouses = [
    "Main Warehouse",
    "Secondary Warehouse",
    "Fresh Warehouse",
    "Test Warehouse",
    "Electronics Warehouse"
  ];

  return (
      <form onSubmit={handleSubmit} className="space-y-4">
        
           
      <div>
        <label className="block mb-1 font-medium">Product name</label>
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Supplier</label>
          <select
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select</option>
            {suppliers.map(sup => (
              <option key={sup} value={sup}>{sup}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Warehouse</label>
          <select
            name="warehouse"
            value={formData.warehouse}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select</option>
            {warehouses.map(wh => (
              <option key={wh} value={wh}>{wh}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Cost</label>
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            step="0.001"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.001"
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Initial Quantity</label>
          <input
            type="number"
            name="initialQuantity"
            value={formData.initialQuantity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">SKU</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Barcode</label>
        <input
          type="text"
          name="barcode"
          value={formData.barcode}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {product ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </form>
  );
}