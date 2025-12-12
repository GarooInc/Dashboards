import { IoLogOut } from "react-icons/io5";
import DatePicker from "./DatePicker";
import { signOut } from "@/services/auth";
import { useNavigate } from 'react-router-dom'; 
import AccountPicker from "./AccountPicker";


interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-black text-white md:justify-between items-center p-8 flex md:flex-row flex-col w-full">
        <div className="w-[80%] flex justify-center md:justify-start items-center gap-4 md:flex-row flex-col">
          <img src="/assets/images/logo_v2.png" className="md:w-32 w-20" alt='logo' /> 
          <span className="md:block hidden text-xl font-bold">
              |
          </span>
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="md:flex md:justify-center items-center md:gap-10">
          <div className="flex md:flex-row flex-col mt-2 justify-center items-center md:h-10 gap-4">
            <AccountPicker />
            <DatePicker />
          </div>
          <IoLogOut 
          onClick={async () => {
            await signOut();
            navigate('/login');

          }} 
          cursor="pointer"
          size={24} 
          className="absolute top-4 right-4 md:static md:top-auto md:right-auto"/>
        </div>


    </header>
  );
};

export default Header;