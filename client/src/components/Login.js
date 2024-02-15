import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export default function Login() {
  const { setIsAuthenticated, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={(values, actions) => {
        axios
          .post("/login", values)
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
            } else {
              actions.setFieldError(
                "general",
                "An unexpected error occurred during login.",
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
            name="password"
            component="div"
            className="error-message"
          />
          <Field type="password" name="password" placeholder="Password" />

          <button type="submit">Login</button>
          {errors.general && touched.general && (
            <div className="error-message">{errors.general}</div>
          )}
        </Form>
      )}
    </Formik>
  );
}
