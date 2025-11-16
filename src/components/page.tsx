type Props = {
  className?: string;
  children: React.ReactNode;
};

export const Page = ({ className, children }: Props) => {
  return (
    <div
      className={`flex flex-col bg-linear-to-b from-background from-55% to-secondary/40 text-center min-h-screen min-w-[max(100%,320px)] ${className}`}
    >
      {children}
    </div>
  );
};
