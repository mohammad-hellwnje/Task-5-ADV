import axios from 'axios';
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../SIdeBar/Sidebar';
import img1 from './../../assets/img/icon.png';
import img2 from './../../assets/img/Upload icon.png';
import defaultImg from './../../assets/img/box-img.png';

import './AddProduct.css';

function AddProduct() {
    const navigate = useNavigate();
    const location = useLocation();

    const product = location.state?.product || null;

    const [name, setName] = useState<string>(product?.name || "");
    const [price, setPrice] = useState<string>(product?.price?.toString() || "");
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(product?.image_url || null);

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [navigate]);

    const send = (event: any) => {
        event.preventDefault();

        const priceValue = parseFloat(price);
        if (isNaN(priceValue) || priceValue <= 0) {
            console.error("Invalid price");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", priceValue.toString());

        if (image) {
            formData.append("image", image);
        }

        if (product) {
            formData.append("_method", "PUT");
            axios.post(`https://test1.focal-x.com/api/items/${product.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(res => {
                    console.log("Product updated:", res.data);
                    navigate("/dashboard");
                })
                .catch(error => {
                    console.error("Error updating item:", error.response);
                });
        } else {
            axios.post(`https://test1.focal-x.com/api/items`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(res => {
                    console.log("Product added:", res.data);
                    navigate("/dashboard");
                })
                .catch(error => {
                    console.error("Error adding item:", error.response);
                });
        }
    };

    const handleImageChange = (event: any) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            setImage(selectedFile);

            const imageUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(imageUrl);
        }
    };


    const handleImageError = () => {
        setPreviewUrl(defaultImg);
    };

    const handleIconClick = () => {
        navigate("/dashboard");
    };

    return (
        <div className="add-product-container">
            <Sidebar />
            <div className="add-product-form">
                <div className="icon1" onClick={handleIconClick}>
                    <img src={img1} alt="icon" />
                </div>
                <h1>{product ? "EDIT PRODUCT" : "ADD NEW ITEM"}</h1>
                <form onSubmit={send}>
                    <div className="Add-form">
                        <div className="input1">
                            <label>Name</label>
                            <input
                                className='name'
                                type="text"
                                placeholder="Enter the product name"
                                value={name}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                            />
                            <label>Price</label>
                            <input
                                type="text"
                                placeholder="Enter the product price"
                                value={price}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setPrice(event.target.value)}
                            />
                        </div>
                        <div className="input2">
                            <div className="image-upload">
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="preview-image"
                                        onError={handleImageError}
                                    />
                                ) : (
                                    <img src={img2} alt='Upload icon' className="upload-icon" />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="file-input"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="input-send">
                        <input type="submit" value="Save" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;
