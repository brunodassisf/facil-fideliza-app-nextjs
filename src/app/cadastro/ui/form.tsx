"use client";

import { Divider, TextField } from "@mui/material";
import { useFormik } from "formik";
import VMasker from "vanilla-masker";
import { Button, Input, ProgressBar } from "@/presentation/components";

import { useState } from "react";
import { signUpSchema as validationSchema } from "@/core/validation";
import Image from "next/image";
import Link from "next/link";
import { registerStore } from "@/core/actions/credential";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const initialValues = {
  phone: "",
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

type IInitialValues = typeof initialValues;

const Register: React.FC = () => {
  const route = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateAccount = async (values: IInitialValues) => {
    setIsLoading(true);
    await registerStore(values)
      .then((res) => {
        toast.success(res?.message);
        route.push("/loja");
      })
      .catch((err) => {
        toast.error(err?.message);
      })
      .finally(() => setIsLoading(false));
  };

  const { values, errors, touched, handleChange, setFieldValue, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: handleCreateAccount,
    });

  return (
    <>
      {isLoading && <ProgressBar />}
      <section className="flex flex-col justify-center items-center pt-10 gap-y-4 pb-5 text-blue-900 lg:max-w-2xl md:m-auto px-4">
        <div className="w-48 h-48 rounded-full overflow-hidden flex items-center justify-center shadow-md">
          <Image
            src="/logo.png"
            width={200}
            height={200}
            alt="logo"
            className="w-full h-full object-contain"
          />
        </div>
        <h5 className="text-3xl font-semibold">Fácil Fideliza</h5>
        <form
          onSubmit={handleSubmit}
          className="bg-white flex flex-col w-full justify-center items-center gap-y-5 pt-5 px-4 pb-4 rounded-lg drop-shadow-md"
        >
          <h6 className="text-center text-stone-700 text-2xl">Cadastro</h6>

          <Input
            fullWidth
            label="Nome da Loja"
            value={values.name}
            name="name"
            onChange={handleChange}
            error={!!errors?.name && touched?.name}
            helperText={!!errors?.name && touched?.name ? errors?.name : ""}
          />
          <Input
            fullWidth
            label="E-mail"
            value={values.email}
            name="email"
            onChange={handleChange}
            error={!!errors?.email && touched?.email}
            helperText={!!errors?.email && touched?.email ? errors?.email : ""}
          />
          <Input
            fullWidth
            label="Telefone"
            value={values.phone}
            name="phone"
            onChange={(ev) =>
              setFieldValue(
                "phone",
                VMasker.toPattern(ev.target.value, "(99) 99999-9999")
              )
            }
            error={!!errors?.phone && touched?.phone}
            helperText={!!errors?.phone && touched?.phone ? errors?.phone : ""}
          />
          <TextField
            label="Senha"
            type="password"
            fullWidth
            value={values.password}
            name="password"
            onChange={handleChange}
            error={!!errors?.password && touched?.password}
            helperText={
              !!errors?.password && touched?.password ? errors?.password : ""
            }
          />
          <TextField
            label="Confirmar senha"
            type="password"
            fullWidth
            value={values.passwordConfirmation}
            name="passwordConfirmation"
            onChange={handleChange}
            error={
              !!errors?.passwordConfirmation && touched?.passwordConfirmation
            }
            helperText={
              !!errors?.passwordConfirmation && touched?.passwordConfirmation
                ? errors?.passwordConfirmation
                : ""
            }
          />
          <div className="w-full">
            <Button fullWidth variant="contained" type="submit">
              Cadastrar
            </Button>
            <Divider className="my-2 text-stone-700">ou</Divider>

            <Button component={Link} href="/login" variant="outlined" fullWidth>
              Fazer login
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
