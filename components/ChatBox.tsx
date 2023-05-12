import { Message } from "@components";
import styles from "@styles/ChatBox.module.scss";
import { useMessages, useUser } from "@utils/hooks";
import { Spinner } from "./Spinner";
import { db } from "@utils/firebaseClient";
import { doc, arrayUnion, updateDoc } from "firebase/firestore";

export function ChatBox() {
  const [user, userLoading] = useUser();
  const [messages, messagesLoading] = useMessages(user?.uid);
  if (userLoading || messagesLoading) return <Spinner />;

  function handleNewMessage() {
    const newMessage = {
      message: "new message",
      sender: "3YWDaZQkiPh54SFnPf1NS12kP3Fh",
      timestamp: new Date(),
    };

    /*
    3YWDaZQkiPh54SFnPf1NS12kP3Fh: [
      {
        message: string;
        sender: string;
        timestamp: Date;
      }
    ]
    */
    const messageDoc = doc(db, "Messages", "EWVzXfKJd6BOY2DvQmFJLAbjWIFD");
    updateDoc(messageDoc, { "3YWDaZQkiPh54SFnPf1NS12kP3Fh": arrayUnion(newMessage) });
  }

  return (
    <div className={styles.chatbox}>
      <h2>ChatBox</h2>
      <ul>
        {messages["3YWDaZQkiPh54SFnPf1NS12kP3Fh"]?.map((data, id) => {
          console.log(data);
          return <Message data={data} key={id} />;
        })}
      </ul>
      <button onClick={handleNewMessage}>new Message</button>
    </div>
  );
}
