import { ProductsItems_brownies } from "./ProductsItems_brownies";
import { ProductsItems_cookies } from "./ProductsItems_cookies";
import { ProductsItems_cupcakes } from "./ProductsItems_cupcakes";
import { ProductsItems_eclairs } from "./ProductsItems_eclairs";
// export const ProductsItems_compined =
//   ProductsItems_img.concat(ProductsItems_img2).concat(ProductsItems_img3);
export const ProductsItems_compined = [
  ...ProductsItems_brownies,
  ...ProductsItems_cookies,
  ...ProductsItems_cupcakes,
  ...ProductsItems_eclairs,
];
// export const ProductsItems_compined = newArray.map((product, index) => {
//   return {
//     id: index,
//     ...product,
//   };
// });
console.log(ProductsItems_compined);
