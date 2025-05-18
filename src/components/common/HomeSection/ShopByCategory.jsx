import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { supabaseClient } from "../../../utlis/SupabaseClient";
import Example from "../Testing/Test";

const ShopByCategory = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const sliderRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data: categories, error: categoryError } = await supabaseClient
        .from("categories")
        .select(`id, name,slug, subcategories:categories(*)`)
        .is("parent_id", null)
        .order("created_at", { ascending: true });

      if (categoryError) {
        console.error("Error fetching categories:", categoryError);
        return;
      }

      const subcategoryIds = categories
        .flatMap((category) => category.subcategories || [])
        .map((sub) => sub.id);

      let products = [];
      if (subcategoryIds.length > 0) {
        const { data: productData, error: productError } = await supabaseClient
          .from("product")
          .select("*")
          .in("sub_cate_id", subcategoryIds)
          .order("created_at", { ascending: true });

        if (productError) {
          console.error("Error fetching products:", productError);
        } else {
          products = productData;
        }
      }

      setCategories(categories);
      setProducts(products);

      // Set first category as active
      if (categories.length > 0) {
        setActiveCategory(categories[0]);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (sliderRef.current && sliderRef.current.children.length > 0) {
      gsap.fromTo(
        sliderRef.current.children,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }
  }, [activeCategory, products]);

  const filteredProducts = products.filter((product) => {
    const activeCategoryObj = categories.find(
      (cat) => cat.id === activeCategory?.id
    );
    if (!activeCategoryObj) return false;

    const activeSubcategoryIds = (activeCategoryObj.subcategories || []).map(
      (sub) => sub.id
    );

    return activeSubcategoryIds.includes(product.sub_cate_id);
  });

  return (
    <div className="bg-gray-100 py-8">
      {/* Categories */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Shop by Categories
        </h2>
        <div className="overflow-x-auto flex justify-center gap-4 py-2 px-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg shadow-md ${
                activeCategory?.id === category.id
                  ? "bg-[#f59f8b] border border-[#e58674] text-white"
                  : "bg-white text-[#70292f]"
              } transition hover:bg-[#e58674] hover:text-white whitespace-nowrap`}
              onClick={() => setActiveCategory(category)}
            >
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      {console.log(activeCategory, "activeCategory")}
      <div className="container mx-auto px-4">
        <div
          ref={sliderRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.slice(0, 12).map((product) => (
              <div
                key={product.id}
                className="bg-white w-full shadow-lg rounded-lg p-4 text-center border-2 border-[#70292f] rounded-[3px_50px] shadow-[1px_1px_4px_#e58674]"
              >
                <div className="flex items-center justify-end mb-2">
                  <a
                    href={`/${activeCategory?.slug}/${
                      activeCategory?.subcategories.find(
                        (sub) => sub.id === product.sub_cate_id
                      )?.slug
                    }?subId=${product.sub_cate_id}`}
                  >
                    <span className="bg-white-100 flex rounded-lg shadow-md bg-[#f59f8b] border border-[#e58674] text-xs font-medium px-2.5 py-0.5 rounded-sm text-white border border-[#f59f8b]-300">
                      {
                        activeCategory?.subcategories.find(
                          (sub) => sub.id === product.sub_cate_id
                        )?.slug
                      }
                    </span>
                  </a>
                </div>

                <img
                  src={product.image_url}
                  alt={product.product_title}
                  className="w-full h-40 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold">
                  {product.product_title}
                </h3>
                <div className="text-green-600 font-bold text-lg">
                  Rs. {product.price}
                </div>
                <button
                  className="mt-4 px-4 py-2 bg-[#f59f8b] text-white rounded-lg text-sm hover:bg-[#e58674]"
                  onClick={() => setSelectedProduct(product)}
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">
              No products available for this category.
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <Example
          isOpen={!!selectedProduct}
          data={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ShopByCategory;
