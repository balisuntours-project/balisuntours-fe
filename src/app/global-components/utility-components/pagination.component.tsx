"use client";
import { usePaginationStore } from "@/app/store/pagination.store";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationComponent({
  itemsPerPage,
}: {
  itemsPerPage: number;
}) {
  const currentPage = usePaginationStore((store) => store.currentPage);
  const setCurrentPage = usePaginationStore((store) => store.setCurrentPage);
  const totalPage = usePaginationStore((store) => store.totalPage);
  const setTotalPage = usePaginationStore((store) => store.setTotalPage);
  const onChangePage = usePaginationStore((store) => store.onChangePage);
  const setOnChangePage = usePaginationStore((store) => store.setOnChangePage);

  const getPaginationRange = () => {
    const maxPageNumbers = 5; // Jumlah maksimum halaman yang ingin ditampilkan
    const range = [];

    // Tampilkan halaman di sekitar halaman aktif
    let startPage = Math.max(currentPage - Math.floor(maxPageNumbers / 2), 1);
    let endPage = Math.min(startPage + maxPageNumbers - 1, totalPage);

    if (endPage - startPage < maxPageNumbers - 1) {
      startPage = Math.max(endPage - maxPageNumbers + 1, 1);
    }

    // Menambahkan halaman yang akan ditampilkan
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    return range;
  };

  const handlePageChange = (page: number, event: React.MouseEvent) => {
    if (page < 1) {
      event.preventDefault();
      return;
    } else if (page > totalPage) {
      event.preventDefault();
      return;
    }

    setOnChangePage(true);
    event.preventDefault(); // Mencegah reload atau scrolling ke atas
    if (page > 0 && page <= totalPage) {
      setOnChangePage(true); // Tampilkan efek loading
      setTimeout(() => {
        setCurrentPage(page); // Ubah halaman setelah delay
        setOnChangePage(false); // Sembunyikan efek loading
      }, 500);
    }
  };

  return (
    <>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(event) => handlePageChange(currentPage - 1, event)}
            />
          </PaginationItem>

          {/* Halaman sebelumnya (Ellipsis jika halaman jauh) */}
          {currentPage > 3 && (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(event) => handlePageChange(1, event)}
              >
                1
              </PaginationLink>
            </PaginationItem>
          )}
          {currentPage > 4 && <PaginationEllipsis />}

          {/* Halaman sekitar halaman aktif */}
          {getPaginationRange().map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={currentPage === page}
                onClick={(event) => handlePageChange(page, event)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Halaman berikutnya (Ellipsis jika halaman jauh) */}
          {currentPage < totalPage - 2 && <PaginationEllipsis />}
          {currentPage < totalPage - 3 && (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(event) => handlePageChange(totalPage, event)}
              >
                {totalPage}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(event) => handlePageChange(currentPage + 1, event)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
