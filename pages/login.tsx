import { cookies } from "@utils";
import { useRouter } from "next/router";
import appStyles from "@styles/index.module.scss";
import styles from "@styles/login.module.scss";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

export default function Login({ redirect, destination }) {
  const router = useRouter();

  if (redirect) {
    router.push(destination);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (email === "" || password === "") return;
    const body = {
      email,
      password,
    };
    const res = await fetch("/api/login", {
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
          Email
          <input type="text" name="email" id="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" id="password" required />
        </label>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.cookies;
  const props = {
    redirect: false,
    destination: "",
  };
  if (cookies.id) {
    const id = cookies.id;
    props.redirect = true;
    props.destination = `/users/${id}`;
  }

  return {
    props,
  };
};
