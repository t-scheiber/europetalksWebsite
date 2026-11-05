import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * next/link that tags its navigation with the "nav" transition type.
 * The page <ViewTransition> in app/layout.tsx only crossfades "nav" transitions,
 * so hydration, Suspense reveals and refreshes never animate the whole page.
 */
export default function TransitionLink({
  transitionTypes,
  ...props
}: ComponentProps<typeof Link>) {
  return <Link transitionTypes={["nav", ...(transitionTypes ?? [])]} {...props} />;
}
