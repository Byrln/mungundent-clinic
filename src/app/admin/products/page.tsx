"use client";

import { useState } from "react";
import ProductsTable from "@/components/admin/products/ProductsTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [uploadedImages, setUploadedImages] = useState<{url: string, alt?: string}[]>([]);
  const router = useRouter();

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Get form values
      const name = formData.get("name") as string;
      const description = formData.get("description") as string;
      const priceStr = formData.get("price") as string;
      const imageUrl = formData.get("imageUrl") as string;
      const inStock = formData.get("inStock") === "true";
      const stockQuantity = formData.get("stockQuantity") as string;
      const category = formData.get("category") as string;
      const usage = formData.get("usage") as string;
      const ingredients = formData.get("ingredients") as string;
      
      // Validate form values
      if (!name || !description || !priceStr) {
        alert("Please fill in all required fields: name, description, and price.");
        setIsSubmitting(false);
        return;
      }
      
      // Parse price and validate it's a number
      const price = parseFloat(priceStr);
      if (isNaN(price)) {
        alert("Барааны үнийг оруулна уу!");
        setIsSubmitting(false);
        return;
      }
      
      // Parse stock quantity
      let stockQty = undefined;
      if (stockQuantity) {
        stockQty = parseInt(stockQuantity);
        if (isNaN(stockQty) || stockQty < 0) {
          alert("Үлдэгдэлийн тоо эерэг тоо байх ёстой!");
          setIsSubmitting(false);
          return;
        }
      }
      
      // Create product data object
      const productData = {
        name,
        description,
        price,
        imageUrl: imageUrl || (uploadedImages.length > 0 ? uploadedImages[0].url : undefined),
        inStock,
        stockQuantity: stockQty,
        category: category || undefined,
        usage: usage || undefined,
        ingredients: ingredients || undefined,
        images: uploadedImages.map((img, index) => ({
          url: img.url,
          alt: img.alt || name,
          order: index
        }))
      };
      
      console.log("барааны датаг явуулж байна:", productData);

      // Send request to the simplified API endpoint with authorization header
      const response = await fetch('/api/products/simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mongondent-secure-api-key-2024', // Add the API key from .env
        },
        body: JSON.stringify(productData),
      });

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error status:", response.status);
        console.error("Server error response:", errorText);
        
        // Try to parse the error as JSON if possible
        let errorDetail = `Status code: ${response.status}`;
        try {
          const errorJson = JSON.parse(errorText);
          if (errorJson.error) {
            errorDetail = errorJson.error;
            if (errorJson.details) {
              errorDetail += `: ${errorJson.details}`;
            }
          }
        } catch (e) {
          // If parsing fails, use the raw text
          if (errorText) {
            errorDetail = errorText;
          }
        }
        
        throw new Error(`Failed to create product: ${errorDetail}`);
      }
      
      // Parse successful response
      const result = await response.json();

      // Success - close the modal and refresh the page
      setIsAddModalOpen(false);
      router.refresh();
    } catch (error: any) {
      console.error("Error creating product:", error);
      alert(`Failed to create product: ${error.message || "Unknown error occurred"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Бүтээгдэхүүн</h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Шинэ бүтээгдэхүүн нэмэх
        </button>
      </div>
      
      <ProductsTable />

      {/* Add Product Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Шинэ бүтээгдэхүүн нэмэх</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Бүтээгдэхүүний нэр
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium text-gray-700">
                Ангилал
              </label>
              <select
                id="category"
                name="category"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Ангилал сонгох</option>
                <option value="Шүдний оо">Шүдний оо</option>
                <option value="Шүдний сойз">Шүдний сойз</option>
                <option value="Шүдний утас">Шүдний утас</option>
                <option value="Ариутгагч">Ариутгагч</option>
                <option value="Цайруулагч">Цайруулагч</option>
                <option value="Бусад">Бусад</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-gray-700">
                Тайлбар
              </label>
              <textarea
                id="description"
                name="description"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="inStock" className="text-sm font-medium text-gray-700">
                  Нөөцөд байгаа эсэх
                </label>
                <select
                  id="inStock"
                  name="inStock"
                  defaultValue="true"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="true">Тийм</option>
                  <option value="false">Үгүй</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="stockQuantity" className="text-sm font-medium text-gray-700">
                Нөөцийн тоо хэмжээ
              </label>
              <input
                id="stockQuantity"
                name="stockQuantity"
                type="number"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Хэрэв мэдэгдэхгүй бол хоосон үлдээнэ"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="usage" className="text-sm font-medium text-gray-700">
                Хэрэглэх заавар
              </label>
              <textarea
                id="usage"
                name="usage"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={2}
                placeholder="Бүтээгдэхүүнийг хэрхэн хэрэглэх талаар"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="ingredients" className="text-sm font-medium text-gray-700">
                Найрлага
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={2}
                placeholder="Бүтээгдэхүүний найрлага, бүрэлдэхүүн хэсгүүд"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="imageUrl" className="text-sm font-medium text-gray-700 block mb-2">
                  Үндсэн зураг
                </label>
                <div className="flex flex-col space-y-2">
                  {uploadedImageUrl && (
                    <div className="mb-2">
                      <img 
                        src={uploadedImageUrl} 
                        alt="Product preview" 
                        className="w-32 h-32 object-cover rounded border border-gray-300"
                      />
                    </div>
                  )}
                  <input
                    id="imageUrl"
                    name="imageUrl"
                    type="text"
                    value={uploadedImageUrl}
                    onChange={(e) => setUploadedImageUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="https://example.com/image.jpg"
                  />
                  <div className="mt-2">
                    <label htmlFor="imageUpload" className="text-sm font-medium text-gray-700 block mb-1">
                      Зураг оруулах
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
                          setUploadedImageUrl(data.url);
                          
                          // Also add to the images array if not already there
                          if (!uploadedImages.some(img => img.url === data.url)) {
                            setUploadedImages([...uploadedImages, { url: data.url }]);
                          }
                        } catch (error) {
                          console.error("Зураг оруулхад алдаа гарлаа! :", error);
                          alert("Алдаа гарлаа, Дахиад оролдоно уу.");
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Нэмэлт зургууд
                </label>
                
                {/* Display uploaded images */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={image.url} 
                        alt={image.alt || `Product image ${index + 1}`}
                        className="w-full h-24 object-cover rounded border border-gray-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => {
                            const newImages = [...uploadedImages];
                            newImages.splice(index, 1);
                            setUploadedImages(newImages);
                          }}
                          className="p-1 bg-red-500 text-white rounded-full"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Upload multiple images */}
                <div className="mt-2">
                  <label htmlFor="multipleImageUpload" className="text-sm font-medium text-gray-700 block mb-1">
                    Зургууд нэмэх
                  </label>
                  <input
                    id="multipleImageUpload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    onChange={async (e) => {
                      const files = e.target.files;
                      if (!files || files.length === 0) return;
                      
                      // Process each file
                      for (let i = 0; i < files.length; i++) {
                        const file = files[i];
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
                          
                          // Add to the images array if not already there
                          if (!uploadedImages.some(img => img.url === data.url)) {
                            setUploadedImages(prev => [...prev, { url: data.url }]);
                          }
                          
                          // If this is the first image and no main image is set, set it as the main image
                          if (i === 0 && !uploadedImageUrl) {
                            setUploadedImageUrl(data.url);
                          }
                        } catch (error) {
                          console.error("Error uploading image:", error);
                          alert(`Failed to upload image ${file.name}. Please try again.`);
                        }
                      }
                    }}
                  />
                </div>
                
                {/* Image reordering instructions */}
                {uploadedImages.length > 1 && (
                  <p className="text-xs text-gray-500 mt-2">
                    * Зургуудын дараалал нь дээрээс доош, зүүнээс баруун тийш байрлана. Дарааллыг өөрчлөхийн тулд зургийг устгаад дахин оруулна уу.
                  </p>
                )}
              </div>
            </div>
            
            <DialogFooter>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 mr-2"
                disabled={isSubmitting}
              >
                Цуцлах
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Хадгалж байна..." : "Хадгалах"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}