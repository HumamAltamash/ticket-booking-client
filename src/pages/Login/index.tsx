import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./index.css"; // Import the external CSS file
import { LoginUserPayload } from "../../types/user";
import { useAuth } from "../../hooks/useAuth";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (value: LoginUserPayload) => {
    try {
      await login(value);
      console.log("Login successful");
      navigate("/");
    } catch (error) {
      console.error(error);
      message.error("Login failed");
    }
  };

  return (
    <main className="login-main">
      <h1 className="login-heading">Login to BookMyShow</h1>
      <section className="login-section">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            htmlFor="email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input id="email" type="text" />
          </Form.Item>
          <Form.Item
            label="Password"
            htmlFor="password"
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input id="password" type="password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" block htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="login-footer-text">
          <p>
            New User?{" "}
            <Link to="/register" className="login-link">
              Register
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
