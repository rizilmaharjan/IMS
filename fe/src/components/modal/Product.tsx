interface IProduct{
  image?:string;
  name?:string;
  amount?:string;
  closeProductModal: (value: boolean) => void;
}
const Product = ({ image, name, amount, closeProductModal }:IProduct) => {
  const handleClose = (e:React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <>
      <div
        onClick={() => closeProductModal(false)}
        className="fixed cursor-pointer z-50 left-0 top-0 w-full h-screen modal-background flex items-center justify-center"
      >
        <div
          onClick={handleClose}
          className="bg-white shadow-xl px-4 py-2 gap-2 rounded-lg w-[550px] h-[400px] flex items-center"
        >
          <div className="w-[45%]">
            <img width={"100%"} src={image} alt={name} />
          </div>
          <div>
            <h1 className="font-semibold uppercase text-3xl">{name}</h1>
            <p className="text-gray-400 text-xl">{amount}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
