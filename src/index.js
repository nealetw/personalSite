import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./routes/main/Main";
import Clicker from "./routes/clicker/Clicker";
import Board from "./routes/board/Board";
import reportWebVitals from "./reportWebVitals";
import ErrorPage from "./routes/error-page";
import LOLSmash from "./routes/LOLSmash/LOLSmash";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/home",
        element: <Main />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/work",
        element: <Main />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/personal",
        element: <Main />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/clicker",
        element: <Clicker />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/smash",
        element: <LOLSmash />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/board",
        element: <Board />,
        errorElement: <ErrorPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
