import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { componentMap } from "@/components/ContentBlocks";
import Link from "next/link";
import React from "react";

export const richTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
  },
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="text-4xl font-bold my-4">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="text-3xl font-bold my-4">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className="text-2xl font-bold my-4">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (node, children) => (
      <h4 className="text-xl font-semibold my-3">{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (node, children) => (
      <h5 className="text-lg font-semibold my-2">{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (node, children) => (
      <h6 className="text-base font-medium my-1">{children}</h6>
    ),
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="mb-4 text-gray-800">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="list-disc list-inside mb-4">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ol className="list-decimal list-inside mb-4">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,

    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const contentType = node.data.target.sys.contentType.sys.id;
      const Component = componentMap[contentType];

      if (Component) {
        return <Component fields={node.data.target.fields} />;
      }

      return (
        <div className="border p-4 my-4 text-sm text-red-500">
          Unsupported embedded entry: <code>{contentType}</code>
        </div>
      );
    },

    [INLINES.EMBEDDED_ENTRY]: (node) => {
      const target = node?.data?.target;
      const contentType = target?.sys?.contentType?.sys?.id;
      const fields = target?.fields;

      // Custom rendering for inline CTA
      if (contentType === "componentCta" && fields?.ctaText) {
        return (
          <button
            type="button"
            className="block px-4 py-2 mx-1 my-2 text-sm font-medium  border-slate-500 border-2 text-black rounded-3xl hover:bg-slate-200 hover:cursor-pointer"
          >
            {fields.ctaText}
          </button>
        );
      }

      // Mapped components fallback (if needed)
      const Component = componentMap[contentType];
      if (Component) {
        return <Component fields={fields} />;
      }

      // Fallback for unknown inline entries
      return (
        <span className="text-red-500">
          [Unsupported inline entry: <code>{contentType}</code>]
        </span>
      );
    },

    [INLINES.HYPERLINK]: (node, children) => {
      const uri = node.data.uri;
      return (
        <Link
          href={uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {children}
        </Link>
      );
    },
  },
};
