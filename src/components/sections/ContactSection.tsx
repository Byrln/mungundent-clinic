"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock } from "lucide-react";

interface ClinicInfo {
  address: string;
  phone: string;
  email: string;
  hours: string;
}

interface ContactSectionProps {
  subtitle: string;
  title: string;
  description: string;
  clinicInfo: ClinicInfo;
  mapEmbedUrl: string;
}

export default function ContactSection({
  subtitle,
  title,
  description,
  clinicInfo,
  mapEmbedUrl
}: ContactSectionProps) {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-dental-100 text-dental-600 font-medium text-sm">
              {subtitle}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-dental-800">{title}</h2>
            <p className="text-gray-600 mb-8">
              {description}
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-dental-100 p-3 rounded-full">
                  <MapPin className="text-dental-600" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-dental-800 mb-1">Хаяг</h3>
                  <p className="text-gray-600">{clinicInfo.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-dental-100 p-3 rounded-full">
                  <Phone className="text-dental-600" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-dental-800 mb-1">Утас</h3>
                  <p className="text-gray-600">{clinicInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-dental-100 p-3 rounded-full">
                  <Clock className="text-dental-600" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-dental-800 mb-1">Ажиллах цаг</h3>
                  <p className="text-gray-600">{clinicInfo.hours}</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/booking">Цаг захиалах</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Холбоо барих</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <iframe 
              src={mapEmbedUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}