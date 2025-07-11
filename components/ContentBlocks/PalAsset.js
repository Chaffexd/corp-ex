
import Image from "next/image";

export default function PalAsset({ fields }) {
  const file = fields.asset?.fields?.file;
  const url = file?.url?.startsWith("//") ? "https:" + file.url : file.url;

  return (
    <section className="w-full flex justify-center py-8">
      <Image
        src={`${url}`}
        alt={fields.alt || ""}
        width={file?.details?.image?.width || 600}
        height={file?.details?.image?.height || 400}
        className="rounded-lg"
      />
    </section>
  );
}
