import { ListProduct } from "../actions/loyalty";

export const isEmptyObject = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

export const maskerMoney = {
  precision: 2,
  separator: ",",
  delimiter: ".",
  unit: "R$",
};

function removeAccents(val: string) {
  return val.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function formatarStringToTag(val: string) {
  return removeAccents(val)
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase()
    .replace(/-+/g, "-");
}

export async function getDateTimeInTimezone(hoursToAdd = 0) {
  const now = new Date();
  const options = {
    timeZone: "America/Sao_Paulo",
    year: "numeric" as const,
    month: "2-digit" as const,
    day: "2-digit" as const,
    hour: "2-digit" as const,
    minute: "2-digit" as const,
    second: "2-digit" as const,
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat("pt-BR", options);
  const parts = formatter.formatToParts(now);

  // Extraindo as partes da data e hora
  const year = parseInt(
    parts.find((part) => part.type === "year")?.value || "0",
    10
  );
  const month =
    parseInt(parts.find((part) => part.type === "month")?.value || "1", 10) - 1; // Mês começa em 0 no JavaScript
  const day = parseInt(
    parts.find((part) => part.type === "day")?.value || "1",
    10
  );
  const hour = parseInt(
    parts.find((part) => part.type === "hour")?.value || "0",
    10
  );
  const minute = parseInt(
    parts.find((part) => part.type === "minute")?.value || "0",
    10
  );
  const second = parseInt(
    parts.find((part) => part.type === "second")?.value || "0",
    10
  );

  const dateTime = new Date(Date.UTC(year, month, day, hour, minute, second));

  dateTime.setUTCHours(dateTime.getUTCHours() + hoursToAdd);

  return dateTime;
}

export function getValueByAmount(amount: number, price: number) {
  return amount * price;
}

interface Item {
  price?: number;
  amount?: number;
}

export function getTotalValue(list: unknown[]) {
  return list.reduce((acc: number, item: unknown) => {
    const { price = 0, amount = 0 } = item as Item;
    return acc + getValueByAmount(amount, price);
  }, 0);
}

export function getTotalValueCard(list: ListProduct[]) {
  return list.reduce((acc, item) => {
    return acc + getValueByAmount(item.product.price, item.amount);
  }, 0);
}

export function formatPhoneString(telefone: string) {
  return telefone.replace(/[ ()-]/g, "");
}

export function formatDateTime(dateString: string | Date | undefined) {
  const date = new Date(dateString as string);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Mês começa em 0
  const year = date.getUTCFullYear();

  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
}
