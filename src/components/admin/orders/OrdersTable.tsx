"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  Search,
  Filter,
  Download
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product?: {
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
  };
}

interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode?: string;
  totalAmount: number;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  notes?: string;
}

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        
        // Захиалгуудыг API-аас татах - use direct fetch with auth header
        const token = localStorage.getItem('admin-token') || 'demo-api-key';
        console.log('Using token for orders fetch:', token);
        
        const response = await fetch('/api/orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`Захиалгуудыг татахад алдаа гарлаа: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Orders data received:', data);
        
        // API хариуг Order төрөлд хөрвүүлэх
        const fetchedOrders = data.map((order: any) => ({
          id: order.id,
          customerName: order.customerName,
          email: order.email,
          phone: order.phone,
          address: order.address,
          city: order.city,
          postalCode: order.postalCode,
          totalAmount: order.totalAmount,
          status: order.status || "PENDING",
          paymentStatus: order.paymentStatus || (order.paymentMethod === "cod" ? "PENDING" : "PAID"),
          paymentMethod: order.paymentMethod,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          items: order.items || [],
          notes: order.notes,
        }));
        
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Захиалгуудыг татахад алдаа гарлаа:", error);
        toast({
          title: "Алдаа",
          description: "Захиалгуудыг татахад алдаа гарлаа. Дахин оролдоно уу.",
          variant: "destructive",
        });
        
        // Хоосон массив руу буцаах
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Хайлт болон төлөвийн шүүлтүүр
  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchTerm === "" || 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.phone && order.phone.includes(searchTerm));
      
    const matchesStatus = statusFilter === "" || order.status === statusFilter;
      
    return matchesSearch && matchesStatus;
  });

  // Хуудаслалт
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState<string>("");

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setUpdatedStatus(order.status);
    setIsViewModalOpen(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder || selectedOrder.status === updatedStatus) return;
    
    try {
      // Use direct fetch with auth header
      const token = localStorage.getItem('admin-token') || 'demo-api-key';
      console.log('Using token for status update:', token);
      
      const response = await fetch(`/api/orders/${selectedOrder.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: updatedStatus })
      });
      
      if (!response.ok) {
        throw new Error('Төлөв шинэчлэхэд алдаа гарлаа');
      }
      
      // Захиалгын төлөвийг шинэчлэх
      setOrders(orders.map(order => 
        order.id === selectedOrder.id 
          ? { ...order, status: updatedStatus as any } 
          : order
      ));
      
      setSelectedOrder(prev => prev ? { ...prev, status: updatedStatus as any } : null);
      
      toast({
        title: "Амжилттай",
        description: "Захиалгын төлөв шинэчлэгдлээ",
        variant: "success",
      });
    } catch (error) {
      console.error("Төлөв шинэчлэхэд алдаа гарлаа:", error);
      toast({
        title: "Алдаа",
        description: "Төлөв шинэчлэхэд алдаа гарлаа. Дахин оролдоно уу.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "PROCESSING":
        return "bg-blue-100 text-blue-800";
      case "SHIPPED":
        return "bg-purple-100 text-purple-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "FAILED":
        return "bg-red-100 text-red-800";
      case "REFUNDED":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "Хүргэгдсэн";
      case "PROCESSING":
        return "Боловсруулж буй";
      case "SHIPPED":
        return "Илгээгдсэн";
      case "PENDING":
        return "Хүлээгдэж буй";
      case "CANCELLED":
        return "Цуцлагдсан";
      default:
        return status;
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case "PAID":
        return "Төлөгдсөн";
      case "PENDING":
        return "Хүлээгдэж буй";
      case "FAILED":
        return "Амжилтгүй";
      case "REFUNDED":
        return "Буцаагдсан";
      default:
        return status;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("mn-MN", {
      style: "currency",
      currency: "MNT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Захиалга хайх..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Бүх төлөв</option>
            <option value="PENDING">Хүлээгдэж буй</option>
            <option value="PROCESSING">Боловсруулж буй</option>
            <option value="SHIPPED">Илгээгдсэн</option>
            <option value="DELIVERED">Хүргэгдсэн</option>
            <option value="CANCELLED">Цуцлагдсан</option>
          </select>
          
          <button
            className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 flex items-center gap-1"
          >
            <Download className="w-4 h-4" />
            <span>Экспорт</span>
          </button>
        </div>
      </div>
      
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Захиалгын ID
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Захиалагч
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Огноо
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Нийт дүн
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Төлөв
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Төлбөр
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Үйлдэл
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
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
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-8"></div>
                    </td>
                  </tr>
                ))
              ) : paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    Захиалга олдсонгүй
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        #{order.id.substring(0, 8)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {format(new Date(order.createdAt), "yyyy-MM-dd")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {getPaymentStatusText(order.paymentStatus)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="text-blue-600 hover:text-blue-900"
                        aria-label="Захиалгын дэлгэрэнгүй харах"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Хуудаслалт */}
        {totalPages > 1 && (
          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Нийт {filteredOrders.length} захиалгаас {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredOrders.length)} харуулж байна
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
                aria-label="Өмнөх хуудас"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
                aria-label="Дараагийн хуудас"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </Card>

      {/* Захиалгын дэлгэрэнгүй цонх */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Захиалгын дэлгэрэнгүй</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Захиалгын дугаар</p>
                  <p className="text-lg font-semibold">#{selectedOrder.id.substring(0, 8)}</p>
                </div>
                <div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusText(selectedOrder.status)}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Захиалагч</p>
                  <p className="text-sm font-medium">{selectedOrder.customerName}</p>
                  <p className="text-sm text-gray-500">{selectedOrder.email}</p>
                  {selectedOrder.phone && (
                    <p className="text-sm text-gray-500">{selectedOrder.phone}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Огноо</p>
                  <p className="text-sm">{format(new Date(selectedOrder.createdAt), "yyyy-MM-dd HH:mm")}</p>
                </div>
              </div>
              
              {/* Хүргэлтийн хаяг */}
              {selectedOrder.address && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Хүргэлтийн хаяг</p>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm">{selectedOrder.address}</p>
                    <p className="text-sm">{selectedOrder.city}{selectedOrder.postalCode ? `, ${selectedOrder.postalCode}` : ''}</p>
                    {selectedOrder.notes && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <p className="text-sm font-medium text-gray-500">Нэмэлт тэмдэглэл:</p>
                        <p className="text-sm">{selectedOrder.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Захиалгын бүтээгдэхүүн */}
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Захиалсан бүтээгдэхүүн</p>
                <div className="bg-gray-50 p-3 rounded-md space-y-3">
                  {selectedOrder.items && selectedOrder.items.length > 0 ? (
                    selectedOrder.items.map((item, index) => (
                      <div key={item.id || index} className="flex justify-between items-center pb-2 border-b border-gray-200 last:border-0 last:pb-0">
                        <div>
                          <p className="text-sm font-medium">{item.product?.name || `Бүтээгдэхүүн ${index + 1}`}</p>
                          <p className="text-xs text-gray-500">Тоо ширхэг: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">Бүтээгдэхүүний мэдээлэл олдсонгүй</p>
                  )}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Төлбөрийн мэдээлэл</p>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                  <div>
                    <p className="text-sm font-medium">Нийт дүн</p>
                    <p className="text-sm text-gray-500">Төлбөрийн төлөв</p>
                    {selectedOrder.paymentMethod && (
                      <p className="text-sm text-gray-500 mt-1">Төлбөрийн хэлбэр: {
                        selectedOrder.paymentMethod === "card" ? "Картаар" :
                        selectedOrder.paymentMethod === "bank" ? "Банкаар шилжүүлэх" :
                        selectedOrder.paymentMethod === "cod" ? "Хүргэлтээр төлөх" :
                        selectedOrder.paymentMethod
                      }</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">{formatCurrency(selectedOrder.totalAmount)}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                      {getPaymentStatusText(selectedOrder.paymentStatus)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <select 
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    value={updatedStatus}
                    onChange={(e) => setUpdatedStatus(e.target.value)}
                  >
                    <option value="PENDING">Хүлээгдэж буй</option>
                    <option value="PROCESSING">Боловсруулж буй</option>
                    <option value="SHIPPED">Илгээгдсэн</option>
                    <option value="DELIVERED">Хүргэгдсэн</option>
                    <option value="CANCELLED">Цуцлагдсан</option>
                  </select>
                </div>
                <button
                  onClick={handleUpdateStatus}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  disabled={selectedOrder.status === updatedStatus}
                >
                  Төлөв шинэчлэх
                </button>
              </div>
            </div>
          )}
          <DialogFooter>
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Хаах
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}