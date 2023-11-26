import { MarkdownPreview } from "@/shared/ui/markdown";
import content from "@/markdown/about-me.md";

export default function AboutMePage() {
  return (
    <div className="grid grid-cols-[6fr_2fr] gap-x-10 items-start">
      <div>
        <h1 className="text-4xl font-bold text-foreground-primary mb-8">
          About Me
        </h1>
        <MarkdownPreview value={content} />
      </div>
    </div>
  );
}
