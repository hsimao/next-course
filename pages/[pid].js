import fs from "fs/promises";
import path from "path";

import { Fragment, useEffect } from "react";

// 動態網址頁面需要使用 getStaticPaths 方法, 讓 next 知道需要渲染哪些頁面
export async function getStaticPaths() {
  return {
    paths: [
      { params: { pid: "p1" } }
      // { params: { pid: "p2" } },
      // { params: { pid: "p3" } }
    ],
    // 只先預宣染有寫 paths 的頁面(p1), 其他頁面則可以等有人訪問才產生
    fallback: true
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  console.log("detail page formt server side", params);

  const productId = params.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  const product = data.products.find((product) => product.id === productId);

  return {
    props: { loadedProduct: product }
  };
}

export default function ProductDetailPage(props) {
  const { loadedProduct } = props;

  // 如果訪問到未先渲染的頁面給 Loading 提示
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}
