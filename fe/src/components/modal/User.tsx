interface IProps{
  closeUserModal: (value: boolean) => void; 
   email: string;
  name: string;

}
export const User = ({ email, name, closeUserModal }:IProps) => {
    const handleClose = (e:React.MouseEvent) => {
      e.stopPropagation();
    };
    return (
      <>
        <div
          onClick={() => closeUserModal(false)}
          className="fixed cursor-pointer left-0 top-0 w-full h-screen modal-background flex items-center justify-center"
        >
          <div
            onClick={handleClose}
            className="bg-white shadow-xl px-4 py-2 gap-10 rounded-lg w-[550px] h-[400px] flex items-center"
          >
            
            <div className="bg-red-500 w-1/4 flex items-center justify-center h-1/3 rounded-full">
                image
            </div>
            <div>
              <h1 className="font-semibold uppercase text-3xl">{name}</h1>
              <p className="text-gray-400 text-xl">{email}</p>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  