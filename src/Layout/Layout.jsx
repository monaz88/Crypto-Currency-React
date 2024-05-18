import React from "react";
import styles from "./Layout.module.css";

function Layout({children}) {
  return (
    <>
      <header className={styles.footer}>
        <h1>CRYPTO APP</h1>
        <p>React.js</p>
      </header>
      {children}
      <footer className={styles.footer}>
        <p> deevelop by mona with🤍</p>
      </footer>
    </>
  );
}

export default Layout;
