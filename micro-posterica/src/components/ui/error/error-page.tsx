import errorImage from "/static/media/img/svg/error-404.svg";

const ErrorPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: "20px",
        paddingTop: "10rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>
        Oops! Something went wrong.
      </h1>
      <p style={{ color: "#6c757d" }}>
        We're sorry, the page you're looking for cannot be found.
      </p>

      <img
        src={errorImage}
        alt="Error"
        style={{ maxWidth: "300px", marginBottom: "20px" }}
      />
    </div>
  );
};

export default ErrorPage;
