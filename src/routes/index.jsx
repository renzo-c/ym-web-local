import AdminPage from "views/AdminPage/AdminPage.jsx";
import Employees from "views/AdminPage/Sections/Employees/Index.jsx";
import Branches from "views/AdminPage/Sections/Branches/Index.jsx";
import ServiceShifts from "views/AdminPage/Sections/ServiceShifts/Index.jsx";
import Parkings from "views/AdminPage/Sections/Parkings/Index.jsx";
import EmployeexServiceShifts from "views/AdminPage/Sections/EmployeexServiceShifts/Index.jsx";


var indexRoutes = [
  { path: "/parkeo/admin-page", name: "AdminPage", component: AdminPage },
  {
    path: "/parkeo/admin-page/employees",
    name: "Employees",
    component: Employees
  },
  {
    path: "/parkeo/admin-page/branches",
    name: "Branches",
    component: Branches
  },
  {
    path: "/parkeo/admin-page/serviceshifts",
    name: "ServiceShifts",
    component: ServiceShifts
  },
  {
    path: "/parkeo/admin-page/parkings",
    name: "Parkings",
    component: Parkings
  },
  {
    path: "/parkeo/admin-page/employeexserviceshifts",
    name: "EmployeexServiceShifts",
    component: EmployeexServiceShifts
  }
];

export default indexRoutes;
