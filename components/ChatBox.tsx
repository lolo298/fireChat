import { Message } from "@components";
import styles from "@styles/ChatBox.module.scss";
import { useMessages, useUser } from "@utils/hooks";
import { Spinner } from "./Spinner";

export function ChatBox() {
  const user = useUser();
  console.log(user.data?.uid);
  const messages = useMessages(user.data?.uid);
  if (user.isLoading || messages.isLoading) return <Spinner />;

  console.log("messages:", messages);

  return (
    <div className={styles.chatbox}>
      <h2>ChatBox</h2>
      {messages.data["3YWDaZQkiPh54SFnPf1NS12kP3Fh"]?.map((data, id) => (
        <Message data={data} key={id} />
      ))}
    </div>
  );
}
