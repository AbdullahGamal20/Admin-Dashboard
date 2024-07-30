import React, { useEffect } from "react";
import { Table } from "antd";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/product/productSlice";
import { Link } from "react-router-dom";

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
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
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

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state.products.products);
  const data = [];

  for (let i = 0; i < productState.length; i++) {
    data.push({
      key: i + 1,
      name: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      quantity: productState[i].quantity,
      price: `$${productState[i].price}`,
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
      <h3 className="mb-4 title">All Products </h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default ProductList;
