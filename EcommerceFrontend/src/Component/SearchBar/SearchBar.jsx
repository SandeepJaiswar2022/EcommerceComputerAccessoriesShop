import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../State/Product/ProductSlice';

const SearchBar = () => {
  const [keyword,setKeyword] = useState('');
  const handleFilter = () => {
    // console.log(brands);
    // console.log("\n\n",price);
    // dispatch(setFilters({ ...filters, brands, price }));
}
const filters = useSelector(state=>state.product.filters);
const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setFilters({ ...filters, keyword}));
    
  },[keyword,setKeyword])
  return (
    <div className="flex-1 lg:mr-20 lg:ml-8">
      <div className="relative w-full">
        <input value={keyword}
        onChange={(event)=>setKeyword(event.target.value)}
          type="text"
          placeholder="Search here..."
          className="w-full py-2 pl-4 pr-10 text-black placeholder-gray-500 focus:outline-none"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <FaSearch className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
