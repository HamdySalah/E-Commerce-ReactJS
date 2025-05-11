import { useEffect, useState } from "react";
import axiosInstance from "../apis/config";
import ProductCard from "../components/ProductCard";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const limit= 10;
  const skip= (page- 1)* limit;

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`?skip=${skip}&limit=${limit}`)
      .then((res) => {
        setProducts(res.data.products);
        setTotalProducts(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  const totalPages=Math.ceil(totalProducts/limit);

  return (
    <>
      <h5>WELCOME TO OUR STORE</h5>
      <h6>Hamdy Salah Store</h6>
      <hr />
      {isLoading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status"></div>
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((product) => {
          return (
            <div className="col" key={product.id}>
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>

      <div className="d-flex justify-content-center my-4">
        <button className="btn btn-outline-primary me-2" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span className="align-self-center">Page {page} of {totalPages} </span>
        <button className="btn btn-outline-primary ms-2" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </>
  );
}
