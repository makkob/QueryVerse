import React from "react";

import UserRegistration from "../components/UserRegistration";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SignUp = () => {
  return (
    <>
      <Header />
      <UserRegistration />
       {/* Что бы закрепить оба футера внизу */}
       <div style={{bottom: "0", width: "100%", height:"80vh"}} />
        <Footer />

    </>
  );
};

export default SignUp;
