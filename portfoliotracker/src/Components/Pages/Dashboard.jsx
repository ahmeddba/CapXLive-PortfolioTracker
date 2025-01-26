import React, { useContext, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Card, Row, Col, Table, Spin } from "antd";
import StocksContext from "../../Context/StocksContext";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { calculatePortfolioValue, loading, portfolioValue } = useContext(StocksContext);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      calculatePortfolioValue(token);
    }
  }, []);

  const contentStyle = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
  };

  const content = <div style={contentStyle} />;

  // Safeguard for undefined `portfolioValue`
  const totalValue = portfolioValue?.totalValue || 0;
  const totalProfitLoss = portfolioValue?.totalProfitLoss || 0;
  const averageBuyPrice = portfolioValue?.averageBuyPrice || 0;
  const diversification = portfolioValue?.diversification || 0;
  const topStock = portfolioValue?.topPerformingStock || {};
  const stockMetrics = portfolioValue?.stockMetricsList || [];
  const portfolioDistribution = portfolioValue?.portfolioDistribution || {};

  // Prepare data for the Pie Chart
  const pieChartData = {
    labels: Object.keys(portfolioDistribution),
    datasets: [
      {
        data: Object.values(portfolioDistribution),
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverBackgroundColor: ["#1E81CE", "#E84758", "#E7B340", "#389E9E", "#7B4BE4"],
      },
    ],
  };

  // Columns for Ant Design Table
  const columns = [
    {
      title: "Ticker",
      dataIndex: "ticker",
      key: "ticker",
    },
    {
      title: "Buy Price",
      dataIndex: "buyPrice",
      key: "buyPrice",
      render: (price) => `$${price?.toFixed(2) || 0}`,
    },
    {
      title: "Current Price",
      dataIndex: "currentPrice",
      key: "currentPrice",
      render: (price) => `$${price?.toFixed(2) || 0}`,
    },
    {
      title: "Profit/Loss",
      dataIndex: "profitLoss",
      key: "profitLoss",
      render: (profitLoss) => (
        <span className={profitLoss >= 0 ? "text-green-600" : "text-red-600"}>
          ${profitLoss?.toFixed(2) || 0}
        </span>
      ),
    },
  ];

  return (
    <div className="dashboard p-4">
      {/* Portfolio Overview Cards */}
    {
      loading ? (<>
      <Spin tip="Loading" size="large">
        {content}
      </Spin>
      </>):
      (<>
         <Row gutter={16} className="mb-4">
        <Col span={6}>
          <Card title="Total Portfolio Value" bordered>
            <p className="text-2xl font-bold text-green-600">${totalValue.toFixed(2)}</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Total Profit/Loss" bordered>
            <p
              className={`text-2xl font-bold ${
                totalProfitLoss >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              ${totalProfitLoss.toFixed(2)}
            </p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Average Buy Price" bordered>
            <p className="text-2xl font-bold">${averageBuyPrice.toFixed(2)}</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Diversification" bordered>
            <p className="text-2xl font-bold">{diversification} stocks</p>
          </Card>
        </Col>
      </Row>

      {/* Top Performing Stock */}
      <Card title="Top Performing Stock" bordered className="mb-4">
        <p className="text-xl font-bold">{topStock.ticker || "N/A"}</p>
        <p>
          Buy Price: ${topStock.buyPrice?.toFixed(2) || 0} | Current Price: $
          {topStock.currentPrice?.toFixed(2) || 0} | Profit/Loss:{" "}
          <span
            className={topStock.profitLoss >= 0 ? "text-green-600" : "text-red-600"}
          >
            ${topStock.profitLoss?.toFixed(2) || 0}
          </span>
        </p>
      </Card>

      {/* Stock Metrics Table */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Stock Metrics</h3>
        <Table
          dataSource={stockMetrics}
          columns={columns}
          rowKey="ticker"
          pagination={false}
          bordered
        />
      </div>

      {/* Portfolio Distribution Pie Chart */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Portfolio Distribution</h3>
        <div style={{ width: "400px", margin: "0 auto" }}>
          <Pie data={pieChartData} />
        </div>
      </div>
      </>)
    }
    </div>
  );
};

export default Dashboard;
