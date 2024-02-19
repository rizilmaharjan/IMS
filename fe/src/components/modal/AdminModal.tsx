type props={
  name?: string;
  email?: string;
  role?: string;
  profile?: string;
  closeAdminModal: (value: React.SetStateAction<boolean>) => void
}
const AdminModal = ({ name, email, role, profile, closeAdminModal }:props) => {
  const handleModalClose = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };
  return (
    <>
      <div
        onClick={() => closeAdminModal(false)}
        className="fixed top-0 z-20 cursor-pointer left-0 h-screen w-full flex items-center justify-center modal-background"
      >
        <div
          onClick={handleModalClose}
          className="w-[400px] h-[450px] flex flex-col items-center px-6 py-4 bg-white rounded-lg"
        >
          <img className="rounded-full w-48 h-48" src={profile} alt={name} />
          <h1 className="text-xl font-semibold uppercase mt-3">{name}</h1>
          <p className="text-sm text-gray-400 font-semibold lowercase mt-1">{role}</p>
          <p className="text-gray-600 font-semibold mt-1">{email}</p>
          <p className="text-center mt-1">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae,
            dolorum. Lorem ipsum dolor sit amet.{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminModal;
