
const SearchFilters = () => {
  
  return (
    <div className="h-[40px] lg:h-[40px] flex items-center justify-between border border-gray2 rounded-full">
      <input
        type="text"
        placeholder="Search..."
        className="flex items-end justify-end w-[300px] h-[30px] px-4 rounded-full focus:outline-none hidden md:block"
      />
      
      <div className="flex items-center justify-between">
        {/* <div className="w-[250px] h-[64px] px-8  flex-col justify-center rounded-full hover:bg-gray-100 hidden md:block">
          <p className="  text-xs font-serif">Search</p>
        </div> */}
        <div className="p-2">
          <button className="p-2 rounded-full text-white transition">
            <svg
              viewBox="0 0 24 24"
              width="24px"
              height="24px"
              className="d Vb UmNoP"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.74 3.75a5.99 5.99 0 100 11.98 5.99 5.99 0 000-11.98zM2.25 9.74a7.49 7.49 0 1113.3 4.728l5.44 5.442-1.06 1.06-5.44-5.439A7.49 7.49 0 012.25 9.74z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
