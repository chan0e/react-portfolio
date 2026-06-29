import { useRef, type RefObject } from 'react';
import { useScroll, type MotionValue, type UseScrollOptions } from 'framer-motion';

interface UseScrollSectionOptions {
  offset?: UseScrollOptions['offset'];
}

interface UseScrollSectionResult<T extends HTMLElement> {
  ref: RefObject<T | null>;
  progress: MotionValue<number>;
}

export function useScrollSection<T extends HTMLElement = HTMLElement>(
  options: UseScrollSectionOptions = {},
): UseScrollSectionResult<T> {
  const ref = useRef<T | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: options.offset ?? ['start end', 'end start'],
  });

  return {
    ref,
    progress: scrollYProgress,
  };
}
