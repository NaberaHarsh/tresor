const apiEndPoint = "http://admin.tresorjewelryinc.com/index.php";
// const apiEndPoint = "http://45.77.147.212";
const apiEndPoint1 = "http://admin.tresorjewelryinc.com";


const config = {
  url: {
   Dashboard:`${apiEndPoint}/Api`,
   GetHead:`${apiEndPoint}/api/gethead`,
   Products:`${apiEndPoint}/api/products`,
   Detailproduct:`${apiEndPoint}/api/product`,
   Login:`${apiEndPoint}/auth/login`,
   Register:`${apiEndPoint}/auth/registration`,
   ForgotPassword:`${apiEndPoint}/user/forgotpass/gen`,
   ResetPassword:`${apiEndPoint}/user/updatepass`,   
   Search:`${apiEndPoint}/api/search`,
   AddToCart:`${apiEndPoint1}/Api/add_to_cart`,


  }
};
export default config;

