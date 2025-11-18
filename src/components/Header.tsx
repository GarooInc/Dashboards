import { IoLogOut } from "react-icons/io5";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="bg-black text-white md:justify-between items-center p-8 flex gap-4 md:flex-row flex-col w-full">
        <div className="w-[80%] flex justify-center md:justify-start items-center gap-4 md:flex-row flex-col">
          <img src="/assets/images/logo_v2.png" className="md:w-32 w-20" alt='logo' /> 
          <span className="md:block hidden text-xl font-bold">
              |
          </span>
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="md:flex absolute top-8 right-8 ">
          <IoLogOut size={24} />
        </div>
    </header>
  );
};

export default Header;