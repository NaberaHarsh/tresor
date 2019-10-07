const apiEndPoint = "http://tresorjewelryinc.com";

const config = {
  url: {
   Dashboard:`${apiEndPoint}/Api`,
   GetHead:`${apiEndPoint}/api/gethead`,
   Products:`${apiEndPoint}/api/products`,
   Detailproduct:`${apiEndPoint}/api/product`,
   Login:`${apiEndPoint}/auth/login`,
   Register:`${apiEndPoint}/auth/registration`,
   Forgot:`${apiEndPoint}/user/forgotpass/gen`,
   ResetPassword:`${apiEndPoint}/user/updatepass`,
  }
};
export default config;

