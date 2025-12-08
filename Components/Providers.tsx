"use client";

import { FavoritesProvider } from "@/hooks/useFavorites";
import StoreProvider from "@/store/StoreProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <FavoritesProvider>{children}</FavoritesProvider>
    </StoreProvider>
  );
}

