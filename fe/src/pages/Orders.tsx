import Navbar from "../components/navbar/Navbar"
import Sidebar from "../components/sidebar/Sidebar"
import OrdersPage from "./OrdersPage"
import { useCustomContext } from "../context/Context"

const Orders = () => {
  return (
    <>
        <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="pb-10 pt-2 h-screen bg-[#dfe0fe]">

          <OrdersPage />
          </div>
          
        </div>
      </div>
      
    </>
  )
}

export default Orders
