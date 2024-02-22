import { useEffect, useState } from "react";
import Error from "./pages/Error";
import Login from "./pages/Login";
import PasswordReset from "./pages/PasswordReset";
import Registration from "./pages/registration/Registration";
import { Routes, Route } from "react-router-dom";
import { useCustomContext } from "./context/Context";
import { lazy, Suspense } from "react";
import Loader from "./components/loader/Loader";
import Private from "./layout/Private";
import UserLayout from "./layout/UserLayout";
// import Notification from "./pages/Notification";

// admin
const Home = lazy(() => import("./pages/Home"));
const Users = lazy(() => import("./pages/Users"));
const SingleUser = lazy(() => import("./pages/SingleUser"));
const Products = lazy(() => import("./pages/Products"));
const SingleProduct = lazy(() => import("./pages/SingleProduct"));
const Orders = lazy(() => import("./pages/Orders"));
const History = lazy(() => import("./pages/History"));

// users

const UserHome = lazy(() =>
  import("./pages/userPages/UserHome").then((module) => ({
    default: module.UserHome,
  }))
);
const UserProducts = lazy(() =>
  import("./pages/userPages/UserProducts").then((module) => ({
    default: module.UserProducts,
  }))
);

const UserOrder = lazy(() =>
  import("./pages/userPages/UserOrder").then((module) => ({
    default: module.UserOrder,
  }))
);

const App = () => {
  const { userRole, setLoggedInUser } = useCustomContext();
  const storedRole = localStorage.getItem("userRole");
  const [role, setRole] = useState<string | null>(storedRole);

  useEffect(() => {
    setLoggedInUser(userRole?.data.data);
    // console.log("logged in user", userRole?.data.data)

    if (userRole?.data.data.role) {
      localStorage.setItem("userId", userRole?.data.data._id);
      localStorage.setItem("userRole", userRole.data.data.role);
      setRole(userRole.data.data.role);
    }
  }, [userRole]);

  return (
    <>
      <Routes>
        <Route element={<Private />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />

          {role === "ADMIN" && (
            <>
              <Route
                path="/dashboard"
                element={
                  <Suspense fallback={<Loader />}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path="/users"
                element={
                  <Suspense fallback={<Loader />}>
                    <Users />
                  </Suspense>
                }
              />
              <Route
                path="/users/:id"
                element={
                  <Suspense fallback={<Loader />}>
                    <SingleUser />
                  </Suspense>
                }
              />
              <Route
                path="/products"
                element={
                  <Suspense fallback={<Loader />}>
                    <Products />
                  </Suspense>
                }
              />
              <Route
                path="/products/:id"
                element={
                  <Suspense fallback={<Loader />}>
                    <SingleProduct />
                  </Suspense>
                }
              />
              <Route
                path="/orders"
                element={
                  <Suspense fallback={<Loader />}>
                    <Orders />
                  </Suspense>
                }
              />
              <Route
                path="/history"
                element={
                  <Suspense fallback={<Loader />}>
                    <History />
                  </Suspense>
                }
              />
              {/* <Route
              path="/notification"
              element={
                <Suspense fallback={<Loader />}>
                  <Notification />
                </Suspense>
              }
            /> */}
            </>
          )}

          {role === "MEMBER" && (
            <>
              <Route element={<UserLayout />}>
                <Route
                  path="/dashboard"
                  element={
                    <Suspense fallback={<Loader />}>
                      <UserHome />
                    </Suspense>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <Suspense fallback={<Loader />}>
                      <UserProducts />
                    </Suspense>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <Suspense fallback={<Loader />}>
                      <UserOrder />
                    </Suspense>
                  }
                />
              </Route>
            </>
          )}

          <Route path="/reset-password/:id" element={<PasswordReset />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
