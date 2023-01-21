import * as Yup from "yup";

export function initialValues() {
  return {
    password: "",
    newPassword: "",
    repeatNewPassword: "",
  };
}

export function validationSchema() {
  return Yup.object({
    password: Yup.string().required(true),
    newPassword: Yup.string()
      .required(true)
      .notOneOf(
        [Yup.ref("password"), null],
        "Las contraseñas no pueden ser iguales"
      ),
    repeatNewPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("newPassword"), null], "Las contraseñas no son iguales"),
  });
}
