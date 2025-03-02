"use client";

import { UserCard } from "@/core/actions/loyalty";
import { useTag } from "@/core/context/WrapperTag";
import { HistoryLoyalty } from "@/core/type";
import { formatDateTime } from "@/core/util";
import { Button } from "@/presentation/components";
import { Dialog, Typography } from "@mui/material";

import { useState } from "react";
import { FaX } from "react-icons/fa6";

type HistoryProps = {
  data: UserCard[] | undefined;
};

const History: React.FC<HistoryProps> = ({ data }) => {
  const { tag } = useTag();
  const [selectDatailLoayalty, setSelectDatailLoayalty] = useState<
    HistoryLoyalty[] | null | undefined
  >(null);

  const handleCloseModal = (): void => {
    setSelectDatailLoayalty(null);
  };

  return (
    <>
      <div className="mt-5">
        <div className="my-5 max-h-80 overflow-y-scroll pb-5">
          {data && data?.length > 0 ? (
            data?.map((loyaltyCard) => (
              <div key={loyaltyCard?.id} className="border-2 rounded mb-2 p-2">
                <div className="flex flex-col gap-y-4">
                  <div>
                    <Typography variant="subtitle2">
                      Iniciado em
                      <span className="text-stone-600 ml-1">
                        {formatDateTime(loyaltyCard?.createdAt.toString())}
                      </span>
                    </Typography>
                    <Typography variant="subtitle2">
                      Finalizado em
                      <span className="text-stone-600 ml-1">
                        {formatDateTime(loyaltyCard?.nextLoyalty?.toString())}
                      </span>
                    </Typography>
                    <Typography variant="caption">
                      Número de fidelizações
                      <span className="text-stone-600 ml-1">
                        {loyaltyCard?.amount}
                      </span>
                    </Typography>
                    <Typography variant="caption" className="block pt-4">
                      Recompensa resgatada:
                      <span className="text-stone-600 block">
                        {loyaltyCard?.reward}
                      </span>
                    </Typography>
                  </div>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() =>
                      setSelectDatailLoayalty(loyaltyCard?.loyaltys)
                    }
                  >
                    Detalhe
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <Typography
              variant="subtitle2"
              className="bg-yellow-200 p-2 rounded"
            >
              Você ainda não possui cartões completados, compre e comece já!
            </Typography>
          )}
        </div>
      </div>

      <Dialog
        open={!!selectDatailLoayalty}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <div className="p-3 pt-12 relative">
          <FaX className="absolute top-4 right-4" onClick={handleCloseModal} />
          <Typography className="pb-4 !leading-4" variant="subtitle2">
            Você fidelizou com
            <span className="text-tag ml-1">{tag?.name}</span>,
            <span className="text-tag ml-1">
              {selectDatailLoayalty?.length} vezes
            </span>
            <span></span>
          </Typography>

          {selectDatailLoayalty?.map((item) => (
            <div key={item.id} className="border-2 rounded mb-2 p-2">
              <Typography variant="body2">
                Data da compra
                <span className="block">
                  {formatDateTime(item?.createdAt.toString())}
                </span>
              </Typography>
              <div className="mt-2">
                {item.LoyaltyItems.map((product) => (
                  <div key={product.id}>
                    <Typography variant="subtitle2" className="truncate">
                      {product.amount} x {product.product.name}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Dialog>
    </>
  );
};

export default History;
