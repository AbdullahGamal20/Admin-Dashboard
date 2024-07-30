import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlogCategory,
  getBlogCategories,
} from "../../features/blogCat/blogCatSlice";
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

const BlogCatList = () => {
  const [open, setOpen] = useState(false);
  const [blogCatId, setBlogCatId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setBlogCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogCategories());
  }, []);

  const blogCatState = useSelector((state) => state.blogCat.blogCats);
  const data = [];

  for (let i = 0; i < blogCatState.length; i++) {
    data.push({
      key: i + 1,
      name: blogCatState[i].title,
      action: (
        <div className="d-flex align-items-center justify-content-center gap-2">
          <Link
            to={`/admin/blog-category/${blogCatState[i]._id}`}
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
              showModal(blogCatState[i]._id);
            }}
          >
            <MdDeleteForever />
            Delete
          </button>
        </div>
      ),
    });
  }

  const deleteOneBlogCat = (e) => {
    dispatch(deleteBlogCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogCategories());
    }, 1000);
  };

  return (
    <div>
      <h3 className="mb- title">Blog Categories </h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>

      <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteOneBlogCat(blogCatId);
        }}
        title="Are You Sure You Want To Delete This Blog Category ?"
      />
    </div>
  );
};

export default BlogCatList;
