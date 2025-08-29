import {
  useDeleteRoleMutation,
  useGetRolesQuery,
} from "../../../../app/redux/administration/roles/roles.api";
import { useEffect, useState } from "react";

import DeleteModelApp from "../../../../components/delete-model/delete-model";
import type { IRolesData } from "../../interfaces/roles.model";
import ModelApp from "../../../../components/ui/model/model";
import PageHeaderApp from "../../../../components/header/page-header/page-header";
import RolesFilterApp from "./filter/roles-filter";
import RolesFormApp from "../form/roles-form";
import { formattedDate } from "../../../../utils/date.util";
import { useLocation } from "react-router";

type sortType = "newest" | "oldest";

const RoleListApp = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<sortType>("newest");
  const [showFormModel, setShowFormModel] = useState<boolean>(false);
  const [showDeleteConfirmationModel, setShowDeleteConfirmationModel] =
    useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<IRolesData | null>(null);

  //#region RTK APIs
  const {
    data: roleData,
    isLoading,
    refetch,
  } = useGetRolesQuery({
    page,
    pageSize: 10,
    searchText: search,
    sort,
  });

  const [deleteRole] = useDeleteRoleMutation();
  //#endregion

  const handleSortChange = (newSort: sortType) => {
    setSort(newSort);
    setPage(1);
  };

  const handleFormClose = ({ refresh }: { refresh?: boolean } = {}) => {
    setShowFormModel(false);
    setSelectedRole(null);
    if (refresh) {
      refetch();
    }
  };

  const handleDeleteConfirm = (id: string) => {
    deleteRole(id);
  };

  // Refresh on navigation with state
  useEffect(() => {
    if (location?.state?.refresh) {
      refetch();
    }
  }, [location.state, refetch]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="role-list-app">
      <PageHeaderApp
        header="Roles"
        description="Use roles to group permissions."
      >
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            setSelectedRole(null); // reset
            setShowFormModel(true);
          }}
        >
          <i className="bi bi-plus-lg fs-3"></i>
          Add New Role
        </button>
      </PageHeaderApp>

      <div className="card">
        <div className="card-body">
          <RolesFilterApp
            page={page}
            setPage={setPage}
            search={search}
            setSearch={setSearch}
            pages={roleData?.pages || 1}
            onSearch={() => setPage(1)}
            pageSize={roleData?.pageSize || 0}
            total={roleData?.total || 0}
            sort={sort}
            setSort={handleSortChange}
            handleRefresh={refetch}
          />

          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 gy-7">
              <thead>
                <tr className="fw-bold fs-6 text-gray-800">
                  <th>NAME</th>
                  <th>CREATED TIME</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody className="fw-semibold text-gray-600">
                {roleData?.items?.map((role) => (
                  <tr key={role?.id}>
                    <td className="align-content-center">
                      <span className="d-flex gap-5">
                        <button
                          className="btn btn-link text-gray-800 text-hover-primary fs-5 fw-bold p-0"
                          onClick={() => {
                            setSelectedRole(role);
                            setShowFormModel(true);
                          }}
                        >
                          {role?.displayName}
                        </button>

                        <span>
                          {role?.isActive && (
                            <span className="badge badge-success me-2">
                              Active
                            </span>
                          )}
                          {role?.isStatic && (
                            <span className="badge badge-primary me-2">
                              Static
                            </span>
                          )}
                          {role?.isDefault && (
                            <span className="badge badge-dark me-2">
                              Default
                            </span>
                          )}
                        </span>
                      </span>
                    </td>
                    <td className="align-content-center">
                      {formattedDate(role?.creationTime)}
                    </td>
                    <td className="align-content-center">
                      {!role?.isStatic && (
                        <button
                          type="button"
                          className="btn btn-light text-hover-danger btn-icon btn-sm"
                          onClick={() => {
                            setSelectedRole(role); // store which role to delete
                            setShowDeleteConfirmationModel(true);
                          }}
                          aria-label="Delete role"
                        >
                          <i className="bi bi-trash3" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ModelApp
            show={showFormModel}
            modelSize="lg"
            onClose={() => handleFormClose()}
          >
            <RolesFormApp
              mode={selectedRole ? "edit" : "add"}
              role={selectedRole}
              handleClose={handleFormClose}
            />
          </ModelApp>

          <DeleteModelApp
            handleCancel={() => setShowDeleteConfirmationModel(false)}
            handleConfirm={() => {
              if (selectedRole?.id) {
                handleDeleteConfirm(selectedRole?.id);
                setShowDeleteConfirmationModel(false);
                refetch(); // refresh after deletion
              }
            }}
            show={showDeleteConfirmationModel}
          />
        </div>
      </div>
    </div>
  );
};

export default RoleListApp;
