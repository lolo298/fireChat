import { Message } from "@components";
import styles from "@styles/ChatBox.module.scss";

export function ChatBox() {
  return (
    <div className={styles.chatbox}>
      <h2>ChatBox</h2>
      <Message />
    </div>
  );
}
