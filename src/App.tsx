import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

interface Data {
  id: number
  title: string
  description: string
  price: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: any[]
}


function App() {
  const [skip, setSkip] = useState<number>(0);
  const [skipActual, setSkipActual] = useState<number>(0);
  const [searchActuel, setSearchActuel] = useState<number>(0);
  const [limit, setLimit] = useState<any>(10);
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<Data[]>([]);



  useEffect(() => {
    axios.get(`https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skipActual}`).then((res) => {
      setData(res.data.products);
    }).catch((error) => {
      console.log(error);
    })

  }, [limit, skipActual, search]);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSkip(0);
    setSkipActual(0);
    setSearch(event.target.value)
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSkip(0);
    setSkipActual(0);
    setLimit(event.target.value)
  }

  const nextPage = () => {
    const next = limit * (skip + 1);
    setSkip(skip + 1);
    setSkipActual(next);
  }
  const previousPage = () => {
    const next = limit * (skip - 1);
    setSkip(skip - 1);
    setSkipActual(next);
  }


  return (
    <div className='container mt-5 justify-content-center'>
      <div className='d-flex justify-content-between flex-wrap'>
        <form className='mb-2' style={{ width: '200px' }} role="search">
          <input type="search" onChange={handleInputChange} className="form-control form-control" placeholder="Search..." aria-label="Search" />
        </form>
        <select value={limit} onChange={handleSelectChange} style={{ width: '250px' }} className="form-select mb-2" aria-label="Default select example">
          <option value={11} selected>Nombre d'item Afficher</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
      </div>
      <table className="table table-bordered table-responsive">
        <thead>
          <tr>
            <th scope="col">#id</th>
            <th scope="col">title</th>
            <th scope="col">price</th>
            <th scope="col">stock</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.stock}</td>
              </tr>
            )
          })}

        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <nav aria-label="...">
          <ul className="pagination">
            <li className={`page-item ${skip < 1 && 'disabled'}`}>
              <button onClick={previousPage} disabled={skip < 1 ? true : false} className="page-link">Précédent</button>
            </li>
            <li className={`page-item ${data.length < limit && 'disabled'}`}>
              <button disabled={data.length < limit ? true : false} onClick={nextPage} className="page-link">Suivant</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default App;
