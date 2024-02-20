type props = {
  name: string;
  image: string;
  brand: string;
};

export default function ProductArrival({ name, image, brand }: props) {
  console.log("props image", image);
  return (
    <>
      <div>
        <div className="w-full h-44">
          <img className="w-full h-full object-cover" src={image} alt={name} />
        </div>
        <p className="uppercase font-semibold mt-4 text-center">{name}</p>
        <p className="text-md text-gray-600 text-center capitalize">{brand}</p>
      </div>
    </>
  );
}
