import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate, Route, Routes } from "react-router-dom";
import ROLE from "../common/role";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  SnippetsOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import AllUsers from "./AllUsers";
import AllProducts from "./AllProducts";
import CreateBanner from "../components/CreateBanner";
import AllBanner from "./AllBanner";
import AllOrder from "./AllOrder";
import CreateBlog from "../components/CreateBlog";
import DashBoard from "./DashBoard";
// const AdminPanel = () => {
//     const user = useSelector(state => state?.user?.user)
//     const navigate = useNavigate()

//     useEffect(()=>{
//         if(user?.role !== ROLE.ADMIN){
//             navigate("/")
//         }
//     },[user])

//   return (
//     <div className='min-h-[calc(100vh-120px)] md:flex hidden'>

//         <aside className='bg-white min-h-full  w-full  max-w-60 customShadow'>
//                 <div className='h-32  flex justify-center items-center flex-col'>
//                     <div className='text-5xl cursor-pointer relative flex justify-center'>
//                         {
//                         user?.profilePic ? (
//                             <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
//                         ) : (
//                             <FaRegCircleUser/>
//                         )
//                         }
//                     </div>
//                     <p className='capitalize text-lg font-semibold'>{user?.name}</p>
//                     <p className='text-sm'>{user?.role}</p>
//                 </div>

//                  {/***navigation */}
//                 <div>
//                     <nav className='grid p-4'>
//                         <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
//                         <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>All product</Link>
//                     </nav>
//                 </div>
//         </aside>

//         <main className='w-full h-full p-2'>
//             <Outlet/>
//         </main>
//     </div>
//   )
// }

// export default AdminPanel

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(<Link to="/">Trang chủ </Link>, "1", <HomeOutlined />),
  getItem(
    <Link to="/admin-panel/statistical">Thống kê </Link>,
    "2",
    <PieChartOutlined />
  ),
  //   getItem("Option 2", "2", <DesktopOutlined />),
  getItem("Câu hỏi", "sub1", <QuestionCircleOutlined />, [
    getItem(<Link to="/admin-panel/all-users">Tất cả User</Link>, "3"),
    getItem(<Link to="/admin-panel/all-products">Tất cả sản phẩm</Link>, "4"),
    getItem(<Link to="/admin-panel/all-banner">Tất cả Banner</Link>, "5"),
    getItem(<Link to="/admin-panel/all-order">Tất cả Order</Link>, "6"),
  ]),
  //   getItem("Người dùng", "sub2", <TeamOutlined />, [
  //     getItem(<Link to="/admin/allUsers">Tất cả người dùng</Link>, "6"),
  //     getItem(<Link to="/admin/tableEquals">Xem kết quả người dùng</Link>, "8"),
  //   ]),
  //   getItem("Đề thi", "sub3", <SnippetsOutlined />, [
  //     getItem(<Link to="/admin/create-exams">Tạo đề thi</Link>, "9"),
  //     getItem(<Link to="/admin/allQuizs">Xem tất cả các đề</Link>, "10"),
  //   ]),
];
const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user]);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Sider
        style={{ background: "black" }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "black",
          }}
        />
        <Content
          style={{
            margin: "0 16px",
            scrollBehavior: "smooth",
            overflowY: "scroll",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: "100vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/statistical" element={<DashBoard />} />
              <Route path="/all-users" element={<AllUsers />} />
              <Route path="/all-products" element={<AllProducts />} />
              <Route path="/all-banner" element={<AllBanner />} />
              <Route path="/all-order" element={<AllOrder />} />
              <Route path="/create-blog" element={<CreateBlog />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;
