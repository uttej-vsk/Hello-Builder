"use client";
import { ComponentProps } from "react";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { BuilderContent, builder } from "@builder.io/sdk";
import DefaultErrorPage from "next/error";
import "../builder-registry";

type BuilderPageProps = ComponentProps<typeof BuilderComponent>;


builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export function RenderBuilderContent({ content, model }: BuilderPageProps) {

  const isPreviewing = useIsPreviewing();

  if (content || isPreviewing) {
    return <BuilderComponent content={content} model={model} />;
  }

  return <DefaultErrorPage statusCode={404} />;
}
