import PaginationButton from "../../../components/common/PaginationButton";
import SearchInput from "../../../components/common/SearchInput";
import SortButton from "../../../components/common/SortButton";


function TaskList({
  items,
  loading,
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
  return (
    <>
      <div className="relative sm:flex items-center justify-end border-b border-stroke px-3 pr-3 sm:justify-between">
        <SearchInput onSearch={onSearch} />
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
      <div className="mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="max-w-full overflow-x-auto rounded-xl shadow-lg">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-[#F9FAFB] text-left">
                    <th className="text-body-color min-w-[180px] py-4 pr-4 pl-11 text-base font-medium uppercase">
                      <SortButton
                        // asc={orderByField == "name" ? orderAscending : "asc"}
                        onClick={(asc) => {
                          onSort && onSort("title", asc);
                        }}
                      >
                        Title
                      </SortButton>
                    </th>
                    <th className="text-body-color min-w-[280px] py-4 px-4 text-base font-medium uppercase">
                        Description
                    </th>
                    <th className="text-body-color min-w-[100px] py-4 pr-11 pl-4 text-base font-medium uppercase" />
                  </tr>
                </thead>
                {loading ? (
                  <tbody>
                    <tr>
                      <th>
                        <p className="pb-4"> Loading ...</p>
                      </th>
                    </tr>
                  </tbody>
                ) : items && items.length > 0 ? (
                  <tbody>
                    {items.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => {
                          onEdit && onEdit(item.id);
                        }}
                        className="hover:bg-opacity-90 hover:bg-white hover:cursor-pointer"
                      >
                        <td className="border-stroke border-t py-5 px-4 pl-11">
                          <h5 className="text-body-color text-base font-medium">
                            {item.title}
                          </h5>
                        </td>
                        <td className="border-stroke border-t py-5 px-4">
                          <p className="text-body-color text-base">
                            {item.description}
                          </p>
                        </td>
                        <td className="border-stroke border-t py-5 px-4 pr-11 text-center">
                          <button
                            className="text-danger font-medium cursor-pointer rounded-md py-3 px-[14px] transition hover:bg-light hover:bg-opacity-90 z-10"
                            onClick={(e) => {
                              e.stopPropagation()
                              onDelete && onDelete(item.id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <th>
                        <p className="pb-4"> No data available</p>
                      </th>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
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

export default TaskList;
