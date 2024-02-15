import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  status: Yup.string().required("Status is required"),
});

export default function ProjectForm({ onCreate }) {
  return (
    <Formik
      initialValues={{ title: "", description: "", status: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        axios
          .post("/projects", values)
          .then(response => {
            onCreate(response.data);
            actions.resetForm();
          })
          .catch(error => {
            console.error(error);
          });
      }}>
      {formikProps => (
        <Form>
          <ErrorMessage
            name="title"
            component="div"
            className="error-message"
          />
          <Field type="text" name="title" placeholder="Title" />

          <ErrorMessage
            name="description"
            component="div"
            className="error-message"
          />
          <Field as="textarea" name="description" placeholder="Description" />

          <ErrorMessage
            name="status"
            component="div"
            className="error-message"
          />
          <Field as="select" name="status">
            <option value="">Select a Status</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Field>

          <button type="submit">Create Project</button>
        </Form>
      )}
    </Formik>
  );
}
