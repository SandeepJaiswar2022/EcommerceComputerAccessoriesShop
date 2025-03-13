import { Address, Contactus, Admin, Home, MyOrders, OrderSummaryPostPayment, OrderSummaryPrePayment, ProtectedRoute, ProtectedRouteLoggedInOnly, Shop, UserProfile, ViewCart, ViewProduct, AllProducts } from './Component'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from "./Layout"
import { SignIn, SignUp } from './Auth'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserIfAdmin, getUserProfile } from './State/Auth/AuthSlice';
import { useEffect } from 'react';
import AdminRoute from './Component/ProtectedRoute/AdminRoute';
import AdminRestrictedRoute from './Component/ProtectedRoute/AdminRestrictedRoute';
import AddProduct from './Component/Admin/AddProduct';
import AllOrders from './Component/Admin/AllOrders';
import OrderDetailView from './Component/Admin/OrderDetailView';
import Category from './Component/Admin/Category';
import Customers from './Component/Admin/Customers';
import Report from './Component/Admin/Report';




function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    // localStorage.removeItem("jwtToken");
    if (auth?.jwtToken) {
      dispatch(getUserProfile(auth?.jwtToken));
    }
  }, [dispatch, auth.jwtToken]);

  useEffect(() => {
    dispatch(getAllUserIfAdmin(auth?.role));
  }, [auth?.role])


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>

        <Route path='/admin/dashboard' element={
          <AdminRoute>
            <Admin />
          </AdminRoute>}
        />

        <Route path='/admin/addproduct' element={
          <AdminRoute>
            <AddProduct />
          </AdminRoute>}
        />

        <Route path='/admin/category' element={
          <AdminRoute>
            <Category />
          </AdminRoute>}
        />

        <Route path='/admin/customers' element={
          <AdminRoute>
            <Customers />
          </AdminRoute>}
        />

        <Route path='/admin/orderhistory' element={
          <AdminRoute>
            <AllOrders />
          </AdminRoute>}
        />

        <Route path='/admin/orderDetails/:orderId' element={
          <AdminRoute>
            <OrderDetailView />
          </AdminRoute>}
        />

        <Route path='/admin/products' element={
          <AdminRoute>
            <AllProducts />
          </AdminRoute>}
        />

        <Route path='/admin/report' element={
          <AdminRoute>
            <Report />
          </AdminRoute>}
        />

        <Route path="/" element={
          <AdminRestrictedRoute>
            <Home />
          </AdminRestrictedRoute>}
        />

        <Route path="/contact" element={
          <AdminRestrictedRoute>
            <Contactus />
          </AdminRestrictedRoute>}
        />

        <Route path='/shop' element={
          <AdminRestrictedRoute>
            <Shop />
          </AdminRestrictedRoute>}
        />
        <Route path='/product/:productId' element={
          <AdminRestrictedRoute>
            <ViewProduct />
          </AdminRestrictedRoute>}
        />
        <Route path='/preordersummary' element={<OrderSummaryPrePayment />} />
        <Route path='/address' element={<Address />} />
        <Route path='/postordersummary/:orderId' element={<OrderSummaryPostPayment />} />

        <Route
          path="/signup"
          element={
            <ProtectedRoute>
              <SignUp />
            </ProtectedRoute>}
        />

        <Route
          path="/signin"
          element={
            <ProtectedRoute>
              <SignIn />
            </ProtectedRoute>}
        />
        <Route
          path="/cart"
          element={
            <ProtectedRouteLoggedInOnly>
              <ViewCart />
            </ProtectedRouteLoggedInOnly>}
        />
        <Route
          path="/myorders"
          element={
            <ProtectedRouteLoggedInOnly>
              <MyOrders />
            </ProtectedRouteLoggedInOnly>}
        />
        {/* <Route
          path='/address'
          element={
            <ProtectedRouteLoggedInOnly>
              <Address setCanAccess={setCanAccess} />
            </ProtectedRouteLoggedInOnly>
          }
        /> */}
        <Route
          path='/myprofile'
          element={
            <ProtectedRouteLoggedInOnly>
              <UserProfile />
            </ProtectedRouteLoggedInOnly>}
        />
        {/* <Route
          path='/ordersummary'
          element={
            <ProtectedRouteLoggedInOnly>
              <UserProfile />
            </ProtectedRouteLoggedInOnly>
          }
        /> */}
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
