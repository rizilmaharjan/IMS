import { useState } from "react";
import axios from "axios";
import Loader from "../loader/Loader";
import { AiOutlineSearch } from "react-icons/ai";
import AddProduct from "../modal/AddProduct";
import { useCustomContext } from "../../context/Context";
import { IProducts } from "./product.types";
import { AiFillEye } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { Product } from "../../context/context.types";
const ProductTable = () => {
  const { productData, setProductData } = useCustomContext();
  const [Modal, setModal] = useState<boolean>(false);
  const [products, setProducts] = useState<string>("");
  const [editedItemValue, setEditedItemValue] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const [individualProduct, setIndividualProduct] = useState<null | IProducts>(
    null
  );
  const [productModal, setProductModal] = useState<boolean>(false);
  const handleDelete = async (id: string) => {
    const deleteProduct = await axios.delete(
      `http://localhost:8000/product/api/products/${id}`
    );
    if (deleteProduct) {
      const filteredProduct = productData.filter(
        (item: IProducts) => item._id !== id
      );
      setProductData(filteredProduct);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const editedProduct = productData.find((item:Product) => {
        return item._id === id;
      });
      setEditedItemValue(editedProduct);
      setIsEdit(true);
      setModal(true);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleModal = () => {
    setModal(true);
  };

  const filterProducts = productData?.filter((item: Product) =>
    item?.name.toLowerCase().includes(products.toLowerCase())
  );

  const noProductsFound = filterProducts?.length === 0;

  return (
    <>
      {Modal && (
        <AddProduct
          isEdit={isEdit}
          editedItemValue={editedItemValue}
          closeEditModal={(val) => setIsEdit(val)}
          closeModal={(val) => setModal(val)}
        />
      )}

      <div className="bg-white mt-2 rounded-lg w-[97%] h-full pb-8 mx-auto pt-6 px-4">
        <div className="w-[97%] mx-auto flex justify-between items-center mt-2">
          <h1 className="text-2xl font-semibold">Products</h1>
          <div className="relative w-1/4 ">
            <input
              className={`border border-gray-300 text-black outline-none focus:border-blue-500 w-full px-3 py-2 rounded-lg`}
              type="text"
              placeholder="Search..."
              onChange={(e) => setProducts(e.target.value)}
              value={products}
            />
            <AiOutlineSearch className="absolute right-3 top-[14px] text-gray-400" />
          </div>
          <button
            onClick={handleModal}
            className=" text-white border w-36 h-10 rounded-full bg-[#6856f4] font-semibold"
          >
            Add Products
          </button>
        </div>
        <div className="bg-white">
          <table className="w-[97%] mx-auto mt-4 h-fit">
            <thead>
              <tr className="bg-[#6856f4] text-white">
                <th className="text-left px-3 py-4">ID</th>
                <th className="text-left px-3">Product</th>
                <th className="text-left px-3">Amount</th>
                <th className="text-left px-3">In Stock</th>
                <th className="text-left px-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {productData ? (
                noProductsFound ? (
                  <tr>
                    <td colSpan={5} className="text-center pt-60">
                      <span className="text-3xl text-gray-400">
                        Oops, product not available
                      </span>
                    </td>
                  </tr>
                ) : (
                  filterProducts.map((item: IProducts, indx: number) => (
                    <tr className="border" key={item._id}>
                      <td className="text-left py-6 px-3">{indx + 1}</td>
                      <td className="text-left px-3 w-72">
                        {item.name ? (
                          <div className="flex items-center gap-3">
                            <img width={"15%"} src={item.image} alt="image" />
                            <span className="capitalize">{item.name}</span>
                          </div>
                        ) : (
                          <p>Not Found</p>
                        )}
                      </td>
                      <td className="text-left px-3">{item.amount}</td>
                      <td className="text-left px-3">{item.stock}</td>
                      <td>
                        <div className="flex items-center">
                          <button
                            // onClick={() => handleProductView(item._id)}
                            onClick={() => navigate(`/products/${item._id}`)}
                            className="py-1 rounded-xl"
                          >
                            <AiFillEye
                              className="text-[#161cea] opacity-50"
                              size={30}
                            />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="w-10 ml-3 rounded-xl py-1"
                          >
                            <div className="hover:bg-red-600 text-red-600 flex justify-center items-center p-2 hover:transition-all hover:duration-300 hover:ease-in-out rounded-full h-10 hover:text-white">
                              <RiDeleteBin6Fill size={30} />
                            </div>
                          </button>
                          <button
                            className="ml-3 w-10"
                            onClick={() => handleUpdate(item._id)}
                          >
                            <BsPencilSquare size={20} color="green" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )
              ) : (
                <Loader />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductTable;
