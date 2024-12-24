import "./header-describe.scss";

const MicroHeaderDescribe = (props: any) => {
  const { header, children } = props;
  return (
    <div className="micro-header-describe">
      <h2 className="header">{header}</h2>
      {children}
    </div>
  );
};

export default MicroHeaderDescribe;
