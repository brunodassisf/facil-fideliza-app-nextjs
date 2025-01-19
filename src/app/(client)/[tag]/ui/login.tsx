"use client";

import { Divider } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";

import VMasker from "vanilla-masker";
import { signIpSchema as validationSchema } from "@/core/validation";
import { Button, Input, ProgressBar } from "@/presentation/components";
import Image from "next/image";
import Link from "next/link";
import { credentials } from "@/core/actions/credential";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useTag } from "@/core/context/WrapperTag";

const initialValues = {
  phone: "",
  password: "",
};

type IInitialValues = typeof initialValues;

const Login: React.FC = () => {
  const router = useRouter();
  const { tag } = useTag();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateAccount = async (values: IInitialValues) => {
    setIsLoading(true);
    await credentials(values)
      .then(() => {
        router.push(`/${tag?.tag}/meu-cartao`);
      })
      .catch((res) => toast.error(res.message))
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

      <div className="flex flex-col justify-center items-center pt-10 gap-y-4 pb-5 lg:max-w-2xl md:m-auto px-4">
        <Image
          width={100}
          height={100}
          src="/logo.png"
          alt="logo"
          className="w-auto h-auto"
          priority={true}
        />

        <h5 className="text-3xl font-semibold">{tag?.name}</h5>
        <form
          onSubmit={handleSubmit}
          className="bg-white flex flex-col w-full justify-center items-center gap-y-5 pt-5 px-4 pb-4 rounded-lg drop-shadow"
        >
          <h6 className="text-center text-2xl text-tag">Login</h6>
          <Input
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
          <Input
            label="Senha"
            type="password"
            value={values.password}
            name="password"
            onChange={handleChange}
            error={!!errors?.password && touched?.password}
            helperText={
              !!errors?.password && touched?.password ? errors?.password : ""
            }
          />
          <div className="w-full">
            <Button variant="contained" fullWidth type="submit">
              Entrar
            </Button>
            <Divider className="my-2 text-stone-700">ou</Divider>
            <Button
              component={Link}
              href={`${tag?.tag}/cadastro`}
              variant="outlined"
              fullWidth
            >
              Cadastre-se
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
