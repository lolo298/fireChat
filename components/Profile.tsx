import { useEffect, useState } from "react";
import styles from "@styles/Profile.module.scss";
import  Link  from "next/link";

export function Profile({user}) {
  return (
    <Link href="/" className={styles.profil}>
      <img src={user?.picture.large} alt="PP" />
      <h3>{user?.login.username}</h3>
    </Link>
  );
}
