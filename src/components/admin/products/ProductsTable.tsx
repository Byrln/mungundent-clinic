"use client";

import { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Edit, 
  Trash2, 
  Search,
  Plus,
  Image
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  inStock: boolean;
}

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState<string>("");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Fetch products from the API with authorization header
        const response = await fetch('/api/products', {
          headers: {
            'Authorization': 'Bearer mongondent-secure-api-key-2024',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }
        
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Filter products based on search term and stock filter
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === "" || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStock = stockFilter === "" || 
      (stockFilter === "inStock" && product.inStock) ||
      (stockFilter === "outOfStock" && !product.inStock);
      
    return matchesSearch && matchesStock;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedProduct) {
      try {
        const response = await fetch(`/api/products/${selectedProduct.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer mongondent-secure-api-key-2024',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to delete product: ${response.status}`);
        }
        
        // Remove the product from the local state
        setProducts(products.filter(p => p.id !== selectedProduct.id));
        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  const saveProduct = async (updatedProduct: Product) => {
    try {
      const response = await fetch(`/api/products/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mongondent-secure-api-key-2024',
        },
        body: JSON.stringify(updatedProduct),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update product: ${response.status}`);
      }
      
      const updatedData = await response.json();
      
      // Update the product in the local state
      setProducts(products.map(p => 
        p.id === updatedData.id ? updatedData : p
      ));
      setIsEditModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  const toggleStock = async (id: string) => {
    try {
      // Find the product
      const product = products.find(p => p.id === id);
      if (!product) return;
      
      // Toggle the inStock status
      const updatedProduct = { ...product, inStock: !product.inStock };
      
      // Update the product via API
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mongondent-secure-api-key-2024',
        },
        body: JSON.stringify(updatedProduct),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update product: ${response.status}`);
      }
      
      // Update the product in the local state
      setProducts(products.map(p => 
        p.id === id ? updatedProduct : p
      ));
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product status. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Products</option>
            <option value="inStock">In Stock</option>
            <option value="outOfStock">Out of Stock</option>
          </select>
        </div>
      </div>
      
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-6 py-4 flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                        <div className="h-3 bg-gray-200 rounded w-48"></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </td>
                  </tr>
                ))
              ) : paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 flex items-center space-x-3">
                      {product.imageUrl ? (
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                          <Image className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {product.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      ₮{product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleStock(product.id)}
                        className={`px-2 py-1 text-xs rounded-full ${
                          product.inStock 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </Card>

      {/* Edit Product Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Бүтээгдэхүүн засах</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const updatedProduct = {
                ...selectedProduct,
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                price: parseFloat(formData.get("price") as string),
                imageUrl: formData.get("imageUrl") as string || undefined,
                inStock: formData.get("inStock") === "true",
              };
              saveProduct(updatedProduct);
            }} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Бүтээгдэхүүний нэр
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={selectedProduct.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Тайлбар
                </label>
                <textarea
                  id="description"
                  name="description"
                  defaultValue={selectedProduct.description}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="price" className="text-sm font-medium text-gray-700">
                    Үнэ
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={selectedProduct.price}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  {selectedProduct.imageUrl && (
                    <div className="mb-2">
                      <img 
                        src={selectedProduct.imageUrl} 
                              alt={selectedProduct.name} 
                            className="w-32 h-32 object-cover rounded border border-gray-300"
                      />
                    </div>
                  )}
                  <div className="mt-2">
                    <label htmlFor="imageUpload" className="text-sm font-medium text-gray-700 block mb-1">
                      Эсвэл шинэ зураг оруулах
                    </label>
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        
                        // Create a FormData object
                        const formData = new FormData();
                        formData.append('file', file);
                        
                        try {
                          // Upload the file
                          const response = await fetch('/api/upload', {
                            method: 'POST',
                            body: formData,
                          });
                          
                          if (!response.ok) {
                            throw new Error(`Failed to upload image: ${response.status}`);
                          }
                          
                          const data = await response.json();
                          
                          // Update the imageUrl field with the uploaded file URL
                          const imageUrlInput = document.getElementById('imageUrl') as HTMLInputElement;
                          if (imageUrlInput) {
                            imageUrlInput.value = data.url;
                          }
                        } catch (error) {
                          console.error("Error uploading image:", error);
                          alert("Failed to upload image. Please try again.");
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="inStock" className="text-sm font-medium text-gray-700">
                    Нөөцөд байгаа эсэх
                  </label>
                  <select
                    id="inStock"
                    name="inStock"
                    defaultValue={selectedProduct.inStock ? "true" : "false"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="true">Тийм</option>
                    <option value="false">Үгүй</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="imageUrl" className="text-sm font-medium text-gray-700">
                  Зураг
                </label>
                <div className="flex flex-col space-y-2">
                  {selectedProduct.imageUrl && (
                    <div className="mb-2">
                      <img 
                        src={selectedProduct.imageUrl} 
                        alt={selectedProduct.name} 
                        className="w-32 h-32 object-cover rounded border border-gray-300"
                      />
                    </div>
                  )}
                  <input
                    id="imageUrl"
                    name="imageUrl"
                    type="text"
                    defaultValue={selectedProduct.imageUrl || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="https://example.com/image.jpg"
                  />
                  <div className="mt-2">
                    <label htmlFor="imageUpload" className="text-sm font-medium text-gray-700 block mb-1">
                      Эсвэл шинэ зураг оруулах
                    </label>
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        
                        // Create a FormData object
                        const formData = new FormData();
                        formData.append('file', file);
                        
                        try {
                          // Upload the file
                          const response = await fetch('/api/upload', {
                            method: 'POST',
                            body: formData,
                          });
                          
                          if (!response.ok) {
                            throw new Error(`Failed to upload image: ${response.status}`);
                          }
                          
                          const data = await response.json();
                          
                          // Update the imageUrl field with the uploaded file URL
                          const imageUrlInput = document.getElementById('imageUrl') as HTMLInputElement;
                          if (imageUrlInput) {
                            imageUrlInput.value = data.url;
                          }
                        } catch (error) {
                          console.error("Error uploading image:", error);
                          alert("Failed to upload image. Please try again.");
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 mr-2"
                >
                  Цуцлах
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Хадгалах
                </button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Бүтээгдэхүүн устгах</DialogTitle>
            <DialogDescription>
              Та энэ бүтээгдэхүүнийг устгахдаа итгэлтэй байна уу?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 mr-2"
            >
              Цуцлах
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Устгах
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}