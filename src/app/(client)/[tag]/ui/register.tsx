"use client";

import { Divider, TextField } from "@mui/material";
import { useFormik } from "formik";
import VMasker from "vanilla-masker";
import { Button, Input, ProgressBar } from "@/presentation/components";

import { useState } from "react";
import { signUpSchema as validationSchema } from "@/core/validation";
import Image from "next/image";
import Link from "next/link";
import { registerClient } from "@/core/actions/credential";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useTag } from "@/core/context/WrapperTag";

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
  const { tag } = useTag();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateAccount = async (values: IInitialValues) => {
    setIsLoading(true);

    const { email, name, password, phone } = values;
    await registerClient({
      email,
      name,
      password,
      phone,
      tag: tag?.tag as string,
    })
      .then((res) => {
        toast.success(res?.message);
        route.push(`/${tag?.tag}/meu-cartao`);
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
      <section className="flex flex-col justify-center items-center pt-10 gap-y-4 pb-5 lg:max-w-2xl md:m-auto px-4">
        <Image
          src="/logo.png"
          width={100}
          height={100}
          alt="logo"
          className="object-contain"
        />

        <h5 className="text-3xl font-semibold">Fácil Fideliza</h5>
        <form
          onSubmit={handleSubmit}
          className="bg-white flex flex-col w-full justify-center items-center gap-y-5 pt-5 px-4 pb-4 rounded-lg drop-shadow-md"
        >
          <h6 className="text-center text-2xl text-tag">Cadastro</h6>

          <Input
            fullWidth
            label="Nome"
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

            <Button
              component={Link}
              href={`/${tag?.tag}`}
              variant="outlined"
              fullWidth
            >
              Fazer login
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
