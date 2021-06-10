import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "antd";

export default function signUp() {
  const googleLogin = () => {
    window.open("http://localhost:4000/googleAuth", "_self");
  };

  return (
    <div className="signUp">
      <h1>Sign In</h1>
      <Formik
        initialValues={{ email: "", password: "", userName: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = " Email is Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.userName.length) {
            errors.userName = "Username is required";
          }

          if (values.password.length < 8) {
            errors.password = "Password Must be 8 char";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" placeholder="User Name" name="userName" />
            <ErrorMessage name="userName" component="p" />
            <Field type="email" placeholder="Email" name="email" />
            <ErrorMessage name="email" component="p" />
            <Field type="password" placeholder="Password" name="password" />
            <ErrorMessage name="password" component="p" />

            <Button
              size="small"
              htmlType="submit"
              disabled={isSubmitting}
              type="primary"
            >
              Submit
            </Button>
            <Button onClick={googleLogin} size="small" type="primary">
              Sign In with Google
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
