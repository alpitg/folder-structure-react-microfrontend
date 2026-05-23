import "./meal-scheduler.scss";

import React, { useEffect, useState } from "react";

import type { DayMeals } from "../../meal-planner/interfaces/meal-request.model";
import { useGetWeeklyMealsQuery } from "../../../app/redux/meal-planner/meal-request.api";

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

  return (
    <div className="meal-scheduler-app container-fluid py-4">
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
                  <div className="card-body">
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
                              <span className="badge bg-light-primary text-primary mb-2">
                                {meal.type}
                              </span>

                              <h6 className="fw-semibold mb-1">{meal.name}</h6>
                            </div>

                            <span className="badge bg-light border ms-2 fw-semibold">
                              ⏱️ {meal.cookingTime} mins
                            </span>
                            {meal.isPinned && (
                              <span className="badge">
                                <i className="bi bi-pin-angle-fill me-1"></i>
                              </span>
                            )}
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MealScheduler;
