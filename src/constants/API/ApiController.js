export const ApiController = {
  products: {
    getAllProductsAPI: "https://localhost:7005/api/Products",
    getAllProductsByCategoryNameAPI:
      "https://localhost:7005/api/Products/ByCategoryName",
    getAllProductsByCategoryIdAPI:
      "https://localhost:7005/api/Products/ByCategoryId",
  },
  categories: {
    getAllCategoriesAPI: "https://localhost:7005/api/Categories",
  },
};

console.log(ApiController.products.getAllProductsAPI);
