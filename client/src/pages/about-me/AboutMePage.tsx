import { MarkdownPreview } from "@/shared/ui/markdown";
import content from "@/markdown/about-me.md";
import Header from "@/shared/ui/header/Header";

export default function AboutMePage() {
  return (
    <div className="grid grid-cols-[6fr_2fr] gap-x-10 items-start">
      <div>
        <Header value="About Me" />
        <MarkdownPreview value={content} />
      </div>
    </div>
  );
}
