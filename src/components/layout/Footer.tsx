import Link from "next/link";
import { Facebook, Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dental-50 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-dental-800">Мөнгөндент</h3>
            <p className="text-sm text-gray-600 mb-4">
              Мөнгөндент шүдний эмнэлэг нь таны инээмсэглэлийг илүү гэрэлтүүлэх, эрүүл шүдийг хадгалахад туслах зорилготой. Бид орчин үеийн тоног төхөөрөмж, мэргэжлийн эмч нарын багтай.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.facebook.com/mungundent"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dental-600 hover:text-dental-800 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="mailto:info@mungundent.mn"
                className="text-dental-600 hover:text-dental-800 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-dental-800">Хурдан холбоосууд</h3>
            <ul className="space-y-2">
              {[
                { name: "Нүүр", href: "/" },
                { name: "Мөнгөнзул эмч", href: "/about" },
                { name: "Хүүхдийн эмчилгээ", href: "/children-dentistry" },
                { name: "Циркон бүрээс", href: "/zircon-crowns" },
                { name: "Цаг захиалга", href: "/booking" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-dental-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-dental-800">Үйлчилгээнүүд</h3>
            <ul className="space-y-2">
              {[
                "Шүдний цэвэрлэгээ",
                "Шүдний ломбо",
                "Циркон бүрээс",
                "Хүүхдийн эмчилгээ",
                "Шүдний гажиг засал",
              ].map((service, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-dental-800">Холбоо барих</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-dental-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">
                  Улаанбаатар хот, Сүхбаатар дүүрэг
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-dental-600 flex-shrink-0" />
                <span className="text-sm text-gray-600">+976 99112233</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-dental-600 flex-shrink-0" />
                <span className="text-sm text-gray-600">info@mungundent.mn</span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock size={18} className="text-dental-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">
                  Даваа - Баасан: 9:00 - 18:00
                  <br />
                  Бямба: 10:00 - 15:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; Мөнгөндент {new Date().getFullYear()}. Бүх эрх хуулиар хамгаалагдсан.
          </p>
        </div>
      </div>
    </footer>
  );
}