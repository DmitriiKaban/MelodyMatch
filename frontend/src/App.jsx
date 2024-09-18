import { Navbar, Footer, ScrollToTop } from "./components";
import {
  Home,
  Gig,
  Gigs,
  MyGigs,
  Orders,
  Login,
  Signup,
  Add,
  Create,
} from "./pages";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./app.scss";

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <ScrollToTop />
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
        {
          path: "/auth/login",
          element: <Login />,
        },
        {
          path: "/auth/signup",
          element: <Signup />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/gig/:id",
          element: <Gig />,
        },
        {
          path: "/myGigs",
          element: <MyGigs />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/account",
          element: <Create />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

// yarn dev / yarn run dev
