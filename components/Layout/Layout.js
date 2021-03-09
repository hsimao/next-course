import { Fragment } from "react";
import AppHeader from "./AppHeader";

export default function Layout(props) {
  return (
    <Fragment>
      <AppHeader />
      <main>{props.children}</main>
    </Fragment>
  );
}
