import { FormProvider, useForm } from "react-hook-form";
import type {
  IOrganizationUnitTree,
  IOrganizationUnitsData,
} from "../../interfaces/organization-units.model";
import {
  useAddOrganizationUnitsMutation,
  useGetRolesFromOrganizationUnitQuery,
  useRemoveRoleFromOrganizationUnitMutation,
} from "../../../../app/redux/administration/organization-units/organization-units.api";
import { useEffect, useState } from "react";

import DeleteModelApp from "../../../../components/delete-model/delete-model";
import ModelApp from "../../../../components/ui/model/model";
import OrganizationTreeFormApp from "./form/organization-tree-form";
import OrganizationTreeNodeApp from "./node/organization-tree-node";
import OrganizationUnitRolesListApp from "../roles/organization-unit-roles-list";
import RolesFilterApp from "../../roles/list/filter/roles-filter";
import { buildOrganizationUnitTree } from "./organization-tree.util";
import type { sortType } from "../../../../interfaces/sort";

const OrganizationTreeApp = ({
  data,
  refetch,
}: {
  data?: IOrganizationUnitsData[];
  refetch: () => void;
}) => {
  const [showFormModel, setShowFormModel] = useState<boolean>(false);
  const [showAddRoles, setShowAddRoles] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<sortType>("newest");

  /** Keep track of selected organization node */
  const [selectedNode, setSelectedNode] =
    useState<IOrganizationUnitTree | null>(null);

  /** Keep track of delete modal + role */
  const [showDeleteConfirmationModel, setShowDeleteConfirmationModel] =
    useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);

  const methods = useForm<IOrganizationUnitsData>();
  const { isSuccess: isAddSuccess } = useAddOrganizationUnitsMutation()[1];

  /** Mutation for removing role from org unit */
  const [removeRoleFromOrgUnit, { isLoading: isRemoving }] =
    useRemoveRoleFromOrganizationUnitMutation();

  /** Refresh tree after adding */
  useEffect(() => {
    if (isAddSuccess) {
      refetch();
    }
  }, [isAddSuccess, refetch]);

  /** Build tree from flat data */
  const treeData = buildOrganizationUnitTree(data || []);

  /** Fetch roles for selected org unit */
  const {
    data: rolesData,
    isFetching: rolesLoading,
    refetch: refetchRoles,
  } = useGetRolesFromOrganizationUnitQuery(
    {
      id: selectedNode?.id || "",
      isAssigned: true,
      page,
      pageSize: 10,
      searchText: search,
      sort,
    },
    {
      skip: !selectedNode, // skip if no node selected
    }
  );

  /** Handle confirm delete */
  const handleDeleteConfirm = async (roleId: string) => {
    if (!selectedNode?.id) return;
    try {
      await removeRoleFromOrgUnit({
        organizationUnitId: selectedNode.id,
        roleId,
      }).unwrap();
      refetchRoles(); // refresh list after deletion
    } catch (err) {
      console.error("Error removing role from org unit", err);
    }
  };

  return (
    <div className="organization-tree-app container-fluid">
      <div className="row g-4">
        {/* Left column – Organization Tree */}
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
                    <OrganizationTreeNodeApp
                      key={index}
                      {...node}
                      onSelect={(n) => setSelectedNode(n)}
                      selectedId={selectedNode?.id || null}
                    />
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

        {/* Right column – Roles for selected node */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm mb-4 border-0 h-100">
            <div className="card-header d-flex justify-content-between align-items-center border-0">
              <h5 className="mb-0">
                Roles {selectedNode ? `for ${selectedNode.label}` : ""}
              </h5>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                disabled={!selectedNode}
                onClick={() => setShowAddRoles(true)}
              >
                <i className="bi bi-plus-lg fs-3"></i>
                Add Roles
              </button>
            </div>

            <div className="card-body pt-2">
              <RolesFilterApp
                page={page}
                setPage={setPage}
                search={search}
                setSearch={(val) => {
                  setSearch(val);
                  setPage(1);
                }}
                pages={rolesData?.pages || 1}
                onSearch={() => setPage(1)}
                pageSize={rolesData?.pageSize || 0}
                total={rolesData?.total || 0}
                sort={sort}
                // setSort={handleSortChange}
                handleRefresh={refetch}
              />

              {rolesLoading ? (
                <div>Loading roles...</div>
              ) : rolesData?.items?.length ? (
                <div className="table-responsive">
                  <table className="table table-row-dashed table-row-gray-300 align-middle text-center gy-4">
                    <thead className="border-bottom border-dashed">
                      <tr className="fw-bold fs-6 text-dark border-0">
                        <th className="min-w-140px">Delete</th>
                        <th className="min-w-140px">Role name</th>
                        <th className="min-w-120px rounded-end">
                          Addition time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="border-bottom border-dashed">
                      {rolesData.items.map((role) => (
                        <tr
                          key={role.id}
                          className="fw-semibold fs-6 text-dark"
                        >
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-active-light-danger"
                              onClick={() => {
                                setSelectedRole(role);
                                setShowDeleteConfirmationModel(true);
                              }}
                            >
                              <i className="bi bi-x-lg fs-5 p-0"></i>
                            </button>
                          </td>
                          <td>{role.displayName}</td>
                          <td>
                            {role.creationTime
                              ? new Date(role.creationTime).toLocaleString()
                              : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-muted">
                  {selectedNode
                    ? "No roles tagged yet."
                    : "Select an organisation unit to view roles."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Roles Modal */}
      {showAddRoles && selectedNode && (
        <ModelApp
          show={showAddRoles}
          modelSize="md"
          onClose={() => setShowAddRoles(false)}
        >
          <OrganizationUnitRolesListApp
            orgUnitId={selectedNode.id}
            onClose={() => setShowAddRoles(false)}
            refetchRoles={refetchRoles}
          />
        </ModelApp>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmationModel && (
        <DeleteModelApp
          handleCancel={() => setShowDeleteConfirmationModel(false)}
          handleConfirm={() => {
            if (selectedRole?.id) {
              handleDeleteConfirm(selectedRole.id);
              setShowDeleteConfirmationModel(false);
            }
          }}
          show={showDeleteConfirmationModel}
          isLoading={isRemoving}
        />
      )}
    </div>
  );
};

export default OrganizationTreeApp;
