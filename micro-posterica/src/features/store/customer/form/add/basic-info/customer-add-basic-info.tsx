import type { ICustomer } from "../../../interface/customer.model";
import { useFormContext } from "react-hook-form";

const CustomerBasicInfo = () => {
  const { register } = useFormContext<ICustomer>();

  return (
    <div className="flex-column flex-lg-row-auto w-100 w-xl-350px mb-5">
      <div className="card mb-5 mb-xl-8">
        <div className="card-body pt-15">
          {/* Name */}
          <div className="fv-row mb-7">
            <label htmlFor="name" className="required fs-6 fw-semibold mb-2">
              <i className="bi bi-person me-2"></i> Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter customer name"
              {...register("name")}
              className="form-control form-control-solid"
            />
          </div>

          {/* Email */}
          <div className="fv-row mb-7">
            <label htmlFor="email" className="fs-6 fw-semibold mb-2">
              <i className="bi bi-envelope me-2"></i>
              <span className="required">Email</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email address"
              {...register("email")}
              className="form-control form-control-solid"
            />
          </div>

          {/* Description */}
          <div className="fv-row mb-15">
            <label htmlFor="description" className="fs-6 fw-semibold mb-2">
              <i className="bi bi-card-text me-2"></i> Description
            </label>
            <input
              type="text"
              id="description"
              placeholder="Enter description (optional)"
              {...register("description")}
              className="form-control form-control-solid"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerBasicInfo;
