import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import SignIn from './components/SignIn/SignIn';
import { signinData, signupData } from './Data/SigninData';
import Dashboard from './components/Dashboard/dashboard';
import AddProduct from './components/AddProduct/AddProduct';
import ProductShow from './components/ProductShow/ProductShow';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SignIn
        imgIcon={signinData.imgIcon}
        imgSrc={signinData.imgSrc}
        title={signinData.title}
        info={signinData.info}
        emailPlaceholder={signinData.emailPlaceholder}
        passwordPlaceholder={signinData.passwordPlaceholder}
        submitValue={signinData.submitValue}
        info2={signinData.info2}
        createAccountText={signinData.createAccountText}
        createAccountLink="/signup" 
      />
    ),
  },
  {
    path: "/signup",
    element: (
      <SignIn
        imgIcon={signinData.imgIcon}
        imgSrc={signupData.imgSrc}
        title={signupData.title}
        info={signupData.info}
        emailPlaceholder={signupData.emailPlaceholder}
        passwordPlaceholder={signupData.passwordPlaceholder}
        submitValue={signupData.submitValue}
        info2={signupData.info2}
        createAccountText="Sign in"
        createAccountLink="/" 
        isSignUp={true} 
      />
    ),
  },
  {
    path: "/dashboard",
    element: <Dashboard />, 
  },
  {
    path: "/add-product",
    element: <AddProduct/>, 
  },
  {
    path: "/product-details/:id",
    element: <ProductShow />, 
  }
  
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


