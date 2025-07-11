import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function Intro({ fields }) {
  return (
    <section className="max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">{fields.title}</h2>
      <div className="text-lg leading-relaxed">
        {documentToReactComponents(fields.introText)}
      </div>
    </section>
  );
}
