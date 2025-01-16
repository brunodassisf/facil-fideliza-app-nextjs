export const Spinner: React.FC = () => {
  return (
    <div className="fixed flex justify-center items-center bg-white/70 w-full h-full z-50">
      <div
        className="inline-block h-24 w-24 animate-spin rounded-full border-8 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-blue-600"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Spinner;
