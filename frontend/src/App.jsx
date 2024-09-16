import { Navbar, Footer } from "./components";

import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./app.scss";

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      {/* <Navbar /> */}
    </div>
  );
}

export default App;

// yarn dev / yarn run dev
