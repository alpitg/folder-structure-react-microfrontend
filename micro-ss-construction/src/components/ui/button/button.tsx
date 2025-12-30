import "./button.scss";

interface MicroButtonProps {
  variant?: "primary" | "primary-alt" | "secondary" | "success" | "danger";
  children: React.ReactNode;
  [key: string]: any;
}

const MicroButton: React.FC<MicroButtonProps> = ({
  variant = "primary",
  children,
  ...rest
}) => {
  return (
    <div className={`micro-button ${variant}`}>
      <button {...rest}>{children}</button>
    </div>
  );
};

export default MicroButton;
