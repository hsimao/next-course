import { useEffect, useState } from "react";
import useSWR from "swr";

export default function LastSalesPage() {
  const [sales, setSales] = useState(false);

  const transformSalesData = (sales) => {
    return Object.keys(sales).map((key) => ({
      id: key,
      ...sales[key]
    }));
  };

  const { data, error } = useSWR(
    "https://react-course-ddef7-default-rtdb.firebaseio.com/sales.json"
  );

  useEffect(() => {
    if (data) {
      setSales(transformSalesData(data));
    }
  }, [data]);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data || !sales) {
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
