import { useParams } from "react-router-dom";
import { useCustomContext } from "../context/Context";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import { Order, Product } from "../context/context.types";

const SingleProduct = () => {
  const { id } = useParams();
  const { productData, orderInfo } = useCustomContext();
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [orderedProducts, setOrderedProducts] = useState<Order[]>([]);

  useEffect(() => {
    const product = productData?.find((item: Product) => item._id === id);
    setSingleProduct(product);
  }, [productData]);

  useEffect(() => {
    const orderedProducts = orderInfo?.filter(
      (item: Order) => item.product.name === singleProduct?.name
    );
    // console.log("🚀 ~ file: SingleProduct.tsx:22 ~ useEffect ~ orderedProducts:", orderInfo)
    setOrderedProducts(orderedProducts);
  }, [orderInfo, singleProduct]);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full pb-2">
          <Navbar />
          <div className="w-[96%] mx-auto border">
            <div className="flex flex-col gap-24 px-8 justify-center-center bg-white rounded-lg h-screen">
              <div className="flex items-center gap-10 mt-4">
                <div className="">
                  <img
                    className="w-72"
                    src={singleProduct?.image}
                    alt={singleProduct?.name}
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold capitalize">
                    {singleProduct?.name}
                  </h1>
                  <p className="text-lg font-semibold text-gray-400 capitalize">
                    {singleProduct?.brand}
                  </p>
                  <p className="text-4xl font-semibold">
                    $ {singleProduct?.amount}
                  </p>
                </div>
              </div>

              <div className=" bg-white mb-2 box-shadow-third h-full broder-black w-full mx-auto rounded-lg border">
                <table className="w-full">
                  <thead className="bg-[#6856f4] text-white font-semibold">
                    <th className="text-center py-6">SN</th>
                    <th className="text-center">Product</th>
                    <th className="text-center">Ordered By</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center">Category</th>
                  </thead>
                  <tbody>
                    {orderedProducts.length > 0 ? (
                      orderedProducts?.map((item, indx) => (
                        <tr className="border">
                          <td className="text-center py-6">{indx + 1}</td>
                          <td className="text-center capitalize">
                            {item.product.name}
                          </td>
                          <td className="text-center capitalize">
                            {item.user.name}
                          </td>
                          <td className="text-center">{item?.noOfProducts}</td>
                          <td className="text-center capitalize">
                            {item.product.category}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          className="py-32 text-center text-3xl text-gray-400 font-semibold"
                          colSpan={5}
                        >
                          No Orders Yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* table info */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
