import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-6 mt-10">
            <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                    <Link href="/">
                        <img src="/assets/care-text-logo.png" className="bg-white rounded-3xl" alt="CareTex Logo" width="150px" />
                    </Link>
                    <p className="text-sm mt-2 opacity-75">
                        CareTex - Your trusted provider of medical support products.
                    </p>
                    <p className="text-sm opacity-75">
                        We specialize in high-quality medical tools designed to aid recovery and provide comfort, including back support belts, neck bands, knee supports, and more.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <nav className="flex flex-col space-y-2">
                        <Link href="/about-us" className="hover:text-[#f59f8b]">About Us</Link>
                        <Link href="/products" className="hover:text-[#f59f8b]">Our Products</Link>
                        {/* <Link href="/customer-reviews" className="hover:text-[#f59f8b]">Customer Reviews</Link> */}
                        {/* <Link href="/blog" className="hover:text-[#f59f8b]">Health Blog</Link> */}
                        <Link href="/contact-us" className="hover:text-[#f59f8b]">Contact Us</Link>
                        <p className="mt-2">
                            <a
                                href="/assets/pdf/catelogue.pdf"
                                download="CareTex_Brochure.pdf"
                                className="text-[#f59f8b] hover:underline"
                            >
                                Download Brochure
                            </a>
                        </p>
                        <p className="mt-2">
                            <a
                                href="/assets/pdf/product.pdf"
                                download="CareTex_Brochure.pdf"
                                className="text-[#f59f8b] hover:underline"
                            >
                                Caretex-Hospital Products
                            </a>
                        </p>
                    </nav>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-3">Address</h3>
                    <p className="font-light"><strong className="font-bold">Sales office : </strong> - Shop No.2 Mughal Medicine Market , Aminabad , Lucknow</p>
                    <p className="font-light"><strong className="font-bold">Mfg Office : </strong> - plot 11,12,13 Salempur Pataura , Near Shri Shakuntla Devi Mishra College , Buddheshwar , Lucknow .</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-3">Get In Touch</h3>
                    <p>
                        <span className="font-semibold">📞</span> +91-9876543210, 1800-123-4567
                    </p>
                    <p>
                        <span className="font-semibold">✉</span> support@caretex.com
                    </p>
                    
                </div>
            </div>
            <div className="text-center text-sm mt-6 border-t border-gray-700 pt-4">
                © {new Date().getFullYear()} CareTex. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;