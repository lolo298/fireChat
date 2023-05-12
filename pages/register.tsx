import appStyles from "@styles/index.module.scss";
import styles from "@styles/login.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "@utils/firebaseClient";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useUser } from "@utils/hooks";

export default function Login() {
  const router = useRouter();
  const [user, userLoading] = useUser();
  if (user && !userLoading) {
    router.push("/chat");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const password2 = e.target.password2.value;
    if (username === "" || password === "" || email === "" || password !== password2) {
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      router.push("/chat");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className={appStyles.App}>
      <form action="" method="post" className={styles.loginForm} onSubmit={handleSubmit}>
        <label>
          Username
          <input type="text" name="username" id="username" required />
        </label>
        <label>
          email
          <input type="text" name="email" id="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" id="password" required />
        </label>
        <label>
          Confirm Password
          <input type="password" name="password2" id="password2" required />
        </label>
        <input type="submit" value="Login" />
        <Link href="/login">Already have an account</Link>
      </form>
    </div>
  );
}
