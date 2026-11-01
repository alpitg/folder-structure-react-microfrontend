import { FormProvider, useForm } from "react-hook-form";
import type { ILead, ILeadForm } from "../list/interfaces/leads.model";
import React, { useEffect, useState } from "react";
import {
  SOURCE_OPTIONS,
  STATUS_LABELS,
  STATUS_ORDER,
} from "../list/leads.constants";
import {
  useAddLeadMutation,
  useUpdateLeadMutation,
} from "../../../app/redux/crm/leads/leads.api";

import { useAutoFocus } from "../../../hooks/use-auto-focus";

interface LeadsFormProps {
  mode: "add" | "edit";
  lead: ILead | null;
  handleClose: () => void;
}

const EMPTY_FORM: ILeadForm = {
  name: "",
  company: "",
  email: "",
  mobile: "",
  source: "",
  status: "new",
  value: 0,
  owner: "",
  description: "",
  isActive: true,
};

const toFormValues = (lead: ILead | null): ILeadForm =>
  lead
    ? {
        name: lead.name ?? "",
        company: lead.company ?? "",
        email: lead.email ?? "",
        mobile: lead.mobile ?? "",
        source: lead.source ?? "",
        status: lead.status ?? "new",
        value: lead.value ?? 0,
        owner: lead.owner ?? "",
        description: lead.description ?? "",
        isActive: lead.isActive ?? true,
      }
    : EMPTY_FORM;

