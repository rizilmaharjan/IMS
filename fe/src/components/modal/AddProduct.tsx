import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/post/usePost";
// import { useCustomContext } from "../../context/Context";
import axios from "axios";
import { Product } from "../../context/context.types";

interface AddProductProps {
  closeModal: (val: boolean) => void;
  isEdit: boolean;
  editedItemValue: any;
  productsData: Product[] | null;
  closeEditModal: (value: React.SetStateAction<boolean>) => void;
  setProductsData: React.Dispatch<React.SetStateAction<Product[] | null>>;
}

const AddProduct: React.FC<AddProductProps> = ({
  closeModal,
  editedItemValue,
  closeEditModal,
  isEdit,
  productsData,
  setProductsData,
}) => {
  const { fetchData, datas, fetchError } = useAxios();
  const [productInfo, setProductInfo] = useState({
    name: "",
    amount: "",
    stock: "",
    image: "",
    brand: "",
    category: "",
    colors: ["", "", ""],
  });

  // const { setProductData, productsData } = useCustomContext();
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "colors") {
      const index = parseInt(e.target.dataset.index || "0", 10);
      const updatedColors = [...productInfo.colors];
      updatedColors[index] = value;

      setProductInfo((prev) => ({
        ...prev,
        colors: updatedColors,
      }));
    } else {
      setProductInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (isEdit) {
      setProductInfo((prev) => ({
        ...prev,
        name: editedItemValue?.name,
        amount: editedItemValue?.amount,
        stock: editedItemValue?.stock,
        image: editedItemValue?.image,
        brand: editedItemValue?.brand,
        category: editedItemValue?.category,
        colors: [
          editedItemValue?.colors[0],
          editedItemValue?.colors[1],
          editedItemValue?.colors[2],
        ],
      }));
    }
  }, [editedItemValue]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (productInfo.colors.length !== 3) {
    //   alert("Please enter three colors.");
    //   return;
    // }

    const addProducts = {
      ...productInfo,
    };
    if (!isEdit) {
      fetchData("http://localhost:8000/product/api/products", addProducts);
    } else {
      // console.log("inside the else block");

      const updateProduct = async () => {
        try {
          const res = await axios.put(
            `http://localhost:8000/product/api/products/${editedItemValue?._id}`,
            addProducts
          );
          const data = res.data;
          // console.log("🚀 ~ file: AddProduct.tsx:95 ~ updateProduct ~ data:", data)

          if (data.status === 200) {
            setProductInfo((prev) => ({
              ...prev,
              name: "",
              amount: "",
              stock: "",
              image: "",
              brand: "",
              category: "",
              colors: ["", "", ""],
            }));

            const updateProduct = productsData?.map((item: Product) => {
              if (item._id === data.data._id) {
                return data.data;
              }
              return item;
            });

            if (updateProduct) {
              setProductsData(updateProduct);
            }
            closeEditModal(false);
          }
          closeModal(false);
        } catch (error) {
          console.log(error);
        }
      };

      updateProduct();
    }
  };

  useEffect(() => {
    if (datas?.status === 200) {
      setProductInfo((prev) => ({
        ...prev,
        name: "",
        amount: "",
        stock: "",
        image: "",
        brand: "",
        category: "",
        colors: ["", "", ""],
      }));
      setProductsData([...(productsData || []), datas.data]);
    }
  }, [datas]);

  return (
    <>
      <div
        onClick={() => {
          closeModal(false);
          closeEditModal(false);
        }}
        className="fixed cursor-pointer z-50 top-0 left-0 h-screen w-full modal-background flex items-center justify-center"
      >
        <div
          onClick={handleModalClick}
          className="w-[500px] h-[550px] bg-white rounded-xl"
        >
          <div className="w-[90%] mx-auto">
            <h1 className="text-2xl font-semibold pt-2">Add Product</h1>
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="flex flex-col mt-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-semibold">Product Name</label>
                  <br />
                  <input
                    name="name"
                    className=" mt-1 bg-gray-200 py-1 px-2 outline-none"
                    type="text"
                    onChange={handleChange}
                    value={productInfo.name}
                  />
                </div>
                <div className="my-2 w-full">
                  <div className="ml-14">
                    <label className="font-semibold">Categories</label>
                    <br />
                    <select
                      name="category"
                      className="bg-gray-200 mt-1 w-full py-1 px-2 outline-none"
                      onChange={handleChange}
                      value={productInfo.category}
                    >
                      {/* <option value=""></option> */}
                      <option value="accessories">Accessories</option>
                      <option value="laptops">Laptops</option>
                      <option value="console">Console</option>
                      <option value="televisions">Mobile</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="my-2">
                  <label className="font-semibold">Price</label>
                  <br />
                  <input
                    className="mt-1 bg-gray-200 py-1 px-2 outline-none"
                    name="amount"
                    type="number"
                    onChange={handleChange}
                    value={productInfo.amount}
                  />
                </div>
                <div className="my-2 ml-14">
                  <label className="font-semibold">Stock</label>
                  <br />
                  <input
                    className="mt-1 bg-gray-200 w-full py-1 px-2 outline-none"
                    name="stock"
                    type="number"
                    onChange={handleChange}
                    value={productInfo.stock}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="my-2">
                  <label className="font-semibold">Image</label>
                  <br />
                  <input
                    className="mt-1 bg-gray-200 py-1 px-2 outline-none"
                    name="image"
                    type="text"
                    onChange={handleChange}
                    value={productInfo.image}
                  />
                </div>
                <div className="my-2 ml-14">
                  <label className="font-semibold">Brand</label>
                  <br />
                  <input
                    className="mt-1 bg-gray-200 py-1 w-full px-2 outline-none"
                    name="brand"
                    type="text"
                    onChange={handleChange}
                    value={productInfo.brand}
                  />
                </div>
              </div>

              <div className="my-2">
                <label className="font-semibold">Colors</label>
                <br />
                {productInfo.colors.map((color, index) => (
                  <div>
                    <input
                      key={index}
                      className="mt-1 bg-gray-200 py-1 px-2 outline-none"
                      name="colors"
                      type="text"
                      onChange={handleChange}
                      value={color}
                      data-index={index} // Add a data-index attribute to identify the index of the color being edited
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <button
                  disabled={
                    productInfo.name === "" ||
                    productInfo.amount === "" ||
                    productInfo.image === "" ||
                    productInfo.stock === ""
                  }
                  className="w-20 bg-[#6856f4] text-white cursor-pointer font-semibold py-2 rounded-lg"
                >
                  {isEdit ? "Edit" : "Add"}
                </button>
              </div>
            </form>
            <div className="mt-3 text-center">
              {datas?.status === 200 && (
                <p className="text-green-600 font-semibold">{datas.message}</p>
              )}
              {fetchError?.status === 409 && (
                <p className="text-red-600 font-semibold">
                  {fetchError.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
