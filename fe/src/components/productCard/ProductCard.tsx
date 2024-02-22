import { useState } from "react";
import { useCustomContext } from "../../context/Context";
import PlaceOrder from "../modal/PlaceOrder";
interface IProductCard {
  name: string;
  amount: string;
  image: string;
  _id: string;
  stock?: number;
}
const ProductCard = ({ name, amount, image, _id }: IProductCard) => {
  const { productData } = useCustomContext();
  const [individualProduct, setIndividualProduct] =
    useState<null | IProductCard>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);

  const handleOrderModal = (id: string) => {
    const individualProduct = productData?.find(
      (item: IProductCard) => item._id === id
    );
    setIndividualProduct(individualProduct);
  };

  return (
    <>
      {isProductModalOpen && individualProduct && (
        <PlaceOrder
          closeModal={(val: boolean) => setIsProductModalOpen(val)}
          productDetails={individualProduct}
        />
      )}
      <div className=" h-96 w-9/12 relative flex bg-white box-shadow rounded-md py-6 flex-col">
        <div className="px-4">
          <div className="w-full h-36">
            <img className="h-full object-cover" src={image} alt={name} />
          </div>
          <div className="mt-12  w-full">
            <h1 className="capitalize text-xl">{name}</h1>
          </div>
          <div className="mt-4  w-full">
            <p className="text-4xl font-semibold">$ {amount}</p>
          </div>
        </div>
        <div className="absolute bottom-0 w-full">
          <button
            onClick={() => {
              handleOrderModal(_id);
              setIsProductModalOpen(true);
            }}
            className="w-full py-3 bg-[#101010] uppercase text-lg text-white font-semibold hover:transition-all hover:duration-300 hover:ease-in-out "
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
