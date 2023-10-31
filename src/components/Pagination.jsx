
import { usePathname, useRouter } from 'next/navigation';

const Pagination = ({ meta, onPageChange, perPage }) => {
    const pathname = usePathname()
    const router = useRouter()

    const handlePageChange = (page) => {
        onPageChange(page);
        router.push(pathname + `?page=${page}&perPage=${perPage}`);//to Change Url
    };

    return (
        <div>
            <ol className="flex justify-center gap-1 text-xs font-medium">
                <li>

                    {meta?.currentPage > 1 && (
                        <div
                            onClick={() => handlePageChange(meta.currentPage - 1)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                        >
                            <span className="sr-only">Prev Page</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    )}

                </li>
                {meta?.totalPages > 5 ? (
                    <>
                        {meta.currentPage > 3 && (
                            <div
                                onClick={() => handlePageChange(1)}
                                className="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                            >
                                1
                            </div>
                        )}
                        {meta.currentPage > 4 && (
                            <div
                                className="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                            >
                                ...
                            </div>
                        )}
                        {Array.from(
                            { length: 5 },
                            (_, index) => {
                                const page = meta.currentPage <= 2 ? index + 1 : index + meta.currentPage - 2;
                                return page;
                            }
                        ).map((page) => (
                            <div
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`block h-8 w-8 rounded border border-gray-100 text-center leading-8  ${page === meta.currentPage ? 'text-indigo-500 bg-indigo-100' : 'text-gray-700 hover:bg-gray-50'
                                    } cursor-pointer`}
                            >
                                {page}
                            </div>
                        ))}
                        {meta.currentPage + 2 < meta.totalPages && (
                            <div
                                className="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900 cursor-pointer"
                            >
                                ...
                            </div>
                        )}
                        {meta.currentPage + 1 < meta.totalPages && (
                            <div
                                onClick={() => handlePageChange(meta.totalPages)}
                                className="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900 cursor-pointer"
                            >
                                {meta.totalPages}
                            </div>
                        )}
                    </>
                ) : (
                    Array.from({ length: meta?.totalPages }, (_, index) => index + 1).map((page) => (
                        <div
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`block h-8 w-8 rounded border border-gray-100 text-center leading-8 ${page === meta.currentPage ? 'text-indigo-500 bg-indigo-100' : 'text-gray-700 hover:bg-gray-50'
                                } cursor-pointer`}
                        >
                            {page}
                        </div>
                    ))
                )}

                <li>
                    {meta?.currentPage < meta?.totalPages && (
                        <div
                            onClick={() => handlePageChange(meta.currentPage + 1)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 cursor-pointer"
                        >
                            <span className="sr-only">Next</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    )}
                </li>
            </ol>
        </div>
    )
}

export default Pagination