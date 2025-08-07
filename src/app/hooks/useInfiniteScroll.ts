import { RefObject, useEffect } from "react";

export function useInfiniteScroll({
  targetRef,
  hasMore,
  loading,
  onLoadMore,
}: {
  targetRef: RefObject<HTMLElement | null>;
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
}) {
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      {
        rootMargin: "200px",
        threshold: 0.1,
      }
    );

    const target = targetRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [targetRef, hasMore, loading, onLoadMore]);
}
