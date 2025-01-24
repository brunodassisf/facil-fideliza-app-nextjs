const StyleTag: React.FC<{
  bgColor: string | null;
  textColor: string | null;
}> = ({ bgColor, textColor }) => {
  return (
    <style type="text/css">
      {`
          body {
            background-color: ${bgColor || "#83cbff"};
            color: ${textColor || "#000"};
          }

          .bg-tag {
            background-color: ${bgColor || "#83cbff"} !important;
          }

          .text-tag {
            color: ${textColor || "#000"} !important;
          }

          .border-tag {
            border-color: ${textColor || "#000"} !important;
          }

          .bg-tag {
            background-color: ${bgColor || "#83cbff"} !important;
          }
          
          .btn {
            background-color: ${bgColor || "#83cbff"} !important;
            color: ${textColor || "#000"};
          }

          .btn-outlined {
            border: 1px solid ${bgColor || "#83cbff"} !important;
            background-color: #ffffff !important;
            color: ${bgColor || "#83cbff"} !important;
          }
        `}
    </style>
  );
};

export default StyleTag;
