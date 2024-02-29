import loadMore from "./loadMore";
export default function directive(app: any) {
  app.directive("loadMore", loadMore);
}
