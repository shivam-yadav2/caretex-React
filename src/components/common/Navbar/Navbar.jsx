import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import RightArrow from "../../../utlis/RightArrow";
import { supabaseClient } from "../../../utlis/SupabaseClient";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openMobileCategory, setOpenMobileCategory] = useState(null);
  // MOBILE STATE
  const [openMobileProducts, setOpenMobileProducts] = useState(false);
  const [openMobileSubCatId, setOpenMobileSubCatId] = useState(null);

  // Handle scroll effect for sticky navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch categories from Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabaseClient
          .from("categories")
          .select("id, name, subcategories:categories(id, name)")
          .is("parent_id", null)
          .order("created_at", { ascending: true });

        if (error) throw error;
        setCategories(data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Close sidebar when clicking outside
  // Close sidebar when clicking outside
  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleOutsideClick = (e) => {
      // if clicking anywhere that's not inside the sidebar, close it
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isSidebarOpen]);

  // Toggle mobile category expansion
  const toggleMobileCategory = (categoryKey) => {
    setOpenMobileCategory(
      openMobileCategory === categoryKey ? null : categoryKey
    );
  };

    const handleCloseSidebar = () => {
      setIsSidebarOpen(false);
      setOpenMobileProducts(false);
      setOpenMobileSubCatId(null);
    };


  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full bg-gray-900 text-white py-2 px-4 z-50 transition-shadow duration-300 ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <p className="flex items-center gap-2 text-sm">
              <img
                width={25}
                height={25}
                alt="Email icon"
                src="/assets/email.png"
              />
              <span>caretexaid@gmail.com |</span>
            </p>
            <p className="flex items-center gap-2 text-sm">
              <a
                to="https://wa.me/+917800311945"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <img
                  width={25}
                  height={25}
                  alt="WhatsApp icon"
                  src="/assets/wp.png"
                />
                <span>+91 7800311945 |</span>
              </a>
            </p>
            <p className="flex items-center gap-2 text-sm">
              <a to="tel:+918076356808" className="flex items-center gap-2">
                <img
                  width={25}
                  height={25}
                  alt="Phone icon"
                  src="/assets/call.png"
                />
                <span>+91 0522-4004633</span>
              </a>
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative group">
              <button className="flex items-center gap-2 text-sm">
                <img
                  height={30}
                  width={30}
                  alt="India flag"
                  src="/svg/india.svg"
                />
                <span>India</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Navbar */}
      <div
        className={`sticky top-[70px] lg:top-[30px] bg-white shadow-md z-40 transition-shadow duration-300 ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="max-w-screen-xl mx-auto flex items-center justify-between py-3 px-6">
          <Link to="/">
            <img
              alt="CareTex logo"
              className="w-[100px] lg:w-[150px]"
              src="/assets/care-text-logo.png"
            />
          </Link>
          <nav className="hidden lg:flex lg:items-center lg:space-x-6">
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/"
                  className="text-lg font-semibold text-black hover:text-[#f59f8b]"
                >
                  Home
                </Link>
              </li>
              <li className="relative group">
                <button className="flex items-center gap-1 text-lg font-semibold text-black hover:text-[#f59f8b]">
                  Products
                  <svg
                    className="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 7.41"
                  >
                    <path
                      d="M16.59,8.59,12,13.17,7.41,8.59,6,10l6,6,6-6Z"
                      transform="translate(-6 -8.59)"
                      fill="currentColor"
                      opacity="0.7"
                    />
                  </svg>
                </button>
                <ul className="absolute left-0 w-[250px] mt-2 bg-white text-black rounded shadow-lg opacity-0 invisible translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-10">
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className="relative group/sub px-4 py-2 hover:bg-[#f59f8b] hover:text-white"
                      onMouseEnter={() => setActiveCategory(category.name)}
                      onMouseLeave={() => setActiveCategory(null)}
                    >
                      <button className="w-full text-left flex justify-between items-center">
                        {category.name}
                        <RightArrow width={20} height={20} />
                      </button>
                      {activeCategory === category.name && (
                        <ul className="absolute left-full top-0 w-[200px] bg-white text-black rounded shadow-lg transition-all duration-300">
                          {category.subcategories.map((sub) => (
                            <li
                              key={sub.id}
                              className="px-4 py-2 hover:bg-[#f59f8b] hover:text-white"
                            >
                              <Link
                                to={`/${category.name
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}/${sub.name
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}?subId=${sub.id}`}
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <Link
                  to={"/about-us"}
                  className="text-lg font-semibold text-black hover:text-[#f59f8b]"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="text-lg font-semibold text-black hover:text-[#f59f8b]"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <button
              className="lg:hidden text-2xl"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      {/* Sidebar Menu (Mobile) */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-3/4 max-w-xs bg-white z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close menu"
          >
            <AiOutlineClose className="text-2xl" />
          </button>
        </div>
        <ul className="p-4 space-y-4">
          <li>
            <Link
              to="/"
              onClick={() => setIsSidebarOpen(false)}
              className="block font-medium"
            >
              Home
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                setOpenMobileProducts((p) => !p);
                if (openMobileProducts) setOpenMobileSubCatId(null);
              }}
              className="w-full flex justify-between items-center font-medium"
            >
              Products
              <RightArrow
                width={16}
                height={16}
                className={`transform transition-transform ${
                  openMobileProducts ? "rotate-90" : ""
                }`}
              />
            </button>

            {openMobileProducts && (
              <ul className="mt-2 pl-4 space-y-2">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() =>
                        setOpenMobileSubCatId((prev) =>
                          prev === cat.id ? null : cat.id
                        )
                      }
                      className="w-full flex justify-between items-center"
                    >
                      {cat.name}
                      <RightArrow
                        width={14}
                        height={14}
                        className={`transform transition-transform ${
                          openMobileSubCatId === cat.id ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    {openMobileSubCatId === cat.id && (
                      <ul className="mt-1 pl-4 space-y-1">
                        {cat.subcategories.map((sub) => (
                          <li key={sub.id}>
                            <Link
                              onClick={handleCloseSidebar}
                              to={`/${cat.name
                                .toLowerCase()
                                .replace(/\s+/g, "-")}/${sub.name
                                .toLowerCase()
                                .replace(/\s+/g, "-")}?subId=${sub.id}`}
                              className="block"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            <Link
              to="/about-us"
              onClick={() => setIsSidebarOpen(false)}
              className="block font-medium"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact-us"
              onClick={() => setIsSidebarOpen(false)}
              className="block font-medium"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default Navbar;
