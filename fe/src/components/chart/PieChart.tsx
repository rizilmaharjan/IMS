import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useEffect, useState } from "react"; // Import useState
import { Order, Product } from "../../context/context.types";

type Products = {
  amount: string;
  brand: string;
  category: string;
  colors: string[];
  image: string;
  name: string;
  stock: number;
  _id: string;
};
type props = {
  width: number;
  height: number;
  radius: number;
  datas: Products[];
};

const UserPieChart = ({ datas, width, height, radius }: props) => {
  const [pieChartData, setPieChartData] = useState<[] | any>(null);

  // console.log("datas sent in pie chart", datas);

  useEffect(() => {
    // console.log("product datas inside the useeffect", datas);
    if (datas?.length > 0 && datas) {
      const categoryCounts = datas.reduce((counts: any, item: Products) => {
        // console.log("item", item);
        const category =
          // item.type === "product" ? item.category : item?.product?.category;
          item.category;
        // console.log("category", category);
        counts[category] = (counts[category] || 0) + 1;
        return counts;
      }, {});

      const data = Object.keys(categoryCounts).map((category) => ({
        name: category,
        value: categoryCounts[category],
      }));

      setPieChartData(data);
    }

    // console.log("pieChartData:", data);

    // console.log("datas:", datas);
  }, [datas]);

  return (
    <>
      <PieChart width={width} height={height}>
        <Pie
          dataKey="value"
          data={pieChartData}
          cy={height / 2}
          outerRadius={radius}
          fill="#8884d8"
          label
        >
          {pieChartData?.map((index: number) => (
            <Cell
              key={`cell-${index}`}
              fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="vertical" align="right" verticalAlign="top" />
      </PieChart>
    </>
  );
};

export default UserPieChart;
