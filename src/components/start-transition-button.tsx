"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function StartTransitionButton({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [origin, setOrigin] = useState({ x: "50%", y: "50%" });

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setOrigin({
      x: `${rect.left + rect.width / 2}px`,
      y: `${rect.top + rect.height / 2}px`,
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => setActive(true));
    });

    setTimeout(() => router.push(href), 520);
  }

  return (
    <>
      <button type="button" onClick={handleClick} className={className}>
        {children}
      </button>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-50 bg-gradient-to-br from-violet-500 to-blue-500 transition-[clip-path] duration-500 ease-in-out motion-reduce:transition-none"
        style={{
          clipPath: active
            ? `circle(150% at ${origin.x} ${origin.y})`
            : `circle(0% at ${origin.x} ${origin.y})`,
        }}
      />
    </>
  );
}
