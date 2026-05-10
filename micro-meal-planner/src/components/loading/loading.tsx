import "./loading.scss";

const LoadingApp = () => {
  return (
    <div className="loading-app">
      <div className="loading-section">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        <div className="loading-text">
          <span className="spinner-border spinner-border-sm align-middle me-2"></span>
          Loading...
        </div>
      </div>
    </div>
  );
};

export default LoadingApp;
