import Image from "next/image";

export default function SplitBanner({ fields }) {
  const file = fields.image?.fields?.asset?.fields?.file;

  // Early return if image data is missing
  if (!file?.url) {
    return null; // Or render a fallback UI
  }

  const imageUrl = file.url.startsWith("//") ? "https:" + file.url : file.url;

  return (
    <section className="flex flex-col md:flex-row items-center gap-6 py-10 px-4 max-w-6xl mx-auto">
      {fields.imagePlacement && (
        <div className="w-full md:w-1/2">
          <Image
            src={imageUrl}
            alt={fields.image?.fields?.alt || ""}
            width={file?.details?.image?.width || 600}
            height={file?.details?.image?.height || 400}
          />
        </div>
      )}
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">{fields.title}</h2>
        <p className="mb-4">{fields.shortText}</p>
        <p>{fields.textBesideImage}</p>
        {fields.ctaText && (
          <a href="#" className="text-blue-600 font-semibold mt-4 inline-block">
            {fields.ctaText}
          </a>
        )}
      </div>
    </section>
  );
}
