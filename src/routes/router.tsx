import { createBrowserRouter } from "react-router";

import { Home } from "../pages/home";
import { Admin } from "../pages/admin";
import { Settings } from "../pages/settings";
import { Login } from "../pages/login";
import { SignUp } from "../pages/signup";
import { UserPage } from "../pages/userpage";
import { NotFound } from "../pages/notfound";

import { Private } from "./private";

const router = createBrowserRouter([
    {path: "/", element: <Home/>},
    {path: "/user/:username", element: <UserPage/>},
    {path: "/login", element: <Login/>},
    {path: "/signup", element: <SignUp/>},
    {path: "/admin", element: <Private> <Admin/> </Private>},
    {path: "/admin/settings", element: <Private> <Settings/> </Private>},

    {path: "*", element: <NotFound/>}
])

export { router }