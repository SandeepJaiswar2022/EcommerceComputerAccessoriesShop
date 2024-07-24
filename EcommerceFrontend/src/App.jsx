import { Address, AfterOrderPlaced, Contactus, Footer, Header, Home, MyOrders, ProtectedRoute, ProtectedRouteLoggedInOnly, Shop, UserProfile, ViewCart, ViewProduct } from './Component'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from "./Layout"
import { SignIn, SignUp } from './Auth'
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from './State/Auth/AuthSlice';
import { useEffect } from 'react';
import { getCartItems } from './State/CartItem/CartItemSlice';



function App() {

  const dispatch = useDispatch();
  const jwtToken = useSelector((state) => state.auth.jwtToken);
  const cartItem = useSelector(state => state.cartItem)
  useEffect(() => {
    if (jwtToken) {
      dispatch(getUserProfile(jwtToken));
    }
  }, [dispatch, jwtToken]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/product/:productId' element={<ViewProduct />} />
        <Route path='/orderPlaced' element={<AfterOrderPlaced />} />
        <Route path='/myOrders' element={<MyOrders />} />
        <Route
          path="/signup"
          element={
            <ProtectedRoute>
              <SignUp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <ProtectedRoute>
              <SignIn />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRouteLoggedInOnly>
              <ViewCart />
            </ProtectedRouteLoggedInOnly>
          }
        />
        <Route
          path='/address'
          element={
            <ProtectedRouteLoggedInOnly>
              <Address />
            </ProtectedRouteLoggedInOnly>
          }
        />
        <Route
          path='/myprofile'
          element={
            <ProtectedRouteLoggedInOnly>
              <UserProfile />
            </ProtectedRouteLoggedInOnly>
          }
        />
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
