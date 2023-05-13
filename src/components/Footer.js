import Image from "next/image"

const Footer = () => {
  return (
    <div className="flex justify-center items-center h-20 p-4 mt-[50px]  lg:mt-1">
      <Image src="/logo-driman-bk.svg" alt="Driman Systems" width={200} height={75} className="mx-auto w-auto h-full" />
    </div>
  )
}

export default Footer