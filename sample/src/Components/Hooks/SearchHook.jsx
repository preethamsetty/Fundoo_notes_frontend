import React, { createContext, useState } from "react";

export const SearchQueryContext = createContext()
export const UpdateQueryContext= createContext()

function SearchHook({children}){
   
   const [searchQuery,setSearchQuery]=useState("")
   return(
    <SearchQueryContext.Provider value={searchQuery} >
     <UpdateQueryContext.Provider value={setSearchQuery}>
        {children}
     </UpdateQueryContext.Provider> 
    </SearchQueryContext.Provider>
   )
}

export default SearchHook;