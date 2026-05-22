import type {
  Meal,
  MealPlannerProps,
} from "../meal-planner/interfaces/meal-planner.model";

const MealPlannerApp = ({
  maidMode = {
    enabled: false,
    language: "none",
    lessSpicy: false,
    easyCook: false,
  },
  meals = [],
    handlePin = () => {},
}: MealPlannerProps) => {
  const maidModeEnabled = maidMode.enabled;

  const formatRecipeStep = (step: string) => {
    const simple = step.replace(/^\d+\.\s*/, "");
    if (!maidModeEnabled) return step;
    return simple.length > 70 ? `${simple.slice(0, 70).trim()}...` : simple;
  };

  return (
    <div>
      {maidModeEnabled && (
        <div className="mb-6 rounded-3 border border-success bg-light-success p-4">
          <div className="d-flex flex-column gap-2">
            <span className="badge bg-success">Maid Mode</span>
            <p className="mb-0 text-gray-700">
              Simple cooking steps,{" "}
              {maidMode.language === "hindi"
                ? "Hindi"
                : maidMode.language === "marathi"
                  ? "Marathi"
                  : "Voice"}{" "}
              instructions, {maidMode.lessSpicy ? "less spicy" : "normal spice"}{" "}
              and{" "}
              {maidMode.easyCook ? "easy to cook today" : "balanced cooking"}.
            </p>
          </div>
        </div>
      )}

      <div className="row gy-5">
        {meals.map((meal, index) => (
          <div key={index} className="col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-header border-0 bg-light">
                <div className="d-flex align-items-center">
                  <div>
                    <span className="badge bg-light-primary text-primary fw-semibold me-2">
                      {meal.type}
                    </span>
                    <h5 className="fw-bold text-gray-800 mb-0">{meal.name}</h5>
                  </div>
                </div>
                {/* <button
                  type="button"
                  className={`btn btn-sm ${
                    meal?.isPinned ? "btn-warning" : "btn-outline-secondary"
                  }`}
                  onClick={() => handlePin(meal)}
                >
                  <i className="bi bi-pin-angle-fill me-1"></i>
                  {meal?.isPinned ? "Pinned" : "Pin"}
                </button> */}
              </div>

              <div className="card-body">
                {/* Cooking Info */}
                <div className="mb-4 p-3 bg-light-primary rounded">
                  <div className="row">
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <span className="fs-7 fw-semibold text-gray-500">
                          Cooking Time
                        </span>
                        <span className="fs-4 fw-bold text-primary">
                          {meal.cookingTime} mins
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <span className="fs-7 fw-semibold text-gray-500">
                          Servings
                        </span>
                        <span className="fs-4 fw-bold text-primary">
                          {meal.servings}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ingredients */}
                <div className="mb-4">
                  <h6 className="fw-bold text-gray-800 mb-3">Ingredients</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {meal.ingredients.map((ingredient, idx) => (
                      <span
                        key={idx}
                        className="badge bg-light-success text-success fw-semibold"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card-footer border-0 pt-0">
                <div className="row g-3">
                  {meal?.youtubeLink?.map((link, idx) => (
                    <div
                      key={idx}
                      className="col-12 col-sm-6 col-lg-6 col-xl-6"
                    >
                      <div className="p-3 border rounded h-100 d-flex align-items-start gap-2">
                        <div className="flex-shrink-0">
                          <div className="avatar-sm">
                            <span className="avatar-title bg-light text-danger rounded">
                              <i className="bi bi-youtube font-16 text-danger"></i>
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-grow-1">
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted text-decoration-none d-block"
                          >
                            Watch Recipe {idx + 1}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="recipe-details mt-3">
                  <button
                    className="btn btn-sm btn-primary w-100"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#recipeCollapse-${index}`}
                    aria-expanded="false"
                    aria-controls={`recipeCollapse-${index}`}
                  >
                    View Recipe Details
                  </button>

                  {/* Recipe Steps */}
                  <div className="collapse" id={`recipeCollapse-${index}`}>
                    <div className="mb-4 mt-3">
                      <div className="fs-7 text-gray-600 lh-lg">
                        {meal.recipe.map((step, idx) => (
                          <div key={idx} className="mb-2">
                            {formatRecipeStep(step)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="row mt-8">
        <div className="col-12">
          <div className="card bg-light-info">
            <div className="card-body">
              <h5 className="fw-bold text-gray-800 mb-3">Daily Summary</h5>
              <div className="row">
                <div className="col-md-4">
                  <div className="d-flex flex-column">
                    <span className="fs-7 fw-semibold text-gray-600">
                      Total Cook Time
                    </span>
                    <span className="fs-3 fw-bold text-info">
                      {meals.reduce((sum, meal) => sum + meal.cookingTime, 0)}{" "}
                      mins
                    </span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex flex-column">
                    <span className="fs-7 fw-semibold text-gray-600">
                      Ingredients Used
                    </span>
                    <span className="fs-3 fw-bold text-info">5</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex flex-column">
                    <span className="fs-7 fw-semibold text-gray-600">
                      Difficulty Level
                    </span>
                    <span className="fs-3 fw-bold text-success">Easy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlannerApp;
