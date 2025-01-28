"use client";

import { TextField, Typography } from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import VMasker from "vanilla-masker";
import { createProductSchema as validationSchema } from "../../../../core/validation";

import { maskerMoney } from "../../../../core/util";
import { Button, ProgressBar } from "@/presentation/components";
import { useResourceStore } from "@/core/context/WrapperStore";
import { createProduct } from "@/core/actions/product";

const initialValues = {
  name: "",
  description: "",
  price: "",
};

type IInitialValues = typeof initialValues;

const Create: React.FC = () => {
  const { store } = useResourceStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleCreateProduct = async (
    values: IInitialValues,
    formik: FormikHelpers<IInitialValues>
  ) => {
    setIsLoading(true);
    await createProduct({ ...values, storeId: store?.id as string })
      .then((res) => {
        if (res?.ok) {
          toast.success(res?.message);
          formik.resetForm({ values: { ...initialValues } });
        } else {
          toast.error(res?.message);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const { values, errors, touched, handleChange, setFieldValue, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: handleCreateProduct,
    });

  return (
    <>
      {isLoading && <ProgressBar />}
      <form onSubmit={handleSubmit} className="flex flex-col pt-4 gap-y-5">
        <Typography variant="h6">Cadastrar produto</Typography>
        <TextField
          fullWidth
          label="Nome do produto"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={!!errors?.name && touched?.name}
          helperText={errors?.name}
        />
        <TextField
          fullWidth
          label="Descrição do produto"
          name="description"
          value={values.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          type="tel"
          label="Preço do produto"
          value={values.price}
          onChange={(ev) =>
            setFieldValue(
              "price",
              VMasker.toMoney(ev.target.value, maskerMoney)
            )
          }
          error={!!errors?.price && touched?.price}
          helperText={errors?.price}
        />
        <Button fullWidth type="submit" variant="contained">
          Cadastrar
        </Button>
      </form>
    </>
  );
};

export default Create;