const LeadsFormApp: React.FC<LeadsFormProps> = ({
  mode,
  lead,
  handleClose,
}) => {
  const getInitials = (name?: string): string =>
    (name ?? "")
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const [submitError, setSubmitError] = useState<string | null>(null);

  const methods = useForm<ILeadForm>({ defaultValues: toFormValues(lead) });
  const {
    handleSubmit,
    reset,
    watch,
    register,
    setValue,
    formState: { errors },
  } = methods;

  //#region RTK APIs
  const [addLead, { isLoading: isAdding }] = useAddLeadMutation();
  const [updateLead, { isLoading: isUpdating }] = useUpdateLeadMutation();
  //#endregion

  const isSaving = isAdding || isUpdating;

  const inputRef = useAutoFocus<HTMLInputElement>();

  const name = watch("name");
  const status = watch("status");

  const { ref: nameRef, ...nameField } = register("name", {
    required: "Lead name is required",
    validate: (value) => !!value?.trim() || "Lead name is required",
  });

  // Modal can stay mounted, so reload the form whenever another lead is picked
  useEffect(() => {
    reset(toFormValues(lead));
    setSubmitError(null);
  }, [lead, reset]);

  const onSubmit = async (values: ILeadForm) => {
    setSubmitError(null);
    const payload: ILeadForm = { ...values, name: values.name.trim() };

    try {
      if (mode === "edit" && lead?.id) {
        await updateLead({ id: lead.id, data: payload }).unwrap();
      } else {
        await addLead(payload).unwrap();
      }
      handleClose(); // list refetches via tag invalidation
    } catch (error) {
      console.error("Failed to save lead", error);
      setSubmitError(
        "We couldn't save this lead. Please check the details and try again.",
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="leads-form-app"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h3 className="mb-6">
          {mode === "edit" ? "Edit lead" : "Add new lead"}
        </h3>

        <div className="lead-info-form-app">
          <div className="row">
            {/* Avatar */}
            <div className="col-sm-3 text-center mb-5 mt-5">
              <div
                className="bg-light-primary rounded-circle d-flex align-items-center justify-content-center mx-auto"
                style={{ width: 128, height: 128 }}
                aria-hidden="true"
              >
                {getInitials(name) ? (
                  <span className="fs-1 fw-bold text-primary">
                    {getInitials(name)}
                  </span>
                ) : (
                  <i className="bi bi-person fs-2x text-primary"></i>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="col-sm-9">
              {/* Lead name */}
              <div className="mb-5">
                <label htmlFor="LeadName" className="form-label required">
                  <i className="bi bi-person me-2"></i>
                  Lead name
                </label>
                <input
                  id="LeadName"
                  type="text"
                  maxLength={128}
                  className={`form-control form-control-solid ${errors?.name ? "is-invalid" : ""}`}
                  placeholder="Enter lead name"
                  {...nameField}
                  ref={(e) => {
                    nameRef(e); // connect RHF (React Hook Form)
                    inputRef.current = e; // keep local ref
                  }}
                />
                {errors?.name && (
                  <div className="invalid-feedback">{errors.name.message}</div>
                )}
              </div>

              {/* Company */}
              <div className="mb-5">
                <label htmlFor="LeadCompany" className="form-label">
                  <i className="bi bi-building me-2"></i>
                  Company
                </label>
                <input
                  id="LeadCompany"
                  type="text"
                  maxLength={128}
                  className="form-control form-control-solid"
                  placeholder="Enter company name"
                  {...register("company")}
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <label className="form-label">
            <i className="bi bi-flag me-2"></i>
            Status
          </label>
          <div className="d-flex flex-wrap gap-3 mb-5">
            {STATUS_ORDER.map((item) => (
              <button
                key={item}
                type="button"
                className={`btn btn-outline btn-outline-dashed btn-active-light-primary text-start ${
                  item === status ? "active" : ""
                }`}
                onClick={() => setValue("status", item, { shouldDirty: true })}
                aria-pressed={item === status}
              >
                {STATUS_LABELS[item]}
              </button>
            ))}
          </div>

          {/* Email */}
          <div className="mb-5">
            <label htmlFor="LeadEmail" className="form-label">
              <i className="bi bi-envelope me-2"></i>
              Email address
            </label>
            <input
              id="LeadEmail"
              type="email"
              maxLength={256}
              className={`form-control form-control-solid ${errors?.email ? "is-invalid" : ""}`}
              placeholder="lead@example.com"
              {...register("email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors?.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          {/* Mobile */}
          <div className="mb-5">
            <label htmlFor="LeadMobile" className="form-label">
              <i className="bi bi-phone me-2"></i>
              Mobile number
            </label>
            <input
              id="LeadMobile"
              type="text"
              maxLength={32}
              className="form-control form-control-solid"
              placeholder="e.g. +91 98765 43210"
              {...register("mobile")}
            />
          </div>

          <div className="row">
            {/* Source */}
            <div className="col-sm-6 mb-5">
              <label htmlFor="LeadSource" className="form-label">
                <i className="bi bi-megaphone me-2"></i>
                Source
              </label>
              <select
                id="LeadSource"
                className="form-select form-select-solid"
                {...register("source")}
              >
                <option value="">Select source</option>
                {SOURCE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Owner */}
            <div className="col-sm-6 mb-5">
              <label htmlFor="LeadOwner" className="form-label">
                <i className="bi bi-person-badge me-2"></i>
                Owner
              </label>
              <input
                id="LeadOwner"
                type="text"
                maxLength={128}
                className="form-control form-control-solid"
                placeholder="Assigned sales person"
                {...register("owner")}
              />
            </div>
          </div>

          {/* Value */}
          <div className="mb-5">
            <label htmlFor="LeadValue" className="form-label">
              <i className="bi bi-currency-rupee me-2"></i>
              Expected value
            </label>
            <input
              id="LeadValue"
              type="number"
              min={0}
              step="any"
              className={`form-control form-control-solid ${errors?.value ? "is-invalid" : ""}`}
              placeholder="0"
              {...register("value", {
                setValueAs: (value) =>
                  value === "" || value == null ? 0 : Number(value),
                min: { value: 0, message: "Value can't be negative" },
              })}
            />
            {errors?.value && (
              <div className="invalid-feedback">{errors.value.message}</div>
            )}
          </div>

          {/* Description */}
          <div className="mb-5">
            <label htmlFor="LeadDescription" className="form-label">
              <i className="bi bi-card-text me-2"></i>
              Notes
            </label>
            <textarea
              id="LeadDescription"
              rows={3}
              maxLength={1000}
              className="form-control form-control-solid"
              placeholder="Requirements, budget, preferred timeline…"
              {...register("description")}
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="LeadIsActive"
              {...register("isActive")}
            />
            <label className="form-check-label" htmlFor="LeadIsActive">
              Active
            </label>
          </div>
        </div>

        {submitError && (
          <div className="alert alert-danger mt-4" role="alert">
            {submitError}
          </div>
        )}

        <div className="d-flex justify-content-end gap-3 mt-6">
          <button
            type="button"
            className="btn btn-light"
            onClick={handleClose}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSaving}>
            {isSaving && (
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
            )}
            {mode === "edit" ? "Save changes" : "Add lead"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default LeadsFormApp;
