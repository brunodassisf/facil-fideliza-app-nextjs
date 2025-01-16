const ProgressBar: React.FC = () => {
  return (
    <div className="w-full h-screen fixed top-0 left-0 bg-white/60 z-50">
      <div className="w-full">
        <div className="h-1.5 w-full bg-pink-100 overflow-hidden">
          <div className="progress w-full h-full bg-blue-700 left-right"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
