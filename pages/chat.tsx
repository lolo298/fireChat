import { ChatBox, Sidebar } from "@components";
import { UserRoute } from "@components/Routes";
import styles from "@styles/Chat.module.scss";

function App() {
  return (
    <UserRoute needLogged>
      <div className={styles.App}>
        <Sidebar />
        <ChatBox />
      </div>
    </UserRoute>
  );
}

// export async function getServerSideProps(context) {
//   const { id } = context.query;
//   const res = await fetch(`https://randomuser.me/api/?seed=${id}`);
//   const data = await res.json();
//   return {
//     props: {
//       user: data.results[0],
//     },
//   };
// }

export default App;
