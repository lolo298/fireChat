import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes } from "./Routes";
//@ts-ignore
export function render(url, context) {
  return ReactDOMServer.renderToString(
    //@ts-ignore
    <StaticRouter location={url} context={context}>
      <Routes />
    </StaticRouter>
  );
}
