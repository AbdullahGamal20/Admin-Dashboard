import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { AiOutlineDashboard } from "react-icons/ai";
import { Button, Layout, Menu } from "antd";
import { FaShoppingCart, FaUser, FaMicroblog, FaBell } from "react-icons/fa";
import { SiBrandfolder, SiGooglemessages } from "react-icons/si";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoIosColorPalette } from "react-icons/io";
import { MdBorderColor } from "react-icons/md";
import { ImBlog } from "react-icons/im";
import { Outlet } from "react-router-dom";
import "./MainLayout.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { RiCoupon4Fill } from "react-icons/ri";

const { Header, Sider, Content } = Layout;

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Layout onContextMenu={(e) => e.preventDefault()}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo text-center text-white py-2 fs-3">
            <span className="sm_logo">TH</span>
            <span className="lg_logo">TechHaven</span>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[""]}
            onClick={({ key }) => {
              if (key != "signout") {
                navigate(key);
              }
            }}
            items={[
              {
                key: "",
                icon: <AiOutlineDashboard className="fs-4" />,
                label: "Dashboard",
              },
              {
                key: "customers",
                icon: <FaUser className="fs-4" />,
                label: "Customers",
              },
              {
                key: "catalog",
                icon: <FaShoppingCart className="fs-4" />,
                label: "Catalog",
                children: [
                  {
                    key: "product",
                    icon: <FaShoppingCart className="fs-5" />,
                    label: "Add Product",
                  },
                  {
                    key: "product-list",
                    icon: <FaShoppingCart className="fs-5" />,
                    label: "Product List",
                  },
                  {
                    key: "brand",
                    icon: <SiBrandfolder className="fs-5" />,
                    label: "Brand",
                  },
                  {
                    key: "list-brand",
                    icon: <SiBrandfolder className="fs-5" />,
                    label: "Brand List",
                  },
                  {
                    key: "category",
                    icon: <BiSolidCategoryAlt className="fs-5" />,
                    label: "Category",
                  },
                  {
                    key: "list-category",
                    icon: <BiSolidCategoryAlt className="fs-5" />,
                    label: "Category List",
                  },
                  {
                    key: "color",
                    icon: <IoIosColorPalette className="fs-5" />,
                    label: "Color",
                  },
                  {
                    key: "list-color",
                    icon: <IoIosColorPalette className="fs-5" />,
                    label: "Color List",
                  },
                ],
              },

              {
                key: "orders",
                icon: <MdBorderColor className="fs-4" />,
                label: "Orders",
              },
              {
                key: "marketing",
                icon: <RiCoupon4Fill className="fs-4" />,
                label: "Marketing",
                children: [
                  {
                    key: "coupon",
                    icon: <RiCoupon4Fill className="fs-5" />,
                    label: "Add Coupon",
                  },
                  {
                    key: "coupon-list ",
                    icon: <RiCoupon4Fill className="fs-5" />,
                    label: "Coupon List",
                  },
                ],
              },
              {
                key: "blogs",
                icon: <FaMicroblog className="fs-4" />,
                label: "Blogs",
                children: [
                  {
                    key: "blog",
                    icon: <ImBlog className="fs-5" />,
                    label: "Add Blog",
                  },
                  {
                    key: "blog-list ",
                    icon: <FaMicroblog className="fs-5" />,
                    label: "Blog List",
                  },
                  {
                    key: "blog-category",
                    icon: <ImBlog className="fs-5" />,
                    label: "Add Blog Category",
                  },
                  {
                    key: "blog-category-list",
                    icon: <FaMicroblog className="fs-5" />,
                    label: "Blog Category List",
                  },
                ],
              },
              {
                key: "enquiries",
                icon: <SiGooglemessages className="fs-4" />,
                label: "Enquiries",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            className="d-flex align-items-center justify-content-between  "
            style={{
              padding: "0px 50px 0 0",
              background: "#fff",
            }}
          >
            <Button
              type="text"
              className="fs-4 head"
              icon={
                collapsed ? (
                  <FaArrowRightArrowLeft />
                ) : (
                  <FaArrowRightArrowLeft />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-3">
                <div>
                  <FaUser className="fs-2" />
                </div>
                <div className=" ">
                  <h5 className="mb-0">{user.firstname} </h5>
                  <p className="mb-0">{user.email}</p>
                </div>
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              // background: "#fff",
            }}
          >
            {/* render all children of mainlayout */}
            <ToastContainer
              position="top-right"
              autoClose={400}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              theme="light"
            />
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default MainLayout;
