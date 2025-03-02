"use client";

import { Modal, Typography } from "@mui/material";
import { FaHeart, FaRotate, FaX } from "react-icons/fa6";
import VMasker from "vanilla-masker";

import {
  formatDateTime,
  getTotalValueCard,
  maskerMoney,
} from "../../../core/util";

import { UserCard } from "@/core/actions/loyalty";
import { reloadPage } from "@/core/actions/user";
import { Button, RenderIcon } from "@/presentation/components";
import { useState } from "react";
import { useResourceStore } from "@/core/context/WrapperStore";
import StoreLogo from "@/presentation/components/StoreLogo";

const staticData: UserCard = {
  id: "67c4bc716518dc42ca5e84a3",
  active: true,
  clientId: "67c4bc716518dc42ca5e84a2",
  amount: 1,
  reward: null,
  createdAt: new Date("2025-03-02T13:15:45.000Z"),
  nextLoyalty: new Date("2025-03-02T20:44:30.024Z"),
  loyaltys: [
    {
      id: "67c4c32d6518dc42ca5e84a6",
      loyaltyCardId: "67c4bc716518dc42ca5e84a3",
      createdAt: new Date("2025-03-02T13:44:29.000Z"),
      LoyaltyItems: [
        {
          id: "67c4c32d6518dc42ca5e84a7",
          productId: "67c4beb16518dc42ca5e84a5",
          loyaltyId: "67c4c32d6518dc42ca5e84a6",
          amount: 2,
          name: "Camiseta G",
          description: "Tamanho G",
          price: 2500,
          type: "PRODUCT",
          createdAt: new Date("2025-03-02T20:44:29.991Z"),
          product: {
            id: "67c4beb16518dc42ca5e84a5",
            storeId: "67b916573264360cba4649eb",
            name: "Camiseta G",
            description: "Tamanho G",
            price: 2500,
            type: "PRODUCT",
            updateAt: new Date("2025-03-02T20:25:21.800Z"),
          },
        },
      ],
    },
  ],
};

const ViewCard: React.FC = () => {
  const { store } = useResourceStore();
  const [loayltyCard] = useState<UserCard | null>(staticData);
  const [open, setOpen] = useState<boolean>(false);

  const emptySquare = Array.from(
    {
      length: loayltyCard
        ? (store?.amountLoyaltyByCard as number) - loayltyCard?.loyaltys.length
        : (store?.amountLoyaltyByCard as number),
    },
    (_, index) => ({
      key: index,
    })
  );

  const checkSquare = Array.from(
    { length: loayltyCard?.loyaltys.length || 0 },
    (_, index) => ({
      key: index,
    })
  );

  const renderEmpty = emptySquare.map(({ key }) => (
    <div key={key} className=" flex justify-center items-center">
      <FaHeart className="text-stone-400" size={40} />
    </div>
  ));

  const renderCheck = checkSquare.map(({ key }) => (
    <div key={key} className="flex justify-center items-center ">
      <FaHeart style={{ color: store?.bgColor as string }} size={40} />
    </div>
  ));

  const toggleModal = () => setOpen(!open);

  return (
    <>
      <Button onClick={toggleModal}>Open modal</Button>
      <Modal
        open={open}
        onClose={toggleModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="bg-tag px-4 m-5 rounded-lg overflow-y-scroll h-full">
          <div className="text-tag bg-tag p-3 flex justify-center rounded-b-md">
            <div className="flex items-center gap-5">
              <FaX size={16} onClick={toggleModal} />
              Fechar exemplo
            </div>
          </div>
          <div className="flex justify-between items-start pt-5 pb-10">
            <div>
              <Typography variant="h6">
                Bem-vindo,
                <span className="block text-2xl leading-5">
                  {store?.name || ""}
                </span>
              </Typography>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center mb-5">
            <StoreLogo />
            <Typography
              variant="subtitle1"
              className="!font-bold pt-3 rounded break-normal"
            ></Typography>
          </div>

          <div className="bg-white h-full rounded-t-lg pt-4 px-4 overflow-y-scroll text-stone-900 pb-5">
            <div className="flex gap-4 items-stretch justify-between">
              <Button>
                <FaRotate
                  size={20}
                  onClick={() => reloadPage(store?.tag as string)}
                />
              </Button>
            </div>

            {loayltyCard?.loyaltys.length === 0 && (
              <div className="my-5">
                <Typography
                  variant="subtitle2"
                  className="bg-yellow-300 p-2 rounded"
                >
                  Você ainda não possui fidelizações, compre e comece já!
                </Typography>
              </div>
            )}
            <div className="mt-5">
              {loayltyCard &&
                store?.amountLoyaltyByCard === loayltyCard?.loyaltys.length && (
                  <Typography
                    variant="subtitle2"
                    className="bg-emerald-300 p-2 rounded text-center"
                  >
                    Resgate sua recompensa!
                  </Typography>
                )}
              <div
                className="grid grid-cols-5 gap-1 border-2 rounded border-dashed p-3"
                style={{ borderColor: store?.bgColor as string }}
              >
                {renderCheck}
                {renderEmpty}
              </div>
              <div className="mt-5 max-h-52 overflow-y-scroll">
                {loayltyCard?.loyaltys.map((loyalty) => (
                  <div
                    key={loyalty.id}
                    className="mb-3 bg-gray-300 p-2 rounded-md"
                  >
                    <div>
                      <Typography variant="caption">
                        {formatDateTime(loyalty.createdAt.toString())}
                      </Typography>
                      {loyalty.LoyaltyItems.map((product) => (
                        <div
                          key={product.id}
                          className="mt-2 bg-slate-100 p-2 rounded-lg"
                        >
                          <Typography variant="body2" className="truncate">
                            {product.amount} x {product.product.name}
                          </Typography>
                          <div className="flex items-center justify-between gap-1">
                            <RenderIcon icon={product.product.type} />

                            {VMasker.toMoney(
                              product.product.price * product.amount,
                              maskerMoney
                            )}
                          </div>
                        </div>
                      ))}
                      <div className="pr-2 mt-2">
                        <Typography variant="body1" className="text-end">
                          <strong>
                            {VMasker.toMoney(
                              getTotalValueCard(loyalty.LoyaltyItems),
                              maskerMoney
                            )}
                          </strong>
                        </Typography>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewCard;
