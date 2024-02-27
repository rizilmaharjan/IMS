import {
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Data } from "../../data/Data/data";
import { useCustomContext } from "../../context/Context";

interface IChartProps {
  title: string;
  aspect: number;
}

const Chart = ({ title, aspect }: IChartProps) => {
  const { toggleDarkMode } = useCustomContext();
  return (
    <>
      <div
        className={` ${
          toggleDarkMode ? "bg-[#232323] text-white" : "bg-white"
        } drop-shadow-lg py-4 w-1/2 px-3`}
      >
        <div className="mb-6">
          <p className="text-[#908E9B] opacity-40 ">{title}</p>
        </div>
        <ResponsiveContainer width={"100%"} aspect={aspect}>
          <AreaChart
            width={730}
            height={250}
            data={Data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="gray" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Total"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#total)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Chart;
