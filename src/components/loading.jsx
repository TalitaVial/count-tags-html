import styles from "../styles/loading.module.css";
import Load from "../assets/loading.svg";

function Loading() {
  return (
    <div className={styles.loading_container}>
      <img className={styles.loading_img} src={Load} alt="Loading" />
    </div>
  );
}

export default Loading;
