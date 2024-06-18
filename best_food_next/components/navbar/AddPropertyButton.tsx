import Link from "next/link";

const AddPropertyButton = () => {
  return (
    <>
      <Link href="/">
        <div className="p-2 text-sm font-semibold rounded-full cursor-pointer hover:bg-orange-300">
          Home
        </div>
      </Link>
      <Link href="/contact">
        <div className="p-2 text-sm font-semibold rounded-full cursor-pointer hover:bg-orange-300">
          Contact
        </div>
      </Link>
      <Link href="/about">
        <div className="p-2 text-sm font-semibold rounded-full cursor-pointer hover:bg-orange-300">
          About Us
        </div>
      </Link>
    </>
  );
};

export default AddPropertyButton;
