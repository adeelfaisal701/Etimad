export const getDashboardRoute = (role) => {
  if (role === "buyer") return "/buyer-dashboard";
  if (role === "seller") return "/seller";
  if (role === "admin") return "/admin";
  return "/";
};