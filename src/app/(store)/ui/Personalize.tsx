"use client";

import { Divider, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import InputColor from "react-input-color";
import VMasker from "vanilla-masker";

import { updateStore } from "@/core/actions/store";
import { useResourceStore } from "@/core/context/WrapperStore";
import { toast } from "react-toastify";
import { personalizeSchema as validationSchema } from "../../../core/validation";
import {
  Button,
  ProgressBar,
  ShareLink,
} from "../../../presentation/components";

const Personalize: React.FC = () => {
  const { store, setData } = useResourceStore();

  const initialValues = {
    bgColor: store?.bgColor || "",
    textColor: store?.textColor || "",
    amountLoyaltyByCard: store?.amountLoyaltyByCard || "",
  };

  type IInitialValues = typeof initialValues;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSaveCostumize = async (values: IInitialValues) => {
    setIsLoading(true);

    const formatAmountLoyaltyByCard = parseInt(
      values.amountLoyaltyByCard as string,
      10
    );
    console.log(values);

    await updateStore(store?.id as string, {
      ...values,
      amountLoyaltyByCard: formatAmountLoyaltyByCard,
    })
      .then((res) => {
        if (res?.ok) {
          toast.success(res?.message);
        } else {
          toast.error(res?.message);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const { values, errors, touched, setFieldValue, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSaveCostumize,
  });

  return (
    <>
      {isLoading && <ProgressBar />}
      <div className="p-3">
        <Typography variant="h6" className="">
          Personalizar
        </Typography>
      </div>
      <Divider />
      <div className="pt-2 px-2 pb-5">
        <Typography variant="subtitle2" className="!leading-5">
          Aqui você irá configurar como sua fidelização irá funcionar
        </Typography>
      </div>
      <ShareLink />
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-8 mt-2">
        <div>
          <Typography variant="body2" className="pb-4">
            Escolha a cor de fundo da sua loja
          </Typography>
          <div className="flex gap-2 items-start">
            <InputColor
              initialValue={values?.bgColor || "#83cbff"}
              onChange={(color) => {
                const modifiedColor = color.hex.slice(0, -2) + "ff";
                setFieldValue("bgColor", modifiedColor);
                setData({
                  ...store,
                  bgColor: modifiedColor,
                  Products: store?.Products ?? null,
                });
              }}
              placement="right"
            />
            <div className="border border-gray-300 rounded-md py-1 px-3">
              <Typography variant="body2">{values.bgColor}</Typography>
            </div>
          </div>
        </div>
        <div>
          <Typography variant="body2" className="pb-4">
            Escolha a cor do texto da sua loja
          </Typography>
          <div className="flex gap-2 items-start">
            <InputColor
              initialValue={values?.textColor || "#000000"}
              onChange={(color) => {
                const modifiedColor = values?.textColor
                  ? color.hex.slice(0, -2) + "ff"
                  : "#000000";
                setFieldValue("textColor", modifiedColor);
                setData({
                  ...store,
                  textColor: modifiedColor,
                  Products: store?.Products ?? null,
                });
              }}
              placement="right"
            />
            <div className="border border-gray-300 rounded-md py-1 px-3">
              <Typography variant="body2">{values.textColor}</Typography>
            </div>
          </div>
        </div>
        <div>
          <Typography variant="body2" className="pb-4">
            Escolha a quantidade de fidelização que seu participante pode fazer
            em cada cartão.
          </Typography>
          <TextField
            fullWidth
            label="Fidelizações"
            value={values.amountLoyaltyByCard}
            name="amountLoyaltyByCard"
            onChange={(ev) =>
              setFieldValue(
                "amountLoyaltyByCard",
                VMasker.toPattern(ev.target.value, "999")
              )
            }
            error={
              touched.amountLoyaltyByCard && Boolean(errors.amountLoyaltyByCard)
            }
            helperText={
              touched.amountLoyaltyByCard && errors.amountLoyaltyByCard
            }
          />
        </div>
        {/* <div className="border rounded-md p-3">
          <Typography variant="body2" className="pb-4">
            Vizualize o exemplo da sua loja que será exibida para seus
            participantes
          </Typography>
          <ViewCard />
        </div> */}
        <Button fullWidth type="submit" variant="contained">
          Salvar
        </Button>
      </form>
    </>
  );
};

export default Personalize;
