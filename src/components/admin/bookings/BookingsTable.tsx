"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  Eye
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

interface Booking {
  id: string;
  name: string;
  phone: string;
  serviceType: string;
  date: string;
  time: string;
  message?: string;
}

export default function BookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // In a real application, you would fetch this data from your API
        // For now, we'll use mock data
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockBookings = Array.from({ length: 25 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() + i % 14); // Spread over 2 weeks
          
          return {
            id: `booking-${i + 1}`,
            name: `Patient ${i + 1}`,
            phone: `+1 (555) ${100 + i}-${1000 + i}`,
            serviceType: i % 5 === 0 ? "Dental Checkup" : 
                         i % 5 === 1 ? "Teeth Cleaning" : 
                         i % 5 === 2 ? "Root Canal" : 
                         i % 5 === 3 ? "Teeth Whitening" : "Dental Implant",
            date: date.toISOString(),
            time: `${9 + (i % 8)}:${i % 2 === 0 ? '00' : '30'} ${i % 8 < 3 ? 'AM' : 'PM'}`,
            message: i % 3 === 0 ? "Please call me to confirm the appointment" : undefined,
          };
        });
        
        setBookings(mockBookings);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Filter bookings based on search term and selected date
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = searchTerm === "" || 
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone.includes(searchTerm);
      
    const matchesDate = selectedDate === null || 
      format(new Date(booking.date), "YYYY-MM-DD") === selectedDate;
      
    return matchesSearch && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleView = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsViewModalOpen(true);
  };

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsEditModalOpen(true);
  };

  const handleDelete = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedBooking) {
      // In a real application, you would call an API to delete the booking
      // For demo purposes, we'll just remove it from the local state
      setBookings(bookings.filter(b => b.id !== selectedBooking.id));
      setIsDeleteModalOpen(false);
      setSelectedBooking(null);
    }
  };

  const saveBooking = (updatedBooking: Booking) => {
    // In a real application, you would call an API to update the booking
    // For demo purposes, we'll just update the local state
    setBookings(bookings.map(b => 
      b.id === updatedBooking.id ? updatedBooking : b
    ));
    setIsEditModalOpen(false);
    setSelectedBooking(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="date"
              value={selectedDate || ""}
              onChange={(e) => setSelectedDate(e.target.value || null)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {selectedDate && (
            <button
              onClick={() => setSelectedDate(null)}
              className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
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
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </td>
                  </tr>
                ))
              ) : paginatedBookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No bookings found
                  </td>
                </tr>
              ) : (
                paginatedBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{booking.name}</div>
                      {booking.message && (
                        <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                          Note: {booking.message}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.serviceType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>{format(new Date(booking.date), "MMM d, yyyy")}</div>
                      <div className="text-sm text-gray-500">{booking.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleView(booking)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(booking)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(booking)}
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
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredBookings.length)} of {filteredBookings.length} bookings
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

      {/* View Booking Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Захиалгын дэлгэрэнгүй</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Нэр</p>
                  <p className="text-sm">{selectedBooking.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Утас</p>
                  <p className="text-sm">{selectedBooking.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Үйлчилгээ</p>
                  <p className="text-sm">{selectedBooking.serviceType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Огноо</p>
                  <p className="text-sm">{format(new Date(selectedBooking.date), "yyyy-MM-dd")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Цаг</p>
                  <p className="text-sm">{selectedBooking.time}</p>
                </div>
              </div>
              
              {selectedBooking.message && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Нэмэлт мэдээлэл</p>
                  <p className="text-sm">{selectedBooking.message}</p>
                </div>
              )}
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

      {/* Edit Booking Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Захиалга засах</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const updatedBooking = {
                ...selectedBooking,
                name: formData.get("name") as string,
                phone: formData.get("phone") as string,
                serviceType: formData.get("serviceType") as string,
                date: new Date(formData.get("date") as string).toISOString(),
                time: formData.get("time") as string,
                message: formData.get("message") as string,
              };
              saveBooking(updatedBooking);
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Нэр
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    defaultValue={selectedBooking.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Утас
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    defaultValue={selectedBooking.phone}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="serviceType" className="text-sm font-medium text-gray-700">
                    Үйлчилгээ
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    defaultValue={selectedBooking.serviceType}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="Dental Checkup">Шүдний үзлэг</option>
                    <option value="Teeth Cleaning">Шүд цэвэрлэх</option>
                    <option value="Root Canal">Суваг эмчилгээ</option>
                    <option value="Teeth Whitening">Шүд цайруулах</option>
                    <option value="Dental Implant">Шүдний имплант</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium text-gray-700">
                    Огноо
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    defaultValue={format(new Date(selectedBooking.date), "yyyy-MM-dd")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="time" className="text-sm font-medium text-gray-700">
                    Цаг
                  </label>
                  <input
                    id="time"
                    name="time"
                    type="text"
                    defaultValue={selectedBooking.time}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Нэмэлт мэдээлэл
                </label>
                <textarea
                  id="message"
                  name="message"
                  defaultValue={selectedBooking.message}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                />
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
            <DialogTitle>Захиалга устгах</DialogTitle>
            <DialogDescription>
              Та энэ захиалгыг устгахдаа итгэлтэй байна уу?
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