"use client";

import { useState, useEffect } from "react";
// import moment from "moment";
import { Typography } from "@mui/material";

type CountdownTimerProps = {
  data: string | null;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ data }) => {
  const [tempoRestante, setTempoRestante] = useState<string | null>(null);
  const [endCount, setEndCount] = useState<boolean>(false);

  useEffect(() => {
    const dateNow = new Date().toISOString();

    if (data && dateNow) {
      const intervalId = setInterval(() => {
        if (dateNow > data || tempoRestante === "0h 0m 0s") {
          setTempoRestante(null);
          setEndCount(true);
          clearInterval(intervalId);
          return;
        }
        setEndCount(false);
        const dataSemZ = data?.replace(/\.000Z$/, "");
        // const agora = moment().local();
        // const futuro = moment(dataSemZ).utc();
        // const diferenca = futuro.diff(agora);
        // const horas = Math.floor(diferenca / (60 * 60 * 1000));
        // const minutos = Math.floor(
        //   (diferenca % (60 * 60 * 1000)) / (60 * 1000)
        // );
        // const segundos = Math.floor((diferenca % (60 * 1000)) / 1000);
        // setTempoRestante(`${horas}h ${minutos}m ${segundos}s`);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [data, tempoRestante]);

  return (
    <>
      {tempoRestante && (
        <>
          <Typography variant="body2">Próxima fidelização em</Typography>
          <Typography variant="h6" className="font-bold !leading-4">
            {tempoRestante}
          </Typography>
        </>
      )}
      {endCount && (
        <>
          <Typography variant="body1" className="bg-emerald-200 p-2">
            Você já pode fidelizar novamente!
          </Typography>
        </>
      )}
    </>
  );
};

export default CountdownTimer;
