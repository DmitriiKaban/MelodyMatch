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
  Message,
  Messages,
  Account,
  VerifyEmail,
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
          path: "/verify-email",
          element: <VerifyEmail />,
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
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/account/user/:id",
          element: <Account />,
        },
        // {
        //   path: "/pay/:id",
        //   element: <Pay />,
        // },
        // {
        //   path: "/success",
        //   element: <Success />,
        // },
        //
        // other used paths:
        //
        // "/gigs?genre="
        // "/gigs?search="
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
