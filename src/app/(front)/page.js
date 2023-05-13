import Carousel from "@/components/Carousel";
import { Roboto as Font1, Inter as Font2 } from "next/font/google";
import Image from "next/image";

const font = Font1({ weight: "400", subsets: ["latin"] });
const inter = Font2({ weight: "400", subsets: ["latin"] });

const Home = () => {
  return (
    <div>
      <Carousel />
      <div className="w-full justify-center">
        <section className="bg-white w-full">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="text-center lg:text-left max-w-3xl mx-auto lg:mx-0 lg:w-1/2 px-8">
              <h2 className="text-3xl font-semibold mb-4 text-[#AF1B51]">
                Amanda Moura Nail Designer
              </h2>
              <p>
              Amanda Moura é uma profissional especializada em alongamento de unhas com gel na fibra, 
              focada em proporcionar um visual natural e sofisticado às suas clientes. Com habilidades meticulosas e paixão 
              pela arte das unhas, ela está empenhada em oferecer um atendimento personalizado e de alta qualidade.
              </p>
              <p>
              Iniciando sua jornada no mundo da nail art, Amanda rapidamente conquistou a confiança e admiração de suas clientes 
              graças ao seu talento e dedicação. Com a missão de realçar a beleza das mãos e destacar a personalidade única de cada cliente, 
              utiliza técnicas avançadas e produtos de ponta para criar alongamentos duradouros e confortáveis.
              </p>
              <p>
              Acreditando que a beleza natural é a chave para a elegância, se esforça para manter um equilíbrio harmonioso 
              entre a sofisticação e a naturalidade em cada trabalho realizado. Seu objetivo é fazer com que cada cliente se sinta confiante e 
              valorizada, realçando sua beleza e estilo próprios.
              </p>
            </div>
            <div className="lg:w-1/2">
              {/* <Image
                className="max-w-full h-auto"
                src="/amanda.svg"
                alt="Amanda Moura Nail Designer"
                width={700}
                height={400}
                /> */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;





