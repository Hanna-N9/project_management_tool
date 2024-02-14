import { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object().shape({
  project_id: Yup.string().required("Project is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  priority: Yup.string().required("Priority is required"),
  status: Yup.string().required("Status is required"),
});

export default function EditTask({
  taskId,
  initialValues,
  onUpdate,
  onCancel,
}) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("/projects")
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        axios
          .patch(`/tasks/${taskId}`, values)
          .then(response => {
            onUpdate(response.data);
            actions.setSubmitting(false);
          })
          .catch(error => {
            console.error(error);
          });
      }}>
      {formikProps => (
        <Form>
          <ErrorMessage name="text" component="div" className="error-message" />
          <Field type="text" name="title" placeholder="Title" />

          <ErrorMessage name="text" component="div" className="error-message" />
          <Field as="textarea" name="description" placeholder="Description" />

          <ErrorMessage name="text" component="div" className="error-message" />
          <Field as="select" name="priority">
            <option value="">Select a Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Field>

          <ErrorMessage name="text" component="div" className="error-message" />
          <Field as="select" name="status">
            <option value="">Select a Status</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Field>

          <ErrorMessage name="text" component="div" className="error-message" />
          <Field as="select" name="project_id">
            <option value="">Select a Project</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </Field>

          <div className="button-group">
            <button type="submit" className="save">
              Save Changes
            </button>
            <button type="button" className="cancel" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
