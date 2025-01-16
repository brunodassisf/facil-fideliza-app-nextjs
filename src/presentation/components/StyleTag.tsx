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

          .text-tag {
            color: ${bgColor || "#000"};
          }

          .bg-tag {
            background-color: ${bgColor || "#83cbff"};
          }
          
          .btn {
            background-color: ${bgColor || "#83cbff"};
            color: ${textColor || "#000"};
          }

          .btn-outlined {
            border: 1px solid ${bgColor || "#83cbff"};
            background-color: #ffffff;
            color: ${bgColor || "#83cbff"};
          }
        `}
    </style>
  );
};

export default StyleTag;
