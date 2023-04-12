import { Message } from "@components";
import "@styles/ChatBox.scss";

export function ChatBox() {
  return (
    <div className="chatbox">
      <h2>ChatBox</h2>
      <Message />
    </div>
  );
}
