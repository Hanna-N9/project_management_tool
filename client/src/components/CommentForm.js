import { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object().shape({
  task_id: Yup.string().required("Task is required"),
  text: Yup.string().required("Comment is required"),
});

export default function CommentForm({ onCreate }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("/tasks")
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <Formik
      initialValues={{ text: "", task_id: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        axios
          .post("/comments", values)
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
            name="task_id"
            component="div"
            className="error-message"
          />
          <Field as="select" name="task_id">
            <option value="">Select a task</option>
            {tasks.map(task => (
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            ))}
          </Field>

          <ErrorMessage name="text" component="div" className="error-message" />
          <Field
            as="textarea"
            name="text"
            placeholder="Write down your comments here..."
          />

          <button type="submit">Add Comment</button>
        </Form>
      )}
    </Formik>
  );
}
