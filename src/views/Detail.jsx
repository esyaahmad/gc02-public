import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Detail() {
  const [cuisine, setCuisine] = useState([]);
  const { id } = useParams();
  // console.log(id);
  const url = "https://phase2-aio.vercel.app";

  //fetch data Cuisines
  async function fetchData() {
    try {
      // setLoading(true)
      const { data } = await axios.get(`${url}/apis/pub/restaurant-app/cuisines/${id}`);
      setCuisine(data.data);
      // console.log(data.data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.error,
        icon: "error",
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  function handleCart(id) {
    Swal.fire({
      title: "Added to Cart",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //   console.log(cuisine);
  return (
    <>
      <br />
      <br />
      <div className="card card-side bg-base-100 shadow-xl w-6/12 m-auto bg-white border-2">
        <figure>
          <img className="w-[700px] h-[300px]" src={cuisine.imgUrl} alt="Movie" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-lime-600">{cuisine.name}</h2>
          <p className="text-black">{cuisine.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-warning text-red-600" onClick={handleCart}>
              Buy Now {rupiah(cuisine.price)}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
