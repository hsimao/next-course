import fs from "fs/promises";
import path from "path";

import { Fragment, useEffect } from "react";

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  return JSON.parse(jsonData);
}

// 動態網址頁面需要使用 getStaticPaths 方法, 讓 next 知道需要渲染哪些頁面
export async function getStaticPaths() {
  const data = await getData();

  const pathsParams = data.products.map((product) => ({
    params: {
      pid: product.id
    }
  }));

  return {
    // 只先預宣染有寫 paths 的頁面(p1), 其他頁面則可以等有人訪問才產生
    // paths: [
    //   { params: { pid: "p1" } }
    //   // { params: { pid: "p2" } },
    //   // { params: { pid: "p3" } }
    // ],
    // fallback: true
    paths: pathsParams,
    fallback: true
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  console.log("detail page formt server side", params);

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

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
