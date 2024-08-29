import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequireAuth } from "./pages/layout/Layout";
import SinglePage from "./pages/singlePage/SinglePage";
import List from "./pages/list/List";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import ProfileUpdate from "./pages/profileUpdate/ProfileUpdate";
import NewPost from "./pages/newPost/NewPost";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";
import AboutPage from "./pages/aboutPage/AboutPage";
import PostUpdate from "./pages/postUpdate/PostUpdate";
import Sponsors from "./pages/sponsors/Sponsors";
import GuestRoute from "./components/guestRoute/GuestRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/list",
          element: <List />,
          loader: listPageLoader
        },
        {
          path: "/about",
          element: <AboutPage />
        },
        {
          path: "/sponsors",
          element: <Sponsors />
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader
        },
        
        {
          path: "/",
          element: <GuestRoute />,
          children: [
            {
              path: "/login",
              element: <Login />
            },
            {
              path: "/register",
              element: <Register />
            }
          ]
        }
      ]
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        { 
          path: "/profile",
          element: <Profile />,
          loader: profilePageLoader
        },
        {
          path: "/profile/update",
          element: <ProfileUpdate />
        },
        {
          path: "/add",
          element: <NewPost />
        },
        {
          path: "/post/update/:id",
          element: <PostUpdate />,
          loader: singlePageLoader
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />
}

export default App
