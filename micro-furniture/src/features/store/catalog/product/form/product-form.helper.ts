import type { IProductData } from "../../interface/product/product.model";

export const defaultProductValues: IProductData = {
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
      included: true,
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
  rating: 0,
  reviews: 0,
  isNewArrival: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
