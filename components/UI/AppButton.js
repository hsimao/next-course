import Link from "next/link";
import classes from "./AppButton.module.css";

export default function AppButton(props) {
  return (
    <Link href={props.link}>
      <a className={classes.btn}>{props.children}</a>
    </Link>
  );
}
