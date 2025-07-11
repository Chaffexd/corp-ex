import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function ProofPoints({ fields }) {
  return (
    <section className="max-w-6xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">{fields.title}</h2>
      <p className="mb-6">{fields.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {fields.dataCards?.map((card) => (
          <div key={card.sys.id} className="text-white shadow p-4 rounded flex flex-col justify-baseline h-[200px] bg-sky-600">
            <p className="font-semibold text-3xl">{card.fields.dataTitle}</p>
            <p className="text-sm ">{card.fields.dataDescription}</p>
          </div>
        ))}
      </div>

      {fields.footer && (
        <div className="text-base text-gray-700">
          {documentToReactComponents(fields.footer)}
        </div>
      )}

      {fields.ctaText && <a href="#" className="text-blue-600 font-semibold mt-4 inline-block">{fields.ctaText}</a>}
    </section>
  );
}
