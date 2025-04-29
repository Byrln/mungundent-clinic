"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  ShoppingCart, 
  Star, 
  Check, 
  Info, 
  Shield, 
  Truck, 
  Package, 
  Minus, 
  Plus,
  Send
} from "lucide-react";
import ProductImageGallery from "@/components/shop/ProductImageGallery";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Product image type
type ProductImage = {
  id?: string;
  url: string;
  alt?: string;
  order?: number;
};

// Product type
type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  images?: ProductImage[];
  price: number;
  category: string;
  inStock: boolean;
  stockQuantity?: number;
  details?: string;
  usage?: string;
  ingredients?: string;
  rating?: number;
  reviews?: {
    author: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  relatedProducts?: string[];
};

// Sample products data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Японы шүдний оо - Apagard",
    description: "Нано-гидроксиапатит агуулсан өндөр чанартай шүдний оо. Шүдний эмаль сэргээх, цайруулах үйлчилгээтэй.",
    imageUrl: "https://images.unsplash.com/photo-1612538498456-e861df91d4d0?q=80&w=1974&auto=format&fit=crop",
    price: 35000,
    category: "Шүдний оо",
    inStock: true,
    details: "Apagard шүдний оо нь Японд үйлдвэрлэгдсэн, нано-гидроксиапатит агуулсан өндөр чанартай бүтээгдэхүүн юм. Энэ нь шүдний эмалийг сэргээх, цайруулах, мэдрэг байдлыг бууруулах үйлчилгээтэй.",
    usage: "Өдөрт 2-3 удаа шүдээ угаахдаа жижиг хэмжээний шүдний оог сойзондоо түрхэж, 2-3 минутын турш шүдээ угаана. Дараа нь амаа зайлна.",
    ingredients: "Нано-гидроксиапатит, фтор, кальци, фосфат, глицерин, усны уусмал.",
    rating: 4.8,
    reviews: [
      {
        author: "Б. Болормаа",
        rating: 5,
        comment: "Маш сайн бүтээгдэхүүн. Шүдний мэдрэг байдал арилж, цайруулах үйлчилгээ нь үнэхээр үр дүнтэй.",
        date: "2023-12-15",
      },
      {
        author: "Д. Батбаяр",
        rating: 4,
        comment: "Сайн чанартай шүдний оо. Үнэ нь бага зэрэг өндөр ч үр дүн нь таатай.",
        date: "2023-11-20",
      },
    ],
    relatedProducts: ["2", "4", "5"],
  },
  {
    id: "2",
    name: "Японы шүдний сойз - GUM",
    description: "Зөөлөн хялгас бүхий шүдний сойз. Буйлыг гэмтээхгүйгээр шүдийг цэвэрлэнэ.",
    imageUrl: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=1980&auto=format&fit=crop",
    price: 12000,
    category: "Шүдний сойз",
    inStock: true,
    details: "GUM шүдний сойз нь Японд үйлдвэрлэгдсэн, зөөлөн хялгас бүхий шүдний сойз юм. Энэ нь буйлыг гэмтээхгүйгээр шүдийг үр дүнтэй цэвэрлэх боломжтой.",
    usage: "Өдөрт 2-3 удаа шүдээ угаахдаа ашиглана. 3 сар тутамд шүдний сойзоо солих шаардлагатай.",
    ingredients: "Зөөлөн хялгас, эргономик бариул.",
    rating: 4.5,
    reviews: [
      {
        author: "Г. Оюунчимэг",
        rating: 5,
        comment: "Маш зөөлөн, буйлыг огт гэмтээдэггүй. Шүдийг сайн цэвэрлэдэг.",
        date: "2023-10-05",
      },
    ],
    relatedProducts: ["1", "3", "7"],
  },
  {
    id: "3",
    name: "Шүдний утас - Oral-B",
    description: "Шүдний завсрыг цэвэрлэх өндөр чанартай шүдний утас.",
    imageUrl: "https://images.unsplash.com/photo-1559304822-9eb2813c9844?q=80&w=2036&auto=format&fit=crop",
    price: 8000,
    category: "Шүдний утас",
    inStock: true,
    details: "Oral-B шүдний утас нь шүдний завсрыг үр дүнтэй цэвэрлэх, хоол хүнсний үлдэгдлийг арилгах боломжтой.",
    usage: "Өдөрт 1 удаа шүдний завсрыг цэвэрлэхэд ашиглана.",
    ingredients: "Полиэстер утас, фтортой бүрхүүл.",
    rating: 4.7,
    reviews: [
      {
        author: "Н. Наранцэцэг",
        rating: 5,
        comment: "Шүдний завсрыг маш сайн цэвэрлэдэг. Тасардаггүй, бат бөх утас.",
        date: "2023-09-18",
      },
    ],
    relatedProducts: ["1", "2", "5"],
  },
  {
    id: "4",
    name: "Хүүхдийн шүдний оо - Kodomo",
    description: "Хүүхдэд зориулсан амттай, фтортой шүдний оо.",
    imageUrl: "https://images.unsplash.com/photo-1628359355624-855775b5c9c4?q=80&w=2070&auto=format&fit=crop",
    price: 9500,
    category: "Шүдний оо",
    inStock: true,
    details: "Kodomo хүүхдийн шүдний оо нь хүүхдэд зориулсан амттай, фтортой шүдний оо юм. Энэ нь хүүхдийн шүдийг цооролтоос хамгаалах, эрүүл байлгахад тусална.",
    usage: "Өдөрт 2 удаа шүдээ угаахдаа жижиг хэмжээний шүдний оог сойзондоо түрхэж, 2 минутын турш шүдээ угаана. Дараа нь амаа зайлна.",
    ingredients: "Фтор, кальци, фосфат, глицерин, усны уусмал, байгалийн амтлагч.",
    rating: 4.6,
    reviews: [
      {
        author: "Б. Ариунаа",
        rating: 5,
        comment: "Хүүхэд маань дуртай, өдөр бүр шүдээ угаахыг хүсдэг болсон.",
        date: "2023-08-10",
      },
    ],
    relatedProducts: ["1", "7", "8"],
  },
  {
    id: "5",
    name: "Шүдний ариутгагч шингэн - Listerine",
    description: "Шүдний завсар, буйлыг цэвэрлэх, амны үнэр арилгах шингэн.",
    imageUrl: "https://images.unsplash.com/photo-1621951753015-740c699ab970?q=80&w=2080&auto=format&fit=crop",
    price: 18000,
    category: "Ариутгагч",
    inStock: true,
    details: "Listerine шүдний ариутгагч шингэн нь шүдний завсар, буйлыг цэвэрлэх, амны үнэр арилгах, бактерийг устгах үйлчилгээтэй.",
    usage: "Өдөрт 2 удаа шүдээ угаасны дараа 20 мл шингэнийг амандаа хийж, 30 секундын турш зайлна. Дараа нь шүлсээ хаяна.",
    ingredients: "Эфирийн тос, ментол, эвкалипт, тимол, метил салицилат, усны уусмал.",
    rating: 4.5,
    reviews: [
      {
        author: "Д. Дэлгэрмаа",
        rating: 4,
        comment: "Амны үнэр арилгах, цэвэрлэх үйлчилгээ нь сайн. Амт нь бага зэрэг хурц.",
        date: "2023-07-22",
      },
    ],
    relatedProducts: ["1", "3", "6"],
  },
  {
    id: "6",
    name: "Шүдний цайруулагч - Crest",
    description: "Шүдийг цайруулах, толбо арилгах гель.",
    imageUrl: "https://images.unsplash.com/photo-1570612861542-284f4c12e75f?q=80&w=2070&auto=format&fit=crop",
    price: 45000,
    category: "Цайруулагч",
    inStock: false,
    details: "Crest шүдний цайруулагч нь шүдийг цайруулах, толбо арилгах, гэрэлтүүлэх үйлчилгээтэй гель юм.",
    usage: "Өдөрт 1 удаа шүдээ угаасны дараа гелийг шүдний хэвд хийж, 30 минутын турш зүүнэ. 14 хоногийн турш өдөр бүр ашиглана.",
    ingredients: "Устөрөгчийн хэт исэл, глицерин, карбомер, натрийн гидроксид, усны уусмал.",
    rating: 4.9,
    reviews: [
      {
        author: "Б. Баярмаа",
        rating: 5,
        comment: "Үр дүн нь гайхалтай. 7 хоногийн дараа шүд маань мэдэгдэхүйц цайрсан.",
        date: "2023-06-15",
      },
    ],
    relatedProducts: ["1", "5", "8"],
  },
  {
    id: "7",
    name: "Хүүхдийн шүдний сойз - Jordan",
    description: "Хүүхдийн гарт тохирсон, зөөлөн хялгастай шүдний сойз.",
    imageUrl: "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?q=80&w=1974&auto=format&fit=crop",
    price: 7500,
    category: "Шүдний сойз",
    inStock: true,
    details: "Jordan хүүхдийн шүдний сойз нь хүүхдийн гарт тохирсон, зөөлөн хялгастай, өнгө ялгаатай шүдний сойз юм.",
    usage: "Өдөрт 2 удаа шүдээ угаахдаа ашиглана. 3 сар тутамд шүдний сойзоо солих шаардлагатай.",
    ingredients: "Зөөлөн хялгас, эргономик бариул, хүүхдэд ээлтэй материал.",
    rating: 4.7,
    reviews: [
      {
        author: "Г. Гэрэлмаа",
        rating: 5,
        comment: "Хүүхэд маань дуртай, өнгө нь таалагддаг. Зөөлөн, буйлыг гэмтээдэггүй.",
        date: "2023-05-20",
      },
    ],
    relatedProducts: ["2", "4", "8"],
  },
  {
    id: "8",
    name: "Шүдний эмийн хайрцаг",
    description: "Шүдний брекет, хиймэл шүд хадгалах жижиг хайрцаг.",
    imageUrl: "https://images.unsplash.com/photo-1586769852044-692d6e3703f2?q=80&w=1974&auto=format&fit=crop",
    price: 15000,
    category: "Бусад",
    inStock: true,
    details: "Шүдний эмийн хайрцаг нь шүдний брекет, хиймэл шүд, шүдний хэв зэргийг хадгалах зориулалттай жижиг хайрцаг юм.",
    usage: "Шүдний брекет, хиймэл шүд, шүдний хэв зэргийг хадгалахад ашиглана.",
    ingredients: "Хатуу пластик, агааржуулалттай, ус нэвтэрдэггүй.",
    rating: 4.4,
    reviews: [
      {
        author: "Д. Дөлгөөн",
        rating: 4,
        comment: "Чанартай, бат бөх хайрцаг. Шүдний брекетээ хадгалахад тохиромжтой.",
        date: "2023-04-10",
      },
    ],
    relatedProducts: ["4", "6", "7"],
  },
];

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  // Review display state
  const [visibleReviews, setVisibleReviews] = useState(4);
  
  // Review form state
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Fetch product data from API
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const productId = params.id as string;
        
        // Fetch product from API
        const productData = await fetch(`/api/products/${productId}`).then(res => {
          if (!res.ok) throw new Error('Product not found');
          return res.json();
        });
        
        // Add category field if not present (in a real app, this would be in the database)
        let category = "Бусад";
        if (productData.name?.includes("оо")) {
          category = "Шүдний оо";
        } else if (productData.name?.includes("сойз")) {
          category = "Шүдний сойз";
        } else if (productData.name?.includes("утас")) {
          category = "Шүдний утас";
        } else if (productData.name?.includes("ариутгагч") || productData.name?.includes("шингэн")) {
          category = "Ариутгагч";
        } else if (productData.name?.includes("цайруулагч")) {
          category = "Цайруулагч";
        }
        
        // Use placeholder image if no imageUrl is provided
        const imageUrl = productData.imageUrl || `https://images.unsplash.com/photo-${1612538498456 + parseInt(productData.id)}?q=80&w=1974&auto=format&fit=crop`;
        
        // Create enhanced product object
        const enhancedProduct = {
          ...productData,
          category,
          imageUrl,
          // Add sample details if not present in the database
          details: productData.details || productData.description,
          usage: productData.usage || "Өдөрт 2 удаа шүдээ угаахдаа ашиглана.",
          ingredients: productData.ingredients || "Байгалийн гаралтай бүрэлдэхүүн хэсгүүд.",
          rating: productData.rating || 4.5,
          reviews: productData.reviews || [
            {
              author: "Үйлчлүүлэгч",
              rating: 5,
              comment: "Сайн чанартай бүтээгдэхүүн.",
              date: new Date().toISOString().split('T')[0],
            }
          ]
        };
        
        setProduct(enhancedProduct);
        
        // Fetch related products (for now, just get 3 random products)
        const allProducts = await fetch('/api/products').then(res => res.json());
        const filteredProducts = allProducts.filter((p: any) => p.id !== productId);
        const randomProducts = filteredProducts
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map((p: any) => ({
            ...p,
            category: p.category || category,
            imageUrl: p.imageUrl || `https://images.unsplash.com/photo-${1612538498456 + parseInt(p.id)}?q=80&w=1974&auto=format&fit=crop`
          }));
        
        setRelatedProducts(randomProducts);
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("mn-MN", {
      style: "currency",
      currency: "MNT",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Handle quantity change
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  // Handle review submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to submit review
    setTimeout(() => {
      if (product) {
        const newReview = {
          author: reviewName,
          rating: reviewRating,
          comment: reviewComment,
          date: new Date().toISOString().split('T')[0],
        };
        
        // Update product with new review
        const updatedProduct = {
          ...product,
          reviews: [...(product.reviews || []), newReview],
        };
        
        setProduct(updatedProduct);
        
        // Reset form
        setReviewName("");
        setReviewRating(5);
        setReviewComment("");
        setSubmitSuccess(true);
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 3000);
      }
      
      setIsSubmitting(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="pt-32 pb-16 md:pt-40 md:pb-24 min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-dental-200 mb-4"></div>
          <div className="h-4 w-32 bg-dental-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-16 md:pt-40 md:pb-24 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Бүтээгдэхүүн олдсонгүй</h1>
          <p className="text-gray-600 mb-8">Таны хайсан бүтээгдэхүүн олдсонгүй.</p>
          <Button asChild variant="outline">
            <Link href="/shop">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Бүтээгдэхүүний жагсаалт руу буцах
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-500 hover:text-dental-600"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Буцах
            </Button>
          </div>

          {/* Product Details */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="grid md:grid-cols-2 gap-12"
          >
            {/* Product Image Gallery */}
            <div className="relative">
              <ProductImageGallery 
                images={product.images || []}
                mainImage={product.imageUrl}
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Дууссан
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold mb-2 text-dental-800">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < Math.round(product.rating || 0) 
                        ? "fill-yellow-400 text-yellow-400" 
                        : "text-gray-300"} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.reviews?.length || 0} сэтгэгдэл
                </span>
              </div>
              
              <p className="text-xl font-semibold mb-4 text-dental-800">
                {formatPrice(product.price)}
              </p>
              
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <div className="flex items-center mb-6">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  product.inStock 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {product.inStock ? "Бэлэн" : "Дууссан"}
                </span>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-sm text-gray-500">Ангилал: {product.category}</span>
              </div>
              
              {product.inStock && (
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <span className="mr-4">Тоо хэмжээ:</span>
                    <div className="flex items-center border rounded-md">
                      <button 
                        className="px-3 py-1 border-r"
                        onClick={decreaseQuantity}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-1">{quantity}</span>
                      <button 
                        className="px-3 py-1 border-l"
                        onClick={increaseQuantity}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      className="w-full bg-dental-500 hover:bg-dental-600"
                      onClick={() => {
                        if (product) {
                          addToCart({
                            id: product.id,
                            name: product.name,
                            imageUrl: product.imageUrl,
                            price: product.price
                          });
                          setAddedToCart(true);
                          setTimeout(() => setAddedToCart(false), 2000);
                        }
                      }}
                    >
                      {addedToCart ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Нэмэгдлээ
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Сагсанд нэмэх
                        </>
                      )}
                    </Button>
                    <Button 
                      className="w-full bg-dental-700 hover:bg-dental-800"
                      onClick={() => {
                        if (product) {
                          addToCart({
                            id: product.id,
                            name: product.name,
                            imageUrl: product.imageUrl,
                            price: product.price
                          });
                          router.push('/checkout');
                        }
                      }}
                    >
                      Худалдаж авах
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <Truck className="h-5 w-5 text-dental-500 mr-2 mt-0.5" />
                  <span>Хүргэлт: 2-3 ажлын өдөр (Улаанбаатар хот)</span>
                </div>
                <div className="flex items-start">
                  <Package className="h-5 w-5 text-dental-500 mr-2 mt-0.5" />
                  <span>Буцаалт: Худалдан авснаас хойш 7 хоногийн дотор</span>
                </div>
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-dental-500 mr-2 mt-0.5" />
                  <span>Баталгаат хугацаа: 1 жил</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid grid-cols-3 md:w-[400px]">
                <TabsTrigger value="details">Дэлгэрэнгүй</TabsTrigger>
                <TabsTrigger value="usage">Хэрэглэх заавар</TabsTrigger>
                <TabsTrigger value="reviews">Сэтгэгдэл</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-6">
                <div className="bg-dental-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-dental-800">Бүтээгдэхүүний дэлгэрэнгүй</h3>
                  <p className="text-gray-600 mb-4">{product.details}</p>
                  
                  <h4 className="font-medium mb-2 text-dental-700">Найрлага:</h4>
                  <p className="text-gray-600">{product.ingredients}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="usage" className="mt-6">
                <div className="bg-dental-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-dental-800">Хэрэглэх заавар</h3>
                  <p className="text-gray-600">{product.usage}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <div className="bg-dental-50 p-6 rounded-lg">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Reviews List */}
                    <div className="w-full md:w-1/2">
                      <h3 className="text-lg font-semibold mb-4 text-dental-800">Хэрэглэгчдийн сэтгэгдэл</h3>
                      
                      {/* Reviews Summary */}
                      <div className="mb-6 bg-white p-4 rounded-md shadow-sm">
                        <div className="flex items-center mb-2">
                          <div className="text-3xl font-bold text-dental-800 mr-3">
                            {product.rating ? product.rating.toFixed(1) : "0.0"}
                          </div>
                          <div>
                            <div className="flex items-center mb-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={16} 
                                  className={i < Math.round(product.rating || 0) 
                                    ? "fill-yellow-400 text-yellow-400" 
                                    : "text-gray-300"} 
                                />
                              ))}
                            </div>
                            <div className="text-sm text-gray-500">
                              {product.reviews?.length || 0} сэтгэгдэл
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Reviews List */}
                      {product.reviews && product.reviews.length > 0 ? (
                        <div className="space-y-4">
                          {product.reviews.slice(0, visibleReviews).map((review, index) => (
                            <div key={index} className="bg-white p-4 rounded-md shadow-sm">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="font-medium">{review.author}</h4>
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star 
                                        key={i} 
                                        size={14} 
                                        className={i < review.rating 
                                          ? "fill-yellow-400 text-yellow-400" 
                                          : "text-gray-300"} 
                                      />
                                    ))}
                                  </div>
                                </div>
                                <span className="text-xs text-gray-500">{review.date}</span>
                              </div>
                              <p className="text-gray-600">{review.comment}</p>
                            </div>
                          ))}
                          
                          {/* See More Button */}
                          {product.reviews.length > visibleReviews && (
                            <div className="text-center mt-4">
                              <Button 
                                variant="outline" 
                                onClick={() => setVisibleReviews(prev => prev + 4)}
                                className="text-dental-600 hover:text-dental-700"
                              >
                                Бусад сэтгэгдэл харах
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="bg-white p-4 rounded-md shadow-sm text-center">
                          <p className="text-gray-500">Одоогоор сэтгэгдэл алга байна.</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Review Form */}
                    <div className="w-full md:w-1/2">
                      <div className="bg-white p-6 rounded-md shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 text-dental-800">Сэтгэгдэл үлдээх</h3>
                        
                        {submitSuccess ? (
                          <div className="bg-green-50 text-green-700 p-4 rounded-md mb-4 flex items-center">
                            <Check className="h-5 w-5 mr-2" />
                            <span>Таны сэтгэгдэл амжилттай нэмэгдлээ. Баярлалаа!</span>
                          </div>
                        ) : (
                          <form onSubmit={handleReviewSubmit} className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Нэр</Label>
                              <Input 
                                id="name" 
                                value={reviewName} 
                                onChange={(e) => setReviewName(e.target.value)} 
                                placeholder="Таны нэр" 
                                required 
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="rating">Үнэлгээ</Label>
                              <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <button
                                    key={rating}
                                    type="button"
                                    onClick={() => setReviewRating(rating)}
                                    className="focus:outline-none"
                                  >
                                    <Star 
                                      size={24} 
                                      className={rating <= reviewRating 
                                        ? "fill-yellow-400 text-yellow-400" 
                                        : "text-gray-300 hover:text-yellow-200"} 
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="comment">Сэтгэгдэл</Label>
                              <Textarea 
                                id="comment" 
                                value={reviewComment} 
                                onChange={(e) => setReviewComment(e.target.value)} 
                                placeholder="Таны сэтгэгдэл" 
                                rows={4} 
                                required 
                              />
                            </div>
                            
                            <Button 
                              type="submit" 
                              className="w-full" 
                              disabled={isSubmitting || !reviewName || !reviewComment}
                            >
                              {isSubmitting ? (
                                <div className="flex items-center">
                                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                  <span>Илгээж байна...</span>
                                </div>
                              ) : (
                                <div className="flex items-center justify-center">
                                  <Send className="h-4 w-4 mr-2" />
                                  <span>Сэтгэгдэл илгээх</span>
                                </div>
                              )}
                            </Button>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6 text-dental-800">Төстэй бүтээгдэхүүнүүд</h2>
              
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Card key={relatedProduct.id} className="h-full hover:shadow-md transition-shadow overflow-hidden">
                    <div className="relative h-48 w-full">
                      <Image
                        src={relatedProduct.imageUrl}
                        alt={relatedProduct.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-cover"
                      />
                      {!relatedProduct.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Дууссан
                          </span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-1">{relatedProduct.name}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{relatedProduct.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-dental-800">{formatPrice(relatedProduct.price)}</span>
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/shop/${relatedProduct.id}`}>
                            Дэлгэрэнгүй
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}