import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.notFound}>404</p>
        <p>Такої сторінки не існує</p>
        <p>Неправильно набрана адреса або такої сторінки не існує.</p>
        <div>
          <Link to="/">Головна</Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
