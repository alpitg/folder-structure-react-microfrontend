import "./meal-scheduler.scss";

import React, { useEffect, useState } from "react";
import {
  useCreateMealMutation,
  useDeleteMealMutation,
  useGenerateMealMutation,
  useGetWeeklyMealsQuery,
} from "../../../app/redux/meal-planner/meal-request.api";

import type { DayMeals } from "../../meal-planner/interfaces/meal-request.model";
import type { Meal } from "../../meal-planner/interfaces/meal-planner.model";
import ModelApp from "../../../components/ui/model/model";

const initialWeek: DayMeals[] = [
  { day: "Monday", meals: [] },
  { day: "Tuesday", meals: [] },
  { day: "Wednesday", meals: [] },
  { day: "Thursday", meals: [] },
  { day: "Friday", meals: [] },
  { day: "Saturday", meals: [] },
  { day: "Sunday", meals: [] },
];

const MealScheduler = () => {
  const [weekMeals, setWeekMeals] = useState<DayMeals[]>(initialWeek);

  /* API */
  const { data: weeklyMeals, isLoading, isFetching } = useGetWeeklyMealsQuery();
  const [generateMeal, { isLoading: isMealGenerating }] =
    useGenerateMealMutation();
  const [createMeal, { isLoading: isMealCreating }] = useCreateMealMutation();

  const [deleteMeal] = useDeleteMealMutation();

  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");

  const [mealForm, setMealForm] = useState<any>({
    name: "",
    type: "",
    cookingTime: "",
    servings: "",
    ingredients: "",
    recipe: "",
    youtubeLink: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);

  /* Populate Week Meals */
  useEffect(() => {
    if (!weeklyMeals || weeklyMeals.length === 0) return;

    /**
     * EXPECTED API FORMAT:
     * [
     *   {
     *     day: "Monday",
     *     meals: [...]
     *   }
     * ]
     */

    setWeekMeals(weeklyMeals as DayMeals[]);
  }, [weeklyMeals]);

  const handleShareMeal = async (meal: any) => {
    const videoLinks =
      meal.youtubeLink
        ?.map(
          (video: any, index: number) =>
            `${index + 1}. ${video.title}\n${video.url}`,
        )
        .join("\n\n") || "";

    const shareText = `
        🍽️ ${meal.name}

        Type: ${meal.type}
        Cooking Time: ${meal.cookingTime} mins
        Servings: ${meal.servings}

        Ingredients:
        ${meal.ingredients?.join(", ")}

        ${videoLinks ? `Videos:\n${videoLinks}` : ""}
    `.trim();

    try {
      /* Mobile Native Share */
      if (navigator.share) {
        await navigator.share({
          title: meal.name,
          text: shareText,
        });

        return;
      }

      /* Desktop Fallback */
      await navigator.clipboard.writeText(shareText);

      alert("Meal copied to clipboard");
    } catch (error) {
      console.error("Share failed", error);
    }
  };

  const handleRemoveMeal = async (meal: Meal) => {
    try {
      await deleteMeal(meal?.id ?? "").unwrap();

      setWeekMeals((prev) =>
        prev.map((day) => ({
          ...day,
          meals: day.meals.filter((meal: any) => meal.id !== meal?.id),
        })),
      );
    } catch (error) {
      console.error("Failed to remove meal", error);
    }
  };

  const handleOpenAddMeal = (day: string) => {
    setSelectedDay(day);

    setMealForm({
      name: "",
      type: "",
      cookingTime: "",
      servings: "",
      ingredients: "",
      recipe: "",
      youtubeLink: "",
    });

    setShowModal(true);
  };

  const handleGenerateMeal = async () => {
    try {
      setIsGenerating(true);

      const response = await generateMeal().unwrap();

      setMealForm({
        name: response.name || "",
        type: response.type || "",
        cookingTime: response.cookingTime || "",
        servings: response.servings || "",
        ingredients: response.ingredients?.join(", ") || "",
        recipe: response.recipe?.join("\n") || "",
        youtubeLink:
          response.youtubeLink?.map((v: any) => v.url).join(", ") || "",
      });
    } catch (error) {
      console.error("AI generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveMeal = async () => {
    try {
      const payload = {
        day: selectedDay,
        name: mealForm.name,
        type: mealForm.type,
        cookingTime: Number(mealForm.cookingTime),
        servings: Number(mealForm.servings),
        ingredients: mealForm.ingredients
          .split(",")
          .map((i: string) => i.trim()),
        recipe: mealForm.recipe.split("\n").map((r: string) => r.trim()),
        youtubeLink: mealForm.youtubeLink.split(",").map((url: string) => ({
          title: "Recipe Video",
          url: url.trim(),
        })),
      };

      const createdMeal = await createMeal(payload).unwrap();

      setWeekMeals((prev) =>
        prev.map((day) =>
          day.day === selectedDay
            ? {
                ...day,
                meals: [...day.meals, createdMeal],
              }
            : day,
        ),
      );

      setShowModal(false);
    } catch (error) {
      console.error("Failed to save meal", error);
    }
  };

  return (
    <div className="meal-scheduler-app container-fluid px-0 py-0">
      {/* Loading */}
      {(isLoading || isFetching) && (
        <div className="text-center py-10">
          <div className="spinner-border text-primary mb-3" role="status" />

          <h5 className="fw-bold mb-1">Loading Weekly Meals...</h5>

          <p className="text-muted mb-0">Preparing your healthy weekly plan</p>
        </div>
      )}

      {/* Weekly Meals */}
      {!isLoading && !isFetching && (
        <div className="meal-scheduler-scroll">
          <div className="row flex-nowrap gx-4">
            {weekMeals.map((dayData, dayIndex) => (
              <div
                key={`${dayData.day}-${dayIndex}`}
                className="col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3"
              >
                <div className="card day-card border-0 shadow-sm h-100">
                  {/* Header */}
                  <div className="card-header border-0 pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="fw-bold mb-0">{dayData.day}</h5>

                      <span className="badge bg-light-primary text-primary ms-2 fw-semibold">
                        {dayData.meals?.length || 0} Meals
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="card-body p-4 pt-0">
                    {/* Meals */}
                    {dayData.meals?.map((meal, mealIndex) => (
                      <div
                        key={`${meal.name}-${mealIndex}`}
                        className="card meal-item hover-lift shadow-sm mb-3"
                      >
                        <div className="card-body p-6">
                          {/* Top */}
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                              {meal.isPinned && (
                                <span className="badge cursor-pointer">
                                  <i className="bi bi-pin-angle-fill me-1"></i>
                                </span>
                              )}
                              <span className="badge bg-light-primary text-primary mb-2">
                                {meal.type}
                              </span>

                              <h6 className="fw-semibold mb-1">{meal.name}</h6>
                            </div>
                            <div className="d-flex gap-2">
                              <span className="badge bg-light border ms-2 fw-semibold">
                                ⏱️ {meal.cookingTime} mins
                              </span>

                              <span
                                className="badge cursor-pointer"
                                onClick={() => handleShareMeal(meal)}
                              >
                                <i className="bi bi-share me-1"></i>
                              </span>

                              <span
                                className="badge cursor-pointer"
                                onClick={() => handleRemoveMeal(meal)}
                              >
                                <i className="bi bi-x fs-1 text-danger"></i>
                              </span>
                            </div>
                          </div>

                          {/* Ingredients */}
                          <div className="mb-3">
                            <div className="d-flex flex-wrap gap-2">
                              {meal.ingredients?.map(
                                (ingredient, ingredientIndex) => (
                                  <span
                                    key={ingredientIndex}
                                    className="badge bg-light-success text-success"
                                  >
                                    {ingredient}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>

                          {/* Recipe */}
                          {meal.recipe && meal.recipe.length > 0 && (
                            <div className="mb-3">
                              <small className="text-muted fw-semibold d-block mb-2">
                                Recipe
                              </small>

                              <ol className="ps-3 mb-0">
                                {meal.recipe.map((step, stepIndex) => (
                                  <li
                                    key={stepIndex}
                                    className="small text-gray-700 mb-1"
                                  >
                                    {step}
                                  </li>
                                ))}
                              </ol>
                            </div>
                          )}

                          {/* YouTube */}
                          {meal.youtubeLink && meal.youtubeLink.length > 0 && (
                            <div>
                              <div className="row g-2">
                                {meal.youtubeLink.map((video, videoIndex) => (
                                  <div key={videoIndex} className="col-12">
                                    <a
                                      href={video.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="youtube-link d-flex align-items-center text-decoration-none p-2"
                                    >
                                      <i className="bi bi-youtube text-danger me-2 fs-5"></i>

                                      <span className="small fw-medium">
                                        {video.title}
                                      </span>
                                    </a>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Empty State */}
                    {(!dayData.meals || dayData.meals.length === 0) && (
                      <div className="add-meal-box">
                        <div className="text-center">
                          <i className="bi bi-calendar2-plus add-icon mb-2"></i>

                          <div className="fw-semibold">No Meals Planned</div>

                          <small className="text-muted">
                            Weekly meals will appear here
                          </small>
                        </div>
                      </div>
                    )}

                    <div
                      className="add-meal-box mt-3"
                      onClick={() => handleOpenAddMeal(dayData.day)}
                    >
                      <div className="text-center">
                        <i className="bi bi-plus-circle fs-1 text-primary"></i>

                        <div className="fw-semibold mt-2">Add Meal</div>

                        <small className="text-muted">
                          Generate or create a new meal
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showModal && (
        <ModelApp onClose={() => setShowModal(false)} show={showModal}>
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Add Meal</h5>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <input
                  className="form-control"
                  placeholder="Meal Name"
                  value={mealForm.name}
                  onChange={(e) =>
                    setMealForm({
                      ...mealForm,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6">
                <input
                  className="form-control"
                  placeholder="Type"
                  value={mealForm.type}
                  onChange={(e) =>
                    setMealForm({
                      ...mealForm,
                      type: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6">
                <input
                  className="form-control"
                  placeholder="Cooking Time"
                  value={mealForm.cookingTime}
                  onChange={(e) =>
                    setMealForm({
                      ...mealForm,
                      cookingTime: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6">
                <input
                  className="form-control"
                  placeholder="Servings"
                  value={mealForm.servings}
                  onChange={(e) =>
                    setMealForm({
                      ...mealForm,
                      servings: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-12">
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Ingredients comma separated"
                  value={mealForm.ingredients}
                  onChange={(e) =>
                    setMealForm({
                      ...mealForm,
                      ingredients: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-12">
                <textarea
                  className="form-control"
                  rows={4}
                  placeholder="Recipe steps line separated"
                  value={mealForm.recipe}
                  onChange={(e) =>
                    setMealForm({
                      ...mealForm,
                      recipe: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-12">
                <input
                  className="form-control"
                  placeholder="Youtube Links comma separated"
                  value={mealForm.youtubeLink}
                  onChange={(e) =>
                    setMealForm({
                      ...mealForm,
                      youtubeLink: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-light-primary"
                onClick={handleGenerateMeal}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Generating...
                  </>
                ) : (
                  <>✨ Magic Generate</>
                )}
              </button>

              <button className="btn btn-primary" onClick={handleSaveMeal}>
                Save Meal
              </button>
            </div>
          </div>
        </ModelApp>
      )}
    </div>
  );
};

export default MealScheduler;
