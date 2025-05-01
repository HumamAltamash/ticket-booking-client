import { useDispatch, useSelector } from "react-redux";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { GetCurrentUser } from "../../api/users";
import { RootState } from "../../store/store";
import { setUser } from "../../store/userSlice";
import { hideLoader, showLoader } from "../../store/loaderSlice";
import { Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import "./Home.css";
import { useAuth } from "../../hooks/useAuth";
import Admin from "../Admin/Admin";
import Partner from "../Partner/Partner";
import { UserRole } from "../../types/user";

function Home() {
  const { logout, role } = useAuth();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = [
    { key: "home", label: "Home", icon: <HomeOutlined /> },
    {
      key: "user",
      label: `${user.name}`,
      icon: <UserOutlined />,
      children: [
        {
          key: "profile",
          label: <span>My Profile</span>,
          icon: <ProfileOutlined />,
        },
        {
          key: "logout",
          label: (
            <span
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </span>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  const getValidUser = async () => {
    try {
      dispatch(showLoader());
      const response = await GetCurrentUser();
      if (response.status === 200) {
        dispatch(setUser(response.data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    getValidUser();
  }, []);

  return (
    user && (
      <Layout className="home-layout">
        <Header className="home-header">
          <h3>Book My Show</h3>
          <Menu
            theme="dark"
            mode="horizontal"
            items={navItems}
            className="home-menu"
          />
        </Header>
        <div className="home-content">
          {role === UserRole.ADMIN && <Admin />}
          {role === UserRole.PARTNER && <Partner />}
          {role === UserRole.USER && <Home />}
        </div>
      </Layout>
    )
  );
}

export default Home;
