
interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="bg-black text-white md:justify-start items-center p-8 flex gap-4 md:flex-row flex-col">
        <img src="/assets/images/logo_v2.png" className="md:w-32 w-20" alt='logo' /> 
        <span className="md:block hidden text-xl font-bold">
            |
        </span>
        <h1 className="text-2xl font-bold">{title}</h1>
    </header>
  );
};

export default Header;