import { FormProvider, useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router";
import {
  useAddCustomerMutation,
  useGetCustomerDetailQuery,
  useUpdateCustomerMutation,
} from "../../../../../app/redux/customer/customer.api";

import CustomerAddressForm from "./address/customer-add-address";
import CustomerBasicInfo from "./basic-info/customer-add-basic-info";
import CustomerHeaderApp from "../../header/customer-header";
import type { ICustomer } from "../../interface/customer.model";
import { ROUTE_URL } from "../../../../../components/auth/constants/routes.const";
import { useEffect } from "react";

type CustomerFormAppProps = {
  mode: "add" | "edit";
  defaultValues?: ICustomer; // passed in edit mode
};

const CustomerAddFormApp = ({ mode, defaultValues }: CustomerFormAppProps) => {
  const isEditMode = mode === "edit";
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  //#region RTK APIs
  const [addCustomer, { isLoading: isAddInProgress, isSuccess: isAddSuccess }] =
    useAddCustomerMutation();

  const [
    updateCustomer,
    { isLoading: isUpdateInProgress, isSuccess: isUpdateSuccess },
  ] = useUpdateCustomerMutation();

  const { data: customerData, isLoading: isCustomerLoading } =
    useGetCustomerDetailQuery(id!, {
      skip: !isEditMode || !id,
    });

  const isLoading = isAddInProgress || isUpdateInProgress;
  const isSuccess = isAddSuccess || isUpdateSuccess;
  //#endregion

  const methods = useForm<ICustomer>({
    defaultValues: defaultValues || {
      name: "",
      email: "",
      description: "",
      addresses: [],
      isActive: true,
    },
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = (formData: ICustomer) => {
    if (isEditMode && id) {
      updateCustomer({ id, data: formData });
    } else {
      addCustomer(formData);
    }
  };

  // Navigate after add or update
  useEffect(() => {
    if (isSuccess) {
      navigate(ROUTE_URL.CUSTOMER.LIST, { state: { refresh: true } });
    }
  }, [isSuccess, navigate]);

  // If editing, set values from API response
  useEffect(() => {
    if (isEditMode && (defaultValues || customerData)) {
      reset(defaultValues || customerData);
    }
  }, [isEditMode, defaultValues, customerData, reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="customer-form-app">
          <CustomerHeaderApp
            header={isEditMode ? "Edit Customer" : "Add Customer"}
            description={
              isEditMode
                ? "Update existing customer details."
                : "Create a new customer."
            }
          >
            <NavLink to={ROUTE_URL.CUSTOMER.LIST}>
              <span className="btn btn-light btn-active-secondary btn-sm me-5">
                <i className="bi bi-chevron-left fs-5"></i>
                Back to Customer List
              </span>
            </NavLink>

            <button
              type="submit"
              className="btn btn-sm btn-flex btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner-border spinner-border-sm align-middle me-2"></span>
              ) : (
                <i className="bi bi-check2 fs-3"></i>
              )}
              Save changes
            </button>
          </CustomerHeaderApp>

          <div className="form d-flex flex-column flex-xl-row">
            {/* Basic Info */}
            <CustomerBasicInfo />

            {/* Addresses (Shipping / Billing) */}
            <div className="flex-lg-row-fluid ms-lg-10">
              <CustomerAddressForm />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CustomerAddFormApp;
