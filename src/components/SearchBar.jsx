export default function SearchBar() {
  return (
    <div className="flex justify-center mt-4 md::mt-10">
      <input
        type="search"
        placeholder="Search..."
        className="border text-sm py-2 px-5 font-pop rounded-full bg-gray-100 w-3/4 md:w-1/2"
      />
    </div>
  );
}
