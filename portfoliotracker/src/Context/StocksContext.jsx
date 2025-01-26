import React, { createContext, useReducer } from "react";
import apiClient from "../API/BaseUrl";

// Initial state for stocks
const initialState = {
  stocks: [],
  portfolioValue: {},
  loading: false,
  error: null,
};

// Reducer function
const stocksReducer = (state= initialState, {payload , type}) => {
  switch (type) {

    case "FETCH_STOCKS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_STOCKS_SUCCESS":
      return { ...state, loading: false, stocks: payload };
    case "CALCULATE_PORTFOLIO_SUCCESS":
      return { ...state, loading: false, portfolioValue: payload };
    case "FETCH_STOCKS_FAILURE":
      return {...state ,error: payload , loading:false }
    default:
      return state;
  }
};

// Create context
const StocksContext = createContext();

// Provider component
export const StocksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stocksReducer, initialState);

  // Fetch all stocks
  const fetchStocks = async (token) => {
    dispatch({ type: "FETCH_STOCKS_REQUEST" });
    try {
      const response = await apiClient.get("/stocks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "FETCH_STOCKS_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "FETCH_STOCKS_FAILURE", payload: error.message });
      alert(error.message)
    }
  };

  // Add a stock
  const addStock = async (stock, token) => {
    dispatch({ type: "FETCH_STOCKS_REQUEST" });
    try {
      const response = await apiClient.post("/stocks", stock, {
        headers: { Authorization: `Bearer ${token}` },
      });
      response.data && fetchStocks(token)
      return response;
    } catch (error) {
      dispatch({ type: "FETCH_STOCKS_FAILURE", payload: error.message });
      alert(error.message)
    }
  };

  // Update a stock
  const updateStock = async (id, updatedStock, token) => {
    dispatch({ type: "FETCH_STOCKS_REQUEST" });
    try {
      const response = await apiClient.put(`/stocks/${id}`, updatedStock, {
        headers: { Authorization: `Bearer ${token}` },
      });
      response.data && fetchStocks(token)
    } catch (error) {
      dispatch({ type: "FETCH_STOCKS_FAILURE", payload: error.message });
      alert(error.message)
    }
  };

  // Delete a stock
  const deleteStock = async (id, token) => {
    dispatch({ type: "FETCH_STOCKS_REQUEST" });
    try {
      await apiClient.delete(`/stocks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStocks(token)
    } catch (error) {
      dispatch({ type: "FETCH_STOCKS_FAILURE", payload: error.message });
      alert(error.message)
    }
  };

  // Calculate portfolio value
  const calculatePortfolioValue = async (token) => {
    dispatch({ type: "FETCH_STOCKS_REQUEST" });
    try {
      const response = await apiClient.get("/stocks/portfolio-metrics", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data)
      dispatch({ type: "CALCULATE_PORTFOLIO_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "FETCH_STOCKS_FAILURE", payload: error.message });
      alert(error.message)
      console.log(error.config)
    }
  };

  return (
    <StocksContext.Provider
      value={{
        ...state,
        fetchStocks,
        addStock,
        updateStock,
        deleteStock,
        calculatePortfolioValue,
      }}
    >
      {children}
    </StocksContext.Provider>
  );
};

export default StocksContext;
