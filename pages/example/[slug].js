import { createClient } from "contentful";
import { componentMap } from "@/components/ContentBlocks";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";


const client = createClient({
  space: "ne1qvy5mlpq6",
  accessToken: "9s9FUmXoo3wySReYp949kOrjlkSB4y7FYkZBxBKWJsU",
  host: "preview.contentful.com",
});


export default function Home({ pageData }) {
  console.log("Entry Retrieved =", pageData.items[0]);

  const rawEntry = pageData.items[0];
  const liveEntry = useContentfulLiveUpdates(rawEntry); 
  const data = liveEntry?.fields || {};

  return (
    <>
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

export async function getStaticProps({ params }) {
  console.log("Params = ", params);
  const pageData = await client.getEntries({
    content_type: "templateInnovationPage",
    include: 10,
    "fields.slug[match]": params.slug,
  });

  return { props: { pageData } };
}

export async function getStaticPaths() {
  const pages = await client.getEntries({
    content_type: "templateInnovationPage",
  });

  const paths = pages.items.map((page) => ({
    params: { slug: page.fields.slug },
  }));
  return { paths, fallback: false };
}
