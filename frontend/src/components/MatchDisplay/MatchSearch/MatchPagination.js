import React from "react";

import { Pagination,Button } from "@nextui-org/react";



function MatchPagination({totalPage,currentPage,setCurrentPage}){
    
    return (
        <div className="">
        <div className="flex justify-center gap-5 pt-10">
          <div className="flex gap-2 space-x-10">
              <Button
                size="lg"
                variant="flat"
                color="warning"
                onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
              >
                Previous
              </Button>
              
            <Pagination
              total={totalPage}
              color="secondary"
              size="lg"
              page={currentPage}
              onChange={setCurrentPage}
            />
            
              <Button
                size="lg"
                variant="flat"
                color="warning"
                onPress={() => setCurrentPage((prev) => (prev < totalPage ? prev + 1 : prev))}
              >
                Next
              </Button>
            </div>
          </div>


        </div>
    );



}


export default MatchPagination;