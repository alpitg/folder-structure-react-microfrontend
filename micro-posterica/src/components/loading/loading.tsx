import "./loading.scss";

const LoadingApp = () => {
  return (
    <div className="loading-app">
      <div className="loading-section">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        <div className="loading-text">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingApp;
