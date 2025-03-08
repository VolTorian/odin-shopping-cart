import App from "./App";
import Cart from "./Cart";
import Home from "./Home";
import Shop from "./Shop";
import Error404 from "./Error404";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <Home /> },
            { path: "shop", element: <Shop /> },
            { path: "cart", element: <Cart /> },
            { path: "*", element: <Error404 /> },
        ]
    }
];

export default routes;