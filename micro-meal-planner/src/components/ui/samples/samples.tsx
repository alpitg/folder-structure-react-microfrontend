const SamplesApp = () => {
  return (
    <div className="table-responsive">
      <table className="table table-row-dashed table-row-gray-300 align-middle text-center gy-4">
        <thead>
          <tr className="fw-bold fs-6 text-dark border-0 bg-light">
            <th className="min-w-200px text-start rounded-start"></th>
            <th className="min-w-140px">Regular</th>
            <th className="min-w-120px">Multiple</th>
            <th className="min-w-100px rounded-end">Extended</th>
          </tr>
        </thead>
        <tbody className="border-bottom border-dashed">
          <tr className="fw-semibold fs-6 text-dark">
            <td className="text-start ps-6 fs-5">
              Number of end products or domains
            </td>
            <td>1</td>
            <td>Unlimited</td>
            <td>1</td>
          </tr>
          <tr>
            <td className="text-start ps-6 fw-semibold fs-5 text-dark">
              Free end product
            </td>
            <td>
              <i className="bi bi-check-lg fs-3 text-success"></i>
            </td>
            <td>
              <i className="bi bi-check-lg fs-3 text-success"></i>
            </td>
            <td>
              <i className="bi bi-check-lg fs-3 text-success"></i>
            </td>
          </tr>
          <tr>
            <td className="text-start ps-6 fw-semibold fs-5 text-dark">
              End product with paid services
            </td>
            <td>
              <i className="bi bi-x-lg fs-3 text-danger"></i>
            </td>
            <td>
              <i className="bi bi-x-lg fs-3 text-danger"></i>
            </td>
            <td>
              <i className="bi bi-check-lg fs-3 text-success"></i>
            </td>
          </tr>
          <tr>
            <td className="text-start ps-6 fw-semibold fs-5 text-dark">
              Use in derivative themes or “generators”
            </td>
            <td>
              <i className="bi bi-x-lg fs-3 text-danger"></i>
            </td>
            <td>
              <i className="bi bi-x-lg fs-3 text-danger"></i>
            </td>
            <td>
              <i className="bi bi-x-lg fs-3 text-danger"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SamplesApp;
