"use client";

import { FaCartFlatbed } from "react-icons/fa6";
import { LuHandPlatter } from "react-icons/lu";

type RenderIconProps = {
  icon: string | null;
};

const RenderIcon: React.FC<RenderIconProps> = ({ icon }) => {
  const iconOptions = {
    PRODUCT: { text: "Produto", icon: <FaCartFlatbed /> },
    SERVICE: { text: "Serviço", icon: <LuHandPlatter /> },
  };

  return (
    <>
      {icon && (
        <div className="flex items-center gap-2 bg-gray-100 border border-gray-400 py-2 px-5 rounded-full w-fit my-2">
          {iconOptions[icon as keyof typeof iconOptions].icon}
          {iconOptions[icon as keyof typeof iconOptions].text}
        </div>
      )}
    </>
  );
};

export default RenderIcon;
