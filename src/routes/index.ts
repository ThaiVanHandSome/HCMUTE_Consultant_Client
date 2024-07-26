import { routes } from "../config";
import BaseLayout from "../layouts/BaseLayout/BaseLayout";
import Register from "../pages/Register";

const publicRoutes = [
    {
        path: routes.register,
        Component: Register,
        layout: BaseLayout,
    }
];

const privateRoutes = [];

export {publicRoutes, privateRoutes};