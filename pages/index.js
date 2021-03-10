import fs from "fs/promises";
import path from "path";
import Link from "next/link";

// server side render 自動產生 html + json 的頁面
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  console.log("Re Generating...");

  if (!data) {
    return {
      redirect: {
        destination: "/no-data"
      }
    };
  }

  if (!data.products) {
    // 導到 404 頁面
    return { notFound: true };
  }

  return {
    props: {
      products: data.products
    },
    // 每次使用者請求打過來時, 嘗試重新生成靜態 HTML, 10 內秒最多重新生成一次
    revalidate: 10
  };
}

export default function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}
