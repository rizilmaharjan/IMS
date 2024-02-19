import Sidebar from "../components/sidebar/Sidebar";
import ProductTable from "../components/table/ProductTable";
import Navbar from "../components/navbar/Navbar";

const Products = () => {

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="py-4  bg-[#dfe0fe]">
            <ProductTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
