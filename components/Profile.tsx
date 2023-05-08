import { ProfilePicture } from "@components/ProfilePicture";
import styles from "@styles/Profile.module.scss";
import { useUser } from "@utils/hooks";
import Link from "next/link";
import { Spinner } from "./Spinner";

export function Profile() {
  const { data, isLoading } = useUser();
  if (isLoading) return <Spinner />;
  return (
    <Link href="/" className={styles.profil}>
      <ProfilePicture username={data?.displayName} uid={data?.uid} saturation={50} lightness={50} />
      <h3>{data?.displayName}</h3>
    </Link>
  );
}
