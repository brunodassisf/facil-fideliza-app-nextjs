"use client";

import { Typography } from "@mui/material";
import { FaHeart, FaRotate } from "react-icons/fa6";
import VMasker from "vanilla-masker";
import {
  formatDateTime,
  getTotalValueCard,
  maskerMoney,
} from "../../../../core/util";

import { UserCard } from "@/core/actions/loyalty";
import { reloadPage } from "@/core/actions/user";
import { useTag } from "@/core/context/WrapperTag";
import { Button, RenderIcon } from "@/presentation/components";
import { useEffect, useState } from "react";
import ButtonHelper from "./ButtonHelper";

type DashboardProps = {
  data: UserCard | undefined | null;
};

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const { tag } = useTag();
  const [loayltyCard, setLoyaltyCard] = useState<UserCard | null>(null);

  console.log(data);

  useEffect(() => {
    setLoyaltyCard(data as UserCard);
  }, [data]);

  const emptySquare = Array.from(
    {
      length: loayltyCard
        ? (tag?.amountLoyaltyByCard as number) - loayltyCard?.loyaltys.length
        : (tag?.amountLoyaltyByCard as number),
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
      <FaHeart style={{ color: tag?.bgColor as string }} size={40} />
    </div>
  ));

  return (
    <>
      <div className="flex gap-4 items-stretch justify-between">
        <ButtonHelper />
        <Button>
          <FaRotate size={20} onClick={() => reloadPage(tag?.tag as string)} />
        </Button>
      </div>

      {loayltyCard?.loyaltys.length === 0 && (
        <div className="my-5">
          <Typography variant="subtitle2" className="bg-yellow-300 p-2 rounded">
            Seu cartão estão vazio, compre e junte fidelizações para ganhar
            recompensas!
          </Typography>
        </div>
      )}
      <div className="mt-5">
        {loayltyCard &&
          tag?.amountLoyaltyByCard === loayltyCard?.loyaltys.length && (
            <Typography
              variant="subtitle2"
              className="bg-emerald-300 p-2 rounded text-center"
            >
              Resgate sua recompensa!
            </Typography>
          )}
        <div
          className="grid grid-cols-5 gap-1 border-2 rounded border-dashed p-3"
          style={{ borderColor: tag?.bgColor as string }}
        >
          {renderCheck}
          {renderEmpty}
        </div>
        <div className="mt-5 max-h-52 overflow-y-scroll">
          {loayltyCard?.loyaltys.map((loyalty) => (
            <div key={loyalty.id} className="mb-3 bg-gray-300 p-2 rounded-md">
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
    </>
  );
};

export default Dashboard;
