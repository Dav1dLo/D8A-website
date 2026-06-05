import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../../ALTERNATIVE/alt.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "D8A.pro — Hire AI agents to run your data team",
  description:
    "An alternative, Sintra-inspired concept: a happy little crew of AI data agents that spec, build, review and ship across the full data lifecycle.",
};

export default function AlternativeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={jakarta.variable}>{children}</div>;
}
