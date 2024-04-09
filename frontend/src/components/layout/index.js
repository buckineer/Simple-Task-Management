import React from 'react';
import { useLocation } from "react-router-dom";
import DefaultLayout from './Default';
import MainLayout from './Main';

 const Layout = ({children}) => {
  const { pathname } = useLocation ();

  return (
    <>
      {pathname.includes("login") ? (
        <DefaultLayout> {children} </DefaultLayout>
      ) : (
        <MainLayout> {children} </MainLayout>
      )}
    </>
  );
 }

 export default Layout