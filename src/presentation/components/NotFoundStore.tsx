import { FaFaceSadTear } from "react-icons/fa6";

export default function NotFoundStore() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <FaFaceSadTear size={48} className="mb-5 text-tag" />
      <h3 className="text-xl font-bold">Ops</h3>
      <h5>Loja não encontrada</h5>
    </div>
  );
}
