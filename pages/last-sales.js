import { useEffect, useState } from "react";
import useSWR from "swr";

const transformSalesData = (sales) => {
  return Object.keys(sales).map((key) => ({
    id: key,
    ...sales[key]
  }));
};

// 第一次在 build time fetch data
export async function getStaticProps() {
  const sales = await fetch(
    "https://react-course-ddef7-default-rtdb.firebaseio.com/sales.json"
  )
    .then((res) => res.json())
    .then((data) => transformSalesData(data));

  return {
    props: { sales },
    revalidate: 10 // 後續將在每次 user 請求該頁面時重新 fetch data (10 秒內最多執行一次)
  };
}

export default function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);

  const { data, error } = useSWR(
    "https://react-course-ddef7-default-rtdb.firebaseio.com/sales.json"
  );

  // client side fetch data
  useEffect(() => {
    if (data) {
      setSales(transformSalesData(data));
    }
  }, [data]);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  const renderSales = () => {
    return sales.map(({ id, name, volume }) => (
      <li key={id}>
        {name} - ${volume}
      </li>
    ));
  };

  return <ul>{renderSales()}</ul>;
}
