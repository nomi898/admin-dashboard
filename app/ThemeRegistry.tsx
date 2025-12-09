// app/Components/ThemeRegistry.tsx
"use client";

import * as React from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Create a single Emotion cache
export const muiCache = createCache({
  key: "mui",
  prepend: true,
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return <CacheProvider value={muiCache}>{children}</CacheProvider>;
}
