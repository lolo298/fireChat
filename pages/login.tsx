import { UserRoute } from "@components/Routes";
import appStyles from "@styles/index.module.scss";
import styles from "@styles/login.module.scss";
import Link from "next/link";
import { auth } from "@utils/firebaseClient";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   const email = e.target.email.value;
  //   const password = e.target.password.value;
  //   if (email === "" || password === "") return;
  //   const body = {
  //     email,
  //     password,
  //   };
  //   const res = await fetch("/api/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(body),
  //   });
  //   const data: loginRes = await res.json();
  //   if (data.success) {
  //     router.push("/chat");
  //   } else {
  //     console.error(data.message);
  //   }
  // }

  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    if (credentials.user) {
      router.push("/chat");
    } else {
      console.error("Failed to login");
    }
  }

  return (
    <UserRoute needNotLogged>
      <div className={appStyles.App}>
        <form action="" method="post" className={styles.loginForm} onSubmit={handleSubmit}>
          <label>
            Email
            <input type="text" name="email" id="email" required />
          </label>
          <label>
            Password
            <input type="password" name="password" id="password" required />
          </label>
          <input type="submit" value="Login" />
          <Link href="/register">Don't have an Account</Link>
        </form>
      </div>
    </UserRoute>
  );
}
