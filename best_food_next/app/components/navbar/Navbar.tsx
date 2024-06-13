import Link from "next/link";
import Image from "next/image";
import SearchFilters from "./SearchFilter";
import UserNav from "./UserNav";
import AddPropertyButton from "./AddPropertyButton";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10 ">
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image src="/logo.png" alt="BestFoodLogo" width={70} height={50} />
          </Link>
          {/* Search Kismi */}
          <div className="flex-grow flex justify-center">
            <SearchFilters />
          </div>
          {/* home COntact Login About kismi */}
          <div className="flex items-center space-x-6">
            <AddPropertyButton />
            <UserNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
