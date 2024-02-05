import Image from "next/image";

export const InspirationCard = ({ image, content }) => {
  return (
    <div className="group relative h-[90vh] w-screen overflow-hidden bg-background">
      <Image
        src={image}
        alt="inspiration-card"
        placeholder="blur"
        className="absolute h-full w-[80vh] object-cover"
        sizes="(min-width: 1200px) 500px, (min-width: 768px) 50vw, 100vw"
      ></Image>
      <p className="absolute right-[100px] top-0 hidden w-60 flex-wrap text-lg md:flex">
        {
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi enim, eleifend vel est nec, volutpat interdum eros. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
        }
      </p>
      <div className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"></div>
    </div>
  );
};
