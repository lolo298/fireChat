import styles from "@styles/Spinner.module.scss";
export function Spinner() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
    </div>
  );
}
