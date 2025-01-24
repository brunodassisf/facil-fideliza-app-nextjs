import * as yup from "yup";
import VMasker from "vanilla-masker";

export const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Nome obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres"),
  phone: yup
    .string()
    .trim()
    .required("Telefone obrigatório")
    .test("testPhone", "Telefone inválido", (value) => {
      const num = VMasker.toNumber(value);
      if (num.length === 11) {
        return true;
      }
      return false;
    }),
  email: yup
    .string()
    .trim()
    .required("E-mail obrigatório")
    .email("E-mail inválido"),
  password: yup
    .string()
    .trim()
    .required("Senha obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas devem ser iguais")
    .required("Confirme sua senha"),
  isChecked: yup
    .bool()
    .required("Aceite os termos de uso")
    .oneOf([true], "Aceite os termos de uso"),
});

export const signIpSchema = yup.object().shape({
  phone: yup
    .string()
    .trim()
    .required("Telefone obrigatório")
    .test("testPhone", "Telefone inválido", (value) => {
      const num = VMasker.toNumber(value);
      if (num.length === 11) {
        return true;
      }
      return false;
    }),
  password: yup
    .string()
    .trim()
    .required("Senha obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const customizeSchema = yup.object().shape({
  bgColor: yup
    .string()
    .trim()
    .required("Nome obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .test("hexColorValid", "Cor inválida", (value) => {
      const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      return hexRegex.test(value);
    }),
  textColor: yup
    .string()
    .trim()
    .required("Nome obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .test("hexColorValid", "Cor inválida", (value) => {
      const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      return hexRegex.test(value);
    }),
  amountLoyaltyByCard: yup
    .string()
    .min(1, "Quantidade obrigatória")
    .required("Preço obrigatório"),
  cooldown: yup
    .string()
    .min(1, "Tempo de espera obrigatória")
    .required("Tempo de espera obrigatório"),
  reward: yup
    .string()
    .trim()
    .min(1, "Recompensa obrigatória")
    .required("Recompensa obrigatório"),
});

export const createProductSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Nome obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres"),
  price: yup
    .string()
    .trim()
    .required("Preço obrigatório")
    .test("testPhone", "Preço inválido", (value) => {
      const num = VMasker.toNumber(value);
      if (num === "000") {
        return false;
      }
      return true;
    }),
});
