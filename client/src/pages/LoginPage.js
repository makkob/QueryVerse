import React from "react";

import UserLogin from "../components/UserLogin";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LoginPage = () => {
  return (
    <>
      <Header />
      <UserLogin />

        {/* Что бы закрепить оба футера внизу */}
      <div style={{bottom: "0", width: "100%", height:"70vh"}} />
      
        <Footer />
      
    </>
  );
};

export default LoginPage;
