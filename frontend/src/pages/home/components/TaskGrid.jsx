import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { taskActions} from "../../../store/task/taskSlice";
import PaginationButton from "../../../components/common/PaginationButton";
import SearchInput from "../../../components/common/SearchInput";
import {ScreenLoading} from "../../../components/common/Loading";


function TaskGrid({
  items,  
  onEdit,
  onDelete,
  onSearch,
  onAdd,
  nextLink,
  prevLink,
  currentPageNumber,
  onNext,
  onPrev,
  onSort  
}) {  
  const {loading, orderAscending, orderByField, filterCompleted} = useSelector((state) => state.task);
  
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState(orderByField);  
  const [sortOrder, setSortOrder] = useState(orderAscending); 
  const [completed, setCompleted]  = useState(filterCompleted);
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    if(onSort) {
      onSort(event.target.value, sortOrder)
    }
  };  
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
    if(onSort) {
      onSort(sortBy, event.target.value)
    }
  };
  const handleCompletedCheckboxChange = (event) =>{    
    setCompleted(event.target.checked)
    dispatch(taskActions.setFilterCompleted(event.target.checked));
  }
  return (
    <>
      {
        loading &&
        <div>
          <div className="text-center">
            <ScreenLoading className=" text-primary"/>
          </div>        
        </div>
        
      }
      <div className="relative lg:flex flex-wrap items-center justify-end border-b border-stroke px-3 pr-3 lg:justify-between mb-10">
        <div className="mr-3">
          <SearchInput onSearch={onSearch}/>
        </div>
        <div className="mb-4 inline-flex items-center md:mb-0 mr-3">
          <label
            htmlFor="sort-by"
            className="mr-4 whitespace-nowrap text-base font-medium text-black"
          >
            Sort By:
          </label>
          <div className="relative">
            <select
              id="sort-by"
              value={sortBy}
              onChange={handleSortChange}
              className="border-form-stroke text-body-color focus:border-primary active:border-primary w-full appearance-none rounded-lg border py-[10px] pl-4 pr-8 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]"
            >
              <option >--------</option>
              <option value="title">Title</option>
              <option value="updated_at">Updated At</option>
            </select>

            <span
              className="border-body-color absolute right-4 top-1/2 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2"
            >
            </span>
          </div>

        </div>
        <div className="mb-4 inline-flex items-center md:mb-0 mr-3">
          <label
              htmlFor="sort-order"
              className="mr-4 whitespace-nowrap text-base font-medium text-black"
            >
              Sort Order:
          </label>
          <div className="relative">
            <select
              id="sort-order"
              value={sortOrder}
              onChange={handleSortOrderChange}
              className="border-form-stroke text-body-color focus:border-primary active:border-primary w-full appearance-none rounded-lg border py-[10px] pl-4 pr-8 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]"
            >              
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>

            <span
              className="border-body-color absolute right-4 top-1/2 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2"
            >
            </span>
          </div>
        </div>
        <div className="mb-4 inline-flex items-center md:mb-0 mr-3">
          <label
            htmlFor="is-completed"
            className="flex cursor-pointer select-none items-center text-black font-medium"
          >
            Completed
            <div className="ml-3 relative">
              <input type="checkbox" id="is-completed"
                    value={completed} onChange={handleCompletedCheckboxChange}
                    className="sr-only outline-checkbox" />
              <div
                className="box mr-4 flex h-5 w-5 items-center justify-center rounded border">
                  <span className="opacity-0">
                    <svg
                      className="fill-current"
                      width={11}
                      height={8}
                      viewBox="0 0 11 8"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                        stroke="#3056D3"
                        strokeWidth="0.4"
                      />
                    </svg>
                  </span>
              </div>
            </div>
          </label>
          
        </div>
        <button
          className="mb-4 sm:mb-2 inline-flex items-center justify-center whitespace-nowrap rounded bg-primary py-[10px] px-5 text-sm font-medium text-white hover:bg-opacity-90"
          onClick={onAdd}
        >
          Add New Item
          <span className="pl-2">
            <svg
              width={18}
              height={18}
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.99961 2.39961C5.35453 2.39961 2.39961 5.35453 2.39961 8.99961C2.39961 12.6447 5.35453 15.5996 8.99961 15.5996C12.6447 15.5996 15.5996 12.6447 15.5996 8.99961C15.5996 5.35453 12.6447 2.39961 8.99961 2.39961ZM0.599609 8.99961C0.599609 4.36042 4.36042 0.599609 8.99961 0.599609C13.6388 0.599609 17.3996 4.36042 17.3996 8.99961C17.3996 13.6388 13.6388 17.3996 8.99961 17.3996C4.36042 17.3996 0.599609 13.6388 0.599609 8.99961Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.99961 5.09961C9.49667 5.09961 9.89961 5.50255 9.89961 5.99961V11.9996C9.89961 12.4967 9.49667 12.8996 8.99961 12.8996C8.50255 12.8996 8.09961 12.4967 8.09961 11.9996V5.99961C8.09961 5.50255 8.50255 5.09961 8.99961 5.09961Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.09961 8.99961C5.09961 8.50255 5.50255 8.09961 5.99961 8.09961H11.9996C12.4967 8.09961 12.8996 8.50255 12.8996 8.99961C12.8996 9.49667 12.4967 9.89961 11.9996 9.89961H5.99961C5.50255 9.89961 5.09961 9.49667 5.09961 8.99961Z"
                fill="white"
              />
            </svg>
          </span>
        </button>
        
      </div>
      <div className="mx-auto relative">
          <div className="-mx-4 flex flex-wrap">
            {items.map((item) => (
              <div className="w-full px-4 md:w-1/2 xl:w-1/3" key={item.id}>
                <div className="border-stroke mb-10 border bg-white">
                  <div 
                    onClick={() => {
                      onEdit && onEdit(item.id);
                    }}                  
                    className="relative bg-white border-stroke border-b py-5 px-7 hover:bg-opacity-90 hover:bg-white hover:cursor-pointer">
                    <h3 className="block">
                      <a                      
                        className="hover:text-primary inline-block text-lg font-semibold text-black sm:text-xl lg:text-lg xl:text-xl"
                      
                      >
                        {item.title}
                      </a>
                    </h3>
                    {
                      item.is_completed &&
                      <div className="absolute left-0 -top-5">
                        <span
                          className="bg-secondary m-2 inline-block rounded-full py-1 px-3 text-sm font-semibold text-white"
                        >
                          Completed
                        </span>
                      </div>
                    }
                        
                  </div>

                  <div className="px-7 pt-6 pb-9">
                    <p className="text-body-color text-base">
                      {item.description}
                    </p>
                  </div>
                  <div className="border-stroke border-t py-5 px-7">
                    <span className="text-body-color text-base mr-10 sm:mr-2 2xl:mr-10">
                      Updated: {new Date(item.updated_at).toLocaleString()}
                    </span>
                    <button
                      className="text-danger border border-stroke font-medium cursor-pointer rounded-md py-3 px-[14px] sm:px-[14px] lg:px-[10px] transition hover:bg-light hover:bg-opacity-90 z-10"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete && onDelete(item.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

          </div>

        </div>
      
      {items && items.length > 0 && (
        <div className="flex justify-end">
          <PaginationButton
            currentNumber={currentPageNumber}
            isPrevAvailable={prevLink}
            isNextAvailable={nextLink}
            onPrevClick={onPrev}
            onNextClick={onNext}
          />
        </div>
      )}
    </>
  );
}

export default TaskGrid;
