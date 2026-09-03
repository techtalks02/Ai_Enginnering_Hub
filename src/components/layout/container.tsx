import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div"> & {
  /** Tighter max-width for nav bars */
  variant?: "default" | "nav";
};

/**
 * Shared responsive container aligned to Techtalks02 breakpoints:
 * 320–767 phone | 768–1023 tablet | 1024–1279 laptop | 1280+ desktop | 1920+ max-width cap
 */
export function Container({ className, variant = "default", ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full min-w-0 px-4 xs:px-5 sm:px-6 lg:px-8",
        variant === "nav" ? "max-w-5xl xl:max-w-6xl" : "max-w-7xl 2xl:max-w-[1440px] 3xl:max-w-[1600px]",
        className
      )}
      {...props}
    />
  );
}
