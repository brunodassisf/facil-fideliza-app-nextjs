"use client";

import { Button, Carrousel } from "@/presentation/components";
import Image from "next/image";
import Link from "next/link";
import { FaCircleUser, FaGifts, FaWhatsapp } from "react-icons/fa6";

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
          ajudar, como personalizar seu site, cadastrar produtos, listar seus
          produtos onde você poderá excluir ou editar eles, assim como
          fidelizar com seus participantes.`,
  },
  {
    img: "04",
    title: "Personalize como quiser",
    text: `Aqui você irá configurar como sua loja aparecerá para seus
          participantes. Desde a cor de fundo do seu app, quantidade
          de fidelizações que cada cliente fará em seus cartões e cadastrar uma recompensa
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
    title: "Compartilhe com seus participantes",
    text: `Divulgue para seus participantes o seu link, eles poderão se
          cadastrar em sua loja e você poderá fidelizar com eles!`,
  },
  {
    img: "07",
    title: "Acessando seu site",
    text: `Os participantes poderão se cadastrar e começarem a utilizar seu cartão de fidelidade.`,
  },
  {
    img: "08",
    title: "Meu cartão da loja!",
    text: `Quando seus participantes acessarem o site, verão o seuc artão sendo preenchido a cada compra que você registrar.`,
  },
  {
    img: "09",
    title: "Cria uma fidelização",
    text: `Quando o participante compra no seu estabelecimento, você pedira seu telefone que foi cadastrado. Apos isso você preencherá e adicionará os produtos que ele comprou, após isso e so confirmar!`,
  },
  {
    img: "10",
    title: "Conquistando fidelização",
    text: `Seu cliente verá todas as fidelizações que você marca no cartão dele.`,
  },
  {
    img: "11",
    title: "Completando um cartão",
    text: `Quando seu cliente comprar ate completar o cartão, sua próxima compra será o resgate que você quer entregar pra ele.`,
  },
  {
    img: "12",
    title: "Recompense seus participantes",
    text: "Agora você poderá recompensar o seu participante, construindo compromentimento em qualidade e atendimento.",
  },
  {
    img: "13",
    title: "Resgatado!",
    text: "Parabéns, você conclui o cartão do seu participante!",
  },
  {
    img: "14",
    title: "Histórico do participante",
    text: "Após concluir o cartão do seu participante, ele verá todos os cartão concluidos no histórico dele.",
  },
  {
    img: "15",
    title: "Continue fidelizando",
    text: "Após concluir um cartão, seu participante receberá um cartão novo e pronto para ser preenchido novamente.",
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
            <div className="max-w-64 flex flex-col gap-y-4">
              <Button fullWidth component={Link} href="/login">
                <div className="flex gap-x-2 py-1">
                  <FaCircleUser size={22} />
                  Fazer Login
                </div>
              </Button>
              <Button fullWidth component={Link} href="#sobre">
                <div className="flex gap-x-2 py-1">
                  <FaGifts size={22} />
                  Conheça o App
                </div>
              </Button>
              <Button
                fullWidth
                component={Link}
                formTarget="_blank"
                href="https://wa.me/5521982947600?text=Olá, quero tirar dúividas sobre o aplicativo de fidelização!"
              >
                <div className="flex gap-x-2 py-1">
                  <FaWhatsapp size={22} />
                  Tire dúvidas
                </div>
              </Button>
            </div>
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
