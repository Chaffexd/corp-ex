import Image from "next/image";
import { createClient } from "contentful";

const client = createClient({
  space: "ne1qvy5mlpq6",
  accessToken: "9s9FUmXoo3wySReYp949kOrjlkSB4y7FYkZBxBKWJsU",
  host: "preview.contentful.com",
});

export default function Home() {
  return <main>home page</main>;
}
