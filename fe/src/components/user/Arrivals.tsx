import { useEffect, useState } from "react";
import { useGet } from "../../hooks/get/useGet";
import ProductArrival from "./ProductArrival";
import { FaArrowsAltV } from "react-icons/fa";

type product = {
  _id: string;
  name: string;
  amount: string;
  stock: number;
  image: string;
  brand: string;
  category: string;
  colors: Array<string>;
};

export default function Arrivals() {
  const [arrivalProducts, setArrivalProducts] = useState<product[]>([]);
  const { response, isLoading, fetchError } = useGet(
    "http://localhost:8000/product/api/products"
  );
  useEffect(() => {
    setArrivalProducts(response?.data.slice(-3));
  }, [response]);

  return (
    <>
      <section className="mt-32">
        <h2 className="text-3xl text-center font-lato font-semibold tracking-wider">
          NEW ARRIVALS
        </h2>
        <div className="flex mt-10 justify-between gap-10">
          {arrivalProducts &&
            arrivalProducts.length > 0 &&
            arrivalProducts.map((product, index) => (
              <ProductArrival
                key={index}
                name={product.name}
                image={product.image}
                brand={product.brand}
              />
            ))}
        </div>
      </section>
    </>
  );
}
