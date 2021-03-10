import fs from "fs/promises";
import path from "path";

// server side render 自動產生 html + json 的頁面
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  console.log("in server side");

  return {
    props: {
      products: data.products
    }
  };
}

export default function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <p key={product.id}>{product.title}</p>
      ))}
    </ul>
  );
}
