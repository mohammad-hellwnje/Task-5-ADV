import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './../SIdeBar/Sidebar';
import Popup from '../Popup/Popup';
import Pagination from './../Pagination/Pagination';
import img1 from './../../assets/img/search-icon.png'
import './dashboard.css';

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

function Dashboard() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(window.innerWidth > 1439 ? 8 : (window.innerWidth >= 1183 ? 6 : (window.innerWidth >= 768 ? 4 : 2))); // Added 2 items for width < 768px

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1439) {
        setProductsPerPage(8);
      } else if (window.innerWidth >= 1200 && window.innerWidth <= 1439) {
        setProductsPerPage(6);
      } else if (window.innerWidth >= 768) {
        setProductsPerPage(4);
      } else {
        setProductsPerPage(2);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchProducts = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axios.get("https://test1.focal-x.com/api/items", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(res => {
        setItems(res.data);
      })
      .catch(error => {
        console.error("Error fetching items", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [navigate]);

  const confirmDeleteProduct = (id: number) => {
    setShowPopup(true);
    setProductToDelete(id);
  };

  const deleteProduct = (id: number) => {
    const token = localStorage.getItem("token");

    axios.delete(`https://test1.focal-x.com/api/items/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(() => {
        fetchProducts();
        setShowPopup(false);
        setProductToDelete(null);
      })
      .catch(error => {
        console.error("Error deleting product", error);
      });
  };

  const handleCancelDelete = () => {
    setShowPopup(false);
    setProductToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (productToDelete !== null) {
      deleteProduct(productToDelete);
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredItems.length / productsPerPage);

  return (
    <div className="dashboard-containar">
      <Sidebar />
      <div className="product-list">
        <div className="search">
          <input
            type="search"
            placeholder='Search product by name'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={img1} alt="Search Icon" className="search-icon" />
        </div>

        <div className="dash-content">
          <div className="add-item">
            <button onClick={() => navigate('/add-product')}>
              ADD NEW PRODUCT
            </button>
          </div>
          <div className="product">
            {paginatedItems.length > 0 ? (
              paginatedItems.map((item) => (
                <div className="product-item" key={item.id} onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.tagName !== 'BUTTON') {
                    navigate(`/product-details/${item.id}`);
                  }
                }}>
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="product-image"
                  />
                  <div className="product-overlay">
                    <h3>{item.name}</h3>
                    <div className="btn">
                      <button onClick={() => navigate('/add-product', { state: { product: item } })}>
                        Edit
                      </button>
                      <button className='delete' onClick={() => confirmDeleteProduct(item.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No items found</p>
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {showPopup && (
        <Popup
          message="Are you sure you want to delete the product?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default Dashboard;
