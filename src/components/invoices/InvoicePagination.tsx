
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setPage } from "@/redux/slices/invoice";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const InvoicePagination = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { page, pageSize, total } = useSelector((state: RootState) => state.invoice);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  if (total <= pageSize) {
    return null;
  }

  return (
    <div className="mt-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => page > 1 && handlePageChange(page - 1)}
              className={page <= 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          
          {Array.from({ length: Math.min(3, Math.ceil(total / pageSize)) }).map((_, i) => {
            const pageNumber = i + 1;
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  isActive={page === pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          
          {Math.ceil(total / pageSize) > 3 && (
            <PaginationItem>
              <span className="flex h-9 w-9 items-center justify-center">
                ...
              </span>
            </PaginationItem>
          )}
          
          {Math.ceil(total / pageSize) > 3 && (
            <PaginationItem>
              <PaginationLink 
                onClick={() => handlePageChange(Math.ceil(total / pageSize))}
              >
                {Math.ceil(total / pageSize)}
              </PaginationLink>
            </PaginationItem>
          )}
          
          <PaginationItem>
            <PaginationNext
              onClick={() => page < Math.ceil(total / pageSize) && handlePageChange(page + 1)}
              className={page >= Math.ceil(total / pageSize) ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
