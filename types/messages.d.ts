declare interface Messages {
  [uid: string]: [Message];
}
interface Message {
  message: string;
  sender: string;
  timestamp: number;
}

declare interface Sender {
  uid: string;
  email: string;
  name: string;
}
