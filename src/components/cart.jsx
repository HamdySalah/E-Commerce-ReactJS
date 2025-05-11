import React from "react";
import { useDispatch } from "react-redux";
import {removeFromCart, incrementByOne, decreaseByOne} from '../store/slices/cart'

const CartItem = (props) => {
    const {product} = props;
    const dispatch = useDispatch();

    // Calculate the item total price
    const itemTotal = (product.quantity * product.price).toFixed(2);

    // Handle quantity increase
    const handleIncrease = () => {
        dispatch(incrementByOne(product.id));
    };

    // Handle quantity decrease
    const handleDecrease = () => {
        dispatch(decreaseByOne(product.id));
    };

    // Handle item removal
    const handleRemove = () => {
        dispatch(removeFromCart(product.id));
    };

    return(
        <div className="d-flex flex-column flex-md-row align-items-center border-bottom py-4">
            {/* Product image and details */}
            <div className="d-flex align-items-center flex-grow-1 mb-3 mb-md-0">
                <div className="bg-light rounded-3" style={{ width: "100px", height: "100px", overflow: "hidden", marginRight: "15px" }}>
                    <img 
                        src={product.images[0]} 
                        alt={product.title}  
                        style={{ width: "100%", height: "100%", objectFit: "contain", padding: "10px" }}
                    />
                </div>
                <div>
                    <h5 className="mb-1 fw-bold">{product.title}</h5>
                    <p className="text-muted small mb-0">{product.brand || 'Brand not available'}</p>
                    <p className="text-muted small mb-0">Unit price: ${product.price}</p>
                </div>
            </div>
            
            {/* Quantity controls */}
            <div className="d-flex align-items-center me-4 mx-auto mb-3 mb-md-0">
                <button 
                    className="btn btn-custom-gradient btn-sm rounded-circle me-2" 
                    onClick={handleIncrease}
                    style={{ width: "32px", height: "32px", padding: "0", lineHeight: "32px" }}
                >
                    +
                </button>
                <span className="text-center fw-bold" style={{ minWidth: "40px" }}>{product.quantity}</span>
                <button 
                    className="btn btn-outline-secondary btn-sm rounded-circle ms-2" 
                    onClick={handleDecrease}
                    style={{ width: "32px", height: "32px", padding: "0", lineHeight: "32px" }}
                >
                    -
                </button>
            </div>
            
            {/* Remove button */}
            <button 
                className="btn btn-outline-danger btn-sm rounded-circle me-4 mb-3 mb-md-0" 
                onClick={handleRemove}
                style={{ width: "32px", height: "32px", padding: "0", lineHeight: "32px" }}
                title="Remove item"
            >
                ×
            </button>
            
            {/* Price */}
            <div className="ms-auto">
                <p className="fw-bold mb-0 fs-5 text-primary">${itemTotal}</p>
            </div>
        </div>
    );
};

export default CartItem; 