import Image from "next/image";

export const VerticalInspirationCard = ({ image, index }) => {
  return (
    <div
      className="sticky top-0 flex h-screen w-full items-center justify-center"
      style={{ zIndex: index }}
    >
      <div className="relative flex h-[500px] w-[1000px] origin-top transform flex-col rounded-lg p-10">
        <Image
          src={image}
          alt="inspiration-card"
          placeholder="blur"
          className="absolute h-full w-full object-cover"
          sizes="(min-width: 1200px) 500px, (min-width: 768px) 50vw, 100vw"
        ></Image>
      </div>
    </div>
  );
};
