import type { ShoppingItem } from "./weekly-meal-planner";

interface ShoppingListProps {
  items: ShoppingItem[];
}

const ShoppingList = ({ items }: ShoppingListProps) => {
  const groupedItems = items.reduce((acc, item) => {
    const key = item.name.toLowerCase();
    if (!acc[key]) {
      acc[key] = { ...item };
    } else {
      acc[key].quantity += item.quantity;
      acc[key].totalCost += item.totalCost;
    }
    return acc;
  }, {} as Record<string, ShoppingItem>);

  const listItems = Object.values(groupedItems);

  return (
    <div className="card shadow-sm h-100">
      <div className="card-header border-0 bg-light">
        <h5 className="fw-bold text-gray-800 mb-0">Weekly Shopping List</h5>
      </div>
      <div className="card-body">
        <p className="fs-7 text-gray-600 mb-6">
          Consolidated ingredient quantities for the full week.
        </p>

        <div className="table-responsive">
          <table className="table table-row-dashed table-hover align-middle gy-4">
            <thead>
              <tr className="text-start text-gray-600 fw-semibold fs-7 text-uppercase">
                <th>Ingredient</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Estimated Cost</th>
              </tr>
            </thead>
            <tbody>
              {listItems.map((item) => (
                <tr key={item.id}>
                  <td className="fw-semibold text-gray-800">{item.name}</td>
                  <td>{item.quantity.toFixed(2)}</td>
                  <td>₹{item.pricePerUnit.toFixed(2)}</td>
                  <td>₹{item.totalCost.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
