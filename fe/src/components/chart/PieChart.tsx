import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useEffect, useState } from "react"; // Import useState
import { Order, Product } from "../../context/context.types";

type props={
  width:number,
  height: number,
  radius: number,
  datas: Product[] | Order[]

}
const UserPieChart = ({ datas, width, height,radius }:props) => {
  const [pieChartData, setPieChartData] = useState<[] | any>([]);

  useEffect(() => {
    const categoryCounts = datas?.reduce((counts:any, item) => {
      const category = item.category;
      counts[category] = (counts[category] || 0) + 1;
      return counts;
    }, {});

    const data = Object.keys(categoryCounts).map((category) => ({
      name: category,
      value: categoryCounts[category],
    }));

    setPieChartData(data);

    // console.log("pieChartData:", data);

    // console.log("datas:", datas);
  }, [datas]);

  return (
    <>
      <PieChart width={width} height={height}>
        <Pie
          dataKey="value"
          data={pieChartData} 
          cy={height/2}
          outerRadius={radius}
          fill="#8884d8"
          label
        >
          {pieChartData?.map((index:number) => (
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
