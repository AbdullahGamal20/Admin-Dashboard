import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { GoArrowDownRight } from "react-icons/go";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlyOrders,
  getYearlyStates,
} from "../../features/auth/authSlice";

const columns = [
  {
    title: "Number",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const data2 = [
  {
    key: "1",
    name: "John Brown",
    product: 32,
    status: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    product: 42,
    status: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    product: 32,
    status: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Disabled User",
    product: 99,
    status: "Sydney No. 1 Lake Park",
  },
  {
    key: "5",
    name: "Disabled User",
    product: 99,
    status: "Sydney No. 1 Lake Park",
  },
  {
    key: "6",
    name: "Disabled User",
    product: 99,
    status: "Sydney No. 1 Lake Park",
  },
  {
    key: "7",
    name: "Disabled User",
    product: 99,
    status: "Sydney No. 1 Lake Park",
  },
  {
    key: "8",
    name: "Disabled User",
    product: 99,
    status: "Sydney No. 1 Lake Park",
  },
];

function Dashboard() {
  const dispatch = useDispatch();
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);
  const monthDataState = useSelector((state) => state.auth.monthOrders);
  const yearDataState = useSelector((state) => state.auth.yearStates);

  useEffect(() => {
    dispatch(getMonthlyOrders());
    dispatch(getYearlyStates());
  }, [dispatch]);

  useEffect(() => {
    if (monthDataState) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const data = monthDataState.map((e, i) => ({
        type: monthNames[i],
        income: e?.amount,
      }));

      data.push({
        type: monthNames[1],
        income: 1200,
      });
      data.push({
        type: monthNames[2],
        income: 1500,
      });
      data.push({
        type: monthNames[3],
        income: 1300,
      });

      const monthlyOrderCount = monthDataState.map((e, i) => ({
        type: monthNames[i],
        sales: e?.count,
      }));

      monthlyOrderCount.push({
        type: monthNames[1],
        sales: 1,
      });

      monthlyOrderCount.push({
        type: monthNames[2],
        sales: 2,
      });
      monthlyOrderCount.push({
        type: monthNames[3],
        sales: 1,
      });

      setDataMonthly(data);
      setDataMonthlySales(monthlyOrderCount);
    }
  }, [monthDataState]);

  const config = {
    data: dataMonthly,
    meta: {
      type: {
        alias: "Month",
      },
      income: {
        alias: "Income",
      },
    },
    xField: "type",
    yField: "income",
    style: {
      fill: ({ type }) => "rgba(41, 55, 243, 0.9)",
    },
    label: {
      text: (originData) => {
        const val = parseFloat(originData.income);
        return val < 0.05 ? (val * 100).toFixed(1) + "%" : "";
      },
      offset: 10,
    },
    legend: false,
  };

  const config2 = {
    data: dataMonthlySales,
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
    xField: "type",
    yField: "sales",
    style: {
      fill: ({ type }) => "#febd69",
    },
    label: {
      text: (originData) => {
        const val = parseFloat(originData.sales);
        return val < 0.05 ? (val * 100).toFixed(1) + "%" : "";
      },
      offset: 10,
    },
    legend: false,
  };

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex align-items-center justify-content-between gap-3">
        {yearDataState && yearDataState[0] ? (
          <>
            <div className="d-flex align-items-center  justify-content-between flex-grow-1 bg-white p-3 rounded-3">
              <div>
                <p className="desc">Total Income</p>
                <h4 className="mb-0 sub_title">
                  ${yearDataState[0].amount + 4000}
                </h4>
              </div>
              <div className="d-flex flex-column align-items-end ">
                <p className="mb-0 desc">Income in Last Year</p>
              </div>
            </div>
            <div className="d-flex align-items-center  justify-content-between flex-grow-1 bg-white p-3 rounded-3">
              <div>
                <p className="desc">Total Sales</p>
                <h4 className="mb-0 sub_title">{yearDataState[0].count + 4}</h4>
              </div>
              <div className="d-flex flex-column align-items-end ">
                <p className="mb-0 desc">Sales in Last Year</p>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="d-flex align-items-center justify-content-center">
        <div className="mt-5 w-50">
          <h3 className="mb-4 title">Income Statistics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>

        <div className="mt-5 mx-3 w-50">
          <h3 className="mb-4 title">Sales Statistics</h3>
          <div>
            <Column {...config2} />
          </div>
        </div>
      </div>

      <div className="mt-5 ">
        <h3 className="mb-4 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data2} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
