import Image from "next/image";

export default function Header() {
  return (
    <div className={"flex w-full gap-4 py-4"}>
      <Image src={"/next.svg"} alt="alt" width={70} height={70} />
      <h3 className={"text-[1rem]"}>Draft in Wodus331</h3>
    </div>
  );
}
