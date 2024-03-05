type props = {
  name?: string;
  email?: string;
  userRoles?: {
    name: string;
    _id: string;
  };
  profile?: string;
  closeAdminModal: (value: React.SetStateAction<boolean>) => void;
};
const AdminModal = ({
  name,
  email,
  userRoles,
  profile,
  closeAdminModal,
}: props) => {
  const handleModalClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
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
          className="w-[400px] h-[450px] flex flex-col items-center px-6 py-8 bg-white rounded-lg"
        >
          <img
            className="rounded-full w-48 h-48 object-cover"
            src={profile}
            alt={name}
          />
          <h1 className="text-xl font-semibold uppercase mt-12">{name}</h1>
          <p className="text-sm text-gray-400 font-semibold lowercase mt-1">
            {userRoles?.name}
          </p>
          <p className="text-gray-600 font-semibold mt-1">{email}</p>
        </div>
      </div>
    </>
  );
};

export default AdminModal;
