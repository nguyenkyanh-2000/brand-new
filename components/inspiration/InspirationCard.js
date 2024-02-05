import Image from "next/image";

export const InspirationCard = ({ image }) => {
  return (
    <div className="group relative h-[90vh] w-screen overflow-hidden bg-foreground">
      <Image
        src={image}
        alt="inspiration-card"
        placeholder="blur"
        className="absolute left-1/2 top-1/2 h-full w-[80vh] -translate-x-1/2 -translate-y-1/2 object-cover"
        sizes="(min-width: 1200px) 500px, (min-width: 768px) 50vw, 100vw"
      ></Image>
      <div className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"></div>
    </div>
  );
};
