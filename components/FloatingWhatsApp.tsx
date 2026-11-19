"use client";

import React from "react";
import { WhatsAppIcon } from "./Icons";

export default function FloatingWhatsApp() {
  const phoneNumber = "919152153555";
  const defaultMessage = encodeURIComponent(
    "Hello Green Shoots Wealth, I would like to speak with a wealth advisor regarding my portfolio."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <aside aria-label="WhatsApp quick contact" className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Green Shoots Wealth on WhatsApp: +91 91521 53555"
        className="flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-[0_6px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_10px_28px_rgba(37,211,102,0.55)] hover:scale-108 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        <WhatsAppIcon className="w-7 h-7 text-white" />
      </a>
    </aside>
  );
}
