import appStyles from "@styles/index.module.scss";
import styles from "@styles/login.module.scss";
import { AuthContext } from "@utils/context";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  const userContext = useContext(AuthContext);

  if (userContext) {
    router.push(`/users/${userContext.displayName}`);
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
    const body = {
      username,
      password,
      password2,
      email,
    };
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data: loginRes = await res.json();
    if (data.success) {
      const id = data.id;
      router.push(`/users/${id}`);
    } else {
      console.error(data.message);
    }
  }

  const [error, setError] = useState(false);
  useEffect(() => {
    console.log("re-rendered");
  });
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
