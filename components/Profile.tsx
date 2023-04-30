import { ProfilePicture } from "@components/ProfilePicture";
import styles from "@styles/Profile.module.scss";
import { AuthContext } from "@utils/context";
import Link from "next/link";
import { useContext } from "react";

export function Profile() {
  const { user } = useContext(AuthContext);
  return (
    <Link href="/" className={styles.profil}>
      <ProfilePicture username={user?.displayName} uid={user?.uid} saturation={50} lightness={50} />
      <h3>{user?.displayName}</h3>
    </Link>
  );
}
