import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useContext } from 'react';
import StocksContext from '../../Context/StocksContext';
import { useNavigate } from 'react-router';

// List of valid tickers
const validTickers = [
  "AAPL", "MSFT", "GOOGL", "GOOG", "AMZN", "META", "TSLA", "NVDA",
  "JPM", "BAC", "C", "GS", "WFC",
  "PG", "KO", "PEP", "WMT", "TGT",
  "XOM", "CVX", "BP", "TOT", "COP",
  "JNJ", "PFE", "MRK", "ABT", "UNH",
  "GE", "CAT", "BA", "MMM", "HON",
  "T", "VZ", "TMUS",
  "DIS", "NFLX", "ADBE", "ORCL", "IBM"
];

const FormStock = () => {
  const { addStock } = useContext(StocksContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateTicker = async (_, value) => {

    const tickerUpper = value.toString().toUpperCase(); // Convert to uppercase

    // Check if the ticker is in the validTickers list
    if (!validTickers.includes(tickerUpper)) {
      return Promise.reject(new Error('Invalid ticker. Please enter a valid stock ticker!'));
    }
    return Promise.resolve();
  };

  const handleAddStock = async (values) => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('token');
      if (!token) {
        message.error('You are not authenticated. Please log in.');
        return;
      }

      const response = await addStock(values, token);

      if (response && response.status === 200) {
        message.success('Stock added successfully!');
        navigate('/see-stocks');
        form.resetFields();
      } else {
        message.error('Failed to add stock. Please try again.');
      }
    } catch (error) {
      message.error('An error occurred. Please try again.');
      console.error('Error adding stock:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="containerhome">
      <div className="desc">
        <h1>
          <i className="titlee">
            Add a <span className="titlespan">Stock</span> to Your Portfolio!
          </i>
        </h1>
        <Form
          form={form}
          name="addStockForm"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          style={{ width: '100%' }}
          onFinish={handleAddStock}
          autoComplete="on"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the stock name!' }]}
          >
            <Input placeholder="e.g., Apple Inc." />
          </Form.Item>
          <Form.Item
            label="Ticker"
            name="ticker"
            rules={[
              { required: true, message: 'Please input the stock ticker!' },
              { validator: validateTicker },
            ]}
          >
            <Input placeholder="e.g., AAPL" />
          </Form.Item>
          <Form.Item
            label="Buy Price"
            name="buyPrice"
            rules={[
              { required: true, message: 'Please input the buy price!' },
              { validator: (_, value) => (Number(value) > 0 ? Promise.resolve() : Promise.reject(new Error('Buy price must be greater than zero!'))) },
            ]}
          >
            <Input placeholder="e.g., 150.00" type="number" />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              { required: true, message: 'Please input the quantity!' },
              { validator: (_, value) => (value > 0 ? Promise.resolve() : Promise.reject(new Error('Quantity must be greater than zero!'))) },
            ]}
          >
            <Input placeholder="e.g., 10" type="number" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Add Stock
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FormStock;
