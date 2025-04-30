"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  User,
  Stethoscope,
  Calendar,
  Phone,
  ChevronDown,
  Baby,
  CalendarCheck,
} from "lucide-react";
import Image from "next/image";

const navLinks = [
  { name: "Нүүр хуудас", href: "/", icon: Home },
  { name: "Эмч Мөнгөнзул", href: "/mungunzul", icon: User },
  {
    name: "Үйлчилгээ",
    href: "/services",
    icon: Stethoscope,
    dropdown: true,
    items: [
      { name: "Бүх үйлчилгээнүүд", href: "/services" },
      { name: "Циркон бүрээс", href: "/services/zircon", icon: Stethoscope },
      {
        name: "Хүүхдийн эмчилгээ",
        href: "/services/children-dentistry",
        icon: Baby,
      },
      { name: "Шүдний цэвэрлэгээ", href: "/services/cleaning" },
      { name: "Шүдний ломбо", href: "/services/filling" },
      { name: "Урьдчилан сэргийлэх", href: "/services/preventive" },
      { name: "Сэргээх", href: "/services/restorative" },
    ],
  },
  { name: "Цаг захиалах", href: "/booking", icon: CalendarCheck },
  { name: "Холбоо барих", href: "/contact", icon: Phone },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Route солигдоход mobile menu хаагдана
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-2"
          : "bg-white/80 backdrop-blur-sm py-3"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 z-10">
            <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden">
              <Image
                alt="logo"
                src="/images/logo.png"
                width={48}
                height={48}
                className="rounded-full shadow-md"
              />
            </div>
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-dental-800 to-dental-600 bg-clip-text text-transparent">
              Мөнгөндент
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.dropdown &&
                    link.items?.some((item) => pathname === item.href));

                return (
                  <li key={link.name} className="relative">
                    {link.dropdown ? (
                      <>
                        <button
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === link.name ? null : link.name
                            )
                          }
                          className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors ${
                            isActive
                              ? "bg-dental-50 text-dental-600"
                              : "text-gray-700 hover:bg-gray-50 hover:text-dental-600"
                          }`}
                        >
                          <link.icon className="h-4 w-4 mr-1.5" />
                          {link.name}
                          <ChevronDown
                            className={`ml-1 h-3 w-3 transition-transform ${
                              openDropdown === link.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {openDropdown === link.name && (
                          <div className="absolute top-full left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                            <div
                              className="py-1"
                              role="menu"
                              aria-orientation="vertical"
                            >
                              {link.items?.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className={`block px-4 py-2 text-sm ${
                                    pathname === item.href
                                      ? "bg-dental-50 text-dental-600"
                                      : "text-gray-700 hover:bg-gray-50 hover:text-dental-600"
                                  }`}
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors ${
                          isActive
                            ? "bg-dental-50 text-dental-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-dental-600"
                        }`}
                      >
                        <link.icon className="h-4 w-4 mr-1.5" />
                        {link.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center lg:hidden">
            <button
              className="p-2 rounded-md bg-dental-50 text-dental-600 hover:bg-dental-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
        className="lg:hidden overflow-hidden bg-white shadow-lg"
      >
        <div className="container mx-auto px-4 py-4">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.dropdown &&
                  link.items?.some((item) => pathname === item.href));

              return (
                <li key={link.name}>
                  {link.dropdown ? (
                    <div className="flex flex-col">
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === link.name ? null : link.name
                          )
                        }
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          isActive
                            ? "bg-dental-50 text-dental-600"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center">
                          <link.icon className="h-5 w-5 mr-3" />
                          <span className="font-medium">{link.name}</span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            openDropdown === link.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {openDropdown === link.name && (
                        <div className="ml-8 mt-1 space-y-1">
                          {link.items?.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`block p-2 rounded-md text-sm ${
                                pathname === item.href
                                  ? "bg-dental-50 text-dental-600"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-dental-600"
                              }`}
                              onClick={() => {
                                setOpenDropdown(null);
                                setIsOpen(false);
                              }}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={`flex items-center p-3 rounded-lg ${
                        isActive
                          ? "bg-dental-50 text-dental-600"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <link.icon className="h-5 w-5 mr-3" />
                      <span className="font-medium">{link.name}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </motion.div>
    </header>
  );
}
