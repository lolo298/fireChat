declare interface Messages {
  [uid: string]: [Message];
}
interface Message {
  message: string;
  sender: string;
  timestamp: any;
}

declare interface Sender {
  uid: string;
  email: string;
  name: string;
}
