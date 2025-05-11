import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from '../store/slices/cart';
import { useTranslation } from "../context/language";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCheckCircle, faTimesCircle, faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

const ProductInfo = (props) => {
    const { product } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();

    if (!product) return null;

    const [stock, setStock] = useState("");
    const [activeImage, setActiveImage] = useState(0);
    const stockColor = product.stock > 0 ? "bg-success" : "bg-danger";
    
    useEffect(() => {
        setStock(product.stock > 0 ? t('inStock') : t('outOfStock'));
    }, [product.stock, t]);

    const renderRating = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FontAwesomeIcon key={`star-${i}`} icon={faStar} className="text-warning" />);
        }
        
        if (hasHalfStar) {
            stars.push(<FontAwesomeIcon key="half-star" icon={faStarHalfAlt} className="text-warning" />);
        }
        
        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={faStar} className="text-muted" />);
        }
        
        return <div className="d-flex align-items-center">{stars} <span className="ms-2 text-muted">({rating})</span></div>;
    };

    return (
        <div className="card border-0 shadow-sm mb-5">
            <div className="row g-0">
                {/* Product Images Section */}
                <div className="col-md-6 p-4">
                    <div className="product-main-image mb-3 bg-light rounded d-flex align-items-center justify-content-center" style={{ height: "400px", overflow: "hidden" }}>
                        <img 
                            src={product.images && product.images.length > 0 ? product.images[activeImage] : product.thumbnail} 
                            alt={product.title} 
                            className="img-fluid" 
                            style={{ maxHeight: "100%", objectFit: "contain" }}
                        />
                    </div>
                    <div className="product-thumbnails d-flex gap-2 flex-wrap">
                        {product.images?.map((image, i) => (
                            <div 
                                key={i} 
                                className={`thumbnail-container border rounded ${activeImage === i ? 'border-primary' : ''}`}
                                style={{ width: "80px", height: "80px", cursor: "pointer", overflow: "hidden" }}
                                onClick={() => setActiveImage(i)}
                            >
                                <img 
                                    src={image} 
                                    alt={`${product.title} - ${i}`} 
                                    className="w-100 h-100" 
                                    style={{ objectFit: "contain" }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Product Info Section */}
                <div className="col-md-6 p-4">
                    <div className="product-details">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <h2 className="fw-bold">{product.title}</h2>
                            <span 
                                className={`badge ${stockColor} fs-6 ms-2 px-3 py-2`}
                            >
                                <FontAwesomeIcon icon={product.stock > 0 ? faCheckCircle : faTimesCircle} className="me-1" />
                                {stock}
                            </span>
                        </div>
                        
                        <div className="mb-3">
                            {product.rating && (
                                <div className="d-flex align-items-center">
                                    <span className="fw-bold me-2">{t('rating')}:</span>
                                    {renderRating(product.rating)}
                                </div>
                            )}
                        </div>
                        
                        <div className="mb-3">
                            <span className="text-primary fs-3 fw-bold">${product.price}</span>
                            {product.discountPercentage && (
                                <span className="text-decoration-line-through text-muted ms-3">
                                    ${Math.round(product.price / (1 - product.discountPercentage / 100))}
                                </span>
                            )}
                            {product.discountPercentage && (
                                <span className="badge bg-danger ms-2">-{Math.round(product.discountPercentage)}% {t('discount')}</span>
                            )}
                        </div>
                        
                        <div className="mb-3">
                            <h5 className="mb-2 fw-bold">{t('description')}</h5>
                            <p className="text-muted">{product.description}</p>
                        </div>
                        
                        <div className="product-meta mb-4">
                            <div className="row">
                                <div className="col-6 mb-2">
                                    <span className="fw-bold">{t('brand')}:</span> <span className="text-muted">{product.brand}</span>
                                </div>
                                <div className="col-6 mb-2">
                                    <span className="fw-bold">{t('category')}:</span> <span className="text-muted">{product.category}</span>
                                </div>
                                {product.stock > 0 && (
                                    <div className="col-6">
                                        <span className="fw-bold">{t('availability')}:</span> <span className="text-success">{product.stock} {t('items')}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="d-grid">
                            <button 
                                disabled={product.stock === 0} 
                                onClick={() => dispatch(addToCart(product))} 
                                className="btn btn-custom-gradient btn-lg d-flex align-items-center justify-content-center"
                            >
                                <FontAwesomeIcon icon={faCartPlus} className="me-2" />
                                {t('addToCart')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;