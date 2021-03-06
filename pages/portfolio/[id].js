import { useRouter } from "next/router";

export default function Products(props) {
  const router = useRouter();
  console.log(router.pathname);
  console.log(router.query);
  return (
    <div>
      <h1>Products Ids</h1>
    </div>
  );
}
