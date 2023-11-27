import Image from "next/image";

export default function GalleryImageContainer({ image }) {
  return (
    <div key={image.id} className="relative h-64 rounded overflow-hidden">
      <Image
        src={image.url}
        alt={image.description}
        fill
        className="object-cover"
      ></Image>
    </div>
  );
}
