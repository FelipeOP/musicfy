import React from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./DisplayNameUpdateFormData";
import { User } from "../../../api";

const userController = new User();

export function DisplayNameUpdateForm(props) {
  const { onClose } = props;
  const { displayName } = userController.getUserInfo();

  const formik = useFormik({
    initialValues: initialValues(displayName),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formData) => {
      try {
        await userController.updateDisplayName(formData.displayName);
        onClose();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="displayName"
        placeholder="Nombre y Apellido"
        value={formik.values.displayName}
        onChange={formik.handleChange}
        error={formik.errors.displayName}
      />
      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Actualizar
      </Form.Button>
    </Form>
  );
}
