import { BsStars } from "react-icons/bs";
import { FaGifts } from "react-icons/fa6";

export default function StoreLogo() {
  return (
    <div
      className={`border-2 rounded-full w-24 h-24 border-tag relative flex justify-center items-center 
        
        
        `}
    >
      <FaGifts size={48} className="text-tag" />
      <BsStars size={48} className="text-tag absolute -top-3 -right-1 bg-tag" />
    </div>
  );
}
