"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ShoppingCart, Filter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProductsAPI } from "@/lib/api";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Product type
type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
  inStock: boolean;
};

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Use the ProductsAPI to fetch all products
        const data = await ProductsAPI.getAll();
        
        if (!data || data.length === 0) {
          console.log('No products found in database');
        } else {
          console.log(`Found ${data.length} products in database`);
        }
        
        // Add category field to products (in a real app, this would be in the database)
        const productsWithCategories = data.map((product: Product) => {
          // Assign categories based on product name for demo purposes
          let category = "Бусад";
          
          if (product.name?.includes("оо")) {
            category = "Шүдний оо";
          } else if (product.name?.includes("сойз")) {
            category = "Шүдний сойз";
          } else if (product.name?.includes("утас")) {
            category = "Шүдний утас";
          } else if (product.name?.includes("ариутгагч") || product.name?.includes("шингэн")) {
            category = "Ариутгагч";
          } else if (product.name?.includes("цайруулагч")) {
            category = "Цайруулагч";
          }
          
          return {
            ...product,
            category,
            // Use placeholder images if no imageUrl is provided
            imageUrl: product.imageUrl || `https://images.unsplash.com/photo-${1612538498456 + parseInt(product.id)}?q=80&w=1974&auto=format&fit=crop`
          };
        });
        
        setProducts(productsWithCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Show error in console but don't use fallback data
        // This will help us diagnose the issue
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = Array.from(new Set(products.map((product) => product.category)));

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("mn-MN", {
      style: "currency",
      currency: "MNT",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="pt-32 pb-16 md:pt-40 md:pb-24 bg-dental-50"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-dental-800">
              Шүдний эрүүл мэндийн бүтээгдэхүүн
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Мөнгөндент эмнэлэг нь Япон, Солонгос, Америкийн өндөр чанартай шүдний эрүүл мэндийн бүтээгдэхүүнүүдийг санал болгож байна.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Shop Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Бүтээгдэхүүн хайх..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="md:w-48">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-between"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <div className="flex items-center">
                    <Filter size={18} className="mr-2" />
                    <span>Ангилал</span>
                  </div>
                  <ChevronDown size={18} className={`transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
                </Button>
                {isFilterOpen && (
                  <div className="absolute z-10 mt-2 w-48 bg-white border rounded-md shadow-lg">
                    <div className="p-2">
                      <div
                        className={`px-3 py-2 rounded-md cursor-pointer ${
                          selectedCategory === null ? "bg-dental-50 text-dental-600" : "hover:bg-gray-100"
                        }`}
                        onClick={() => setSelectedCategory(null)}
                      >
                        Бүгд
                      </div>
                      {categories.map((category) => (
                        <div
                          key={category}
                          className={`px-3 py-2 rounded-md cursor-pointer ${
                            selectedCategory === category ? "bg-dental-50 text-dental-600" : "hover:bg-gray-100"
                          }`}
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {selectedCategory && (
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Ангилал:</span>
                <div className="bg-dental-50 text-dental-600 text-sm px-3 py-1 rounded-full flex items-center">
                  {selectedCategory}
                  <button
                    className="ml-2 text-dental-600 hover:text-dental-800"
                    onClick={() => setSelectedCategory(null)}
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Products Grid */}
          <div ref={productsRef}>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {filteredProducts.map((product) => (
                  <motion.div key={product.id} variants={fadeIn}>
                    <Card className="h-full flex flex-col hover:shadow-md transition-shadow overflow-hidden">
                      <div className="relative h-48 w-full">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Дууссан
                            </span>
                          </div>
                        )}
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                        </div>
                        <CardDescription className="text-xs">{product.category}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2 flex-grow">
                        <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center pt-2">
                        <span className="font-semibold text-dental-800">{formatPrice(product.price)}</span>
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="text-dental-600 border-dental-200 hover:bg-dental-50 hover:text-dental-700 hover:border-dental-300"
                          disabled={!product.inStock}
                        >
                          <Link href={`/shop/${product.id}`}>
                            <ShoppingCart size={16} className="mr-1" />
                            Дэлгэрэнгүй
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4 text-dental-800">Бүтээгдэхүүн олдсонгүй</h2>
                <p className="text-gray-600 mb-8">Одоогоор бүтээгдэхүүн бүртгэгдээгүй байна. Та удахгүй дахин зочилно уу.</p>
                <div className="flex justify-center">
                  <Button asChild className="bg-dental-500 hover:bg-dental-600">
                    <Link href="/booking">
                      Цаг захиалах
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 md:py-24 bg-dental-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4 text-dental-800">Бүтээгдэхүүн захиалах</h2>
              <p className="text-gray-600 mb-6">
                Бүтээгдэхүүнийг эмнэлэг дээр ирж авах эсвэл утсаар захиалах боломжтой. Дэлгэрэнгүй мэдээлэл авахыг хүсвэл бидэнтэй холбогдоорой.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-dental-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Утсаар захиалах</h3>
                  <p className="text-gray-600 mb-2">Утас: +976 99112233</p>
                  <p className="text-gray-600">Ажлын цаг: 9:00 - 18:00</p>
                </div>
                <div className="bg-dental-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Эмнэлэг дээр авах</h3>
                  <p className="text-gray-600 mb-2">Хаяг: Улаанбаатар хот, Сүхбаатар дүүрэг</p>
                  <p className="text-gray-600">Ажлын өдрүүд: Даваа - Бямба</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-dental-500 to-lavender-500 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Шүдний эрүүл мэндээ хамгаалъя</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Шүдний эрүүл мэндийн талаар зөвлөгөө авах, бүтээгдэхүүний талаар дэлгэрэнгүй мэдээлэл авахыг хүсвэл бидэнтэй холбогдоорой.
          </p>
          <Button asChild size="lg" className="bg-white text-dental-600 hover:bg-gray-100">
            <Link href="/contact">Холбоо барих</Link>
          </Button>
        </div>
      </section>
    </>
  );
}