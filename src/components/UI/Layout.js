import styles from "./Layout.module.css";

const Layout = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.zIndex}>{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
