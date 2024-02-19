import { useCustomContext } from "../../context/Context";
import ProductCard from "../../components/productCard/ProductCard";
import UserNavbar from "../../components/navbar/UserNavbar";
import Loader from "../../components/loader/Loader";

interface IProducts{
    _id:string;
    name:string;
    amount:string;
    stock:number;
    image:string;
}
export const UserProducts = () => {
  const { productData } = useCustomContext();
  return (
    <>
      {/* <UserNavbar /> */}
      <div className="pb-8 w-11/12 mx-auto mt-7">
        <h1 className="text-3xl ml-4 font-semibold px-8 capitalize">
          Our Products
        </h1>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-10 place-items-center">
          {productData ? (

            productData?.map((item:IProducts) => (<ProductCard key={item._id} {...item} />))
          ) : (
            <div className="mx-auto">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

