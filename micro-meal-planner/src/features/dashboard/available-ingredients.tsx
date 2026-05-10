import { useState } from "react";

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  addedDate: string;
}

const AvailableIngredientsApp = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    unit: "kg",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter an ingredient name");
      return;
    }

    if (!formData.quantity.trim()) {
      alert("Please enter quantity");
      return;
    }

    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      quantity: formData.quantity.trim(),
      unit: formData.unit,
      addedDate: new Date().toLocaleDateString(),
    };

    setIngredients((prev) => [newIngredient, ...prev]);
    setFormData({
      name: "",
      quantity: "",
      unit: "kg",
    });
  };

  const handleDeleteIngredient = (id: string) => {
    setIngredients((prev) => prev.filter((ing) => ing.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all ingredients?")) {
      setIngredients([]);
    }
  };

  return (
    <div>
      <h1 className="fw-semibold text-gray-800 mb-2">Available Ingredients</h1>
      <p className="fs-6 fw-semibold text-gray-600 mb-8">
        Manage your kitchen inventory by adding ingredients and quantities
      </p>

      <div className="row gy-5">
        {/* Form Card */}
        <div className="col-lg-5">
          <div className="card shadow-sm h-100">
            <div className="card-header border-0 bg-light">
              <h5 className="fw-bold text-gray-800 mb-0">Add New Ingredient</h5>
            </div>

            <div className="card-body">
              <form onSubmit={handleAddIngredient}>
                {/* Ingredient Name */}
                <div className="mb-4">
                  <label className="form-label fw-semibold text-gray-800 mb-2">
                    Ingredient Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-control form-control-solid"
                    placeholder="e.g., Potato, Paneer, Rice"
                  />
                </div>

                {/* Quantity */}
                <div className="mb-4">
                  <label className="form-label fw-semibold text-gray-800 mb-2">
                    Quantity <span className="text-danger">*</span>
                  </label>
                  <div className="row g-2">
                    <div className="col-8">
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="form-control form-control-solid"
                        placeholder="Enter quantity"
                        step="0.1"
                      />
                    </div>
                    <div className="col-4">
                      <select
                        name="unit"
                        value={formData.unit}
                        onChange={handleInputChange}
                        className="form-select form-select-solid"
                      >
                        <option value="kg">kg</option>
                        <option value="gm">gm</option>
                        <option value="ltr">ltr</option>
                        <option value="ml">ml</option>
                        <option value="pc">pc</option>
                        <option value="box">box</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm fw-semibold"
                  >
                    <span className="indicator-label">Add Ingredient</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Ingredients List */}
        <div className="col-lg-7">
          <div className="card shadow-sm">
            <div className="card-header border-0 bg-light d-flex justify-content-between align-items-center">
              <h5 className="fw-bold text-gray-800 mb-0">
                Ingredients List ({ingredients.length})
              </h5>
              {ingredients.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="btn btn-sm btn-light-danger fw-semibold"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="card-body">
              {ingredients.length === 0 ? (
                <div className="text-center py-10">
                  <div className="mb-3">
                    <svg
                      className="w-100px h-100px text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m0 0h6m0 0h6"
                      />
                    </svg>
                  </div>
                  <p className="fs-6 fw-semibold text-gray-600">
                    No ingredients added yet
                  </p>
                  <p className="fs-7 text-gray-500">
                    Add your first ingredient using the form on the left
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="fw-bold text-gray-800">Ingredient</th>
                        <th className="fw-bold text-gray-800">Quantity</th>
                        <th className="fw-bold text-gray-800">Added</th>
                        <th className="fw-bold text-gray-800">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ingredients.map((ingredient) => (
                        <tr key={ingredient.id}>
                          <td>
                            <span className="badge bg-light-info text-info fw-bold">
                              {ingredient.name}
                            </span>
                          </td>
                          <td>
                            <span className="fw-semibold text-gray-800">
                              {ingredient.quantity} {ingredient.unit}
                            </span>
                          </td>
                          <td>
                            <span className="fs-7 text-gray-600">
                              {ingredient.addedDate}
                            </span>
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                handleDeleteIngredient(ingredient.id)
                              }
                              className="btn btn-sm btn-icon btn-light-danger"
                              title="Delete ingredient"
                            >
                              <span className="svg-icon svg-icon-muted">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Summary Card */}
          {ingredients.length > 0 && (
            <div className="card card-flush bg-light-success mt-5">
              <div className="card-body">
                <h6 className="fw-bold text-gray-800 mb-3">Summary</h6>
                <div className="row">
                  <div className="col-6">
                    <div className="d-flex flex-column">
                      <span className="fs-7 fw-semibold text-gray-600 mb-1">
                        Total Ingredients
                      </span>
                      <span className="fs-3 fw-bold text-success">
                        {ingredients.length}
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex flex-column">
                      <span className="fs-7 fw-semibold text-gray-600 mb-1">
                        Last Added
                      </span>
                      <span className="fs-7 fw-semibold text-success">
                        {ingredients[0]?.addedDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailableIngredientsApp;
