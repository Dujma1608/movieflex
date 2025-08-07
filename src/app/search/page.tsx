import SearchPageClient from "./SearchPageClient";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query } = await searchParams;

  if (!query) {
    return null;
  }

  return <SearchPageClient query={query ?? null} />;
}
