import React from "react";
import Link from "react-router-dom"

import Layout from "../components/Layout";

const NotFoundPage = () => {
  return (
    <Layout>
      <div>
        <p>404</p>
        <p>Такої сторінки не існує</p>
        <p>Неправильно набрана адреса або такої сторінки не існує.</p>
        <div>
          <Link to="/">Головна</Link>
        </div>
      </div>
    </Layout>
  );
};
export default NotFoundPage;
