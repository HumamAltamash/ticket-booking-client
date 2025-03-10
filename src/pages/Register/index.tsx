import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import "./index.css";
import { RegisterUserPayload } from "../../types/user";
import { RegisterUser } from "../../api/users";

function Register() {
  const onFinish = async (value: RegisterUserPayload) => {
    try {
      RegisterUser(value);
      message.success("Signup successful!");
    } catch (error) {
      message.error("Signup failed");
    }
  };

  return (
    <main className="register-main">
      <h1 className="register-heading">Register to BookMyShow</h1>
      <section className="register-section">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            htmlFor="name"
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input id="name" type="text" />
          </Form.Item>
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
              Register
            </Button>
          </Form.Item>
        </Form>
        <div className="register-footer-text">
          <p>
            Already a User?{" "}
            <Link to="/login" className="register-link">
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;
