import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteCoupon, getCoupons } from "../../features/coupon/couponSlice";
import CustomModel from "../../Components/CustomModel/CustomModel";
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
    title: "Expiry",
    dataIndex: "expiry",
  },
  {
    title: "Discount",
    dataIndex: "discount",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const CouponList = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setCouponId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCoupons());
  }, []);

  const couponState = useSelector((state) => state.coupon.coupons);
  const data = [];

  for (let i = 0; i < couponState.length; i++) {
    let expiryDate = new Date(couponState[i].expiry).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
    data.push({
      key: i + 1,
      name: couponState[i].name,
      expiry: expiryDate,
      discount: couponState[i].discount + "%",
      action: (
        <div className="d-flex align-items-center justify-content-center gap-2">
          <Link
            to={`/admin/coupon/${couponState[i]._id}`}
            style={{ width: "60px", fontSize: "12px", height: "25px" }}
            className="btn d-flex align-items-center gap-1 justify-content-center"
          >
            <FaEdit />
            Edit
          </Link>
          <button
            style={{
              width: "70px",
              fontSize: "12px",
              height: "25px",
              background: "red",
            }}
            className="btn btn_delete d-flex align-items-center gap-1 justify-content-center"
            onClick={() => {
              showModal(couponState[i]._id);
            }}
          >
            <MdDeleteForever />
            Delete
          </button>
        </div>
      ),
    });
  }

  const deleteOneCoupon = (e) => {
    dispatch(deleteCoupon(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupons());
    }, 1000);
  };

  return (
    <div>
      <h3 className="mb-4 title">Coupons List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteOneCoupon(couponId);
        }}
        title="Are You Sure You Want To Delete This Brand ?"
      />
    </div>
  );
};

export default CouponList;
