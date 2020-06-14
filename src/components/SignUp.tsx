import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Select, Button, AutoComplete } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { auth, generateUserDocument } from "../Service/firebase";
import { firestore } from "./../Service/firebase";
import Home from "./../Home";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [q_search, setSearch] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

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
  //   const newHistory = () => {
  //       const newUserHistory = []
  //       setHistory(newUserHistory)
  //   }

  const signupUser = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    email: string,
    password: string
  ) => {
    auth.createUserWithEmailAndPassword(email, password).then(() => {
      const current_user: any = auth.currentUser;
      firestore.collection("users").doc(current_user.uid).set({
        email: email,
        search: q_search,
      });
    });
    auth.onAuthStateChanged((user_available) => {
      user_available ? setCurrentUser(user_available) : setCurrentUser(null);
      return <Redirect to="/" />
    });
    ;
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
              signupUser(e, email, password);
            }}
            type="primary"
            htmlType="submit"
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default SignUp;
