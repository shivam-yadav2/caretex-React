import React from "react";

function MapSection() {
  return (
    <div className="w-full h-[450px] md:h-[500px] lg:h-[460px]">
      

      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3559.7557541524156!2d80.9263071!3d26.8477198!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfdba60fd9507%3A0x6b4fd96c6b4f2a36!2sHospital%20Care%20%26%20Company!5e0!3m2!1sen!2sin!4v1746557939714!5m2!1sen!2sin" width="100%" height={500} frameBorder={0} style={{ border: 0 }} allowFullScreen aria-hidden="false" tabIndex={0} />


    </div>
  );
}

export default MapSection;
