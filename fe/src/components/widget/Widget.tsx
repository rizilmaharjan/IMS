import {
  KeyboardArrowUpOutlinedIcon,
  PersonOutlineOutlinedIcon,
  AccountBalanceWalletOutlinedIcon,
  ShoppingCartOutlinedIcon,
  MonetizationOnOutlinedIcon,
} from "../../utils/ReactIcons";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Order, Product, User } from "../../context/context.types";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

type props = {
  type: string;
  productData?: Product[];
  userData?: User[];
  orderData?: Order[];
  earnings?: any;
  totalOrders?: number;
};

type Data = {
  title: string;
  isMoney: boolean;
  link: string;
  icon: JSX.Element;
  total?: number | string; // Adjust the type based on your use case
  redirect?: string; // Optional property
};

const Widgets = ({
  type,
  productData,
  userData,
  orderData,
  earnings,
  totalOrders,
}: props) => {
  const navigate = useNavigate();
  console.log("hamro order", orderData);
  console.log("userdatas", userData);

  const filteredOrderedData =
    orderData && orderData?.filter((item) => item.status === "pending");

  let data: Data = {
    title: "",
    isMoney: false,
    link: "",
    icon: <></>, // Empty JSX element as a default
  };
  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all Users",
        icon: <PersonOutlineOutlinedIcon className="text-[crimson] " />,
        total: userData?.length,
        redirect: "users",
      };
      break;
    case "products":
      data = {
        title: "PRODUCTS",
        isMoney: true,
        link: "View all products",
        icon: <ShoppingCartOutlinedIcon className="text-yellow-600 " />,
        total: productData?.length,
        redirect: "products",
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all Orders",
        icon: <AccountBalanceWalletOutlinedIcon className="text-[purple]" />,

        total: totalOrders,
        redirect: "orders",
      };
      break;
    case "balance":
      data = {
        title: "EARNINGS",
        isMoney: true,
        // link: "See Details",
        icon: <MonetizationOnOutlinedIcon className="text-[green]" />,
        total: `$ ${earnings}`,
      };
      break;
    default:
      break;
  }
  return (
    <>
      <div className="flex justify-between px-4 gap-4 drop-shadow-lg bg-white w-[25%]  py-3 rounded-md h-28">
        <div className="flex flex-col justify-between">
          <span className="font-bold text-[14px] text-gray-400">
            {data.title}
          </span>
          <span className="text-[28px] font-semibold  text-black">
            {data?.total}
          </span>
          <span
            onClick={() => navigate(`/${data.redirect}`)}
            className="text-[12px] cursor-pointer border-b-2 border-gray-400 w-fit"
          >
            {data && data.link}
          </span>
        </div>
        <div className="flex flex-col justify-between items-end">
          {/* <div className="flex items-center text-[14px] text-black">
              <KeyboardArrowUpOutlinedIcon />
              20 %
            </div> */}
          <div
            className={classNames("rounded-md w-fit p-[2px] bg-[#ff000033]", {
              "bg-[#ff000033]": data?.title === "USERS",
              "bg-purple-200": data?.title === "ORDERS",
              "bg-yellow-300": data?.title === "PRODUCTS",
              "bg-green-300": data?.title === "EARNINGS",
            })}
          >
            {data && data.icon}
          </div>
        </div>
      </div>
    </>
  );
};

export default Widgets;
//
