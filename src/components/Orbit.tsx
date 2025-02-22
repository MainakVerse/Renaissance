import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export const Orbit = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={twMerge(
        `size-[200px] border border-[var(--color-border)] rounded-full`,
        props.className
      )}
    ></div>
  );
};
