import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Must be at least  8 characters")
    .required("Required"),
});

export default function Signup() {
  const { setIsAuthenticated, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={SignupSchema}
      onSubmit={(values, actions) => {
        axios
          .post("/sign_up", values)
          .then(response => {
            if (response.data.error) {
              actions.setFieldError("general", response.data.error);
            } else {
              setIsAuthenticated(true);
              setCurrentUser(response.data);
              navigate("/user");
            }
            actions.setSubmitting(false);
          })
          .catch(error => {
            actions.setSubmitting(false);
            if (error.response) {
              actions.setFieldError("general", error.response.data.error);
            } else if (error.request) {
              actions.setFieldError(
                "general",
                "No response received from the server.",
              );
            } else {
              actions.setFieldError(
                "general",
                "An error occurred during signup.",
              );
            }
          });
      }}>
      {({ errors, touched }) => (
        <Form>
          <ErrorMessage
            name="username"
            component="div"
            className="error-message"
          />
          <Field type="text" name="username" placeholder="Username" />

          <ErrorMessage
            name="email"
            component="div"
            className="error-message"
          />
          <Field type="email" name="email" placeholder="Email" />

          <ErrorMessage
            name="password"
            component="div"
            className="error-message"
          />
          <Field type="password" name="password" placeholder="Password" />

          <button type="submit">Sign Up</button>
          {errors.general && touched.general && (
            <div className="error-message">{errors.general}</div>
          )}
        </Form>
      )}
    </Formik>
  );
}
