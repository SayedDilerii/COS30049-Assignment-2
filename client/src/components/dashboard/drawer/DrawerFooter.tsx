import Container from "@/components/ui/container";
import { Info } from "lucide-react";

const DrawerFooter: React.FC = () => {
  return (
    <Container className="px-6">
      <div className="flex items-center gap-4">
        <Info size={18} color="gray" />
        <p className=" text-zinc-400 py-2">
          FireGuard’s machine learning model can predict bushfire risks. Please note it may output incorrect results.
        </p>
      </div>
    </Container>
  );
};

export default DrawerFooter;
