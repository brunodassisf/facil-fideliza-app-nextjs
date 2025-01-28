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

const initialValues = {
  phone: "",
  password: "",
};

type IInitialValues = typeof initialValues;

const Login: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [btnBlock, setBtnBlock] = useState<boolean>(false);

  const handleCreateAccount = async (values: IInitialValues) => {
    setIsLoading(true);
    setBtnBlock(true);
    await credentials(values)
      .then((res) => {
        if (res?.ok) {
          router.push("/loja");
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
  return (
    <>
      {isLoading && <ProgressBar />}

      <div className="flex flex-col justify-center items-center pt-20 gap-y-4 pb-5 text-tag lg:max-w-2xl md:m-auto px-4">
        <Image
          width={150}
          height={150}
          priority={true}
          src="/logo.svg"
          alt="logo"
        />
        <h5 className="text-3xl font-semibold">Fácil Fidelizar</h5>
        <form
          onSubmit={handleSubmit}
          className="bg-white flex flex-col w-full justify-center items-center gap-y-5 pt-5 mt-10 px-4 pb-4 rounded-lg drop-shadow"
        >
          <h6 className="text-center text-stone-700 text-2xl">Login</h6>
          <Input
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
            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={btnBlock}
            >
              Entrar
            </Button>
            <Divider className="my-2 text-stone-700">ou</Divider>
            <Button
              component={Link}
              href="/cadastro"
              variant="outlined"
              fullWidth
              disabled={btnBlock}
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
