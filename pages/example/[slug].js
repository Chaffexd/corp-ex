import Image from "next/image";
import Head from "next/head";
import { createClient } from "contentful";
import { componentMap } from "@/components/ContentBlocks";

const client = createClient({
  space: "ne1qvy5mlpq6",
  accessToken: "9s9FUmXoo3wySReYp949kOrjlkSB4y7FYkZBxBKWJsU",
  host: "preview.contentful.com",
});

export default function Home({ pageData }) {
  console.log("Entry Retrieved =", pageData.items[0]);
  const data = pageData.items[0].fields;

  return (
    <>
      <Head>
        <meta
          httpEquiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Head>

      <article className="m-auto w-full flex flex-col items-center justify-center mt-20">
        <h1 className="text-center text-5xl font-bold max-w-[570px]">
          {data.title}
        </h1>

        {data.body.map((block, index) => {
          const contentType = block.sys.contentType.sys.id;
          const Component = componentMap[contentType];

          if (!Component) {
            console.warn(`No component found for type: ${contentType}`);
            return null;
          }

          return (
            <Component key={block.sys.id || index} fields={block.fields} />
          );
        })}
      </article>
    </>
  );
}
