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
import ProductMetaOptionApp from "./meta-option/product-meta-option";
import ProductPricing from "./pricing/product-pricing";
import ProductSalesApp from "./sales/product-sales";
import ProductShippingApp from "./shipping/product-shipping";
import ProductStatusApp from "./status/product-status";
import ProductTemplateApp from "./template/product-template";
import ProductVariantsApp from "./variants/product-variants";
import { ROUTE_URL } from "../../../../../routes/constants/routes.const";
import { useEffect } from "react";
import PageHeaderApp from "../../../../../components/header/page-header/page-header";
import ProductThumbnailApp from "./thumbnail/product-thumbnail";
import ProductMediaApp from "./media/product-media";

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
        discount: {
          isActive: false,
          type: "percentage",
          value: 0,
        },
        sellingPrice: null,
        tax: {
          included: false,
          className: "tax_free",
          rate: 0,
        },
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
          discount: {
            isActive: data?.price?.discount?.isActive,
            type: data?.price?.discount?.type,
            value: data?.price?.discount?.value,
          },
          sellingPrice: data?.price?.sellingPrice,
          tax: {
            included: data?.price?.tax?.included,
            className: data?.price?.tax?.className,
            rate: data?.price?.tax?.rate,
          },
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
              <ProductGeneralApp />
              <ProductStatusApp />

              <ProductThumbnailApp />

              <ProductCategoryTag />

              <ProductSalesApp />

              <ProductTemplateApp />
            </div>

            <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
              <div className="d-flex flex-column gap-7 gap-lg-10">
                <ProductPricing />

                <ProductInventoryApp />
                <ProductVariantsApp />
                <ProductShippingApp />
                <ProductMetaOptionApp />

                <ProductMediaApp />
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ProductFormApp;
