const serverErrorIcon = "/static/media/img/svg/server-error-1.svg";

const SomethingWentWrongPage = ({ children }: { children?: any }) => {
  return (
    <div className="text-center py-5">
      <img src={serverErrorIcon} style={{ maxHeight: "200px" }} />
      <p className="text-muted m-4">
        Something went wrong on our side. Please try again later.
      </p>
      {children}
    </div>
  );
};

export default SomethingWentWrongPage;
