import Carousel from "@/components/Carousel";
import { Roboto as Font1 , Inter as Font2 } from "next/font/google";

const font = Font1({weight: "400", subsets: ['latin']});
const inter = Font2({weight: "400", subsets: ['latin']});

const Home = () => {
  return (
    <div>
      <Carousel />
      <div className="w-ful justify-center">
        
      </div>
    </div>
  )
}

export default Home;


