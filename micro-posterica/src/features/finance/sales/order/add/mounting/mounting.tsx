import { useFormContext } from "react-hook-form";

type MountingSectionProps = {
  index: number;
};

const MountingSection: React.FC<MountingSectionProps> = ({ index }) => {
  const { register, watch } = useFormContext();

  const isMountingEnabled = watch(
    `order.items.${index}.customizedDetails.mounting.isEnabled`
  );

  return (
    <div className="col-md-6 mb-5 border border-gray-300 border-dashed rounded py-3 px-4 me-1">
      <br />
      <div className="row g-3">
        <div className="col-md-12">
          <label className="form-check form-switch form-check-custom form-check-solid">
            <input
              className="form-check-input"
              type="checkbox"
              id="mounting"
              {...register(
                `order.items.${index}.customizedDetails.mounting.isEnabled` as const
              )}
            />
            <span className="form-check-label">Mounting</span>
          </label>
        </div>

        <div className="col-md-12 d-flex flex-center">
          {isMountingEnabled && (
            <div className="mounting-component">
              <div className="outer-frame">
                <div className="inner-frame">
                  <div className="label top-label">
                    <input
                      type="number"
                      min={0}
                      className="form-control form-control-solid side-input"
                      placeholder="cm"
                      {...register(
                        `order.items.${index}.customizedDetails.mounting.top` as const,
                        {
                          valueAsNumber: true,
                        }
                      )}
                    />
                  </div>

                  <div className="label right-label">
                    <input
                      type="number"
                      min={0}
                      className="form-control form-control-solid side-input"
                      placeholder="cm"
                      {...register(
                        `order.items.${index}.customizedDetails.mounting.right` as const,
                        {
                          valueAsNumber: true,
                        }
                      )}
                    />
                  </div>

                  <div className="label bottom-label">
                    <input
                      type="number"
                      min={0}
                      className="form-control form-control-solid side-input"
                      placeholder="cm"
                      {...register(
                        `order.items.${index}.customizedDetails.mounting.bottom` as const,
                        {
                          valueAsNumber: true,
                        }
                      )}
                    />
                  </div>

                  <div className="label left-label">
                    <input
                      type="number"
                      min={0}
                      className="form-control form-control-solid side-input"
                      placeholder="cm"
                      {...register(
                        `order.items.${index}.customizedDetails.mounting.left` as const,
                        {
                          valueAsNumber: true,
                        }
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MountingSection;
