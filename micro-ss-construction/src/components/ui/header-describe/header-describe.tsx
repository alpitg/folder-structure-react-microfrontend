import "./header-describe.scss";

interface HeaderDescribeProps {
  header: string;
  headerSize?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  [key: string]: any;
}

const MicroHeaderDescribe: React.FC<HeaderDescribeProps> = ({
  header,
  headerSize = "h3",
  children,
  ...rest
}) => {
  const HeaderTag = headerSize;

  return (
    <div className="micro-header-describe">
      <HeaderTag {...rest} className="header">
        {header}
      </HeaderTag>
      {children}
    </div>
  );
};

export default MicroHeaderDescribe;
