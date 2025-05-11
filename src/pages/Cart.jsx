import { useSelector } from "react-redux";
import CartItem from "../components/cart";
import React from "react";

export default function Cart() {
  const cart = useSelector((state) => state.cart.cartItems);
  
  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  return (
    <>
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-primary text-white py-3">
          <h2 className="mb-0 fs-4 fw-bold">Shopping Cart</h2>
        </div>
        <div className="card-body p-4">
          {cart.length === 0 ? (
            <div className="text-center py-5">
              <i className="fa fa-shopping-cart fa-3x mb-3 text-muted"></i>
              <p className="lead">Your cart is empty</p>
              <a href="/" className="btn btn-custom-gradient mt-3">Continue Shopping</a>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-between fw-bold border-bottom pb-3 mb-3">
                <span className="fs-5">Product</span>
                <span className="d-none d-md-block fs-5">Quantity</span>
                <span className="d-none d-md-block fs-5">Remove</span>
                <span className="fs-5">Price</span>
              </div>
              
              <div className="cart-items">
                {cart.map((product) => (
                  <CartItem product={product} key={product.id} />
                ))}
              </div>
              
              <div className="d-flex justify-content-end border-top pt-4 mt-4">
                <div className="text-end">
                  <p className="fs-5 fw-bold mb-2">Total: <span className="text-primary">${totalPrice.toFixed(2)}</span></p>
                  <button className="btn btn-custom-gradient">Proceed to Checkout</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
