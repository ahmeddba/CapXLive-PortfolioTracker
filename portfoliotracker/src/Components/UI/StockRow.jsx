import { Button } from 'react-bootstrap';
import './StockRow.css';
import { useContext, useState } from 'react';
import StocksContext from '../../Context/StocksContext';
import EditStock from '../Pages/EditStock';

const StockRow = ({ stock }) => {
  const { deleteStock } = useContext(StocksContext);
  const [open, setOpen] = useState(false)

  const handleDelete = () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the stock ${stock.name}?`);
    if (confirmDelete) {
      const token = sessionStorage.getItem('token'); // Replace with your token retrieval logic
      deleteStock(stock.ids, token);
    }
  };

  return (
    <>
    <tr>
      <td>{stock.ticker}</td>
      <td>{stock.name}</td>
      <td>${stock.buyPrice}</td>
      <td>{stock.quantity}</td>
      <td>
        <Button variant="danger" style={{ marginRight: '2%' }} onClick={handleDelete}>
          Delete
        </Button>
        <Button className="edit" variant="secondary" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </td>
    </tr>
    <EditStock stock={stock} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default StockRow;
