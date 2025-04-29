"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, User, Building, Mail, Phone, Globe, Key, AlertCircle } from "lucide-react";
import { fetchWithAuth, handleApiResponse } from "@/lib/api-helpers";

export default function SettingsForm() {
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Мөнгөндент",
    siteDescription: "Мөнгөндент шүдний эмнэлэг - Таны инээмсэглэлийн төлөө",
    contactEmail: "info@mongondent.mn",
    contactPhone: "+976 9911-2233",
    address: "Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, Их сургуулийн гудамж",
    logoUrl: "",
  });
  
  const [apiSettings, setApiSettings] = useState({
    apiKey: "••••••••••••••••",
  });
  
  // Load settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        // In a real app, you would fetch settings from an API
        // For now, we'll use the default values
        
        // Fetch the actual API key if authenticated
        const token = localStorage.getItem("admin-token");
        if (token) {
          setApiSettings({
            apiKey: token,
          });
        }
      } catch (err) {
        console.error("Error loading settings:", err);
      }
    };
    
    loadSettings();
  }, []);
  
  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      // In a real app, this would be an API call to save settings
      // For demo purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setSuccess("Тохиргоо амжилттай хадгалагдлаа!");
    } catch (err) {
      console.error("Error saving settings:", err);
      setError("Тохиргоо хадгалахад алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setSaving(false);
    }
  };
  
  const handleApiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      // In a real app, this would be an API call to save API settings
      // For demo purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setSuccess("API тохиргоо амжилттай хадгалагдлаа!");
    } catch (err) {
      console.error("Error saving API settings:", err);
      setError("API тохиргоо хадгалахад алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setSaving(false);
    }
  };
  
  const regenerateApiKey = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      // In a real application, you would call an API to regenerate the key
      // For demo purposes, we'll generate a random string
      const newKey = Math.random().toString(36).substring(2, 15) + 
                    Math.random().toString(36).substring(2, 15);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setApiSettings({
        ...apiSettings,
        apiKey: newKey,
      });
      
      setSuccess("API түлхүүр амжилттай шинэчлэгдлээ!");
    } catch (err) {
      console.error("Error regenerating API key:", err);
      setError("API түлхүүр шинэчлэхэд алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Tabs defaultValue="general" className="space-y-4" onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="general">Ерөнхий</TabsTrigger>
        <TabsTrigger value="api">API</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general">
        <Card className="p-6">
          <form onSubmit={handleGeneralSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold">Ерөнхий тохиргоо</h2>
            
            {error && activeTab === "general" && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span>{error}</span>
              </div>
            )}
            
            {success && activeTab === "general" && (
              <div className="bg-green-50 text-green-600 p-3 rounded-md flex items-center">
                <Save className="w-5 h-5 mr-2" />
                <span>{success}</span>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
                    Сайтын нэр
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      id="siteName"
                      type="text"
                      value={generalSettings.siteName}
                      onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                    Холбоо барих имэйл
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      id="contactEmail"
                      type="email"
                      value={generalSettings.contactEmail}
                      onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                    Холбоо барих утас
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      id="contactPhone"
                      type="text"
                      value={generalSettings.contactPhone}
                      onChange={(e) => setGeneralSettings({...generalSettings, contactPhone: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700">
                    Лого URL
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      id="logoUrl"
                      type="text"
                      value={generalSettings.logoUrl}
                      onChange={(e) => setGeneralSettings({...generalSettings, logoUrl: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Хаяг
                </label>
                <input
                  id="address"
                  type="text"
                  value={generalSettings.address}
                  onChange={(e) => setGeneralSettings({...generalSettings, address: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700">
                  Сайтын тайлбар
                </label>
                <textarea
                  id="siteDescription"
                  rows={3}
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "Хадгалж байна..." : "Хадгалах"}</span>
              </button>
            </div>
          </form>
        </Card>
      </TabsContent>
      
      <TabsContent value="api">
        <Card className="p-6">
          <form onSubmit={handleApiSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold">API Тохиргоо</h2>
            
            {error && activeTab === "api" && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span>{error}</span>
              </div>
            )}
            
            {success && activeTab === "api" && (
              <div className="bg-green-50 text-green-600 p-3 rounded-md flex items-center">
                <Save className="w-5 h-5 mr-2" />
                <span>{success}</span>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
                  API Түлхүүр
                </label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      id="apiKey"
                      type="text"
                      value={apiSettings.apiKey}
                      readOnly
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={regenerateApiKey}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    Дахин үүсгэх
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Энэ түлхүүр нь API хүсэлтийг баталгаажуулахад ашиглагддаг. Аюулгүй байлгана уу.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "Хадгалж байна..." : "Хадгалах"}</span>
              </button>
            </div>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}