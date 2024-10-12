import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './../SIdeBar/Sidebar';
import './ProductShow.css';
import img1 from './../../assets/img/icon.png'; 
import defaultImage from './../../assets/img/box-img.png'; 

interface Product {
    id: number;
    name: string;
    price: number;
    image_url: string;
    created_at: string;
    updated_at: string;
}

function ProductShow() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [imageSrc, setImageSrc] = useState<string>(''); 

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('No token found');
            return;
        }

        axios.get(`https://test1.focal-x.com/api/items/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                setProduct(response.data);
                setImageSrc(response.data.image_url); 
            })
            .catch((error) => {
                console.error("Error fetching product details", error);
            });
    }, [id]);

    if (!product) {
        return <p>Loading...</p>;
    }


    const handleIconClick = () => {
        navigate("/dashboard");
    };


    const handleImageError = () => {
        setImageSrc(defaultImage); 
    };

    return (
        <div className="product-details-container">
            <Sidebar />
            <div className="product-details-content">
                <div className="icon1" onClick={handleIconClick}>
                    <img src={img1} alt="icon" />
                </div>
                <h1>{product.name}</h1>
                <div className="product-details">
                    <img
                        src={imageSrc}
                        alt={product.name}
                        className="product-details-image"
                        onError={handleImageError} 
                    />
                    <div className="product-info">
                        <div className="info1">
                            <p>Price: <span>${product.price}</span></p>
                            <p>Created At: <span>{new Date(product.created_at).toLocaleDateString('en-GB')}</span></p>
                        </div>
                        <p className="info2">Updated At: <span>{new Date(product.updated_at).toLocaleDateString('en-GB')}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductShow;
