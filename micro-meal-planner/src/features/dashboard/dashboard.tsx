import AvailableIngredientsApp from "./available-ingredients";
import MealRequestApp from "./meal-request";

const DashboardApp = () => {
  return (
    <div>
      <div className="row mb-8">
        <AvailableIngredientsApp />
      </div>
      <div className="row mb-8">
        <MealRequestApp />
      </div>
    </div>
  );
};

export default DashboardApp;
