type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange
}: Props) => {

  if (totalPages <= 1) return null;

  return (

    <div className="flex justify-center gap-2 mt-8">

      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Previous
      </button>

      {

        Array.from(
          { length: totalPages },
          (_, i) => i + 1
        ).map(page => (

          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={
              currentPage === page
                ? "px-4 py-2 bg-blue-600 text-white rounded"
                : "px-4 py-2 border rounded"
            }
          >

            {page}

          </button>

        ))

      }

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Next
      </button>

    </div>

  );

};

export default Pagination;