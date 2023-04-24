import { cookies } from "@utils";
import { useRouter } from "next/router";
import appStyles from "@styles/index.module.scss";
import styles from "@styles/login.module.scss";
import { useEffect, useState } from "react";

export default function Login({ redirect, destination }) {
  const router = useRouter();
  if (redirect) {
    router.push(destination);
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
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookiesJson = cookies(context.req.headers.cookie);
  const props = {
    redirect: false,
    destination: "",
  };
  if (cookiesJson.id) {
    const id = cookiesJson.id;
    props.redirect = true;
    props.destination = `/users/${id}`;
  }

  return {
    props,
  };
}
