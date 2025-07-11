import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function Strategy({ fields }) {
  return (
    <section className="max-w-3xl mx-auto p-8 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{fields.title}</h2>
      <div className="prose mb-4">
        {documentToReactComponents({
          nodeType: "document",
          data: {},
          content: [
            {
              nodeType: "paragraph",
              content: [{ nodeType: "text", value: fields.description, marks: [], data: {} }],
              data: {},
            },
          ],
        })}
      </div>
      {fields.ctaText && <a href="#" className="text-blue-600 font-semibold">{fields.ctaText}</a>}
    </section>
  );
}
