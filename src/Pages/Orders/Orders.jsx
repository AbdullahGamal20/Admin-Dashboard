import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { getOrders } from "../../features/order/orderSlice";

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
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const data = [];
  const orderState = useSelector((state) => state.order.orders.orders);
  for (let i = 0; i < orderState?.length; i++) {
    // Convert the paidAt field to a Date object
    const date = new Date(orderState[i]?.paidAt);
    // Format the date to a readable format
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    data.push({
      key: i + 1,
      name:
        orderState[i].shippingInfo.firstName +
        " " +
        orderState[i].shippingInfo.lastName,
      product: (
        <Link to={`admin/order/${orderState[i]._id}`} style={{ color: "#000" }}>
          {orderState[i]?.orderItems[0]?.product.title}
        </Link>
      ),
      // fixed the product index to 0
      date: formattedDate,
      address: orderState[i]?.shippingInfo.address,
      price: `$${orderState[i]?.totalPriceAfterDiscount}`,
      action: (
        <div className="d-flex align-items-center justify-content-center gap-2">
          <Link
            style={{ width: "60px", fontSize: "12px", height: "25px" }}
            className="btn d-flex align-items-center gap-1 justify-content-center"
          >
            <FaEdit />
            Edit
          </Link>
          <Link
            style={{
              width: "70px",
              fontSize: "12px",
              height: "25px",
              background: "red",
            }}
            className="btn btn_delete d-flex align-items-center gap-1 justify-content-center"
          >
            <MdDeleteForever />
            Delete
          </Link>
        </div>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">All Orders</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Orders;
