import "./meal-scheduler.scss";

import React, { useState } from "react";

type MealType = "Tea" | "Coffee" | "Breakfast" | "Lunch" | "Snacks" | "Dinner";

interface MealItem {
  id: number;
  title: string;
  type: MealType;
}

interface DayMeals {
  day: string;
  meals: MealItem[];
}

const mealOptions: MealItem[] = [
  { id: 1, title: "Masala Tea", type: "Tea" },
  { id: 2, title: "Filter Coffee", type: "Coffee" },
  { id: 3, title: "Moong Dal Chilla", type: "Breakfast" },
  { id: 4, title: "Paneer Bhurji", type: "Lunch" },
  { id: 5, title: "Fruit Bowl", type: "Snacks" },
  { id: 6, title: "Dal Khichdi", type: "Dinner" },
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
      id: Date.now(),
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
              <div className="card shadow-sm border-0 day-card h-100">
                {/* Day Header */}
                <div className="card-header border-0 pb-0">
                  <h5 className="fw-bold mb-0 text-center">{dayData.day}</h5>
                </div>

                {/* Meals */}
                <div className="card-body">
                  {dayData.meals.map((meal) => (
                    <div
                      key={meal.id}
                      className="hover-lift card border-0 shadow-sm mb-3"
                    >
                      <div className="card-body py-3">
                        <span className="badge bg-light-primary text-primary mb-2">
                          {meal.type}
                        </span>

                        <h6 className="mb-0 fw-semibold">{meal.title}</h6>
                      </div>
                    </div>
                  ))}

                  {/* Add Meal Section */}
                  <div
                    className="add-meal-box"
                    onClick={() => handleAddMeal(dayIndex)}
                  >
                    <div className="text-center">
                      <i className="bi bi-plus-lg"></i>

                      <div className="fw-semibold">Add Meal</div>

                      <small className="text-muted">
                        Tea, Breakfast, Lunch, Snacks...
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
