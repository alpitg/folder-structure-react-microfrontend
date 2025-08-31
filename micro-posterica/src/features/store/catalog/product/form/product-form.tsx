import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router";
import {
  useAddProductMutation,
  useGetProductDetailQuery,
  useUpdateProductMutation,
} from "../../../../../app/redux/catalog/product/product.api";

import type { IProductData } from "../../interface/product/product.model";
import ProductCategoryTag from "./category-tag/product-category-tag";
import ProductGeneralApp from "./general/product-general";
import ProductInventoryApp from "./inventory/product-inventory";
import ProductMediaApp from "./media/product-media";
import ProductMetaOptionApp from "./meta-option/product-meta-option";
import ProductPricing from "./pricing/product-pricing";
import ProductSalesApp from "./sales/product-sales";
import ProductShippingApp from "./shipping/product-shipping";
import ProductStatusApp from "./status/product-status";
import ProductTemplateApp from "./template/product-template";
import ProductThumbnailApp from "./thumbnail/product-thumbnail";
import ProductVariantsApp from "./variants/product-variants";
import { ROUTE_URL } from "../../../../../routes/constants/routes.const";
import { useEffect } from "react";
import PageHeaderApp from "../../../../../components/header/page-header/page-header";

type ProductFormAppProps = {
  mode: "add" | "edit";
};

const ProductFormApp = ({ mode }: ProductFormAppProps) => {
  const isEditMode = mode === "edit";
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  //#region RTK APIs
  const [
    updateProduct,
    { isLoading: isUpdateProductLoading, isSuccess: isAddSuccess },
  ] = useUpdateProductMutation();

  const [
    addProduct,
    { isLoading: isaddProductLoading, isSuccess: isUpdateSuccess },
  ] = useAddProductMutation();

  const { data, isLoading: isOrderLoading } = useGetProductDetailQuery(id!, {
    skip: !isEditMode,
    refetchOnMountOrArgChange: true,
  });

  const isSuccess = isAddSuccess || isUpdateSuccess;

  //#endregion

  const methods = useForm<IProductData>({
    mode: "onSubmit",
    defaultValues: {
      id: "",
      name: "",
      code: "",
      description: "",
      status: "draft",
      template: "default",
      categories: [],
      tags: [],
      media: [],
      price: {
        basePrice: null,
        discountType: "none",
        discountPercentage: null,
        fixedDiscountedPrice: null,
        taxClass: "tax_free",
        vatPercent: null,
      },
      totalWishlistedCount: 0,
      inventory: {
        sku: null,
        barcode: null,
        quantityInShelf: null,
        quantityInWarehouse: null,
        allowBackorders: false,
      },
      variations: [],
      shipping: {
        isPhysical: true,
        weightInKg: null,
        lengthInCm: null,
        widthInCm: null,
        heightInCm: null,
      },
      meta: {
        metaTitle: null,
        metaDescription: null,
        metaKeywords: [],
      },
      scheduling: {
        publishAt: null,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });

  const onSubmit: SubmitHandler<IProductData> = (data: IProductData) => {
    // const request = mapOrderForApi(data);
    const request = data;

    console.log(request);
    if (!request) return;

    if (isEditMode) {
      updateProduct({ id: id!, data: request });
      // .unwrap()
      // .then(() => {
      //   // Go back to list and tell it to refresh
      //   navigate(ROUTE_URL.SALES.ORDER.LIST, { state: { refresh: true } });
      // });
    } else {
      addProduct(request);
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
    <div className="product-form-app">
      <FormProvider {...methods}>
        <form
          id="catalog_add_product_form"
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate
        >
          <PageHeaderApp
            header={isEditMode ? "Edit Product" : "Add Product"}
            description={
              isEditMode
                ? "Update existing product details."
                : "Create a new product."
            }
          >
            <NavLink to={ROUTE_URL.CATALOG.PRODUCT.LIST}>
              <span className="btn btn-light btn-active-secondary btn-sm me-5">
                <i className="bi bi-chevron-left fs-5"></i>
                Back to Order List
              </span>
            </NavLink>

            <button
              type="submit"
              className="btn btn-sm btn-flex btn-primary"
              disabled={isaddProductLoading || isUpdateProductLoading}
            >
              {isaddProductLoading || isUpdateProductLoading ? (
                <span className="spinner-border spinner-border-sm align-middle me-2"></span>
              ) : (
                <i className="bi bi-check2 fs-3"></i>
              )}
              Save changes
            </button>
          </PageHeaderApp>

          <div className="form d-flex flex-column flex-lg-row">
            <div className="d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10">
              <ProductThumbnailApp />

              <ProductStatusApp />

              <ProductCategoryTag />

              <ProductSalesApp />

              <ProductTemplateApp />
            </div>

            <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
              <ul
                className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link text-active-primary pb-4 active"
                    data-bs-toggle="tab"
                    href="#catalog_add_product_general"
                    aria-selected="true"
                    role="tab"
                  >
                    <i className="bi bi-info-circle me-2"></i> General
                  </a>
                </li>

                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link text-active-primary pb-4"
                    data-bs-toggle="tab"
                    href="#catalog_add_product_advanced"
                    aria-selected="false"
                    role="tab"
                    tabIndex={-1}
                  >
                    <i className="bi bi-gear me-2"></i> Advanced
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div
                  className="tab-pane fade active show"
                  id="catalog_add_product_general"
                  role="tab-panel"
                >
                  <div className="d-flex flex-column gap-7 gap-lg-10">
                    <ProductGeneralApp />
                    <ProductPricing />
                    {/* <ProductMediaApp /> */}
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="catalog_add_product_advanced"
                  role="tab-panel"
                >
                  <div className="d-flex flex-column gap-7 gap-lg-10">
                    <ProductInventoryApp />
                    <ProductVariantsApp />
                    <ProductShippingApp />
                    <ProductMetaOptionApp />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ProductFormApp;
