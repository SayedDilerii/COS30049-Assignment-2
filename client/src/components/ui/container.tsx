import { forwardRef, ReactNode } from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
});

Container.displayName = "Container";
export default Container;
