import Sidebar from "../components/sidebar/Sidebar"
import OrderHistory from "./OrderHistory"
import Navbar from "../components/navbar/Navbar"
const History = () => {
  return (
    <>
     <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="h-screen bg-[#dfe0fe]  pb-10 pt-2">
          <OrderHistory />

          </div>
                     
        </div>
      </div>
      
    </>
  )
}

export default History
