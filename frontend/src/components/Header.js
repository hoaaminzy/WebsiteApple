import React, { useContext, useState } from "react";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import InputGroup from "react-bootstrap/InputGroup";
import SummaryApi from "../common";
import productCategory from "../helpers/productCategory";
const Header = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);
  const itemCart = useSelector((state) => state.cart.items);
  function removeDiacriticsAndSpaces(word) {
    return word
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "")
      .replace(/[,.-]/g, "");
  }

  const handleLogout = async () => {
    const fetchData = await fetch(
      SummaryApi.logout_user.url,
      {
        method: SummaryApi.logout_user.method,
        credentials: "include",
      },
      localStorage.clear()
    );

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    } else {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="bg-black">
      <Navbar expand="lg" bg="black" variant="dark" fixed="top">
        <Container className="flex">
          <Navbar.Brand href="/" style={{ flex: 1 }}>
            <img
              src="https://assets-global.website-files.com/5fb85f26f126ce08d792d2d9/6362dd5e926122938ff89ade_Apple_Rainbow_Logo_Color_Scheme.jpg"
              alt="Logo"
              width={100}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            style={{ flex: 4, width: "100%" }}
          >
            <Nav
              className="d-flex justify-content-between text-white"
              style={{ width: "100%" }}
            >
              {productCategory?.map((cate, index) => {
                return (
                  <Nav.Link
                    as={Link}
                    to={`/${removeDiacriticsAndSpaces(cate.value)}`}
                  >
                    {cate.label}
                  </Nav.Link>
                );
              })}

              {/* <Nav.Link as={Link} to="/link1">
                Mac
              </Nav.Link>
              <Nav.Link as={Link} to="/link2">
                iPad
              </Nav.Link>
              <Nav.Link as={Link} to="/link3">
                Watch
              </Nav.Link>
              <Nav.Link as={Link} to="/link4">
                Tai nghe, Loa
              </Nav.Link>
              <Nav.Link as={Link} to="/link5">
                Phụ kiện
              </Nav.Link> */}
              <Nav.Link as={Link} to="/tekzone">
                TekZone
              </Nav.Link>
              <Nav.Link as={Link} to="/topcare">
                TopCare
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav
            className="d-flex align-items-center justify-content-around"
            style={{ flex: 3 }}
          >
            <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <InputGroup>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={handleSearch}
                  value={search}
                />
                {/* <Button variant="outline-success" onClick={handleSearch}>
                  <GrSearch />
                </Button> */}
              </InputGroup>
            </Form>
            <NavDropdown
              title={
                <img
                  src={
                    user
                      ? user?.profilePic
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3URjWpcZfPfzAHxrU_Xms2GzfUJmvWXGjuw&s"
                  }
                  alt="User Avatar"
                  width={30}
                  height={30}
                  className="rounded-circle"
                />
              }
              id="basic-nav-dropdown"
              // show={menuDisplay}
              // onClick={() => setMenuDisplay((prev) => !prev)}
            >
              {user?.role === ROLE.ADMIN ? (
                <>
                  <NavDropdown.Item as={Link} to="/admin-panel/all-products">
                    Quản lý hệ thống
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/infor-user">
                    Thông tin cá nhân
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item as={Link} to="/history-payments">
                    Lịch sử mua hàng
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/infor-user">
                    Thông tin cá nhân
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
            {/* {user?._id && ( */}
            <Nav.Link as={Link} to="/cart" className="position-relative">
              <FaShoppingCart />
              {itemCart?.length > 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {itemCart.length}
                </Badge>
              )}
            </Nav.Link>
            {/* )} */}
            {user?._id ? (
              <Button variant="outline-light" onClick={handleLogout}>
                Đăng xuất
              </Button>
            ) : (
              <Button variant="outline-light" as={Link} to="/login">
                Đăng nhập
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
