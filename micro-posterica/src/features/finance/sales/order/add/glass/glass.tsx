import { useFormContext } from "react-hook-form";

type GlassSectionProps = {
  index: number;
  glassTypes: { id: string; name: string; rate: number; rateIn: string }[];
};

const GlassSection: React.FC<GlassSectionProps> = ({ index, glassTypes }) => {
  const { register, watch } = useFormContext();

  const isGlassEnabled = watch(
    `order.items.${index}.customizedDetails.glass.isEnabled`
  );
  const selectedGlass = watch(
    `order.items.${index}.customizedDetails.glass.type`
  );

  return (
    <div className="col-md-6 mb-5 border border-gray-300 border-dashed rounded py-3 px-4 ms-1">
      <br />
      <div className="row g-3">
        {/* Toggle Glass Option */}
        <div className="col-md-12">
          <label className="form-check form-switch form-check-custom form-check-solid">
            <input
              className="form-check-input"
              type="checkbox"
              id={`glass-${index}`}
              {...register(
                `order.items.${index}.customizedDetails.glass.isEnabled` as const
              )}
            />
            <span className="form-check-label">Glass</span>
          </label>
        </div>

        {/* Glass Type Options */}
        {isGlassEnabled && (
          <div className="col-md-12">
            {glassTypes.map((glass) => (
              <label
                key={`${glass.id}-${index}`}
                className={`btn btn-outline btn-outline-dashed btn-active-light-primary d-flex flex-stack text-start p-6 mb-5 g-3 ${
                  selectedGlass === glass.name ? "active" : ""
                }`}
              >
                <div className="d-flex align-items-center me-2">
                  <div className="form-check form-check-custom form-check-solid form-check-primary me-6">
                    <input
                      className="form-check-input"
                      type="radio"
                      value={glass.name}
                      {...register(
                        `order.items.${index}.customizedDetails.glass.type` as const
                      )}
                    />
                  </div>

                  <div className="flex-grow-1">
                    <h2 className="d-flex align-items-center fs-3 fw-bold flex-wrap">
                      {glass.name}
                    </h2>
                    <div className="fw-semibold opacity-50">
                      ₹ {glass.rate} / {glass.rateIn}
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlassSection;
