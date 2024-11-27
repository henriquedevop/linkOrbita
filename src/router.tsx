import { createBrowserRouter } from "react-router";

import { Home } from "./pages/home";
import { Admin } from "./pages/admin";
import { Login } from "./pages/login";
import { Social } from "./pages/social";

const router = createBrowserRouter([
    {path: "/", element: <Home/>},
    {path: "/admin", element: <Admin/>},
    {path: "/login", element: <Login/>},
    {path: "/admin/social", element: <Social/>},
])

export { router }