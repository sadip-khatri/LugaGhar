import React from "react";

const MapEmbed: React.FC = () => {
  return (
    <div className="w-full h-[400px] p-4 bg-white rounded-2xl shadow-md">
      <div className="w-full h-full rounded-xl overflow-hidden border border-gray-200">
        <iframe
          title="Preciso Fashion Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3595.793391592665!2d85.3095868755415!3d27.73523277616654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19004cfa6adb%3A0x98b95e858e25996e!2sHotel%20Rara%20Prince!5e1!3m2!1sen!2snp!4v1756009332681!5m2!1sen!2snp"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3596.880082987725!2d85.30749417554031!3d27.702282876185564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18544a7dbc15%3A0xc93a82d71dacef29!2sTwo%20Four%20Six%20Impex%20Pvt.%20Ltd.!5e1!3m2!1sen!2snp!4v1752166387567!5m2!1sen!2snp" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
      </div>
    </div>
  );
};

export default MapEmbed;
