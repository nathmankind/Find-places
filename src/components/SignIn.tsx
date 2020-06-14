import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Select, Button, AutoComplete } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { auth } from "../Service/firebase";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<any>(null);

  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const onEmailHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setEmail(e.target.value as string);
    console.log(e.target.value);
  };

  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setPassword(e.target.value as string);
    console.log(e.target.value);
  };
  const signInWithEmailAndPasswordHandler = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    email: string,
    password: string
  ): void => {
    e.preventDefault();
    console.log(email, password);
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };
  return (
    <div>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input onChange={onEmailHandler} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password onChange={onPasswordHandler} />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button
            onClick={(e) => {
              signInWithEmailAndPasswordHandler(e, email, password);
            }}
            type="primary"
            htmlType="submit"
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
      <p>
        Dont have an account? Sign up <Link to="/signup">Here</Link>
      </p>
    </div>
  );
};
export default SignIn;
