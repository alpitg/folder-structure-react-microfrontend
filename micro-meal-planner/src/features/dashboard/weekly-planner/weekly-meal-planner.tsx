import EstimatedCost from "./estimated-cost";
import ShoppingList from "./shopping-list";

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalCost: number;
  mealDay: string;
  useFor: string;
}

const weeklyShoppingItems: ShoppingItem[] = [
  { id: "1", name: "Potato", quantity: 4, unit: "kg", pricePerUnit: 30, totalCost: 120, mealDay: "Monday", useFor: "Aloo Paratha" },
  { id: "2", name: "Onion", quantity: 2.5, unit: "kg", pricePerUnit: 40, totalCost: 100, mealDay: "Tuesday", useFor: "Paneer Tomato Rice" },
  { id: "3", name: "Tomato", quantity: 2, unit: "kg", pricePerUnit: 50, totalCost: 100, mealDay: "Wednesday", useFor: "Aloo Tomato Curry" },
  { id: "4", name: "Rice", quantity: 3, unit: "kg", pricePerUnit: 70, totalCost: 210, mealDay: "Thursday", useFor: "Paneer Tomato Rice" },
  { id: "5", name: "Paneer", quantity: 1, unit: "kg", pricePerUnit: 250, totalCost: 250, mealDay: "Friday", useFor: "Paneer Tomato Rice" },
  { id: "6", name: "Green Chili", quantity: 0.2, unit: "kg", pricePerUnit: 120, totalCost: 24, mealDay: "Saturday", useFor: "Aloo Tomato Curry" },
  { id: "7", name: "Coriander", quantity: 0.1, unit: "kg", pricePerUnit: 80, totalCost: 8, mealDay: "Sunday", useFor: "Aloo Paratha" },
];

const WeeklyMealPlannerApp = () => {
  return (
    <div>
      <div className="row gy-5">
        <div className="col-xl-8">
          <ShoppingList items={weeklyShoppingItems} />
        </div>
        <div className="col-xl-4">
          <EstimatedCost items={weeklyShoppingItems} />
        </div>
      </div>

      <div className="row mt-8">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-4">
                <div>
                  <h3 className="fw-bold text-gray-800">Weekly Planner Summary</h3>
                  <p className="text-gray-600 mb-0">
                    Use this shopping list and cost estimate to buy groceries for the week and keep meal planning on track.
                  </p>
                </div>
                <div>
                  <span className="badge bg-primary">7 day plan</span>
                  <span className="badge bg-success ms-2">Budget ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyMealPlannerApp;
