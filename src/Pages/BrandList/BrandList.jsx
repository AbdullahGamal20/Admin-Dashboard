import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrand, getBrands } from "../../features/brand/brandSlice";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
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
    title: "Action",
    dataIndex: "action",
  },
];

const BrandList = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setbrandId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setbrandId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
  }, []);

  const brandState = useSelector((state) => state.brands.brands);
  const data = [];
  for (let i = 0; i < brandState?.length; i++) {
    data.push({
      key: i + 1,
      name: brandState[i].brand,
      action: (
        <div className="d-flex align-items-center justify-content-center gap-2">
          <Link
            to={`/admin/brand/${brandState[i]._id}`}
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
              showModal(brandState[i]._id);
            }}
          >
            <MdDeleteForever />
            Delete
          </button>
        </div>
      ),
    });
  }

  const deleteOneBrand = (e) => {
    dispatch(deleteBrand(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 1000);
  };

  return (
    <div>
      <h3 className="mb-4 title">All Brands </h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteOneBrand(brandId);
        }}
        title="Are You Sure You Want To Delete This Brand ?"
      />
    </div>
  );
};

export default BrandList;
