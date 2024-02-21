import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/post/usePost";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCustomContext } from "../../context/Context";

interface IPlaceOrder {
  productDetails: {
    name: string;
    amount: string;
    image: string;
    _id: string;
    stock?: number;
    brand?: string;
    category?: string;
    colors?: string[];
  };
  closeModal: (value: boolean) => void;
}

const PlaceOrder = ({ productDetails, closeModal }: IPlaceOrder) => {
  const [productNumber, setProductNumber] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isColorSelected, setIsColorSelected] = useState(true);
  const { fetchData, datas, fetchError } = useAxios();
  const [totalAmount, setTotalAmount] = useState<number>(
    parseFloat(productDetails.amount) * productNumber
  );
  const { status } = useCustomContext();
  const handleCloseModal = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  const loggedUserID = localStorage.getItem("LoggedInUserID");
  const productData = {
    name: productDetails.name,
    image: productDetails.image,
    noOfProducts: productNumber,
    orderedId: loggedUserID,
    status: status,
    totalAmount: totalAmount,
    color: selectedColor,
    category: productDetails.category
  };
  const handleSubmit = () => {
    if (productData.color === null) {
      setIsColorSelected(false);
      return;
    }
    fetchData("http://localhost:8000/product/api/orders", productData);
  };


  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsColorSelected(true)
    }, 2000);
    
  
    return () => {
      clearTimeout(timeout)
      
    }
  }, [isColorSelected]);

  useEffect(() => {
    const calculatedTotalAmount =
      parseFloat(productDetails.amount) * productNumber;
    setTotalAmount(calculatedTotalAmount);
  }, [productNumber, productDetails]);

  useEffect(() => {
    if (datas?.status === 200) {
      setProductNumber(1);
      // closeModal(false)
      toast.success("Order placed successfully");
    } else {
      console.log(fetchError);
    }
  }, [datas, fetchError]);

  return (
    <>
      <div
        onClick={() => closeModal(false)}
        className="h-screen cursor-pointer fixed top-0 left-0 modal-background z-30 w-full flex items-center justify-center"
      >
        <div
          onClick={handleCloseModal}
          className="bg-white rounded-lg w-[90%] h-[60%] md:w-[55%] md:h-[70%]"
        >
          <div className="w-[85%] mx-auto flex justify-between items-center">
            <div className="mt-24">
              <div className="text-2xl capitalize mb-4 font-semibold">
                {productDetails.name}
              </div>
              <div className="capitalize">
                Brand: <span className="uppercase">{productDetails.brand}</span>
              </div>
              <div className="mt-1">
                Product Type: <span className="capitalize">{productDetails.category}</span>
              </div>
              <div className="mt-6">
                <div className="flex gap-14 uppercase font-bold">
                  color:
                  <div className="flex gap-4">
                    {productDetails.colors && productDetails.colors.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => handleColorClick(item)}
                        className={`${
                          item === "white" || item === "black"
                            ? `bg-${item} w-6 rounded-full border ${
                                selectedColor === item
                                  ? "ring-4 ring-blue-500"
                                  : "border-gray-400"
                              } h-6`
                            : `bg-${item}-500 w-6 rounded-full border ${
                                selectedColor === item
                                  ? `ring-4 ring-blue-500 `
                                  : "border-gray-400"
                              } h-6`
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex mt-3 gap-5">
                  <h1 className="uppercase font-bold">Quantity:</h1>
                  <div className="ml-2 border border-gray-300 w-20 flex justify-between items-center px-1 rounded-xl">
                    <button
                      disabled={productNumber === 1}
                      onClick={() => setProductNumber((prev) => prev - 1)}
                      className="font-bold text-xl"
                    >
                      -
                    </button>
                    {productNumber}
                    <button
                      onClick={() => setProductNumber((prev) => prev + 1)}
                      className="font-bold text-xl"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-16 items-center mt-14">
                <p className="text-3xl md:text-6xl">${totalAmount}</p>
                <div>
                  <button
                    onClick={handleSubmit}
                    className="bg-black capitalize w-24 h-9 md:w-28 md:h-11 rounded-xl text-white font-semibold"
                  >
                    buy now
                  </button>
                </div>
              </div>
                
            </div>

            <div className="hidden md:block md:w-80">
              <img
                className="w-full h-full object-cover"
                src={productDetails.image}
                alt={productDetails.name}
              />
            </div>
          </div>
          <div className="mt-14 text-lg text-red-500 font-bold text-center">
                  {isColorSelected === false && <p>Please select a color</p>}
                </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default PlaceOrder;
