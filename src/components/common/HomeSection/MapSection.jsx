import React from "react";

function MapSection() {
  return (
    <div className="w-full h-[450px] md:h-[500px] lg:h-[600px]">
      <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3334.1325545269174!2d35.01954129806801!3d-15.803890626262753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sOpp.%20MARCA%20House%2C%20Ginnery%20Corner%2C%20P.O.%20Box%205691%2C%20Limbe%2C%20Malawi!5e1!3m2!1sen!2sin!4v1591112504067!5m2!1sen!2sin" width="100%" height={500} frameBorder={0} style={{ border: 0 }} allowFullScreen aria-hidden="false" tabIndex={0} />

    </div>
  );
}

export default MapSection;
