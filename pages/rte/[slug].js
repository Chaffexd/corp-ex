import { createClient } from "contentful";
import { componentMap } from "@/components/ContentBlocks";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { richTextOptions } from "@/lib/RichTextOptions";

const client = createClient({
  space: "ne1qvy5mlpq6",
  accessToken: "9s9FUmXoo3wySReYp949kOrjlkSB4y7FYkZBxBKWJsU",
  host: "preview.contentful.com",
});

export default function RtePage({ pageData }) {
  console.log("Entry Retrieved =", pageData.items[0]);

  const rawEntry = pageData.items[0];
  const liveEntry = useContentfulLiveUpdates(rawEntry);
  const data = liveEntry?.fields || {};

  return (
    <>
      <article className="m-auto w-full max-w-3/5 flex flex-col items-center justify-center mt-20">
        <h1 className="text-center text-5xl font-bold max-w-[570px]">
          {data.title}
        </h1>
        {documentToReactComponents(data.body, richTextOptions)}
      </article>
    </>
  );
}

export async function getStaticProps({ params }) {
  console.log("Params = ", params.slug);
  const pageData = await client.getEntries({
    content_type: "templateInnovationPageAlternative",
    include: 10,
    "fields.slug[match]": params.slug,
  });

  console.log("Page Data = ", pageData);

  return { props: { pageData } };
}

export async function getStaticPaths() {
  const pages = await client.getEntries({
    content_type: "templateInnovationPageAlternative",
  });

  const paths = pages.items.map((page) => ({
    params: { slug: page.fields.slug },
  }));
  return { paths, fallback: false };
}
