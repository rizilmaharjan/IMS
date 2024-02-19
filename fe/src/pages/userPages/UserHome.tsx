import inventory from "../../assets/images/inventory.png"
import { useNavigate } from "react-router-dom"
import UserNavbar from "../../components/navbar/UserNavbar"
export const UserHome = () => {
  const navigate = useNavigate()
  return (
    <>
       {/* <UserNavbar /> */}
        <div className="grid mt-10 grid-cols-2 place-items-center w-11/12 mx-auto px-10" >

        <div className="mx-auto">
            <h1 className="text-5xl md:text-6xl text-[#403c57] font-bold uppercase">inventory</h1>
            <h1 className="text-5xl  md:text-6xl text-[#403c57] font-bold uppercase mt-4">management</h1>
            <p className="mt-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum et sapiente temporibus voluptates quod a ullam, eaque neque amet voluptatum iusto eligendi accusantium natus?</p>
            <div>
                <button onClick={()=>navigate("/products")} className="uppercase bg-[#5f19f4] text-white mt-8 w-36 py-3 rounded-full font-semibold">place order</button>
            </div>

        </div>
        <div className="hidden md:block">
            <img src={inventory} alt="inventory" />

        </div>
        </div>
      
    </>
  )
}

