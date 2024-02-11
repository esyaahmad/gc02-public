import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Swal from "sweetalert2";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState([]);

  const [search, setSearch] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [sortBy, setSortBy] = useState("ASC");
  let [page, setPage] = useState(1);

  // const [loading, setLoading] = useState(false)
  const url = "https://phase2-aio.vercel.app";

  //fetch data Cuisines
  async function fetchData() {
    try {
      // setLoading(true)
      const { data } = await axios.get(`${url}/apis/pub/restaurant-app/cuisines?q=${search}&i=${searchCategory}&limit=12&page=${page}&sort=${sortBy}`);
      setProducts(data.data.query);
      setPagination(data.data.pagination);
      // console.log(data.data.query);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCategories() {
    try {
      // setLoading(true)
      const { data } = await axios.get(`${url}/apis/pub/restaurant-app/categories`);
      setCategories(data.data);
      // console.log(data.data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.error,
        icon: "error",
      });
    }
  }

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  useEffect(() => {
    console.log("ini proses mounted, hanya dijalankan 1x di awal");
    if (search) {
      setPage(1);
    }
    fetchData();
    fetchCategories();
  }, [search, searchCategory, sortBy, page]);

  //search by name
  function searchOnChange(event) {
    let newSearch = event.target.value;
    // console.log(event.target.value);
    setSearch(newSearch);
  }

  //search by categories
  function searchOnChangeCategory(event) {
    let newSearchCategories = event.target.value;
    // console.log(event.target.value);
    setSearchCategory(newSearchCategories);
  }

  // sort
  function sort(event) {
    let newSort = event.target.innerText;
    console.log(event.target.innerText);
    setSortBy(newSort);
  }

  return (
    <>
      <div className="navbar bg-base-100 p-0 m-0">
        <div className="flex">
          <a className="bg-red-600 p-5 px-10 font-sans text-yellow-400">Mekidi</a>
        </div>
        <div className="flex-1 mx-4">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary className="text-yellow-400">Sort by</summary>
                <ul className="button bg-base-100 rounded-t-none">
                  <li onClick={sort}>
                    <p>ASC</p>
                  </li>
                  <li onClick={sort}>
                    <p>DESC</p>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="navbar"></div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input type="text" placeholder="Search by Name" className="input input-bordered w-24 md:w-auto text-red-600 bg-yellow-400" onChange={searchOnChange} />
          </div>
        </div>
        <div className="flex-none">
          <select className="select select-bordered w-full max-w-xs text-yellow-400" onChange={searchOnChangeCategory}>
            <option disabled value={""} className="text-yellow-400">
              Category
            </option>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              );
            })}
            <option value="">All Categories</option>
          </select>
        </div>
      </div>
      <div className="cardBody">
        <main className="grid grid-cols-2 gap-5 px-10 my-8">
          {products.map((product) => {
            return <Card key={product.id} product={product} />;
          })}
        </main>
        <div className="join">
          <button
            className="join-item btn"
            onClick={() => {
              setPage(page - 1);
            }}
          >
            «
          </button>
          {Array.from(Array(pagination.totalPage), (e, i) => {
            return pagination.currentPage === i + 1 ? (
              <button
                className="join-item btn btn-outline"
                key={i}
                onClick={() => {
                  setPage((page = i + 1));
                }}
              >
                {i + 1}
              </button>
            ) : (
              <button
                className="join-item btn"
                key={i}
                onClick={() => {
                  setPage((page = i + 1));
                }}
              >
                {i + 1}
              </button>
            );
          })}
          <button
            className="join-item btn"
            onClick={() => {
              page === pagination.totalPage ? setPage(page) : setPage(page + 1);
            }}
          >
            »
          </button>
        </div>
      </div>
    </>
  );
}
