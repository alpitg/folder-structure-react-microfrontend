import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import PageHeaderApp from "../../../../components/header/page-header/page-header";
import {
  useAddRolesMutation,
  useGetRolesDetailQuery,
  useUpdateRolesMutation,
} from "../../../../app/redux/administration/roles/roles.api";
import { ROUTE_URL } from "../../../../components/auth/constants/routes.const";
import type { IRolesData } from "../../interfaces/roles.model";
import PermissionTreeApp from "./permission/tree/permission-tree";
import type { IRolesPermissionItem } from "../../interfaces/roles-permission.model";
import { buildPermissionTree } from "./roles-tree.util";

type RolesFormAppProps = {
  mode: "add" | "edit";
};

const RolesFormApp = ({ mode }: RolesFormAppProps) => {
  const isEditMode = mode === "edit";
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const permissionItems: IRolesPermissionItem[] = [
    {
      name: "Pages.Administration.OrganizationUnits",
      displayName: "Organization Units",
      description: "Access to organization units",
      parentName: "Pages.Administration",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Administration.OrganizationUnits.Detail",
      displayName: "Organization Unit Details",
      description: "View organization unit details",
      parentName: "Pages.Administration.OrganizationUnits",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Administration.OrganizationUnits.Create",
      displayName: "Create Organization Unit",
      description: "Create new organization units",
      parentName: "Pages.Administration.OrganizationUnits",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Administration.OrganizationUnits.Edit",
      displayName: "Edit Organization Unit",
      description: "Edit existing organization units",
      parentName: "Pages.Administration.OrganizationUnits",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Administration.OrganizationUnits.Delete",
      displayName: "Delete Organization Unit",
      description: "Delete organization units",
      parentName: "Pages.Administration.OrganizationUnits",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Administration.Roles",
      displayName: "Roles",
      description: "Manage application roles",
      parentName: "Pages.Administration",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Administration.Roles.Create",
      displayName: "Create new roles",
      description: "Manage application roles",
      parentName: "Pages.Administration.Roles",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Administration.Users",
      displayName: "Users",
      description: "Manage users and their permissions",
      parentName: "Pages.Administration",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Catalog.Product",
      displayName: "Products",
      description: "Manage products in catalog",
      parentName: "Pages.Catalog",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Catalog.ProductCategory",
      displayName: "Product Categories",
      description: "Manage product categories",
      parentName: "Pages.Catalog",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Sales.Order",
      displayName: "Orders",
      description: "Manage sales orders",
      parentName: "Pages.Sales",
      isGrantedByDefault: false,
    },
    {
      name: "Pages.Sales.Customers",
      displayName: "Customers",
      description: "Manage sales customers",
      parentName: "Pages.Sales",
      isGrantedByDefault: false,
    },
  ];

  const treeData = buildPermissionTree(permissionItems);

  //#region RTK APIs
  const [
    updateRoles,
    { isLoading: isUpdateRolesLoading, isSuccess: isAddSuccess },
  ] = useUpdateRolesMutation();

  const [
    addRoles,
    { isLoading: isaddRolesLoading, isSuccess: isUpdateSuccess },
  ] = useAddRolesMutation();

  const { data, isLoading: isOrderLoading } = useGetRolesDetailQuery(id!, {
    skip: !isEditMode,
    refetchOnMountOrArgChange: true,
  });

  const isSuccess = isAddSuccess || isUpdateSuccess;

  //#endregion

  const methods = useForm<IRolesData>();

  const onSubmit: SubmitHandler<IRolesData> = (data: IRolesData) => {
    // const request = mapOrderForApi(data);
    const request = data;

    console.log(request);
    if (!request) return;

    if (isEditMode) {
      updateRoles({ id: id!, data: request });
      // .unwrap()
      // .then(() => {
      //   // Go back to list and tell it to refresh
      //   navigate(ROUTE_URL.SALES.ORDER.LIST, { state: { refresh: true } });
      // });
    } else {
      addRoles(request);
    }
  };

  // Navigate after add or update
  useEffect(() => {
    if (isSuccess) {
      navigate(ROUTE_URL.CATALOG.PRODUCT.LIST, { state: { refresh: true } });
    }
  }, [isSuccess, navigate]);

  // Populate form in edit mode
  useEffect(() => {
    if (isEditMode && data) {
      methods.reset({
        id: data?.id,
        name: data?.name,
        code: data?.code,
        description: data?.description,
        status: data?.status,
        template: data?.template,
        categories: data?.categories,
        tags: data?.tags,
        media: data?.media,
        price: {
          basePrice: data?.price?.basePrice,
          discountType: data?.price?.discountType,
          discountPercentage: data?.price?.discountPercentage,
          fixedDiscountedPrice: data?.price?.fixedDiscountedPrice,
          taxClass: data?.price?.taxClass,
          vatPercent: data?.price?.vatPercent,
        },
        totalWishlistedCount: data?.totalWishlistedCount,
        inventory: {
          sku: data?.inventory?.sku,
          barcode: data?.inventory?.barcode,
          quantityInShelf: data?.inventory?.quantityInShelf,
          quantityInWarehouse: data?.inventory?.quantityInWarehouse,
          allowBackorders: data?.inventory?.allowBackorders,
        },
        variations: data?.variations,
        shipping: {
          isPhysical: data?.shipping.isPhysical,
          weightInKg: data?.shipping.weightInKg,
          lengthInCm: data?.shipping.lengthInCm,
          widthInCm: data?.shipping.widthInCm,
          heightInCm: data?.shipping.heightInCm,
        },
        meta: {
          metaTitle: data?.meta.metaTitle,
          metaDescription: data?.meta.metaDescription,
          metaKeywords: data?.meta.metaKeywords,
        },
        scheduling: {
          publishAt: data?.scheduling.publishAt,
        },
        createdAt: data?.createdAt,
        updatedAt: data?.updatedAt,
      });
    }
  }, [isEditMode, data, methods]);

  if (isEditMode && isOrderLoading) {
    return <p>Loading details...</p>;
  }

  return (
    <div className="roles-form-app">
      <FormProvider {...methods}>
        <form
          id="catalog_add_roles_form"
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate
        >
          <PageHeaderApp
            header={isEditMode ? "Edit Roles" : "Add Roles"}
            description={
              isEditMode
                ? "Update existing roles details."
                : "Create a new roles."
            }
          >
            <button
              type="submit"
              className="btn btn-sm btn-flex btn-primary"
              disabled={isaddRolesLoading || isUpdateRolesLoading}
            >
              {isaddRolesLoading || isUpdateRolesLoading ? (
                <span className="spinner-border spinner-border-sm align-middle me-2"></span>
              ) : (
                <i className="bi bi-check2 fs-3"></i>
              )}
              Save changes
            </button>
          </PageHeaderApp>

          <div className="form d-flex flex-column flex-lg-row">
            <div className="d-flex flex-column gap-7">
              <div
                className="tab-pane active p-5"
                role="tabpanel"
                aria-labelledby=""
              >
                <div className="mb-5">
                  <label
                    htmlFor="RoleDisplayName"
                    className="form-label required"
                  >
                    Role name
                  </label>
                  <input
                    id="RoleDisplayName"
                    type="text"
                    name="DisplayName"
                    required
                    className="form-control"
                  />
                  <div className="text-danger mt-1">
                    This field is required.
                  </div>
                </div>

                <div className="form-check form-check-custom form-check-solid py-1">
                  <input
                    id="EditRole_IsDefault"
                    type="checkbox"
                    name="IsDefault"
                    className="form-check-input"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="EditRole_IsDefault"
                  >
                    Default
                    <small className="form-text text-muted ms-3">
                      (Assign to new users by default.)
                    </small>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        title="Collapse All"
                      >
                        <i className="bi bi-chevron-double-down"></i>
                        <span className="ms-2 text-muted">Collapse All</span>
                      </button>
                    </div>

                    <div className="form-check form-switch">
                      <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" />
                        Only Show Enabled Permissions
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <PermissionTreeApp data={treeData} />
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default RolesFormApp;
