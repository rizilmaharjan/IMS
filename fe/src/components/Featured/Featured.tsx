import "react-circular-progressbar/dist/styles.css";
import { useCustomContext } from "../../context/Context";
import UserPieChart from "../chart/PieChart";
const Featured = () => {
  const { productData } = useCustomContext();
  console.log("these are my product datas", productData);

  return (
    <>
      <div className="w-1/2 bg-white shadow-md">
        {productData?.length > 0 && productData && (
          <UserPieChart
            width={600}
            height={500}
            radius={140}
            datas={productData}
          />
        )}
      </div>
    </>
  );
};

export default Featured;
