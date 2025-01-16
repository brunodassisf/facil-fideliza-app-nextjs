"use client";

import { Textarea } from "@mui/joy";
import { Divider, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { MuiColorInput } from "mui-color-input";
import { useState } from "react";
import VMasker from "vanilla-masker";

import { customizeSchema as validationSchema } from "../../../core/validation";
import {
  Button,
  ProgressBar,
  ShareLink,
} from "../../../presentation/components";
import { updateStore } from "@/core/actions/store";
import { toast } from "react-toastify";
import { useResourceStore } from "@/core/context/WrapperStore";

const Customize: React.FC = () => {
  const { store, setData } = useResourceStore();

  const initialValues = {
    bgColor: store?.bgColor || "",
    textColor: store?.textColor || "",
    amountLoyaltyByCard: store?.amountLoyaltyByCard || "",
    cooldown: store?.cooldown || "0",
    reward: store?.reward || "",
  };

  type IInitialValues = typeof initialValues;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSaveCostumize = async (values: IInitialValues) => {
    setIsLoading(true);

    const formatAmountLoyaltyByCard = parseInt(
      values.amountLoyaltyByCard as string,
      10
    );
    const formatCooldown = parseInt(values.cooldown as string, 10);

    await updateStore(store?.id as string, {
      ...values,
      amountLoyaltyByCard: formatAmountLoyaltyByCard,
      cooldown: formatCooldown,
    })
      .then((res) => {
        toast.success(res?.message);
      })
      .finally(() => setIsLoading(false));
  };

  const { values, errors, touched, handleChange, setFieldValue, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: handleSaveCostumize,
    });

  return (
    <>
      {isLoading && <ProgressBar />}
      <div className="p-3">
        <Typography variant="h6" className="">
          Customização
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
          <MuiColorInput
            fullWidth
            format="hex"
            value={values.bgColor}
            onChange={(value) => {
              setFieldValue("bgColor", value);
              setData({
                ...store,
                bgColor: value,
                Products: store?.Products ?? null,
              });
            }}
            error={touched.bgColor && Boolean(errors.bgColor)}
            helperText={touched.bgColor && errors.bgColor}
          />
        </div>
        <div>
          <Typography variant="body2" className="pb-4">
            Escolha a cor do texto da sua loja
          </Typography>
          <MuiColorInput
            fullWidth
            format="hex"
            value={values.textColor}
            onChange={(value) => {
              setFieldValue("textColor", value);
              setData({
                ...store,
                textColor: value,
                Products: store?.Products ?? null,
              });
            }}
            error={touched.textColor && Boolean(errors.textColor)}
            helperText={touched.textColor && errors.textColor}
          />
        </div>
        <div>
          <Typography variant="body2" className="pb-4">
            Escolha a quantidade de fidelização que seu cliente pode fazer em
            cada cartão.
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
        <div>
          <Typography variant="body2" className="pb-4">
            Aqui você define quantas horas seu cliente vai ter que esperar até
            pode fidelizar novamente, por exemplo: 8 horas, você irá esperar 8
            horas para poder marcar o cartão dele novamente.
          </Typography>
          <TextField
            fullWidth
            label="Tempo de espera (em horas)"
            value={values.cooldown}
            name="cooldown"
            onChange={(ev) =>
              setFieldValue(
                "cooldown",
                VMasker.toPattern(ev.target.value, "99")
              )
            }
            error={touched.cooldown && Boolean(errors.cooldown)}
            helperText={touched.cooldown && errors.cooldown}
          />
        </div>
        <div>
          <Typography variant="body2" className="pb-4">
            Digite a recompensa que seu cliente receberá ao completar um cartão.
            Exemplo: Um brinde ________..., um produto com desconto de __%
          </Typography>
          <Textarea
            minRows={4}
            placeholder="Um produto ou serviço com desconto, um produto ou serviço gratuito ..."
            value={values.reward}
            name="reward"
            onChange={handleChange}
            error={touched.reward && Boolean(errors.reward)}
          />
        </div>
        <Button fullWidth type="submit" variant="contained">
          Salvar
        </Button>
      </form>
    </>
  );
};

export default Customize;
