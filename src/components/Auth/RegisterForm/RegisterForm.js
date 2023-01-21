import React, { useState } from "react";
import { Form, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import { Auth } from "../../../api";
import { initialValues, validationSchema } from "./RegisterFormData";
import "./RegisterForm.scss";

const auth = new Auth();

export function RegisterForm(props) {
  const { openLogin, goBack } = props;
  const [showPassword, setShowPassword] = useState(false);

  const onShowHiddenPassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await auth.register(formValue.email, formValue.password);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="register-form">
      <h1>Empieza a escuchar tus canciones con una cuenta gratis de Musicfy</h1>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="email"
          type="text"
          placeholder="Correo electronico"
          icon="mail outline"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          icon={
            <Icon
              name={showPassword ? "eye slash" : "eye"}
              link
              onClick={onShowHiddenPassword}
            />
          }
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
        />
        <Form.Input
          name="username"
          type="text"
          placeholder="Nombre de usuario"
          icon="user circle outline"
          onChange={formik.handleChange}
          value={formik.values.username}
          error={formik.errors.username}
        />

        <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
          Continuar
        </Form.Button>
      </Form>

      <div className="register-form__options">
        <p onClick={goBack}>Volver</p>
        <p>
          ¿Ya tienes Musicfy? <span onClick={openLogin}>Incia sesión</span>
        </p>
      </div>
    </div>
  );
}
