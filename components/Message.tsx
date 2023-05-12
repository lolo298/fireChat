import { useSender, useUser } from "@utils/hooks";
import { ProfilePicture } from "./ProfilePicture";
import styles from "@styles/Message.module.scss";

export function Message({ data }: { data: Message }) {
  const [user, userLoading] = useUser();
  const [sender, senderLoading] = useSender(data.sender);
  if (userLoading || senderLoading) return null;
  const state = user?.uid === sender?.uid ? "sender" : "receiver";
  const PPprops =
    state === "sender"
      ? { username: user.displayName, uid: user.uid }
      : { username: sender.name, uid: sender.uid };

  const date: Date = data.timestamp.toDate();
  console.log(date);

  return (
    <li className={styles.message + " " + styles[state]}>
      <div className={styles.profile + " " + styles[state]}>
        <ProfilePicture {...PPprops} saturation={50} lightness={50} width={50} height={50} />
        <h4>{sender?.name}</h4>
      </div>
      <p className={styles.timeStamp}>{date.toISOString()}</p>
      <h3>{data.message}</h3>
    </li>
  );
}
