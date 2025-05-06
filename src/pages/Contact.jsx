import React, { useState } from "react";
import Navbar from "../components/common/Navbar/Navbar";
import PageHeader from "../components/common/PageHeader/PageHeader";
import MapSection from "../components/common/HomeSection/MapSection";
import Footer from "../components/common/Footer/Footer";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import contact_us from "../assets/slider4.jpg";

const Contact = () => {
  // form state
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Mobileno: "",
    EmailId: "",
    Message: "",
  });

  // update state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // submit handler — now sending raw JSON
const handleSubmit = async (e) => {
  e.preventDefault();

  // 1) validation
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
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.EmailId)) {
    toast.error("Please enter a valid email address");
    return;
  }
  if (!/^\d{10}$/.test(formData.Mobileno)) {
    toast.error("Please enter a valid 10-digit phone number");
    return;
  }

  // 2) show loading
  const loadingId = toast.loading("Sending message…");

  try {
    // 3) build form-data payload
    const payload = new FormData();
    payload.append("FirstName", formData.FirstName);
    payload.append("LastName", formData.LastName);
    payload.append("Mobileno", formData.Mobileno);
    payload.append("EmailId", formData.EmailId);
    payload.append("Message", formData.Message);

    // 4) send as multipart/form-data
    const res = await axios.post(
      "http://care-tex.in/JsonService/ContactUs.aspx",
      payload,
      {
        // NOTE: You can omit this header entirely—axios will fill in the correct boundary.
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    toast.dismiss(loadingId);

    if (res.status === 200) {
      toast.success("Message sent successfully!");
      // reset form
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
  } catch (err) {
    toast.dismiss(loadingId);
    toast.error(
      err.response?.data?.message ||
        "An error occurred. Please try again later."
    );
  }
};


  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <PageHeader
        title="Contact us"
        backgroundImage={contact_us}
        breadcrumbs={[]}
      />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 p-[5rem]">
        <div className="flex flex-wrap lg:gap-5 gap-3">
          {/* Left Side: Contact Info */}
          <div className="w-full lg:w-[48%] space-y-6">
            <img
              src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/contact-us.png"
              className="w-[60%] h-auto"
              alt="Contact us"
            />
            <h3 className="text-2xl font-bold">Get In Touch</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone */}
              <div className="flex items-start gap-4 p-4 justify-center bg-gray-50 rounded-lg">
                
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <p>+91 0522-4004633</p>
                </div>
              </div>
              {/* Email */}
              <div className="flex items-start gap-4 p-4 justify-center bg-gray-50 rounded-lg">
                
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p>caretexaid@gmail.com</p>
                </div>
              </div>
              {/* WhatsApp */}
              <div className="flex items-start gap-4 p-4 justify-center bg-gray-50 rounded-lg">
                
                <div>
                  <h4 className="font-semibold mb-1">WhatsApp No.</h4>
                  <p>+91 7800311945</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="w-full lg:w-[48%] bg-[#e5e5e5] p-[50px]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="FirstName"
                    value={formData.FirstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="Enter First Name"
                    required
                  />
                </div>
                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="LastName"
                    value={formData.LastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="Enter Last Name"
                    required
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="EmailId"
                    value={formData.EmailId}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="Enter Email Address"
                    required
                  />
                </div>
                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="Mobileno"
                    value={formData.Mobileno}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="Enter Your Phone Number"
                    maxLength="10"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="Message"
                  value={formData.Message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary h-32"
                  placeholder="Enter Your Message"
                  required
                />
              </div>

              <button
                type="submit"
                className="ml-auto bg-[#6b2a2e] text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <MapSection />
      <Footer />
    </>
  );
};

export default Contact;
