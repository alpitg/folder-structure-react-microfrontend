import "./loader.scss";

import preloader from "/images/icons/preloader.gif"; // Adjust the path as needed

const MicroLoader = () => {
  return (
    <div className="micro-loader">
      <img src={preloader} alt="Loading..." />
    </div>
  );
};

export default MicroLoader;
