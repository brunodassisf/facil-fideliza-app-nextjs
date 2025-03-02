"use client";

import { TextField, Typography } from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import VMasker from "vanilla-masker";

import {
  deleteProduct,
  IUpdateProduct,
  ListProductDto,
  updateProduct,
} from "@/core/actions/product";
import { useResourceStore } from "@/core/context/WrapperStore";
import {
  Button,
  ProgressBar,
  RenderIcon,
  Select,
} from "@/presentation/components";
import { Product } from "@prisma/client";
import { IOpions } from "../../../../core/type";
import { maskerMoney } from "../../../../core/util";
import { createProductSchema as validationSchema } from "../../../../core/validation";

const initialValues = {
  id: "",
  name: "",
  description: "",
  price: 0,
  type: null,
};
type ListProps = {
  data: ListProductDto[] | null;
};

const List: React.FC<ListProps> = ({ data }) => {
  const { store } = useResourceStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectProduct, setSelectProduct] = useState<string | null>(null);
  const [products, setProducts] = useState<IOpions[] | null>(null);

  useEffect(() => {
    if (data) {
      setProducts(
        data?.map((item) => ({
          label: item.name,
          value: item.id,
          data: item,
        }))
      );
    }
  }, [data]);

  const handleUpdated = async (
    values: IUpdateProduct,
    formikHelpers: FormikHelpers<IUpdateProduct>
  ) => {
    setIsLoading(true);
    await updateProduct({ ...values, storeId: store?.id as string })
      .then((res) => {
        if (res?.ok) {
          toast.success(res?.message);
          setSelectProduct(null);
          formikHelpers.resetForm({ values: { ...initialValues } });
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
      onSubmit: handleUpdated,
    });

  useEffect(() => {
    if (selectProduct && products) {
      const initial = products?.find((item) => item.value === selectProduct)
        ?.data as Product;
      setFieldValue("id", initial?.id);
      setFieldValue("name", initial?.name);
      setFieldValue("description", initial?.description);
      setFieldValue(
        "price",
        VMasker.toMoney(initial?.price as number, maskerMoney)
      );
      setFieldValue("type", initial?.type);
    }
  }, [selectProduct, products, setFieldValue]);

  const handleDeleteProduct = async () => {
    setIsLoading(true);
    await deleteProduct(values.id as string)
      .then((res) => {
        if (res?.ok) {
          toast.success(res?.message);
          setSelectProduct(null);
        } else {
          toast.error(res?.message);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const typeOptions: IOpions[] = [
    { label: "Produto", value: "PRODUCT" },
    { label: "Serviço", value: "SERVICE" },
  ];

  return (
    <>
      {isLoading ? <ProgressBar /> : null}
      <div className="flex flex-col gap-y-2 mt-2">
        <Typography variant="h6" className="p-1">
          Meus produtos/serviços
        </Typography>
        {products && products?.length > 0 ? (
          <Select
            label="Buscar"
            value={selectProduct}
            options={products || []}
            onChange={(_name, value) => setSelectProduct(value)}
          />
        ) : (
          <Typography variant="body1" className="p-1">
            Você não possui produtos cadastrados no momento.
          </Typography>
        )}
      </div>
      {selectProduct && (
        <>
          <div className="border-2 border-stone-300 rounded px-4 pb-4 pt-5 mt-4">
            <h6 className="pb-4 font-bold">Excluir/Editar</h6>
            {products &&
              products
                .filter((f) => f.value === selectProduct)
                .map((item) => {
                  return (
                    <form
                      key={item.label}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-y-7"
                    >
                      <RenderIcon icon={values.type} />
                      <TextField
                        fullWidth
                        label="Nome"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        error={!!errors?.name && touched?.name}
                      />
                      <TextField
                        fullWidth
                        label="Descrição"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
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
                      <Select
                        label="Tipo"
                        name="type"
                        value={values.type}
                        options={typeOptions}
                        onChange={(name, value) => setFieldValue(name, value)}
                      />
                      <div className="flex justify-center gap-4">
                        <Button
                          fullWidth
                          variant="outlined"
                          color="error"
                          type="button"
                          onClick={handleDeleteProduct}
                        >
                          Excluir
                        </Button>
                        <Button fullWidth variant="contained" type="submit">
                          Salvar
                        </Button>
                      </div>
                    </form>
                  );
                })}
          </div>
        </>
      )}
    </>
  );
};

export default List;
