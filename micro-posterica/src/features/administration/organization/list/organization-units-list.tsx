import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { NavLink, useLocation } from "react-router";
import {
  useAddOrganizationUnitsMutation,
  useGetOrganizationUnitsQuery,
} from "../../../../app/redux/administration/organization-units/organization-units.api";
import { useEffect, useState } from "react";

import type { IOrganizationUnitsData } from "../../interfaces/organization-units.model";
import ModelApp from "../../../../components/ui/model/model";
import PageHeaderApp from "../../../../components/header/page-header/page-header";
import { ROUTE_URL } from "../../../../components/auth/constants/routes.const";

type sortType = "newest" | "oldest";

const OrganizationUnitsListApp = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<sortType>("newest");
  const [showAddModel, setShowAddModel] = useState<boolean>(false);

  // Query hook for organization-units-list
  const { data, isLoading, refetch } = useGetOrganizationUnitsQuery(
    {
      page,
      pageSize: 10,
      searchText: search,
      sort,
    },
    { refetchOnMountOrArgChange: true }
  );

  const [
    addOrganizationUnits,
    { isLoading: isaddLoading, isSuccess: isUpdateSuccess },
  ] = useAddOrganizationUnitsMutation();

  const methods = useForm<IOrganizationUnitsData>({
    mode: "onSubmit",
    defaultValues: {
      displayName: "",
    },
  });
  const { register, reset } = methods;

  const handleSortChange = (newSort: sortType) => {
    setSort(newSort);
    setPage(1);
  };

  const onSubmit: SubmitHandler<IOrganizationUnitsData> = (
    data: IOrganizationUnitsData
  ) => {
    const request = data;
    if (!request) return;
    addOrganizationUnits(request);

    // if (isEditMode) {
    //   updateProduct({ id: id!, data: request });
    //   // .unwrap()
    //   // .then(() => {
    //   //   // Go back to list and tell it to refresh
    //   //   navigate(ROUTE_URL.SALES.ORDER.LIST, { state: { refresh: true } });
    //   // });
    // } else {
    //   addProduct(request);
    // }
  };

  // Refresh on navigation with state
  useEffect(() => {
    if (location?.state?.refresh) {
      refetch();
    }
  }, [location.state, refetch]);

  useEffect(() => {
    if (isUpdateSuccess) {
      reset(); // clear form after success
      setShowAddModel(false); // close modal
      refetch(); // 👈 refresh list
    }
  }, [isUpdateSuccess, reset, refetch]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="organization-units-list-app">
      <FormProvider {...methods}>
        <form
          id="organization-units-list-app-form"
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate
        >
          <PageHeaderApp
            header="Organisation Units"
            description="Use organisation units to organise users and entities."
          >
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setShowAddModel(!showAddModel)}
            >
              <i className="bi bi-plus-lg fs-3"></i>
              Add Root unit
            </button>
          </PageHeaderApp>

          <div className="card">
            <div className="card-body">
              {/* <OrganizationUnitsListFilterApp
            page={page}
            setPage={setPage}
            search={search}
            setSearch={setSearch}
            pages={data?.pages || 1}
            onSearch={() => setPage(1)}
            pageSize={data?.pageSize || 0}
            total={data?.total || 0}
            sort={sort}
            setSort={handleSortChange}
          /> */}

              <div className="table-responsive">
                <table className="table table-row-dashed table-row-gray-300 gy-7">
                  <thead>
                    <tr className="fw-bold fs-6 text-gray-800">
                      <th>NAME</th>
                      <th>MEMBER COUNT</th>
                      <th>Role Count</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="fw-semibold text-gray-600">
                    {data?.items?.map((item) => (
                      <tr key={item?.id}>
                        <td>
                          <NavLink
                            className="btn btn-sm fs-5 fw-bold"
                            to={ROUTE_URL.ADMINISTRATION.ORGANIZATION_UNIT.EDIT.replace(
                              ":id",
                              item?.id ?? ""
                            )}
                          >
                            {item?.displayName}
                          </NavLink>
                        </td>
                        <td>{item?.memberCount}</td>
                        <td>{item?.roleCount}</td>
                        <td>{item?.isDeleted}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <ModelApp show={showAddModel}>
            <div>
              <div className="fv-row w-100 py-5">
                <label className="form-label">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control form-control-solid"
                  placeholder="Organization unit name"
                  {...register("displayName")}
                />
              </div>
            </div>

            <div className="model-footer d-flex justify-content-end gap-4">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  reset();
                  setShowAddModel(!showAddModel);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                disabled={isaddLoading}
              >
                {isaddLoading ? (
                  <span className="spinner-border spinner-border-sm align-middle me-2"></span>
                ) : (
                  <i className="bi bi-check2 fs-3"></i>
                )}
                Save
              </button>
            </div>
          </ModelApp>
        </form>
      </FormProvider>
    </div>
  );
};

export default OrganizationUnitsListApp;
