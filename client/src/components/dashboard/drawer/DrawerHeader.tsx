import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Cpu } from "lucide-react";

const DrawerHeader: React.FC = () => {
  return (
    <Container className="px-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Cpu size={40} color="green" />
        <p className="text-[1.8em] font-medium">Risk Predictions</p>
      </div>
      <div className="flex items-center gap-2">
        <Input placeholder="predict bushfire risk..." className="w-[550px] rounded-full bg-zinc-100 px-4 placeholder:text-zinc-400" />
        <Button>Today</Button>
      </div>
    </Container>
  );
};

export default DrawerHeader;
