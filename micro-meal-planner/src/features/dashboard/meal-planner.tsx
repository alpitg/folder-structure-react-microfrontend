import type {
  Meal,
  MealPlannerProps,
} from "../meal-planner/interfaces/meal-planner.model";

const meals: Meal[] = [
  {
    name: "Aloo Paratha",
    type: "Breakfast",
    servings: 2,
    cookingTime: 30,
    ingredients: ["Potato", "Onion"],
    recipe: [
      "1. Boil and mash 2 potatoes, mix with finely chopped onion and salt",
      "2. Knead whole wheat flour with water to make dough",
      "3. Divide dough into balls and fill with potato mixture",
      "4. Roll into flat bread and cook on hot griddle until golden",
      "5. Serve with pickle or yogurt",
    ],
  },
  {
    name: "Paneer Tomato Rice",
    type: "Lunch",
    servings: 2,
    cookingTime: 35,
    ingredients: ["Paneer", "Tomato", "Onion", "Rice"],
    recipe: [
      "1. Cube paneer into small pieces",
      "2. Finely chop onions and tomatoes",
      "3. Heat oil, sauté onions until golden",
      "4. Add chopped tomatoes and cook until soft",
      "5. Add boiled rice, paneer cubes, and salt to taste",
      "6. Mix well and cook for 3-4 minutes",
      "7. Garnish with fresh cilantro and serve hot",
    ],
  },
  {
    name: "Aloo Tomato Curry",
    type: "Dinner",
    servings: 2,
    cookingTime: 25,
    ingredients: ["Potato", "Tomato", "Onion"],
    recipe: [
      "1. Cut potatoes into small cubes",
      "2. Chop onions and tomatoes finely",
      "3. Heat oil and sauté chopped onions until golden",
      "4. Add potato cubes and cook for 5 minutes",
      "5. Add tomatoes and salt, cook covered for 10 minutes",
      "6. Stir occasionally until potatoes are soft",
      "7. Serve hot as a side dish with rice or bread",
    ],
  },
];

const MealPlannerApp = ({
  maidMode = {
    enabled: false,
    language: "none",
    lessSpicy: false,
    easyCook: false,
  },
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
                    <span className="badge bg-light-success text-success fw-semibold me-2">
                      {meal.type}
                    </span>
                    <h5 className="fw-bold text-gray-800 mb-0">{meal.name}</h5>
                  </div>
                </div>
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
                        className="badge bg-light-info text-info fw-semibold"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recipe Steps */}
                <div className="mb-4">
                  <h6 className="fw-bold text-gray-800 mb-3">Recipe Steps</h6>
                  <div className="fs-7 text-gray-600 lh-lg">
                    {meal.recipe.map((step, idx) => (
                      <div key={idx} className="mb-2">
                        {formatRecipeStep(step)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Easy to Cook Badge */}
                <div className="p-3 bg-light-success rounded">
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <span className="badge bg-success me-2">
                      {maidModeEnabled && maidMode.easyCook
                        ? "Easy to cook today"
                        : "Easy"}
                    </span>
                    <span className="fs-7 fw-semibold text-success">
                      Perfect for home cooking
                      {maidModeEnabled ? " with maid-friendly steps" : ""}
                    </span>
                    {maidModeEnabled && maidMode.lessSpicy && (
                      <span className="badge bg-warning text-dark">
                        Less spicy
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="card-footer border-0 pt-0">
                <button className="btn btn-sm btn-primary w-100">
                  View Recipe Details
                </button>
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
