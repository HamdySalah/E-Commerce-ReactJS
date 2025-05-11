import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import {addToCart} from '../store/slices/cart'

const ProductCard = (props) => {

  const { product } = props;
  const [stock, setStock]= useState("");
  const stockColor = product.stock>0? "badge bg-success":"badge bg-danger";
  const dispatch = useDispatch();

  useEffect(()=>{
    setStock(
        product.stock>0? "In Stock":"Out of Stock"
      )
  },[product.stock]) 
  
  const cardStyle = {
    transition: "transform 0.3s, box-shadow 0.3s",
    borderRadius: "8px",
    overflow: "hidden"
  };

  const cardHoverStyle = {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
  };

  const imageContainerStyle = {
    height: "200px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    background: "#f8f9fa"
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    transition: "transform 0.3s"
  };

  const descriptionStyle = {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    marginBottom: "1rem",
    fontSize: "0.9em"
  };

  return (
    <>
      <div 
        className="card h-100 shadow-sm" 
        style={cardStyle}
        onMouseEnter={(e) => {
          Object.assign(e.currentTarget.style, cardHoverStyle);
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = "";
        }}
      >      
        <span className={`${stockColor} position-absolute top-0 end-0 m-2`}>{stock}</span>
        <Link to={`/product-details/${product.id}`} style={imageContainerStyle}>
          <img 
            src={product.thumbnail} 
            style={imageStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
            }}
            alt={product.title} 
          />
        </Link>          
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold mb-2 text-truncate">{product.title}</h5>          
          <p className="card-text text-muted" style={descriptionStyle}>{product.description}</p>
          <div className="mt-auto">
            <p className="card-text fw-bold fs-5 text-primary mb-2">${product.price}</p>
            <button 
              disabled={product.stock===0} 
              onClick={()=>dispatch(addToCart(product))} 
              className="btn btn-custom-gradient w-100"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
