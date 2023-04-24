import styles from "@styles/index.module.scss";
import Link from "next/link";

function App({user}) {
  return (
    <div className={styles.App}>
        <Link href="/login">Go chating</Link>
    </div>
  );
}

export default App;
