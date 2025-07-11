import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ContentfulLivePreviewProvider
      locale="en-US"
      enableLiveUpdates={pageProps.draftMode}
    >
      <Component {...pageProps} />
    </ContentfulLivePreviewProvider>
  );
}
