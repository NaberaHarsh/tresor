// const apiEndPoint = "http://admin.tresorjewelryinc.com/index.php";
// const apiEndPoint = "http://45.77.147.212";
const apiEndPoint = "https://admin.tresorjewelryinc.com";




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
   AddToCart:`${apiEndPoint}/Api/add_to_cart`,
   ProcessOrder:`${apiEndPoint}/Api/process_order`,
   Order:`${apiEndPoint}/api/user_order`,
   UserOrder:`${apiEndPoint}/api/user_order_details`,
   Discount:`${apiEndPoint}/Api/getOrderSubtotal`,

  }
};
export default config;

