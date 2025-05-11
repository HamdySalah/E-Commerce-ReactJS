import React, { useEffect, useState } from "react";
import axiosInstance from "../apis/config";
import { useParams, useNavigate } from "react-router";
import ProductInfo from "../components/ProductInfo";

export default function ProductsDetails() {
  const [isLoading, setLoading] = useState(false);
  const [product, setProduct] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/${params.id}`)
      .then((res) => {        
        setProduct(res.data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          navigate("/");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  },[params.id]);
  

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status"></div>
        </div>
       ) : (
      <div className="container">
        <ProductInfo product={product} />
      </div>
      )}
    </>
  );
}
