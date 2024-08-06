import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './routes/main/Main';
import Clicker from './routes/clicker/Clicker';
import reportWebVitals from './reportWebVitals';
import ErrorPage from "./routes/error-page";

const router = createBrowserRouter([
  {
    path: "/:tab?",
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/clicker",
    element: <Clicker />,
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
