import { Loader2 } from "lucide-react";

const Loader: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div className="h-full w-full flex justify-center">
      <Loader2 className="mr-2 h-6 w-6 animate-spin" />
      <p>{message}</p>
    </div>
  );
};

export default Loader;
