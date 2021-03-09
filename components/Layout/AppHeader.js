import Link from "next/link";
import classes from "./AppHeader.module.css";

export default function AppHeader() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">NextEvents</Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href="/events"> Browse All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
