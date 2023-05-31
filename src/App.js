import "./styles.css";
import Todo from "./Components/Todo";
import { useEffect, useState } from "react";
import Pagination from "./Components/pagination";

const getData = (page) => {
  return fetch(
    `https://jsonplaceholder.typicode.com/todos?_limit=10&_page=${page}`
  ).then((res) => {
    let obj = {
      totalPages: res.headers.get("X-Total-Count"),
      res: res.json()
    };
    return obj;
  });
};

export default function App() {
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    fetchedTodoData(page);
  }, [page]);
  // const handlePageChange = (val) => {
  //   setPage(page + val);
  // };

  const fetchedTodoData = async (page) => {
    try {
      setLoading(true);
      const result = await getData(page);
      let data = await result.res;
      setTodo(data);
      setTotalPage(result.totalPages);
      setLoading(false);
    } catch (error) {
      setErr(true);
      setLoading(false);
    }
  };

  //let disabledTotalpage = Math.ceil(totalPage / 10);
  return loading ? (
    <h1>Loading...</h1>
  ) : err ? (
    <h1>Something is wrong</h1>
  ) : (
    <div className="App">
      <div>
        {todo.map((el) => (
          <Todo key={el.id} title={el.title} id={el.id} />
        ))}
      </div>
      <div>
        <Pagination
          page={page}
          setPage={setPage}
          totalPage={totalPage}
          // disabledTotalpage={disabledTotalpage}
        />
        {/* <button disabled={page === 1} onClick={() => handlePageChange(-1)}>
          Prev
        </button>
        <button>{page}</button>
        <button onClick={() => handlePageChange(1)}>Next</button> */}
      </div>
    </div>
  );
}
