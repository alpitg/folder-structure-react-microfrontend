import "./meal-scheduler.scss";

import React, { useState } from "react";

export interface Meal {
  name: string;
  type: string;
  servings: number;
  cookingTime: number;
  ingredients: string[];
  recipe?: string[];
  youtubeLink?: YoutubeLink[];
  isPinned?: boolean;
}

export interface YoutubeLink {
  title?: string;
  url?: string;
}

interface DayMeals {
  day: string;
  meals: Meal[];
}

const mealOptions: Meal[] = [
  {
    name: "Moong Dal Chilla with Mint Curd",
    type: "Breakfast",
    servings: 2,
    cookingTime: 20,
    ingredients: ["Moong dal", "Curd", "Mint chutney"],
    youtubeLink: [
      {
        title: "Moong Dal Chilla Recipe",
        url: "https://www.youtube.com/results?search_query=moong+dal+chilla+recipe",
      },
    ],
    isPinned: true,
  },
  {
    name: "Paneer Bhurji with Multigrain Roti",
    type: "Lunch",
    servings: 2,
    cookingTime: 30,
    ingredients: ["Paneer", "Tomato", "Onion", "Multigrain flour"],
    youtubeLink: [
      {
        title: "Paneer Bhurji Healthy Recipe",
        url: "https://www.youtube.com/results?search_query=paneer+bhurji+healthy+recipe",
      },
    ],
  },
  {
    name: "Fruit and Nut Yogurt Bowl",
    type: "Snacks",
    servings: 1,
    cookingTime: 5,
    ingredients: ["Curd", "Banana", "Apple", "Almonds"],
    youtubeLink: [
      {
        title: "Healthy Yogurt Fruit Bowl",
        url: "https://www.youtube.com/results?search_query=healthy+yogurt+fruit+bowl",
      },
    ],
  },
  {
    name: "Vegetable Millet Pulao",
    type: "Dinner",
    servings: 2,
    cookingTime: 30,
    ingredients: ["Millet", "Beans", "Carrot", "Peas"],
    youtubeLink: [
      {
        title: "Healthy Millet Pulao",
        url: "https://www.youtube.com/results?search_query=healthy+millet+pulao+recipe",
      },
    ],
  },
];

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
  const [weekMeals, setWeekMeals] = useState(initialWeek);

  const handleAddMeal = (dayIndex: number) => {
    const randomMeal =
      mealOptions[Math.floor(Math.random() * mealOptions.length)];

    const updated = [...weekMeals];

    updated[dayIndex].meals.push({
      ...randomMeal,
    });

    setWeekMeals(updated);
  };

  return (
    <div className="meal-scheduler-app container-fluid py-4">
      <div className="meal-scheduler-scroll">
        <div className="row flex-nowrap gx-4">
          {weekMeals.map((dayData, dayIndex) => (
            <div
              key={dayData.day}
              className="col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3"
            >
              <div className="card day-card h-100 border-0 shadow-sm">
                {/* Header */}
                <div className="card-header border-0 bg-white pb-0">
                  <h5 className="fw-bold text-center mb-0">{dayData.day}</h5>
                </div>

                {/* Body */}
                <div className="card-body">
                  {/* Meals */}
                  {dayData.meals.map((meal, idx) => (
                    <div
                      key={`${meal.name}-${idx}`}
                      className="meal-item hover-lift card border-0 shadow-sm mb-3"
                    >
                      <div className="card-body">
                        {/* Top */}
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div>
                            <span className="badge bg-light-primary text-primary mb-2">
                              {meal.type}
                            </span>

                            <h6 className="fw-bold mb-1">{meal.name}</h6>
                          </div>

                          {meal.isPinned && (
                            <span className="badge bg-warning text-dark">
                              <i className="bi bi-pin-angle-fill me-1"></i>
                              Pinned
                            </span>
                          )}
                        </div>

                        {/* Meta */}
                        <div className="d-flex flex-wrap gap-2 mb-3">
                          <span className="badge bg-light text-dark border">
                            👥 {meal.servings} Servings
                          </span>

                          <span className="badge bg-light text-dark border">
                            ⏱️ {meal.cookingTime} mins
                          </span>
                        </div>

                        {/* Ingredients */}
                        <div className="mb-3">
                          <small className="text-muted fw-semibold d-block mb-2">
                            Ingredients
                          </small>

                          <div className="d-flex flex-wrap gap-2">
                            {meal.ingredients.map((ingredient, index) => (
                              <span
                                key={index}
                                className="badge bg-light-success text-success"
                              >
                                {ingredient}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Youtube */}
                        {meal.youtubeLink && meal.youtubeLink.length > 0 && (
                          <div>
                            <small className="text-muted fw-semibold d-block mb-2">
                              Videos
                            </small>

                            {meal.youtubeLink.map((video, index) => (
                              <a
                                key={index}
                                href={video.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="youtube-link d-flex align-items-center text-decoration-none mb-2"
                              >
                                <i className="bi bi-youtube text-danger me-2"></i>

                                <span className="small text-dark">
                                  {video.title}
                                </span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add Meal */}
                  <div
                    className="add-meal-box"
                    onClick={() => handleAddMeal(dayIndex)}
                  >
                    <div className="text-center">
                      <i className="bi bi-plus-lg add-icon mb-2"></i>

                      <div className="fw-semibold">Add Meal</div>

                      <small className="text-muted">
                        Breakfast, Lunch, Snacks...
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealScheduler;
