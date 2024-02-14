import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object().shape({
  text: Yup.string().required("Comment is required"),
});

export default function EditComment({
  commentId,
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
          .patch(`/comments/${commentId}`, values)
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
          <Field as="textarea" name="text" placeholder="Text" />

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
