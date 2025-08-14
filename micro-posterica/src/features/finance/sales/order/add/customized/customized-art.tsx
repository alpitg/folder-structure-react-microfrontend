import {
  useFormContext,
  useWatch,
  type FieldArrayWithId,
} from "react-hook-form";
import MountingSection from "./mounting/mounting";
import GlassSection from "./glass/glass";
import type {
  IMiscCharge,
  IOrderInvoiceData,
} from "../../../../../../interfaces/order/order.model";
import type { IGlassType } from "../../../../../../app/features/master/glass-types/glass-types.slice";
import type { IFrameType } from "../../../../../../app/features/master/frame-types/frame-types.slice";
import { BillCalculation } from "../../../../../bills/utils/bill-calculation.util";
import { useEffect } from "react";

type CustomizedArtAppProps = {
  item: FieldArrayWithId<IOrderInvoiceData, "order.items", "id">;
  index: number;
  glassTypes: IGlassType[];
  frameTypes: IFrameType[];
  miscCharges: IMiscCharge[];
  removeItem: (index: number) => void;
};

const CustomizedArtApp: React.FC<CustomizedArtAppProps> = ({
  item,
  index,
  glassTypes,
  frameTypes,
  miscCharges,
}) => {
  const {
    watch,
    setValue,
    getValues,
    register,
    formState: { errors },
  } = useFormContext<IOrderInvoiceData>();

  /**
   * To track mounting changes in real time
   */
  const watchedMounting = useWatch({
    name: `order.items.${index}.customizedDetails.mounting`,
  });

  const watchedUnitPrice = useWatch({
    name: `order.items.${index}.unitPrice`,
  });

  const itemValue = getValues(`order.items.${index}`);

  const removeItemByIndex = (_id: string) => {
    console.log(_id);
    // Step 1: Get the current array
    const currentItems = getValues("order.items");

    // Step 2: Filter out the item you want to remove
    const updatedItems = currentItems.filter((item) => item._id !== _id);

    // Step 3: Set the updated array back to the form
    setValue("order.items", updatedItems, {
      shouldDirty: true,
    });

    // removeItem(index);
  };

  useEffect(() => {
    const item = getValues(`order.items.${index}`);

    const newUnitPrice = new BillCalculation(
      frameTypes,
      glassTypes,
      miscCharges
    ).unitPrice(item);

    const currentUnitPrice = getValues(`order.items.${index}.unitPrice`) || 0;

    if (
      Number(newUnitPrice.toFixed(2)) !== Number(currentUnitPrice.toFixed(2))
    ) {
      setValue(`order.items.${index}.unitPrice`, newUnitPrice, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [
    frameTypes,
    glassTypes,
    miscCharges,
    itemValue?.customizedDetails?.width,
    itemValue?.customizedDetails?.height,
    watchedMounting?.isEnabled,
    watchedMounting?.top,
    watchedMounting?.right,
    watchedMounting?.bottom,
    watchedMounting?.left,
    itemValue?.customizedDetails?.glass?.isEnabled,
    itemValue?.customizedDetails?.glass?.type,
    itemValue?.customizedDetails?.frame?.type,
    itemValue?.customizedDetails?.height,
    itemValue?.customizedDetails?.additional?.varnish,
    itemValue?.customizedDetails?.additional?.lamination,
    itemValue?.customizedDetails?.additional?.routerCut,
  ]);

  // const chargableArea = (item: ICustomizedDetails) => {
  //   const billDetails = new BillCalculation(
  //     frameTypes,
  //     glassTypes,
  //     miscCharges
  //   );

  //   const width = billDetails?.chargableWidth(item);
  //   const height = billDetails?.chargableHeight(item);

  //   const area = width * height;
  //   return `Chargable Area: width ${width} * height ${height} = ${area.toFixed(
  //     2
  //   )} cm²`;
  // };

  return (
    <div key={`'custom' + ${itemValue?._id}`}>
      <div className="py-3 d-flex flex-stack flex-wrap">
        <input
          type="hidden"
          {...register(`order.items.${index}._id`)}
          value={item._id}
        />

        <a
          className="d-flex align-items-center collapsible rotate collapsed w-75"
          data-bs-toggle="collapse"
          href={`#art-${itemValue?._id}`}
          role="button"
          aria-expanded="false"
          aria-controls={`art-${itemValue?._id}`}
        >
          <div className="me-3 rotate-90">
            <i className="bi-chevron-right fs-3"></i>
          </div>

          <span className="symbol symbol-50px me-3" aria-label="no-image">
            <span className="symbol-label"></span>
          </span>

          <div className="me-3">
            <div className="d-flex align-items-center">
              <div className="text-gray-800 fw-bold">
                {watch(`order.items.${index}.customizedDetails.name`) ||
                  `Art ${index + 1}`}
              </div>
              <div className="badge badge-light-primary ms-5">
                {`Quantity: `}
                {watch(`order.items.${index}.quantity`) || 0}
              </div>
              <div className="badge badge-light-primary ms-5">
                {`Unit Price: `}
                {watchedUnitPrice || 0}
              </div>
            </div>
            <div className="text-muted">
              {item?.customizedDetails?.description}
            </div>
          </div>
        </a>

        <div className="d-flex my-3 ms-9">
          <button
            type="button"
            className="btn btn-icon btn-active-light-danger w-30px h-30px me-3"
            aria-label="Delete"
            onClick={() => removeItemByIndex(itemValue?._id)}
          >
            <i className="bi bi-trash3 fs-3"></i>
          </button>
        </div>
      </div>

      <div id={`art-${itemValue?._id}`} className="fs-6 ps-10 py-4 collapse">
        <div className="row g-3 d-flex mb-3">
          <div className="col-sm-8">
            <input
              type="text"
              placeholder="Name"
              className={`form-control form-control-solid fs-6 fw-bold ${
                errors.order?.items?.[index]?.customizedDetails?.name
                  ? "is-invalid"
                  : ""
              }`}
              {...register(
                `order.items.${index}.customizedDetails.name` as const,
                { required: "Art name is required" }
              )}
            />
            <div className="invalid-feedback">
              {errors.order?.items?.[index]?.customizedDetails?.name?.message}
            </div>
          </div>

          <div className="col-sm-2">
            <input
              type="number"
              min={0}
              placeholder="Quantity"
              className={`form-control form-control-solid ${
                errors.order?.items?.[index]?.quantity ? "is-invalid" : ""
              }`}
              {...register(`order.items.${index}.quantity` as const, {
                required: "Product quantity required",
                valueAsNumber: true,
              })}
            />
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-4 mb-5">
            <input
              type="text"
              placeholder="Art Description"
              className="form-control form-control-solid"
              {...register(
                `order.items.${index}.customizedDetails.description` as const
              )}
            />
          </div>
          <div className="col-md-4 mb-5">
            <input
              type="number"
              min={0}
              placeholder="Width (cm)"
              className="form-control form-control-solid"
              {...register(
                `order.items.${index}.customizedDetails.width` as const,
                { valueAsNumber: true }
              )}
            />
          </div>
          <div className="col-md-4 mb-5">
            <input
              type="number"
              min={0}
              placeholder="Height (cm)"
              className="form-control form-control-solid"
              {...register(
                `order.items.${index}.customizedDetails.height` as const,
                { valueAsNumber: true }
              )}
            />
          </div>
        </div>

        <div className="flex d-flex flex-column flex-md-row mb-5">
          <MountingSection index={index} />
          <GlassSection index={index} glassTypes={glassTypes} />
        </div>

        <div className="row g-2 mb-5">
          <div className="col-md-4">
            <select
              className="form-select form-select-solid"
              {...register(
                `order.items.${index}.customizedDetails.frame.type` as const
              )}
            >
              <option value="">Select Frame Type</option>
              {frameTypes?.map((frame) => (
                <option
                  key={`${itemValue?._id}-${frame.id}`}
                  value={frame.name}
                >
                  {frame.name} {frame.category} - (₹{frame.baseCost})
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <input
              type="text"
              placeholder="Frame Color"
              className="form-control form-control-solid"
              {...register(
                `order.items.${index}.customizedDetails.frame.color` as const
              )}
            />
          </div>
        </div>

        <div className="row g-5">
          <div className="col-sm-4">
            <label className="form-check form-switch form-check-custom form-check-solid">
              <input
                className="form-check-input"
                type="checkbox"
                id={`varnish-${itemValue?._id}`}
                {...register(
                  `order.items.${index}.customizedDetails.additional.varnish` as const
                )}
              />
              <span className="form-check-label">Varnish</span>
            </label>
          </div>

          <div className="col-sm-4">
            <label className="form-check form-switch form-check-custom form-check-solid">
              <input
                className="form-check-input"
                type="checkbox"
                id={`lamination-${itemValue?._id}`}
                {...register(
                  `order.items.${index}.customizedDetails.additional.lamination` as const
                )}
              />
              <span className="form-check-label">Lamination</span>
            </label>
          </div>

          <div className="col-sm-4">
            <label className="form-check form-switch form-check-custom form-check-solid">
              <input
                className="form-check-input"
                type="checkbox"
                id={`routerCut-${itemValue?._id}`}
                {...register(
                  `order.items.${index}.customizedDetails.additional.routerCut` as const
                )}
              />
              <span className="form-check-label">Router Cut</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizedArtApp;
