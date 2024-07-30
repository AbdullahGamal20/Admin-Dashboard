import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getProductCategories,
} from "../../features/prodCategory/prodCategorySlice";
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

const CategoryList = () => {
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getProductCategories());
  }, []);

  const showModal = (e) => {
    setOpen(true);
    setCategoryId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const categoryStete = useSelector(
    (state) => state.prodCategory.prodCategories
  );
  const data = [];

  for (let i = 0; i < categoryStete.length; i++) {
    data.push({
      key: i + 1,
      name: categoryStete[i].title,
      action: (
        <div className="d-flex align-items-center justify-content-center gap-2">
          <Link
            to={`/admin/category/${categoryStete[i]._id}`}
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
              showModal(categoryStete[i]._id);
            }}
          >
            <MdDeleteForever />
            Delete
          </button>
        </div>
      ),
    });
  }

  const deleteOneCategory = (e) => {
    dispatch(deleteCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProductCategories());
    }, 1000);
  };

  return (
    <div>
      <h3 className="mb-4 title">Product Categories </h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteOneCategory(categoryId);
        }}
        title="Are You Sure You Want To Delete This Category ?"
      />
    </div>
  );
};

export default CategoryList;
