"use client";

import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import VMasker from "vanilla-masker";
import { Button, Input, ProgressBar } from "@/presentation/components";
import { sendGAEvent } from "@next/third-parties/google";

import { useState } from "react";
import { signUpSchema as validationSchema } from "@/core/validation";
import Link from "next/link";
import { registerStore } from "@/core/actions/credential";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import StoreLogo from "@/presentation/components/StoreLogo";

const initialValues = {
  phone: "",
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  isChecked: false,
};

type IInitialValues = typeof initialValues;

const Register: React.FC = () => {
  const route = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [btnBlock, setBtnBlock] = useState<boolean>(false);

  const handleCreateAccount = async (values: IInitialValues) => {
    setIsLoading(true);
    setIsLoading(true);
    await registerStore({
      email: values.email,
      password: values.password,
      name: values.name,
      phone: values.phone,
    })
      .then((res) => {
        if (res?.ok) {
          sendGAEvent("event", "buttonClicked", {
            value: "Nova loja cadastrada",
          });
          toast.success(res?.message);
          toast.success("Você será redirecionando para sua loja, aguarde");
          route.push("/loja");
        } else {
          toast.error(res?.message);
          setBtnBlock(false);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const { values, errors, touched, handleChange, setFieldValue, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: handleCreateAccount,
    });

  const renderPolitcsLabel = () => {
    return (
      <div className="text-stone-600">
        Concordo com a
        <Link className="ml-1 underline" href="/politica-de-privacidade">
          Política de Privacidade
        </Link>
      </div>
    );
  };

  return (
    <>
      {isLoading && <ProgressBar />}
      <section className="flex flex-col justify-center items-center pt-20 gap-y-1 pb-5 text-tag lg:max-w-2xl md:m-auto px-4">
        <StoreLogo />
        <h5 className="text-3xl font-semibold mt-4">Fácil Fidelizar</h5>
        <h6 className="text-center text-xl">Cadastre-se</h6>
        <form
          onSubmit={handleSubmit}
          className="bg-white flex flex-col w-full justify-center items-center mt-5 gap-y-5 pt-5 px-4 pb-4 rounded-lg drop-shadow-md"
        >
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
            type="tel"
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
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={false}
                  value={values.isChecked}
                  onChange={(ev) =>
                    setFieldValue("isChecked", ev.target.checked)
                  }
                />
              }
              label={renderPolitcsLabel()}
            />
            {!!errors?.isChecked && touched?.isChecked ? (
              <FormHelperText className="!text-red-500 pl-8">
                {errors?.isChecked}
              </FormHelperText>
            ) : null}
          </FormGroup>
          <div className="w-full">
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={btnBlock}
            >
              Cadastrar
            </Button>
            <Divider className="my-2 text-stone-700">ou</Divider>

            <Button
              component={Link}
              href="/login"
              variant="outlined"
              fullWidth
              disabled={btnBlock}
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
