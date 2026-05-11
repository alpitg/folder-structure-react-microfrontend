import type {
  IMealRequest,
  IMealRequestOptions,
  PlanOption,
} from "../meal-planner/interfaces/meal-request.model";
import { useEffect, useState } from "react";

import MealPlannerApp from "./meal-planner";
import { useCreateMealRequestMutation } from "../../app/redux/meal-planner/meal-request.api";

const MealRequestApp = () => {
  const [planOption, setPlanOption] = useState<PlanOption>("today");
  const [options, setOptions] = useState<IMealRequestOptions>({
    vegNonVeg: "veg",
    region: "north",
    highProtein: false,
    quickCooking: false,
    maidModeEnabled: false,
    maidVoiceLanguage: "none",
    maidLessSpicy: false,
    maidEasyCook: false,
  });

  const [createMealRequest, { isLoading: isPlanLoading }] =
    useCreateMealRequestMutation();

  const [submitted, setSubmitted] = useState(false);
  const [showPlanner, setShowPlanner] = useState(false);

  const handlePlanChange = (value: PlanOption) => {
    setPlanOption(value);
  };

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const name = target.name;
    const value = target.value;
    const type = target.type;
    const checked = target instanceof HTMLInputElement ? target.checked : false;

    setOptions((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setSubmitted(true);
  //   setShowPlanner(false);
  //   setLoading(true);
  // };

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitted(true);
      setShowPlanner(false);

      const payload: IMealRequest = {
        planOption,
        ...options,
      };

      const response = await createMealRequest(payload).unwrap();
      // additional 2 second loader
      await wait(2000);

      setShowPlanner(true);
      console.log("Meal Request Success:", response);
    } catch (error) {
      console.error("Meal Request Error:", error);

      setSubmitted(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setShowPlanner(false);
    setPlanOption("today");
    setOptions({
      vegNonVeg: "veg",
      region: "north",
      highProtein: false,
      quickCooking: false,
      maidModeEnabled: false,
      maidVoiceLanguage: "none",
      maidLessSpicy: false,
      maidEasyCook: false,
    });
  };

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-4 mb-8">
        <div>
          <h1 className="fw-semibold text-gray-800 mb-2">Meal Request</h1>

          <p className="fs-6 fw-semibold text-gray-600 mb-2">
            Submit your meal request and view a plan tailored to your choice.
          </p>
        </div>
        {/* <div className="d-flex flex-wrap gap-3">
          <Link
            to={ROUTE_URL.MEAL_PLANNER.DASHBOARD}
            className="btn btn-light btn-sm"
          >
            Go to Dashboard
          </Link>
        </div> */}
      </div>

      {!showPlanner || isPlanLoading ? (
        <div className="row gy-5">
          <div className="col-xl-7">
            <div className="card shadow-sm">
              <div className="card-header border-0 bg-light">
                <h5 className="fw-bold text-gray-800 mb-0">Request Form</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="form-label fw-semibold text-gray-800 mb-3 d-block">
                      Choose plan type
                    </label>
                    <div className="row gx-3 gy-3">
                      {[
                        { value: "today", label: "Today’s plan" },
                        { value: "breakfast", label: "Breakfast only" },
                        { value: "lunch", label: "Lunch only" },
                        { value: "dinner", label: "Dinner only" },
                      ].map((option) => (
                        <div key={option.value} className="col-sm-6">
                          <label className="d-flex align-items-center rounded border p-3 cursor-pointer">
                            <input
                              type="radio"
                              name="planOption"
                              value={option.value}
                              checked={planOption === option.value}
                              onChange={() =>
                                handlePlanChange(option.value as PlanOption)
                              }
                              className="form-check-input me-3"
                            />
                            <span className="fw-semibold text-gray-700">
                              {option.label}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="form-label fw-semibold text-gray-800 mb-3 d-block">
                      Customize request (optional)
                    </label>
                    <div className="row gx-3 gy-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold text-gray-700 mb-2">
                          Veg / Non-Veg
                        </label>
                        <select
                          name="vegNonVeg"
                          value={options.vegNonVeg}
                          onChange={handleOptionChange}
                          className="form-select form-select-solid"
                        >
                          <option value="veg">Veg</option>
                          <option value="non-veg">Non-Veg</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold text-gray-700 mb-2">
                          Cuisine Preference
                        </label>
                        <select
                          name="region"
                          value={options.region}
                          onChange={handleOptionChange}
                          className="form-select form-select-solid"
                        >
                          <option value="north">North Indian</option>
                          <option value="south">South Indian</option>
                        </select>
                      </div>
                    </div>

                    <div className="row gx-3 gy-3 mt-4">
                      <div className="col-md-6">
                        <label className="form-check form-check-custom form-check-solid">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="highProtein"
                            checked={options.highProtein}
                            onChange={handleOptionChange}
                          />
                          <span className="form-check-label ms-3">
                            High protein
                          </span>
                        </label>
                      </div>
                      <div className="col-md-6">
                        <label className="form-check form-check-custom form-check-solid">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="quickCooking"
                            checked={options.quickCooking}
                            onChange={handleOptionChange}
                          />
                          <span className="form-check-label ms-3">
                            Quick cooking
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="mt-5">
                      <label className="form-check form-check-custom form-check-solid">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="maidModeEnabled"
                          checked={options.maidModeEnabled}
                          onChange={handleOptionChange}
                        />
                        <span className="form-check-label ms-3">
                          Enable Maid Mode
                        </span>
                      </label>
                    </div>

                    {options.maidModeEnabled && (
                      <div className="row gx-3 gy-4 mt-4">
                        <div className="col-md-6">
                          <label className="form-label fw-semibold text-gray-700 mb-2">
                            Voice instructions
                          </label>
                          <select
                            name="maidVoiceLanguage"
                            value={options.maidVoiceLanguage}
                            onChange={handleOptionChange}
                            className="form-select form-select-solid"
                          >
                            <option value="none">No voice</option>
                            <option value="hindi">Hindi</option>
                            <option value="marathi">Marathi</option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label className="form-check form-check-custom form-check-solid d-flex align-items-center justify-content-between">
                            <span className="form-check-label ms-3">
                              Less spicy option
                            </span>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="maidLessSpicy"
                              checked={options.maidLessSpicy}
                              onChange={handleOptionChange}
                            />
                          </label>
                        </div>
                        <div className="col-12">
                          <label className="form-check form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="maidEasyCook"
                              checked={options.maidEasyCook}
                              onChange={handleOptionChange}
                            />
                            <span className="form-check-label ms-3">
                              Easy to cook today
                            </span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="d-flex flex-wrap gap-3">
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm fw-semibold"
                    >
                      Submit Request
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn btn-light btn-sm fw-semibold"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-xl-5">
            <div className="card shadow-sm h-100">
              <div className="card-header border-0 bg-light">
                <h5 className="fw-bold text-gray-800 mb-0">Preview</h5>
              </div>
              <div className="card-body">
                <div className="mb-4">
                  <span className="badge bg-primary me-2 text-uppercase">
                    {planOption === "today" ? "Today’s plan" : planOption}
                  </span>
                </div>
                <div className="mb-4">
                  <h6 className="fw-semibold text-gray-800">
                    Optional filters
                  </h6>
                  <div className="d-flex flex-column gap-2 mt-3">
                    <span className="badge bg-light-info text-info">
                      {options.vegNonVeg === "veg"
                        ? "Vegetarian"
                        : "Non-Vegetarian"}
                    </span>
                    <span className="badge bg-light-success text-success">
                      {options.region === "north"
                        ? "North Indian"
                        : "South Indian"}
                    </span>
                    {options.highProtein && (
                      <span className="badge bg-light-warning text-warning">
                        High protein
                      </span>
                    )}
                    {options.quickCooking && (
                      <span className="badge bg-light-primary text-primary">
                        Quick cooking
                      </span>
                    )}
                    {options.maidModeEnabled && (
                      <span className="badge bg-light-success text-success">
                        Maid Mode enabled
                      </span>
                    )}
                    {options.maidVoiceLanguage !== "none" && (
                      <span className="badge bg-light-dark text-gray-700">
                        {options.maidVoiceLanguage === "hindi"
                          ? "Hindi voice"
                          : "Marathi voice"}
                      </span>
                    )}
                    {options.maidLessSpicy && (
                      <span className="badge bg-light-warning text-warning">
                        Less spicy
                      </span>
                    )}
                    {options.maidEasyCook && (
                      <span className="badge bg-light-primary text-primary">
                        Easy to cook today
                      </span>
                    )}
                    {!options.highProtein &&
                      !options.quickCooking &&
                      !options.maidModeEnabled && (
                        <span className="text-gray-500 fs-7">
                          No optional filters selected
                        </span>
                      )}
                  </div>
                </div>
                <div className="rounded border border-dashed border-gray-300 p-4 bg-light">
                  <p className="fs-7 text-gray-600 mb-2">What happens next?</p>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">• Submit your meal request</li>
                    <li className="mb-2">• Show loader for 2 seconds</li>
                    <li className="mb-0">• Display the Meal Planner</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {submitted && !showPlanner && (
            <div className="col-12">
              <div className="card shadow-sm border-dashed border-gray-300">
                <div className="card-body d-flex flex-column align-items-center justify-content-center py-12">
                  <div
                    className="spinner-border text-primary mb-4"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <h5 className="fw-bold text-gray-800 mb-2">
                    Preparing your meal plan
                  </h5>
                  <p className="text-gray-600 mb-0">
                    This will take just a moment.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="card shadow-sm mb-6">
            <div className="card-body">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
                <div>
                  <h4 className="fw-bold text-gray-800 mb-2">
                    Your Meal Planner is ready
                  </h4>
                  <p className="fs-6 text-gray-600 mb-0">
                    Requested:{" "}
                    {planOption === "today" ? "Today's plan" : planOption} •{" "}
                    {options.vegNonVeg === "veg" ? "Veg" : "Non-Veg"} •{" "}
                    {options.region === "north"
                      ? "North Indian"
                      : "South Indian"}{" "}
                    {options.highProtein ? "• High protein" : ""}{" "}
                    {options.quickCooking ? "• Quick cooking" : ""}
                    {options.maidModeEnabled
                      ? ` • Maid Mode (${options.maidVoiceLanguage !== "none" ? (options.maidVoiceLanguage === "hindi" ? "Hindi" : "Marathi") : "voice optional"})`
                      : ""}
                    {options.maidLessSpicy ? " • Less spicy" : ""}{" "}
                    {options.maidEasyCook ? " • Easy to cook" : ""}
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="btn btn-light btn-sm fw-semibold"
                >
                  <i className="bi bi-plus-lg me-1"></i>
                  Create new request
                </button>
              </div>
            </div>
          </div>
          <MealPlannerApp
            maidMode={{
              enabled: options.maidModeEnabled,
              language: options.maidVoiceLanguage,
              lessSpicy: options.maidLessSpicy,
              easyCook: options.maidEasyCook,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MealRequestApp;
