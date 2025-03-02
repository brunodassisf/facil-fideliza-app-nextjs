"use client";

import { Textarea } from "@mui/joy";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import VMasker from "vanilla-masker";

import { createLoyalty, updateLoyaltyCard } from "@/core/actions/loyalty";
import { searchClient, SearchInfo } from "@/core/actions/user";
import { useResourceStore } from "@/core/context/WrapperStore";
import { Button, ProgressBar, RenderIcon } from "@/presentation/components";
import { Product } from "@prisma/client";
import Link from "next/link";
import { FaMinus, FaPlus, FaTrash, FaXmark } from "react-icons/fa6";
import {
  getTotalValue,
  getValueByAmount,
  maskerMoney,
} from "../../../core/util";

export type ProductLoaylty = Product & { amount: number };

const Loyalty: React.FC = () => {
  const { store } = useResourceStore();
  const [phone, setSelectPhone] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [client, setClient] = useState<SearchInfo | null>(null);
  const [reward, setReward] = useState<string>(store?.reward || "");
  const [listProductsLoaylty, setListProductsLoaylty] = useState<
    ProductLoaylty[]
  >([]);

  const handleSearchClient = async () => {
    setIsLoading(true);
    await searchClient(store?.id as string, phone)
      .then((res) => {
        if (res?.ok) {
          setClient(res.data as SearchInfo);
        } else {
          toast.error(res?.message);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const handleListProdutsByLoyalty = (value: Product) => {
    setListProductsLoaylty([...listProductsLoaylty, { ...value, amount: 1 }]);
  };

  const handleIncreaseAmount = (id: string) => {
    setListProductsLoaylty(
      listProductsLoaylty.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      )
    );
  };

  const handleDecreaseAmount = (id: string) => {
    setListProductsLoaylty(
      listProductsLoaylty.map((item) =>
        item.id === id ? { ...item, amount: item.amount - 1 } : item
      )
    );
  };

  const handleRemoveProductLoaylty = (id: string) => {
    setListProductsLoaylty(
      listProductsLoaylty.filter((item) => item.id !== id)
    );
  };

  const handleCreateLoyalty = async () => {
    setIsLoading(true);

    await createLoyalty({
      clientId: client?.Client?.id as string,
      storeId: store?.id as string,
      products: listProductsLoaylty,
    })
      .then((res) => {
        if (res?.ok) {
          handleChangeClient();
          setConfirm(false);
          setSelectPhone("");
          toast.success(res?.message);
        } else {
          toast.error(res?.message);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const handleToggleCofirm = (): void => {
    setConfirm(!confirm);
  };

  const handleChangeClient = (): void => {
    setClient(null);
    setListProductsLoaylty([]);
  };

  const handleCompleteLoyaltyCard = async () => {
    setIsLoading(true);

    await updateLoyaltyCard({
      id: store?.id as string,
      clientId: client?.Client?.id as string,
      reward,
    })
      .then((res) => {
        if (res?.ok) {
          handleChangeClient();
          setConfirm(false);
          setSelectPhone("");
          toast.success(res?.message);
        } else {
          toast.error(res?.message);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {isLoading && <ProgressBar />}
      <div>
        <Typography variant="h6">Fidelizar participante</Typography>
        <div className="mt-3">
          {client ? (
            <>
              <div className="relative flex flex-col gap-y-2 border-2 border-stone-400">
                <FaXmark
                  size={22}
                  onClick={handleChangeClient}
                  className="absolute -right-0.5 -top-6 border-2 border-b-0 border-stone-500 rounded-t-md bg-stone-500 text-white"
                />
                <Typography className="p-1 pb-0">
                  Nome: {client?.Client?.name}
                </Typography>
                <Divider className="bg-stone-500" />
                <Typography className="p-1">
                  Telefone:{" "}
                  {VMasker.toPattern(
                    client?.phone as string,
                    "(99) 99999-9999"
                  )}
                </Typography>
              </div>
              {client.rewardReady ? (
                <div className="mt-5 flex flex-col gap-y-3">
                  <div>
                    <Typography className="py-4 !leading-5" variant="body1">
                      Essa é a recompensa para seu participante, caso queira
                      você pode alterar ela antes de confirmar a recompensa para
                      ele.
                    </Typography>
                    <Textarea
                      minRows={4}
                      placeholder="Recompensa"
                      value={reward}
                      name="reward"
                      onChange={(ev) => setReward(ev.target.value)}
                    />
                  </div>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleCompleteLoyaltyCard}
                  >
                    Confirmar recompensa
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mt-4">
                    {store?.Products && store?.Products?.length > 0 ? (
                      <>
                        <Typography
                          variant="subtitle2"
                          className="border-b border-stone-400 py-2 mb-2"
                        >
                          Selecione os produtos/serviços da compra
                        </Typography>
                        <div className="max-h-60 overflow-y-scroll divide-y bg-emerald-200">
                          {store?.Products.filter((item) => {
                            if (listProductsLoaylty.length > 0) {
                              return !listProductsLoaylty.some(
                                (loayltyProduct) =>
                                  item.id === loayltyProduct.id
                              );
                            }
                            return item;
                          }).map((item) => (
                            <div
                              key={item.id}
                              className="p-2 hover:bg-stone-200 truncate cursor-pointer"
                              onClick={() =>
                                handleListProdutsByLoyalty(item as Product)
                              }
                            >
                              <>
                                <span className="ml-2 font-bold">
                                  {item.name}
                                </span>
                                <RenderIcon icon={item.type} />
                              </>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Typography
                        variant="subtitle2"
                        className="bg-yellow-200 p-2"
                      >
                        Você não tem produtos cadastrados para prosseguir,
                        cadastre seus produtos
                        <Link
                          href="/loja/cadastrar-produto"
                          className="underline text-blue-700 ml-1"
                        >
                          aqui
                        </Link>
                      </Typography>
                    )}
                  </div>
                  {listProductsLoaylty.map((item) => (
                    <div
                      key={item.id}
                      className="border border-stone-400 p-2 mb-4"
                    >
                      <div className="flex justify-start mr-4 relative font-bold">
                        {item.amount}
                        <div className="w-full">
                          <span className="truncate ml-0.5">x {item.name}</span>
                          <div className="flex justify-between">
                            <div className="flex items-center gap-4 mt-2">
                              <FaPlus
                                className="text-green-600"
                                onClick={() => handleIncreaseAmount(item.id)}
                              />
                              <FaMinus
                                className="text-blue-600"
                                onClick={() =>
                                  item.amount !== 1
                                    ? handleDecreaseAmount(item.id)
                                    : undefined
                                }
                              />
                            </div>
                            <RenderIcon icon={item.type} />
                          </div>
                        </div>
                        <FaTrash
                          className="text-red-600 absolute -right-5 cursor-pointer"
                          onClick={() => handleRemoveProductLoaylty(item.id)}
                        />
                      </div>
                    </div>
                  ))}
                  {listProductsLoaylty.length > 0 && (
                    <Button
                      fullWidth
                      type="button"
                      variant="contained"
                      onClick={handleToggleCofirm}
                    >
                      Fidelizar
                    </Button>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {store?.ready ? (
                <div className="flex flex-col gap-y-5">
                  <TextField
                    fullWidth
                    type="tel"
                    label="Telefone do participante"
                    value={phone}
                    onChange={(ev) =>
                      setSelectPhone(
                        VMasker.toPattern(ev.target.value, "(99) 99999-9999")
                      )
                    }
                  />
                  <Button
                    fullWidth
                    type="button"
                    variant="contained"
                    onClick={handleSearchClient}
                  >
                    Buscar
                  </Button>
                </div>
              ) : (
                <Typography variant="body1" className="text-justify">
                  Antes de fidelizar, você deve cadastrar sua loja. Acessando o
                  <Link
                    href="/loja/customizar"
                    className="underline mx-1 text-blue-800 font-bold"
                  >
                    aqui
                  </Link>
                  , você irá configurar como sua loja deve funcionar e será
                  vista pelos seus participantes.
                </Typography>
              )}
            </>
          )}
        </div>
      </div>
      <Dialog
        open={confirm}
        onClose={handleToggleCofirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirme a fidelização para seu participante
        </DialogTitle>
        <DialogContent>
          {client && (
            <div id="alert-dialog-description">
              <Typography>
                Nome do participante:
                <strong>{client?.Client?.name as string}</strong>
              </Typography>
              <Typography>
                Telefone:
                <strong className="ml-1">
                  {VMasker.toPattern(
                    client?.phone as string,
                    "(99) 99999-9999"
                  )}
                </strong>
              </Typography>
              <Typography className="pt-2">
                Compras realizada:
                <strong className="ml-1">{listProductsLoaylty.length}</strong>
              </Typography>
              <div className="mt-1 divide-y-2 max-h-60 overflow-y-scroll">
                {listProductsLoaylty.map((item) => (
                  <div key={item.id} className="pb-1">
                    <Typography variant="subtitle1" className="flex">
                      {item.amount}
                      <span className="truncate ml-0.5">x {item.name}</span>
                    </Typography>
                    <div className="w-full flex justify-between items-center">
                      <RenderIcon icon={item.type} />
                      <strong>
                        {VMasker.toMoney(
                          getValueByAmount(item.price, item.amount),
                          maskerMoney
                        )}
                      </strong>
                    </div>
                  </div>
                ))}
                <div className="w-full text-end">
                  <Typography className="pt-2">
                    Total:
                    <strong className="ml-1">
                      {VMasker.toMoney(
                        getTotalValue(listProductsLoaylty),
                        maskerMoney
                      )}
                    </strong>
                  </Typography>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToggleCofirm} color="error">
            Cancelar
          </Button>
          <Button
            onClick={handleCreateLoyalty}
            color="success"
            variant="contained"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Loyalty;
