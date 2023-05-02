import { ProfilePicture } from "@components/ProfilePicture";
import styles from "@styles/Profile.module.scss";
import { useUser } from "@utils/hooks";
import Link from "next/link";
import { Spinner } from "./Spinner";

export function Profile() {
  const { user, isLoading } = useUser();
  if (isLoading) return <Spinner />;
  return (
    <Link href="/" className={styles.profil}>
      <ProfilePicture username={user?.displayName} uid={user?.uid} saturation={50} lightness={50} />
      <h3>{user?.displayName}</h3>
    </Link>
  );
}
