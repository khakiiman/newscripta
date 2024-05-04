
import { useState } from "react"

import { myHistory } from "../../utils/router/history";
import FilterMenu from "./FilterMenu";

import { HiOutlineFilter } from "react-icons/hi";


const SearchBar = () => {

    const [searchTerm , SetSearchTerm] = useState('')
    const [filterMenuOpen, setFilterMenuOpen] = useState(false)

    const createQueryString = (name, value) => {
        const params = new URLSearchParams();
        params.set(name, value);
    
        return params.toString();
      };

    const handleClick = () => {
        if(searchTerm !== ''){
            myHistory.replace(`/search-results?${createQueryString('q', searchTerm)}`);
            SetSearchTerm('');
        }
    }

  return (
    <div className="p-0 m-0">
        <div className="relative max-w-xs">
            <input
                className="w-full  px-4 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 "
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e)=>SetSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex  justify-stretch items-center  text-gray-700 bg-gray-100 border border-gray-300 rounded-r-3xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600">

            <button 
             className="px-1 bg-transparent border border-r-gray-500 border-l-transparent border-y-transparent "
             onClick={()=>setFilterMenuOpen(true)}
            >
                <HiOutlineFilter />
            </button>
            <button onClick={handleClick} className="pl-1 pr-2">
                <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z"
                />
                </svg>
            </button>

            </div>
        </div>
        <FilterMenu open={filterMenuOpen} setOpen={setFilterMenuOpen}/>
    </div>

  )
}

export default SearchBar