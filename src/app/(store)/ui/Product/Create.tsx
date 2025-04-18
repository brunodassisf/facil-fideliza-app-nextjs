"use client";

import { TextField, Typography } from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import VMasker from "vanilla-masker";
import { createProductSchema as validationSchema } from "../../../../core/validation";

import { createProduct, IBeforeCreateProduct } from "@/core/actions/product";
import { useResourceStore } from "@/core/context/WrapperStore";
import { IOpions } from "@/core/type";
import { Button, ProgressBar, Select } from "@/presentation/components";
import { maskerMoney } from "../../../../core/util";

const initialValues = {
  name: "",
  description: "",
  price: 0,
  type: null,
};

const Create: React.FC = () => {
  const { store } = useResourceStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleCreateProduct = async (
    values: IBeforeCreateProduct,
    formik: FormikHelpers<IBeforeCreateProduct>
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

  const typeOptions: IOpions[] = [
    { label: "Produto", value: "PRODUCT" },
    { label: "Serviço", value: "SERVICE" },
  ];

  return (
    <>
      {isLoading && <ProgressBar />}
      <form onSubmit={handleSubmit} className="flex flex-col pt-4 gap-y-5">
        <Typography variant="h6">Cadastrar produto/serviço</Typography>
        <TextField
          fullWidth
          label="Nome"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={!!errors?.name && touched?.name}
          helperText={errors?.name}
        />
        <TextField
          fullWidth
          label="Descrição"
          name="description"
          value={values.description}
          onChange={handleChange}
        />
        <Select
          label="Tipo"
          name="type"
          value={values.type}
          options={typeOptions}
          onChange={(name, value) => setFieldValue(name, value)}
          error={!!errors?.type && touched?.type ? errors.type : ""}
        />
        <TextField
          fullWidth
          type="tel"
          label="Preço"
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
