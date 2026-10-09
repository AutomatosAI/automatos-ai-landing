import { useEffect } from "react";

/* Sends the visitor to another site (replacing this history entry), with a link if script is slow. */
export const ExternalRedirect = ({ to, label }: { to: string; label: string }) => {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <p className="text-muted-foreground">
        {label}…{" "}
        <a href={to} className="text-foreground underline">
          Continue
        </a>
      </p>
    </main>
  );
};
