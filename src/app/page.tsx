"use client";

import { Button, Carrousel } from "@/presentation/components";
import { FaCircleUser } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

const arrCarrousel = [
  {
    img: "01",
    title: "Começando!",
    text: "Essa parte é necessária para que você crie a conta da sua loja!",
    link: "/cadastro",
    textLink: "Criar minha loja",
  },
  {
    img: "02",
    title: "Primeiro passo",
    text: "Aqui você confere quantos participantes sua loja tem cadastrados, consegue colocar sua logo. Em caso de dúvida, bastante entrar em contato conosco!",
  },
  {
    img: "03",
    title: "Menu",
    text: `No menu você acessará recursos muitos importantes para te
          ajudar, como customização, cadastrar produtos, listar seus
          produtos onde você poderá excluir ou editar eles, assim como
          fidelizar com seus participantes.`,
  },
  {
    img: "04",
    title: "Customização",
    text: `Aqui você irá configurar como sua loja aparecerá para seus
          participantes. Desde a cor de fundo do seu app, quantidade
          de fidelizações que cada cliente fará em seus cartões, tempo
          de espera entre cada fidelização e cadastrar uma recompensa
          para eles.`,
  },
  {
    img: "05",
    title: "Adicione produtos",
    text: `Aqui você irá adicionar seus produtos, eles serão usados na
          fidelização.`,
  },
  {
    img: "06",
    title: "Edite ou exclua produtos",
    text: `Você poderá editar ou excluir seus produtos.`,
  },
  {
    img: "07",
    title: "Deixando sua marca",
    text: `Adicionando sua logo você deixa a sua loja mais
          personalizada e com a sua cara para seus participantes.`,
  },
  {
    img: "08",
    title: "Agora, compartilhe",
    text: `Divulgue para seus participantes o seu link, eles poderão se
          cadastrar em sua loja e você poderá fidelizar com eles!`,
  },
  {
    img: "09",
    title: "Seus participantes",
    text: `A pessoas poderá se cadastrar e se conectar direto com sua
          loja e começaram a participar.`,
  },
  {
    img: "10",
    title: "Login do cliente",
    text: `Essa e a tela onde seu cliente poderá acompanhar os
          progressos da sua fidelização.`,
  },
  {
    img: "11",
    title: "Fidelizando",
    text: `Com sua loja customizada, seus produtos e participantes
          cadastrados, você poderá gerar uma fidelização usando o
          telefone da conta do seu cliente. Adcionando os produtos que
          eles consumiu e confirmando, você irá fidelizar a compra
          dele.`,
  },
  {
    img: "12",
    title: "Pronto!",
    text: `Agora seu participante verá as fidelizações em seu cartão.
          Podendo acompanhar até que o cartão seja preenchido. Caso ele
          fique completo você poderá recompensar ele e nisso irá gerar
          um novo cartão para ele usar novamente.`,
  },
];

const Home: React.FC = () => {
  return (
    <>
      <div className="w-full">
        <section className="h-screen flex flex-col items-center justify-center  px-4 w-full">
          <Image
            width={150}
            height={150}
            priority={true}
            src="/logo.svg"
            alt="logo"
          />
          <div className="flex flex-col items-center gap-3 mt-10">
            <h1 className="text-3xl font-semibold text-sky-900">
              Fácil fidelizar
            </h1>
            <p className="text-lg leading-5 mb-5">
              Aplicativo que conecta Lojista com seus participantes.
            </p>
            <Button component={Link} href="/login">
              <div className="flex gap-x-2">
                <FaCircleUser size={22} />
                Fazer Login
              </div>
            </Button>
            <Button component={Link} href="#sobre">
              Conheça o App
            </Button>
          </div>
        </section>
        <section id="sobre" className="h-screen px-4 bg-white pt-5">
          <h3 className="text-2xl text-center font-semibold text-sky-900 pb-5">
            Conheça o App
          </h3>
          <Carrousel>
            {arrCarrousel.map((item, index) => (
              <div key={index}>
                <div className="flex flex-col md:flex-row justify-center items-center gap-x-4">
                  <Image
                    src={`/imagens/${item.img}.png`}
                    alt="logo"
                    className=" border-4 border-sky-900/20 rounded-2xl"
                    width={200}
                    height={80}
                  />
                  <div className="mx-8 py-5 text-center md:w-72">
                    <h3 className="text-lg font-semibold leading-5 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-4 text-justify">
                      {item.text}
                    </p>
                    {item.link && (
                      <div className="mt-5">
                        <Button component={Link} href={item.link}>
                          {item.textLink}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Carrousel>
        </section>
      </div>
    </>
  );
};

export default Home;
