import React, { useEffect, useState } from "react";
import "./enquires.css";
import { Table } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEnquery,
  getEnquiries,
} from "../../features/enquires/enquiresSlice";
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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Comment",
    dataIndex: "comment",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquires = () => {
  const [open, setOpen] = useState(false);
  const [enqId, setEnqId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setEnqId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEnquiries());
  }, []);

  const data = [];
  const enqState = useSelector((state) => state.enquery.enquiry);

  for (let i = 0; i < enqState.length; i++) {
    data.push({
      key: i + 1,
      name: enqState[i].name,
      email: enqState[i].email,
      mobile: enqState[i].mobile,
      comment: enqState[i].comment,
      action: (
        <div className="d-flex align-items-center justify-content-start gap-2">
          <button
            style={{
              width: "70px",
              fontSize: "12px",
              height: "25px",
              background: "red",
            }}
            className="btn btn_delete d-flex align-items-center gap-1 justify-content-center"
            onClick={() => {
              showModal(enqState[i]._id);
            }}
          >
            <MdDeleteForever />
            Delete
          </button>
        </div>
      ),
    });
  }

  const deleteOneEnquiry = (e) => {
    dispatch(deleteEnquery(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 1000);
  };

  return (
    <div>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteOneEnquiry(enqId);
        }}
        title="Are You Sure You Want To Delete This Brand ?"
      />
    </div>
  );
};

export default Enquires;
