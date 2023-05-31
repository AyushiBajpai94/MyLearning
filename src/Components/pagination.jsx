// //totalpage,
// pages, setPages;

// //diable page logic
// let arr = [];

// for (i = 0; i < 20; i++) {
//   arr.push(i + 1);
// }

// return (
//   <>
//     arr.map((el)=>(
//     <button onClick={() => setPAge(page + 1)}>{el}</button>
//     ))
//   </>
// );

function Pagination({ page, setPage, totalPage }) {
  let arr = [];
  let disabledTotalpage = Math.ceil(totalPage / 10);
  //console.log(disabledTotalpage);
  for (let i = 0; i < disabledTotalpage; i++) {
    arr.push(i + 1);
  }

  return (
    <>
      {arr.map((item, index) => (
        <button key={item.index} onClick={() => setPage(item)}>
          {item}
        </button>
      ))}
    </>
  );
}
export default Pagination;
