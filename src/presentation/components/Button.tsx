import { Button, ButtonProps } from "@mui/material";

type CoreButtonProps = {
  children: React.ReactNode;
} & ButtonProps;

const CoreButton: React.FC<CoreButtonProps> = ({
  children,
  variant = "contained",
  className,
  ...props
}) => {
  const switchVariant = () => {
    switch (variant) {
      case "contained":
        return "btn";
      case "outlined":
        return "btn-outlined";
      default:
        return "btn";
    }
  };

  return (
    <div className={className}>
      <Button variant={variant} className={`${switchVariant()}`} {...props}>
        {children}
      </Button>
    </div>
  );
};

export default CoreButton;
