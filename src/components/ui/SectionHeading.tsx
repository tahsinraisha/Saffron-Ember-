import RevealText from "@/components/ui/RevealText";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      <span className="eyebrow">{eyebrow}</span>
      <RevealText
        text={title}
        as="h2"
        className="mt-4 font-display text-4xl leading-[1.05] text-ivory text-balance md:text-5xl lg:text-6xl"
      />
    </div>
  );
}
