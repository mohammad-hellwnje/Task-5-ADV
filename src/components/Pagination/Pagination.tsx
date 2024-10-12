import React from 'react';
import './pagination.css';
import img1 from './../../assets/img/next.png'
import img2 from './../../assets/img/Prev.png'

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {

    const generatePaginationNumbers = () => {
        const paginationArray: (number | string)[] = [];


        const isSmallMobileView = window.innerWidth < 576;

        if (isSmallMobileView) {

            paginationArray.push(currentPage);
        } else if (window.innerWidth < 768) {

            paginationArray.push(currentPage);
            if (currentPage < totalPages - 1) {
                paginationArray.push('...');
            }
            paginationArray.push(totalPages - 1);
        } else {

            if (totalPages <= 5) {
                for (let i = 0; i < totalPages; i++) {
                    paginationArray.push(i);
                }
            } else {
                paginationArray.push(0);
                if (currentPage > 2) {
                    paginationArray.push('...');
                }
                if (currentPage <= 2) {
                    paginationArray.push(1, 2);
                } else {
                    if (currentPage > 1) paginationArray.push(currentPage - 1);
                    paginationArray.push(currentPage);
                    if (currentPage < totalPages - 2) paginationArray.push(currentPage + 1);
                }
                if (currentPage < totalPages - 3 && currentPage !== totalPages - 2) {
                    paginationArray.push('...');
                }
                if (paginationArray[paginationArray.length - 1] !== totalPages - 1) {
                    paginationArray.push(totalPages - 1);
                }
            }
        }

        return paginationArray;
    };

    return (
        <div className="pagination-controls">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="pagination-arrow"
            >
                <img src={img2} alt="Previous" />
            </button>

            {generatePaginationNumbers().map((number, index) => (
                <button
                    key={index}
                    onClick={() => typeof number === 'number' && onPageChange(number)}
                    className={`pagination-number ${currentPage === number ? 'active' : ''}`}
                    disabled={number === '...'}
                >
                    {typeof number === 'number' ? number + 1 : '...'}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="pagination-arrow"
            >
                <img src={img1} alt="Next" />
            </button>
        </div>
    );
};

export default Pagination;
