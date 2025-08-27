import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../../../app/redux/administration/users/users.api";
import { useEffect, useState } from "react";

import DeleteModelApp from "../../../../components/delete-model/delete-model";
import type { IUsersData } from "../../interfaces/users.model";
import ModelApp from "../../../../components/ui/model/model";
import PageHeaderApp from "../../../../components/header/page-header/page-header";
import UsersFilterApp from "./filter/users-filter";
import UsersFormApp from "../form/users-form";
import { formattedDate } from "../../../../utils/date.util";
import { useLocation } from "react-router";

type sortType = "newest" | "oldest";

const UserListApp = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<sortType>("newest");
  const [showFormModel, setShowFormModel] = useState<boolean>(false);
  const [showDeleteConfirmationModel, setShowDeleteConfirmationModel] =
    useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IUsersData | null>(null);

  //#region RTK APIs
  const {
    data: userData,
    isLoading,
    refetch,
  } = useGetUsersQuery({
    page,
    pageSize: 10,
    searchText: search,
    sort,
  });

  const [deleteUser] = useDeleteUserMutation();
  //#endregion

  const handleSortChange = (newSort: sortType) => {
    setSort(newSort);
    setPage(1);
  };

  const handleFormClose = ({ refresh }: { refresh?: boolean } = {}) => {
    setShowFormModel(false);
    setSelectedUser(null);
    if (refresh) {
      refetch();
    }
  };

  const handleDeleteConfirm = (id: string) => {
    deleteUser(id);
  };

  // Refresh on navigation with state
  useEffect(() => {
    if (location?.state?.refresh) {
      refetch();
    }
  }, [location.state, refetch]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="user-list-app">
      <PageHeaderApp header="Users" description="Manage users and permissions.">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            setSelectedUser(null); // reset
            setShowFormModel(true);
          }}
        >
          <i className="bi bi-plus-lg fs-3"></i>
          Add New User
        </button>
      </PageHeaderApp>

      <div className="card">
        <div className="card-body">
          <UsersFilterApp
            page={page}
            setPage={setPage}
            search={search}
            setSearch={setSearch}
            pages={userData?.pages || 1}
            onSearch={() => setPage(1)}
            pageSize={userData?.pageSize || 0}
            total={userData?.total || 0}
            sort={sort}
            setSort={handleSortChange}
            handleRefresh={refetch}
          />

          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 gy-7">
              <thead>
                <tr className="fw-bold fs-6 text-gray-800">
                  <th>USER NAME</th>
                  <th>NAME</th>
                  <th>SURNAME</th>
                  <th>ROLES</th>
                  <th>EMAIL ADDRESS</th>
                  <th>EMAIL CONFIRM</th>
                  <th>ACTIVE</th>
                  <th>CREATION TIME</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody className="fw-semibold text-gray-600">
                {userData?.items?.map((user) => (
                  <tr key={user?.id}>
                    <td className="align-middle">
                      <button
                        className="btn btn-link text-gray-800 text-hover-primary fs-5 fw-bold p-0"
                        onClick={() => {
                          setSelectedUser(user);
                          setShowFormModel(true);
                        }}
                      >
                        {user?.userName}
                      </button>
                    </td>
                    <td className="align-middle">{user?.name}</td>
                    <td className="align-middle">{user?.surname}</td>
                    <td className="align-middle">
                      {user?.roles?.map((role) => (
                        <span
                          key={"role" + role?.id}
                          className="badge badge-light-primary me-1"
                        >
                          {role?.displayName}
                        </span>
                      ))}
                    </td>
                    <td className="align-middle">{user?.emailAddress}</td>
                    <td className="align-middle">
                      {user?.isEmailConfirmed ? (
                        <span className="badge badge-success">Yes</span>
                      ) : (
                        <span className="badge badge-danger">No</span>
                      )}
                    </td>
                    <td className="align-middle">
                      {user?.isActive ? (
                        <span className="badge badge-success">Active</span>
                      ) : (
                        <span className="badge badge-secondary">Inactive</span>
                      )}
                    </td>
                    <td className="align-middle">
                      {formattedDate(user?.creationTime)}
                    </td>
                    <td className="align-content-center">
                      <button
                        type="button"
                        className="btn btn-light text-hover-danger btn-icon btn-sm"
                        onClick={() => {
                          setSelectedUser(user); // store which user to delete
                          setShowDeleteConfirmationModel(true);
                        }}
                        aria-label="Delete user"
                      >
                        <i className="bi bi-trash3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ModelApp show={showFormModel} modelSize="lg">
            <UsersFormApp
              mode={selectedUser ? "edit" : "add"}
              user={selectedUser}
              handleClose={handleFormClose}
            />
          </ModelApp>

          <DeleteModelApp
            handleCancel={() => setShowDeleteConfirmationModel(false)}
            handleConfirm={() => {
              if (selectedUser?.id) {
                handleDeleteConfirm(selectedUser?.id);
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

export default UserListApp;
