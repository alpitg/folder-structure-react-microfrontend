import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import type { IOrganizationUnitsData } from "../../interfaces/organization-units.model";
import ModelApp from "../../../../components/ui/model/model";
import OrganizationTreeFormApp from "./form/organization-tree-form";
import OrganizationTreeNodeApp from "./node/organization-tree-node";
import { buildOrganizationUnitTree } from "./organization-tree.util";
import { useAddOrganizationUnitsMutation } from "../../../../app/redux/administration/organization-units/organization-units.api";

const OrganizationTreeApp = ({
  data,
  refetch,
}: {
  data?: IOrganizationUnitsData[];
  refetch: () => void;
}) => {
  const [showFormModel, setShowFormModel] = useState<boolean>(false);
  const methods = useForm<IOrganizationUnitsData>();
  const { isSuccess: isAddSuccess } = useAddOrganizationUnitsMutation()[1];

  useEffect(() => {
    if (isAddSuccess) {
      refetch();
    }
  }, [isAddSuccess, refetch]);

  const treeData = buildOrganizationUnitTree(data || []);

  return (
    <div className="organization-tree-app container-fluid">
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm mb-4 border-0 h-100">
            <div className="card-header d-flex justify-content-between align-items-center border-0">
              <h5 className="mb-0">Organisation Tree</h5>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => setShowFormModel(true)}
              >
                <i className="bi bi-plus-lg fs-3"></i>
                Add Root unit
              </button>
            </div>

            <div className="card-body pt-2">
              {treeData.length === 0 ? (
                <div className="text-muted">
                  No organisation unit defined yet.
                </div>
              ) : (
                <ul className="list-unstyled mb-0">
                  {treeData.map((node, index) => (
                    <OrganizationTreeNodeApp key={index} {...node} />
                  ))}
                </ul>
              )}
            </div>

            <ModelApp
              show={showFormModel}
              modelSize="sm"
              onClose={() => setShowFormModel(false)}
            >
              <FormProvider {...methods}>
                <OrganizationTreeFormApp
                  onClose={() => setShowFormModel(false)}
                  onSuccess={refetch}
                />
              </FormProvider>
            </ModelApp>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="col-12 col-lg-12">
            <div className="card shadow-sm mb-4 border-0 h-100">
              <div className="card-header d-flex justify-content-between align-items-center border-0">
                <h5 className="mb-0">Members</h5>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowFormModel(true)}
                >
                  <i className="bi bi-plus-lg fs-3"></i>
                  Add Members
                </button>
              </div>

              <div className="card-body pt-2">
                <div className="table-responsive">
                  <table className="table table-row-dashed table-row-gray-300 align-middle text-center gy-4">
                    <thead>
                      <tr className="fw-bold fs-6 text-dark border-0 bg-light">
                        <th className="min-w-140px">Delete</th>
                        <th className="min-w-140px">User name</th>
                        <th className="min-w-120px rounded-end">
                          Addition time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="border-bottom border-dashed">
                      <tr className="fw-semibold fs-6 text-dark">
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-active-light-danger"
                          >
                            <i className="bi bi-x-lg fs-5 p-0"></i>
                          </button>
                        </td>
                        <td>Unlimited</td>
                        <td>1</td>
                      </tr>

                      <tr className="fw-semibold fs-6 text-dark">
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-active-light-danger"
                          >
                            <i className="bi bi-x-lg fs-5 p-0"></i>
                          </button>
                        </td>
                        <td>Unlimited</td>
                        <td>1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-12">
            <div className="card shadow-sm mb-4 border-0 h-100">
              <div className="card-header d-flex justify-content-between align-items-center border-0">
                <h5 className="mb-0">Roles</h5>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowFormModel(true)}
                >
                  <i className="bi bi-plus-lg fs-3"></i>
                  Add Roles
                </button>
              </div>

              <div className="card-body pt-2">
                <div className="table-responsive">
                  <table className="table table-row-dashed table-row-gray-300 align-middle text-center gy-4">
                    <thead>
                      <tr className="fw-bold fs-6 text-dark border-0 bg-light">
                        <th className="min-w-140px">Delete</th>
                        <th className="min-w-140px">User name</th>
                        <th className="min-w-120px rounded-end">
                          Addition time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="border-bottom border-dashed">
                      <tr className="fw-semibold fs-6 text-dark">
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-active-light-danger"
                          >
                            <i className="bi bi-x-lg fs-5 p-0"></i>
                          </button>
                        </td>
                        <td>Unlimited</td>
                        <td>1</td>
                      </tr>

                      <tr className="fw-semibold fs-6 text-dark">
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-active-light-danger"
                          >
                            <i className="bi bi-x-lg fs-5 p-0"></i>
                          </button>
                        </td>
                        <td>Unlimited</td>
                        <td>1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationTreeApp;
