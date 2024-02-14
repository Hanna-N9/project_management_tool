import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  status: Yup.string().required("Status is required"),
});

export default function EditProject({
  projectId,
  initialValues,
  onUpdate,
  onCancel,
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        axios
          .patch(`/projects/${projectId}`, values)
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
          <Field as="select" name="status">
            <option value="">Select a Status</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
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
