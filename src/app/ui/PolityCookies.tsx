"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Button } from "@/presentation/components";
import { FaCookieBite } from "react-icons/fa6";
import Link from "next/link";

export default function PolityCookies() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookieConsent = Cookies.get("cookieConsent");
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookieConsent", "true", { expires: 3 });
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="flex flex-col justify-start items-start gap-2 px-4 fixed bottom-0 left-0 w-full opacity-0 animate-fade-in pb-2 pt-5 bg-tag border-t-4 border-tag">
      <div className="flex gap-4 items-center">
        <FaCookieBite size={24} />
        <h6 className="text-2xl">Este site utiliza cookies</h6>
      </div>
      <div className="flex gap-5 py-3">
        <p className="text-lg text-gray-700">
          Nós utilizamos cookies para melhorar sua experiência de navegação,
          personalizar conteúdo e anúncios, oferecer funcionalidades de redes
          sociais e analisar nosso tráfego. Para mais informações sobre quais
          cookies utilizamos e como eles são usados, consulte nossa
          <Link
            href="/politica-de-privacidade"
            className="ml-1 font-bold text-xl"
          >
            Política de Privacidade.
          </Link>
        </p>
        <Button variant="outlined" onClick={handleAccept}>
          Aceitar
        </Button>
      </div>
    </div>
  );
}
