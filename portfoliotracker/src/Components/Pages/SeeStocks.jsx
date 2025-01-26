import { useContext, useEffect } from 'react'
import StockRow from '../UI/StockRow'
import StocksContext from '../../Context/StocksContext'

const SeeStocks = () => {
  const {stocks , fetchStocks , loading , deleteStock} = useContext(StocksContext);

  useEffect(() => {
      const token = sessionStorage.getItem('token');
      token && fetchStocks(token)
   }, [sessionStorage.getItem('token')])


  return (
    <div style={{width:'100%'}} className="container">
        <table className='table mt-5 ' style={{width:'90px !important'}} border={1} cellPadding={5}>
          <thead>
            <tr>
            <th>Ticker</th>
            <th>Stock Name</th>
            <th>Buy Price</th>
            <th>Quantity</th>
            <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              loading ? (<p>Loaading...</p>):
              stocks.map(stock => <StockRow key={stock.ids} stock={stock} />)
            }
          </tbody>
        </table>
      </div>
  )
}

export default SeeStocks
