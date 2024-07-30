import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteColor, getColors } from "../../features/color/colorSlice";
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

const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColors());
  }, []);

  const showModal = (e) => {
    setOpen(true);
    setColorId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const data = [];
  const colorState = useSelector((state) => state.colors.colors);
  for (let i = 0; i < colorState.length; i++) {
    data.push({
      key: i + 1,
      name: colorState[i].title,
      action: (
        <div className="d-flex align-items-center justify-content-center gap-2">
          <Link
            to={`/admin/color/${colorState[i]._id}`}
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
              showModal(colorState[i]._id);
            }}
          >
            <MdDeleteForever />
            Delete
          </button>
        </div>
      ),
    });
  }

  const deleteOneColor = (e) => {
    dispatch(deleteColor(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 1000);
  };

  return (
    <div>
      <h3 className="mb-4 title">Colors </h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>

      <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteOneColor(colorId);
        }}
        title="Are You Sure You Want To Delete This Color ?"
      />
    </div>
  );
};

export default ColorList;
