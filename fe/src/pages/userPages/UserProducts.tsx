import { useCustomContext } from "../../context/Context";
import ProductCard from "../../components/productCard/ProductCard";
import UserNavbar from "../../components/navbar/UserNavbar";
import Loader from "../../components/loader/Loader";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useEffect, useState } from "react";
import axios from "axios";

interface IProducts {
  _id: string;
  name: string;
  amount: string;
  stock: number;
  image: string;
}
export const UserProducts = () => {
  const [page, setPage] = useState(1);
  const [productsData, setProductsData] = useState([]);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };
  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/product/api/products?page=${page}&limit=8`
        );
        setProductsData(res.data.data);
        console.log("user side products", res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [page]);
  return (
    <>
      {/* <UserNavbar /> */}
      <div className="pb-8 px-3 mt-7 flex flex-col min-h-screen">
        <h1 className="text-3xl ml-4 font-semibold px-8 capitalize">
          Our Products
        </h1>
        <div className="mt-10 grid grow grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-10 place-items-center">
          {productsData ? (
            productsData?.map((item: IProducts) => (
              <ProductCard
                key={item._id}
                {...item}
                allProductsData={productsData}
              />
            ))
          ) : (
            <div className="mx-auto">
              <Loader />
            </div>
          )}
        </div>
        {/* buttons for pagination */}
        <div className="flex justify-between px-10 w-full mt-10">
          <button
            onClick={handlePreviousPage}
            className="border bg-black text-white border-black w-24 h-10 text-center rounded-full py-2 relative"
          >
            Prev
            <GoArrowLeft className="absolute top-3 left-3" />
          </button>
          <button
            disabled={productsData.length < 8}
            onClick={handleNextPage}
            className="border bg-black relative text-white border-black w-24 h-10 rounded-full py-2"
          >
            Next
            <GoArrowRight className="absolute top-3 right-3" />
          </button>
        </div>
      </div>
    </>
  );
};
