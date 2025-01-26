import React, { useState, useEffect, useContext } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import StocksContext from '../../Context/StocksContext';

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

const EditStock = ({ stock, open, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { updateStock } = useContext(StocksContext);

  // Populate the form fields with the stock details when the modal is opened
  useEffect(() => {
    if (stock) {
      form.setFieldsValue({
        name: stock.name,
        ticker: stock.ticker,
        buyPrice: stock.buyPrice,
        quantity: stock.quantity,
      });
    }
  }, [stock, form]);

  const validateTicker = async (_, value) => {

    const tickerUpper = value.toString().toUpperCase(); // Convert to uppercase

    // Check if the ticker is in the validTickers list
    if (!validTickers.includes(tickerUpper)) {
      return Promise.reject(new Error('Invalid ticker. Please enter a valid stock ticker!'));
    }
    return Promise.resolve();
  };

  const handleEdit = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      const token = sessionStorage.getItem('token');
      // Call the onUpdate function to handle updating the stock
      await updateStock(stock.ids, values, token);
      message.success('Stock updated successfully!');
      onClose(); // Close the modal after a successful update
    } catch (error) {
      console.error('Error updating stock:', error);
      message.error('Failed to update stock. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Stock"
      open={open}
      onCancel={onClose}
      footer={null} // Custom footer with form buttons instead of default modal buttons
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleEdit}
        initialValues={{
          name: stock?.name || '',
          ticker: stock?.ticker || '',
          buyPrice: stock?.buyPrice || '',
          quantity: stock?.quantity || '',
        }}
      >
        <Form.Item
          label="Stock Name"
          name="name"
          rules={[{ required: true, message: 'Please input the stock name!' }]}
        >
          <Input placeholder="Enter stock name" />
        </Form.Item>
        <Form.Item
          label="Ticker"
          name="ticker"
          rules={[
            { required: true, message: 'Please input the ticker!' },
            { validator: validateTicker },
          ]}
        >
          <Input placeholder="Enter ticker" />
        </Form.Item>
        <Form.Item
          label="Buy Price"
          name="buyPrice"
          rules={[{ required: true, message: 'Please input the buy price!' },
            { validator: (_, value) => (Number(value) > 0 ? Promise.resolve() : Promise.reject(new Error('Buy price must be greater than zero!'))) },
          ]}
        >
          <Input type="number" placeholder="Enter buy price" />
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: 'Please input the quantity!' },
            { validator: (_, value) => (value > 0 ? Promise.resolve() : Promise.reject(new Error('Quantity must be greater than zero!'))) },
          ]}
        >
          <Input type="number" placeholder="Enter quantity" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save Changes
          </Button>
          <Button
            type="secondary"
            style={{ marginLeft: '10px' }}
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditStock;
