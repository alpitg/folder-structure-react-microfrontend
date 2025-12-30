import { useForm } from "react-hook-form";

interface IInvoiceSettingForm {
  legalName: string;
  address: string;
  vatGstNo: string;
}

export default function InvoiceSettingApp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInvoiceSettingForm>();

  const onSubmit = (data: IInvoiceSettingForm) => {
    console.log(data);
  };

  return (
    <div className="card card-flush">
      <div className="card-header border-0 cursor-pointer" role="button">
        <div className="card-title m-0">
          <h3 className="fw-bold m-0">Invoice</h3>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12">
              <label className="col-form-label">Legal Name</label>
              <input
                {...register("legalName")}
                className="form-control form-control-solid"
                placeholder="Legal Name"
              />
              {errors.legalName && (
                <div className="text-danger">{errors.legalName.message}</div>
              )}
            </div>

            <div className="col-sm-12">
              <label className="col-form-label">Address</label>
              <textarea
                {...register("address")}
                id="Address"
                rows={5}
                className="form-control form-control-solid"
                placeholder="Address"
                maxLength={256}
              />
              {errors.address && (
                <div className="text-danger">{errors.address.message}</div>
              )}
            </div>

            <div className="col-sm-12">
              <label className="col-form-label">VAT/GST No</label>
              <input
                {...register("vatGstNo")}
                className="form-control form-control-solid"
                placeholder="VAT/GST No"
              />
              {errors.vatGstNo && (
                <div className="text-danger">{errors.vatGstNo.message}</div>
              )}
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-end py-6 px-9">
          <button type="submit" className="btn btn-primary btn-sm">
            <i className="bi bi-check2 fs-3 me-2" />
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}
