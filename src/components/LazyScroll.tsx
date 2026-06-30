import { useState, useEffect, useRef, Suspense, ReactNode } from "react";

interface LazyScrollProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  minHeight?: string;
}

const LazyScroll = ({ children, fallback, rootMargin = "0px", minHeight = "50vh" }: LazyScrollProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin]);

  // Give a tiny buffer to allow the React.lazy component to mount before fading in
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setIsLoaded(true), 150);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div ref={ref} style={{ minHeight: isVisible ? "auto" : minHeight }}>
      {isVisible ? (
        <Suspense fallback={fallback || <div className="w-full animate-pulse bg-slate-50 dark:bg-slate-900" style={{ minHeight }} />}>
          <div className={`transition-opacity duration-1000 ease-in-out ${isLoaded ? "opacity-100" : "opacity-0"}`}>
            {children}
          </div>
        </Suspense>
      ) : (
        fallback || <div className="w-full" style={{ minHeight }} />
      )}
    </div>
  );
};

export default LazyScroll;

