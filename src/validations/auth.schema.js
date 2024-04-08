import * as yup from "yup";

export const registerSchema = yup.object({
  displayName: yup.string().min(2).max(150).required(),
  username: yup.string().min(2).max(150).required(),
  password: yup.string().min(2).required(),
});

export const loginSchema = yup.object({
  username: yup.string().min(2).max(150).required(),
  password: yup.string().min(2).required(),
});

export const profileSchema = yup.object({
  displayName: yup.string().min(2).max(150).required(),
});

export const changePasswordSchema = yup.object({
  passwordOld: yup
    .string()
    .min(2, ({ min }) => `Password must be at least ${min} characters`)
    .max(150, ({ max }) => `Password must be at most ${max} characters`)
    .required("Password old is required"),
  passwordNew: yup
    .string()
    .min(2, ({ min }) => `Password must be at least ${min} characters`)
    .max(150, ({ max }) => `Password must be at most ${max} characters`)
    .required("Password new is required"),
  rePassword: yup.string().oneOf([yup.ref("passwordNew"), undefined], "New password must match"),
});
