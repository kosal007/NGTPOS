// app/components/AddProductModal.tsx
"use client";

import { useState } from "react";
import Modal from "../Modal/Modal";

export default function AddProductModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    supplier: "",
    warehouse: "",
    image: null as File | null,
    hasVariants: false,
    cost: "",
    price: "",
    initialQuantity: "500",
    sku: "",
    barcode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? target.checked
          : type === "file"
            ? target.files?.[0] || null
            : value,
    }));
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert image to Base64 if exists
      let imageBase64 = null;
      if (formData.image) {
        imageBase64 = await convertToBase64(formData.image);
      }

      // Prepare the data to match your API exactly
      const payload = {
        productName: formData.productName,
        price: parseFloat(formData.price), 
        cost: parseFloat(formData.cost), 
        initialQuantity: parseInt(formData.initialQuantity), 

        
        // price: formData.price ? parseFloat(formData.price) : 0,
        // cost: formData.cost ? parseFloat(formData.cost) : 0,
        // initialQuantity: formData.initialQuantity ? parseInt(formData.initialQuantity) : 0,

        sku: formData.sku,
        barcode: formData.barcode,
        supplier: formData.supplier,
        warehouse: formData.warehouse,
        image: imageBase64, // Send as Base64 or null
        category: formData.category
      };

      const response = await fetch('/api/AddProducts', { // Match your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Send as JSON
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      console.log("API Response:", responseData); // Log response

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to submit form");
      }
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.error || 'Failed to submit form');
      // }

      setSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccess(false);
        // Reset form
        setFormData({
          productName: "",
          category: "",
          supplier: "",
          warehouse: "",
          image: null,
          hasVariants: false,
          cost: "",
          price: "",
          initialQuantity: "500",
          sku: "",
          barcode: "",
        });
      }, 1500);
    } catch (error) {
      console.error("Submission error:", error);
      alert(error || "Error submitting form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = ["Electronics", "Clothing", "Food", "Furniture"];//should got these from database 
  const suppliers = ["Supplier A", "Supplier B", "Supplier C", "Asjafar On"];
  const warehouses = [
    "Main Warehouse",
    "Secondary Warehouse",
    "Fresh Warehouse",
    "Test Warehouse",
    "Electronics Warehouse",
  ];

  return (
    <div className="p-6">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
      >
        + Add Product
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="max-w-2xl mx-auto p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add new product</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Product name</h3>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Product name"
                className="w-full p-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select an option</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                <select
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  className="w-full p-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select an option</option>
                  {suppliers.map((sup) => (
                    <option key={sup} value={sup}>
                      {sup}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Warehouse</label>
                <select
                  name="warehouse"
                  value={formData.warehouse}
                  onChange={handleChange}
                  className="w-full p-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select an option</option>
                  {warehouses.map((wh) => (
                    <option key={wh} value={wh}>
                      {wh}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="image"
                        type="file"
                        className="sr-only"
                        onChange={handleChange}
                        accept="image/*"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              {formData.image && (
                <p className="mt-2 text-sm text-gray-600">Selected: {formData.image.name}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="has-variants"
                name="hasVariants"
                type="checkbox"
                checked={formData.hasVariants}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="has-variants" className="ml-2 block text-sm text-gray-700">
                Product has variants?
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                    className="focus:ring-blue-500 text-black focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md p-2 border"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="focus:ring-blue-500 text-black focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md p-2 border"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Initial Quantity</label>
              <input
                type="number"
                name="initialQuantity"
                value={formData.initialQuantity}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 text-black rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="500 (optional)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 text-black rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Barcode</label>
                <input
                  type="text"
                  name="barcode"
                  value={formData.barcode}
                  onChange={handleChange}
                  className="w-full p-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Saving..." : "Save Product"}
              </button>
            </div>

            {success && (
              <div className="p-2 mt-4 text-center text-sm text-green-700 bg-green-50 rounded-md">
                Saved successfully!
              </div>
            )}
          </form>
        </div>
      </Modal>
    </div>
  );
}