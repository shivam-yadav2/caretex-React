import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import Footer from "../components/common/Footer/Footer";
import PageHeader from "../components/common/PageHeader/PageHeader";
import Navbar from "../components/common/Navbar/Navbar";
import { supabaseClient } from "../utlis/SupabaseClient";

import Example from "../components/common/Testing/Test";
import { FiFilter } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

// ——— keep SidebarFilter exactly as you had it ———
function SidebarFilter({
  searchTerm,
  setSearchTerm,
  selectedColors,
  setSelectedColors,
  selectedSizes,
  setSelectedSizes,
  priceRange,
  setPriceRange,
  products,
  fetchCategories,
  maxPrice,
}) {
  const handleColorChange = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };
  const handleSizeChange = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  return (
    <div className="sticky top-30 p-6 z-10 md:z-10">
      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* Header + Reset */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Filter</h2>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedColors([]);
              setSelectedSizes([]);
              fetchCategories();
            }}
            className="text-sm text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition"
          >
            Reset Filters
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Search Product</h3>
          <input
            type="text"
            placeholder="Search Product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Price */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
          </h3>
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-full"
          />
        </div>

        {/* Color */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Color</h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(products.flatMap((p) => p.color || []))).map(
              (color) => (
                <button
                  key={color}
                  style={{
                    backgroundColor: color.trim(),
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: selectedColors.includes(color)
                      ? "3px solid black"
                      : "2px solid white",
                    cursor: "pointer",
                    transition: "0.3s ease-in-out",
                  }}
                  onClick={() => handleColorChange(color.trim())}
                  className="shadow-md hover:scale-110"
                />
              )
            )}
          </div>
        </div>

        {/* Size */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Size</h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(products.flatMap((p) => p.size || [])))
              .filter(Boolean)
              .map((size, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 border rounded-md hover:bg-gray-200 transition ${
                    selectedSizes.includes(size)
                      ? "bg-gray-200"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleSizeChange(size)}
                >
                  {size}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function PageContent() {
  const { product } = useParams();
  const params = useParams();
  const query = useQuery();
  const subId = query.get("subId");

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!subId) return;
    fetchCategories();
  }, [subId]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("product")
        .select("*")
        .eq("sub_cate_id", subId)
        .order("created_at", { ascending: true });
      if (error) console.error("Fetch error:", error);
      else {
        setProducts(data);
        if (data.length) {
          const max = Math.max(...data.map((p) => Math.round(p.price)), 0);
          setMaxPrice(max);
          setPriceRange([0, max]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredProducts = products.filter((p) => {
    const titleMatch = p.product_title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const colorMatch =
      !selectedColors.length ||
      (p.color && selectedColors.some((c) => p.color.includes(c)));
    const sizeMatch =
      !selectedSizes.length ||
      (p.size && selectedSizes.some((s) => p.size.includes(s)));
    const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
    return titleMatch && colorMatch && sizeMatch && priceMatch;
  });

  const handleQuickView = (p) => setSelectedProduct(p);

  const ProductListing = () => (
    <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map((p, i) => (
        <div key={i} className="shadow-lg h-[500px]">
          <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
            <img
              className="w-full h-full object-contain rounded-3xl"
              src={p.image_url || "/default-image.jpg"}
              alt={p.product_title || "Product"}
            />
          </div>
          <div className="mt-4 px-5 pb-5">
            <Link to="#">
              <h5 className="text-xl text-slate-900">{p.product_title}</h5>
            </Link>
            <div className="flex items-center mb-3">
              <span className="text-lg font-medium mr-2">Color:</span>
              <div className="flex space-x-2 mt-1">
                {p.color?.map((c, idx) => (
                  <div
                    key={idx}
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: c, border: "2px solid #fff" }}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center mb-3">
              <span className="text-sm font-medium mr-2">Size:</span>
              <div className="flex space-x-2">
                {p.size?.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-full cursor-pointer hover:bg-gray-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-2 mb-5 flex items-center justify-between">
              <p>
                <span className="text-lg font-bold">
                  MRP ₹ {p.price || "449"}
                </span>
              </p>
            </div>
            <button
              onClick={() => handleQuickView(p)}
              className="bg-slate-900 text-white px-5 py-2.5 rounded-md hover:bg-gray-700"
            >
              Quick View
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Navbar />
      <PageHeader
        title={`${params?.category} / ${params?.subcategory}`}
        backgroundImage={"/assets/slider4.jpg"}
        breadcrumbs={product?.split(",")}
      />

      {/* — Mobile “Filters” Button — */}
      <button
        className="md:hidden fixed top-[100px] left-4 z-50 flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md "
        onClick={() => setIsSidebarOpen(true)}
        style={{marginLeft: "120px"}}
      >
        <FiFilter /> Filters
      </button>

      {/* — Backdrop (mobile only) — */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* — Mobile Sidebar Drawer — */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-3/4 bg-white p-4 overflow-y-auto z-50 transform transition-transform duration-300 md:hidden w-full  ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
          selectedSizes={selectedSizes}
          setSelectedSizes={setSelectedSizes}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          products={products}
          fetchCategories={fetchCategories}
          maxPrice={maxPrice}
        />
        <button
          className="absolute top-4 right-4 text-xl"
          onClick={() => setIsSidebarOpen(false)}
        >
          <AiOutlineClose />
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 p-4 bg-white">
        {/* — Desktop Sidebar (static) — */}
        <div className="hidden md:block md:w-1/4">
          <SidebarFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            selectedSizes={selectedSizes}
            setSelectedSizes={setSelectedSizes}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            products={products}
            fetchCategories={fetchCategories}
            maxPrice={maxPrice}
          />
        </div>

        {/* — Products Grid — */}
        <div className="w-full md:w-3/4">
          <ProductListing />
        </div>
      </div>

      {selectedProduct && (
        <Example
          isOpen={!!selectedProduct}
          data={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <Footer />
    </>
  );
}

export default PageContent;
