import { ProfilePicture } from "@components/ProfilePicture";
import styles from "@styles/Profile.module.scss";
import { AuthContext } from "@utils/context";
import Link from "next/link";
import { useContext } from "react";

export function Profile() {
  const userContext = useContext(AuthContext);
  return (
    <Link href="/" className={styles.profil}>
      <ProfilePicture
        username={userContext.displayName}
        uid={userContext.uid}
        saturation={50}
        lightness={50}
      />
      <h3>{userContext.displayName}</h3>
    </Link>
  );
}
