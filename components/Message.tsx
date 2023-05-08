import { useSender, useUser } from "@utils/hooks";
import { ProfilePicture } from "./ProfilePicture";
import styles from "@styles/Message.module.scss";

export function Message({ data }: { data: Message }) {
  const user = useUser();
  const sender = useSender(data.sender);
  if (user.isLoading || sender.isLoading) return null;
  const state = user.data?.uid === sender.data?.uid ? "sender" : "receiver";
  const PPprops =
    state === "sender"
      ? { username: user.data.displayName, uid: user.data.uid }
      : { username: sender.data.name, uid: sender.data.uid };
  return (
    <div className={styles.message + " " + styles[state]}>
      <div className={styles.profile + " " + styles[state]}>
        <ProfilePicture {...PPprops} saturation={50} lightness={50} width={50} height={50} />
        <h4>{sender.data?.name}</h4>
      </div>
      <h3>{data.message}</h3>
    </div>
  );
}
