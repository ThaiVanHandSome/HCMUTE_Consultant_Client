import BaseLayout from "~/layouts/BaseLayout";
import { routes } from "../config";
import Register from "../pages/Register";
import { LayoutProps } from "~/types/layout";
import Login from "~/pages/Login";
import ForgotPassword from "~/pages/ForgotPassword";

type RouteProps = {
    path: string;
    Component: () => JSX.Element;
    layout?: ({children}: LayoutProps) => JSX.Element;
}

const publicRoutes: RouteProps[] = [
    {
        path: routes.register,
        Component: Register,
        layout: BaseLayout,
    },
    {
        path: routes.login,
        Component: Login,
        layout: BaseLayout,
    },
    {
        path: routes.forgotPassword,
        Component: ForgotPassword,
        layout: BaseLayout,
    }
];

const privateRoutes: RouteProps[] = [];

export {publicRoutes, privateRoutes};