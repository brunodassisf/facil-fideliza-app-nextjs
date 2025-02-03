"use client";

import { Divider } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";

import { credentials } from "@/core/actions/credential";
import { useTag } from "@/core/context/WrapperTag";
import { signIpSchema as validationSchema } from "@/core/validation";
import { Button, Input, ProgressBar } from "@/presentation/components";
import StoreLogo from "@/presentation/components/StoreLogo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import VMasker from "vanilla-masker";

const initialValues = {
  phone: "",
  password: "",
};

type IInitialValues = typeof initialValues;

const Login: React.FC = () => {
  const router = useRouter();
  const { tag } = useTag();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [btnBlock, setBtnBlock] = useState<boolean>(false);

  const handleCreateAccount = async (values: IInitialValues) => {
    setIsLoading(true);
    setBtnBlock(true);
    await credentials({ ...values, role: "CLIENT" })
      .then((res) => {
        if (res?.ok) {
          toast.success(res.message);
          router.push(`/${tag?.tag}/meu-cartao`);
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

      <div className="flex flex-col justify-center items-center pt-20 gap-y-1 pb-5 lg:max-w-2xl md:m-auto px-4">
        <StoreLogo />
        <h5 className="text-3xl font-semibold mt-4">{tag?.name}</h5>
        <h6 className="text-center text-xl text-tag">Login</h6>
        <form
          onSubmit={handleSubmit}
          className="bg-white flex flex-col w-full justify-center items-center mt-5 gap-y-5 pt-5 px-4 pb-4 rounded-lg drop-shadow"
        >
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
              fullWidth
              variant="contained"
              type="submit"
              disabled={btnBlock}
            >
              Entrar
            </Button>
            <Divider className="my-2 text-stone-700">ou</Divider>
            <Button
              fullWidth
              component={Link}
              href={`${tag?.tag}/cadastro`}
              variant="outlined"
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
