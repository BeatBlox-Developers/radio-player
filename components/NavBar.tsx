type NavBarProps = {
  secondsPlayed: number;
};

export const NavBar = ({ secondsPlayed }: NavBarProps) => {
  return (
    <nav className="w-full flex justify-between items-center h-24 text-white px-12">
      <img src="/beatblox-logo-iso.svg" alt="" className="h-7 mt-10 invert" />
      <span className="bg-white rounded-3xl text-black py-2 px-4">
        #testuser {secondsPlayed}
      </span>
    </nav>
  );
};
