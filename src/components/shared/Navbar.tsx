"use client";
import { useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { FaRegIdCard } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosMan } from "react-icons/io";
import { IoIosWoman } from "react-icons/io";
import { FaBabyCarriage } from "react-icons/fa";
import { BsFillBagPlusFill } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { MdElectricBolt } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useLogout from "@/features/Products/hooks/LogoutHook";
import { appStateType } from "@/store/AppStore";
import { useAppSelector } from "@/store/Hooks";
import Image from "next/image";



interface NavbarProps {
  isAuthentication?: boolean;
  onLogout?: () => void;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthentication } = useAppSelector((state: appStateType) => state.Auth);
  const { logout } = useLogout();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
    }
  };
  // Close sidebar on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    logout
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header>
        {/* Top Bar - Hidden on Mobile */}
        <div className="bg-gray-50 hidden lg:block">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex justify-between items-center border-b border-zinc-200">
              <ul className="flex items-center gap-5">
                <li>
                  <a
                    className="flex items-center gap-2 text-gray-700"
                    href="tel:+1(800)123-4567"
                  >
                    <FaPhoneAlt />
                    +1 (800) 123-4567
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center gap-2 text-gray-700"
                    href="mailto:support@freshcart.com"
                  >
                    <IoMdMail />
                    support@freshcart.com
                  </a>
                </li>
              </ul>
              <ul className="flex gap-3 items-center">
                <li>
                  <Link href="/about" className="text-gray-700">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-700">
                    Contact
                  </Link>
                </li>
                <li className="text-gray-700">
                  <select name="USD">
                    <option>EGP</option>
                    <option>SAR</option>
                    <option>AED</option>
                  </select>
                </li>
                <li className="text-gray-700">
                  <select name="USD">
                    <option value="en">English</option>
                    <option value="ar">العربية</option>
                  </select>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-5 relative">
              {/* Hamburger Menu - Mobile Only */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-gray-700 text-2xl z-10"
                aria-label="Open menu"
              >
                <IoIosMenu />
              </button>

              {/* Logo */}
              <Link href="/" className=" flex items-center justify-center absolute left-2-translate-x-1/2 lg:static lg:transform-none z-10 w-[140px] h-[40px] lg:w-[160px] lg:h-[45px]">
                <div className="font-extrabold text-2xl lg:text-3xl tracking-tight">
                  <span className="text-orange-500 drop-shadow-md">Fresh</span>
                  <span className="text-black">Cart</span>
                </div>
              </Link>

              {/* Search Bar - Hidden on Mobile */}

              <form onSubmit={handleSearch} className="relative hidden lg:flex flex-1 justify-center items-center mx-6 max-w-2xl ">
                <FaSearch className="absolute left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 rounded-lg border-2 border-gray-300 focus:border-orange-300 focus:outline-none focus:ring-orange-300"
                />
              </form>


              {/* Icons */}
              <ul className="flex justify-center items-center gap-3 sm:gap-6">
                {/* Wishlist - Show on Mobile */}
                <li className="lg:block">
                  <Link
                    href="/wishlist"
                    className={`flex flex-col items-center transition duration-200 text-gray-700 ${pathname === "/wishlist" ? "text-orange-400" : ""
                      } hover:text-orange-400`}
                  >
                    <FaRegHeart className="text-xl" />
                    <span className="hidden sm:inline text-sm">Wishlist</span>
                  </Link>
                </li>

                {/* Cart - Show on Mobile */}
                <li className="lg:block">
                  <Link
                    href="/cart"
                    className={`flex flex-col items-center transition duration-200 text-gray-700 ${pathname === "/cart" ? "text-orange-400" : ""
                      } hover:text-orange-400`}
                  >
                    <FaCartShopping className="text-xl" />
                    <span className="hidden sm:inline text-sm">Cart</span>
                  </Link>
                </li>

                {/* Desktop Only Icons */}
                <li className="hidden lg:block">
                  <Link
                    href="/profile"
                    className={`flex flex-col items-center transition duration-200 text-gray-700 ${pathname === "/profile" ? "text-orange-400" : ""
                      } hover:text-orange-400`}
                  >
                    <FaRegUser />
                    <span>Account</span>
                  </Link>
                </li>

                {isAuthentication ? (
                  <li
                    className="hidden lg:flex cursor-pointer flex-col text-gray-700 items-center transition duration-200 hover:text-orange-400"
                    onClick={logout}
                  >
                    <MdLogout />
                    <span>Logout</span>
                  </li>
                ) : (
                  <>
                    <li className="hidden lg:block">
                      <Link
                        href="/signup"
                        className={`flex flex-col items-center transition duration-200 text-gray-700 ${pathname === "/signup" ? "text-orange-400" : ""
                          } hover:text-orange-400`}
                      >
                        <FaUserPlus />
                        <span>Signup</span>
                      </Link>
                    </li>
                    <li className="hidden lg:block">
                      <Link
                        href="/login"
                        className={`flex flex-col items-center transition duration-200 text-gray-700 ${pathname === "/login" ? "text-orange-400" : ""
                          } hover:text-orange-400`}
                      >
                        <FaRegIdCard />
                        <span>Login</span>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Search Bar - Mobile Only */}
        <div className="bg-gray-50 lg:hidden border-t border-zinc-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <form onSubmit={handleSearch} className="relative flex items-center">
              <FaSearch className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-10 pr-4 rounded-lg border-2 border-gray-300 focus:border-orange-300 focus:outline-none focus:ring-orange-300"
              />
            </form>
          </div>
        </div>

        {/* Bottom Navigation Bar - Desktop Only */}
        <div className="bg-zinc-100 hidden lg:block">
          <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-start items-center py-5 gap-7">
              {/* Categories Dropdown */}
              <div className="relative group">
                <button className="text-gray-700 rounded bg-orange-400 px-3 flex justify-center items-center py-2 gap-2 hover:bg-orange-500 tracking-normal duration-200 cursor-pointer">
                  <IoIosMenu />
                  <span>All Categories</span>
                  <IoIosArrowDown />
                </button>
                <menu className="hidden group-hover:block absolute z-50 min-w-46 rounded-lg shadow-lg bg-zinc-100 *:rounded-lg *:hover:bg-zinc-200 duration-200 *:cursor-pointer divide-y-2 divide-gray-200">
                  <li className="py-3 px-2">
                    <Link
                      href="/categories/mens"
                      className="flex justify-start items-center gap-2"
                    >
                      <IoIosMan className="text-orange-400" />
                      <span className="text-gray-700">Man's Fashion</span>
                    </Link>
                  </li>
                  <li className="py-3 px-2">
                    <Link
                      href="/categories/womens"
                      className="flex justify-start items-center gap-2"
                    >
                      <IoIosWoman className="text-orange-400" />
                      <span className="text-gray-700">Woman's Fashion</span>
                    </Link>
                  </li>
                  <li className="py-3 px-2">
                    <Link
                      href="/categories/baby"
                      className="flex justify-start items-center gap-2"
                    >
                      <FaBabyCarriage className="text-orange-400" />
                      <span className="text-gray-700">Baby & hrefys</span>
                    </Link>
                  </li>
                  <li className="py-3 px-2">
                    <Link
                      href="/categories/beauty"
                      className="flex justify-start items-center gap-2"
                    >
                      <BsFillBagPlusFill className="text-orange-400" />
                      <span className="text-gray-700">Beauty & Health</span>
                    </Link>
                  </li>
                  <li className="py-3 px-2">
                    <Link
                      href="/categories/electronics"
                      className="flex justify-start items-center gap-2"
                    >
                      <MdElectricBolt className="text-orange-400" />
                      <span className="text-gray-700">Electronics</span>
                    </Link>
                  </li>
                  <li className="py-3 px-2">
                    <Link
                      href="/categories"
                      className="flex justify-start items-center gap-2"
                    >
                      <BsThreeDots className="text-orange-400" />
                      <span className="text-gray-700">View All categories</span>
                    </Link>
                  </li>
                </menu>
              </div>

              {/* Navigation Links */}
              <ul className="flex justify-center items-center gap-6">
                <li>
                  <Link href="/" className="text-gray-700 hover:text-orange-400">
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/allProducts"
                    className="text-gray-700 hover:text-orange-400"
                  >
                    <span>Products</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/brands"
                    className="text-gray-700 hover:text-orange-400"
                  >
                    <span>Brands</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Sidebar Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className="text-orange-500 font-bold text-xl">FreshCart</div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 text-2xl"
              aria-label="Close menu"
            >
              <IoClose />
            </button>
          </div>

          {/* User Actions */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col gap-3">
              <Link
                href="/profile"
                className={`flex items-center gap-3 p-3 rounded-lg transition duration-200 ${pathname === "/profile"
                  ? "bg-orange-50 text-orange-400"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaRegUser className="text-lg" />
                <span>Account</span>
              </Link>

              {isAuthentication ? (
                <button
                  className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200"
                  onClick={handleLogout}
                >
                  <MdLogout className="text-lg" />
                  <span>Logout</span>
                </button>
              ) : (
                <>
                  <Link
                    href="/signup"
                    className={`flex items-center gap-3 p-3 rounded-lg transition duration-200 ${pathname === "/signup"
                      ? "bg-orange-50 text-orange-400"
                      : "text-gray-700 hover:bg-gray-50"
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaUserPlus className="text-lg" />
                    <span>Signup</span>
                  </Link>
                  <Link
                    href="/login"
                    className={`flex items-center gap-3 p-3 rounded-lg transition duration-200 ${pathname === "/login"
                      ? "bg-orange-50 text-orange-400"
                      : "text-gray-700 hover:bg-gray-50"
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaRegIdCard className="text-lg" />
                    <span>Login</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-gray-900 font-semibold mb-3">Categories</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/categories/mens"
                className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <IoIosMan className="text-orange-400 text-lg" />
                <span>Man's Fashion</span>
              </Link>
              <Link
                href="/categories/womens"
                className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <IoIosWoman className="text-orange-400 text-lg" />
                <span>Woman's Fashion</span>
              </Link>
              <Link
                href="/categories/baby"
                className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaBabyCarriage className="text-orange-400 text-lg" />
                <span>Baby & Toys</span>
              </Link>
              <Link
                href="/categories/beauty"
                className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BsFillBagPlusFill className="text-orange-400 text-lg" />
                <span>Beauty & Health</span>
              </Link>
              <Link
                href="/categories/electronics"
                className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MdElectricBolt className="text-orange-400 text-lg" />
                <span>Electronics</span>
              </Link>
              <Link
                href="/categories"
                className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BsThreeDots className="text-orange-400 text-lg" />
                <span>View All Categories</span>
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-gray-900 font-semibold mb-3">Navigation</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className={`p-3 rounded-lg transition duration-200 ${pathname === "/"
                  ? "bg-orange-50 text-orange-400"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Home</span>
              </Link>
              <Link
                href="/allProducts"
                className={`p-3 rounded-lg transition duration-200 ${pathname === "/products"
                  ? "bg-orange-50 text-orange-400"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Products</span>
              </Link>

              <Link
                href="/brands"
                className={`p-3 rounded-lg transition duration-200 ${pathname === "/brands"
                  ? "bg-orange-50 text-orange-400"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Brands</span>
              </Link>
            </div>
          </div>

          {/* Additional Links */}
          <div className="p-4">
            <h3 className="text-gray-900 font-semibold mb-3">Support</h3>
            <div className="flex flex-col gap-2">

              <Link
                href="/about"
                className="p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>About</span>
              </Link>
              <Link
                href="/contact"
                className="p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Contact</span>
              </Link>
            </div>
          </div>

          {/* Language & Currency - Mobile */}
          <div className="p-4 border-t border-gray-200 mt-auto">
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-gray-700 text-sm font-semibold block mb-1">
                  Currency
                </label>
                <select
                  name="currency"
                  className="w-full p-2 rounded-lg border border-gray-300 text-gray-700"
                >
                  <option>EGP</option>
                  <option>SAR</option>
                  <option>AED</option>
                </select>
              </div>
              <div>
                <label className="text-gray-700 text-sm font-semibold block mb-1">
                  Language
                </label>
                <select
                  name="language"
                  className="w-full p-2 rounded-lg border border-gray-300 text-gray-700"
                >
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Info - Mobile */}
          <div className="p-4 bg-gray-50">
            <div className="flex flex-col gap-2 text-sm">
              <a
                className="flex items-center gap-2 text-gray-700"
                href="tel:+1(800)123-4567"
              >
                <FaPhoneAlt />
                +1 (800) 123-4567
              </a>
              <a
                className="flex items-center gap-2 text-gray-700"
                href="mailto:support@freshcart.com"
              >
                <IoMdMail />
                support@freshcart.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}