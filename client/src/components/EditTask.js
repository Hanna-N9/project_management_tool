import React from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";

export default function EditTask({
  taskId,
  initialValues,
  onUpdate,
  onCancel,
}) {
  return (
    <Formik
      initialValues={initialValues}
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
          <Field type="text" name="title" placeholder="Title" />

          <Field as="textarea" name="description" placeholder="Description" />

          <Field as="select" name="priority">
            <option value="">Select a Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Field>

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
