import React, { useState } from "react";
import Navbar from "../components/common/Navbar/Navbar";
import PageHeader from "../components/common/PageHeader/PageHeader";
import MapSection from "../components/common/HomeSection/MapSection";
import Footer from "../components/common/Footer/Footer";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Mobileno: "",
    EmailId: "",
    Message: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.FirstName ||
      !formData.LastName ||
      !formData.Mobileno ||
      !formData.EmailId ||
      !formData.Message
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.EmailId)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Phone number validation (basic 10-digit check)
    if (!/^\d{10}$/.test(formData.Mobileno)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    const loadingToast = toast.loading("Sending message...");

    try {
      const response = await axios.post(
        "https://care-tex.in/JsonService/ContactUs.aspx",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.dismiss(loadingToast);

      // Assuming the API returns a success status
      if (response.status === 200) {
        toast.success("Message sent successfully!");
        // Reset form
        setFormData({
          FirstName: "",
          LastName: "",
          Mobileno: "",
          EmailId: "",
          Message: "",
        });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <PageHeader
        title={"Contact us"}
        backgroundImage={"/assets/slider4.jpg"}
        breadcrumbs={[]}
      />
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 p-[5rem]">
        <div className="flex flex-wrap lg:gap-5 gap-3">
          {/* Left Side */}
          <div className="w-full lg:w-[48%]">
            <div className="space-y-6">
              <div className="w-full">
                <img
                  src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/contact-us.png"
                  className="w-[60%] h-auto"
                  alt="Contact us"
                />
              </div>

              <div className="space-y-8">
                <h3 className="text-2xl font-bold">Get In Touch</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-primary"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                      />
                    </svg>

                    <div>
                      <h4 className="font-semibold mb-1">Phone</h4>
                      <p>+91 0522-4004633</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-primary"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"
                      />
                    </svg>

                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p>caretexaid@gmail.com</p>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-primary"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                      />
                    </svg>

                    <div>
                      <h4 className="font-semibold mb-1">WhatsApp No.</h4>
                      <p>+91 7800311945</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="w-full lg:w-[48%] bg-[#e5e5e5] p-[50px]">
            <div className="lg:hidden block mb-6">
              <h2 className="text-2xl font-bold">Contact Us</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="FirstName"
                      value={formData.FirstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter First Name"
                      required
                    />
                    <i className="fa-solid fa-user absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  </div>
                </div>

                {/* Last Name */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="LastName"
                      value={formData.LastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter Last Name"
                      required
                    />
                    <i className="fa-solid fa-user absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  </div>
                </div>

                {/* Email */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="EmailId"
                      value={formData.EmailId}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter Email Address"
                      required
                    />
                    <i className="fa-solid fa-envelope absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  </div>
                </div>

                {/* Phone */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="Mobileno"
                      value={formData.Mobileno}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter Your Phone Number"
                      maxLength="10"
                      required
                    />
                    <i className="fa-solid fa-mobile-screen-button absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="relative">
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    name="Message"
                    value={formData.Message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent h-32"
                    placeholder="Enter Your Message"
                    required
                  ></textarea>
                  <i className="fa-solid fa-message absolute right-3 top-4 text-gray-400"></i>
                </div>
              </div>

              <button
                type="submit"
                className="ml-auto bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors bg-[#6b2a2e]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <MapSection />
    </>
  );
};

export default Contact;
