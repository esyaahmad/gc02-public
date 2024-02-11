import { useNavigate } from "react-router-dom";

export default function Card({ product }) {
  let id = product.id;
  const url = "https://phase2-aio.vercel.app";
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <>
      <div className="card card-compact w-4/6 bg-white shadow-xl mx-auto border-2">
        <figure>
          <img className="w-[700px] h-[400px]" src={product.imgUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-lime-600">{product.name}</h2>
          <p className="text-black">Category: {product.Category.name}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-warning text-red-600" onClick={() => handleClick(product.id)}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
