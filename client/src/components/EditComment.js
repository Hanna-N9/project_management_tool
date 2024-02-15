import { Formik, Field, Form } from "formik";
import axios from "axios";

export default function EditComment({
  commentId,
  initialValues,
  onUpdate,
  onCancel,
}) {
  return (
    <Formik
      initialValues={initialValues}
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
