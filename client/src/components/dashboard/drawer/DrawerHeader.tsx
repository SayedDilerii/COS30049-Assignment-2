import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar, Cpu } from "lucide-react";
const DrawerHeader: React.FC = () => {
  return (
    <Container className="px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Cpu size={40} color="green" />
        <p className="text-[1.8em] font-medium">Risk Predictions</p>
      </div>
      <div className="flex items-center gap-2">
        <Input placeholder="predict bushfire risk..." className="w-[550px] rounded-full bg-zinc-100 px-4 placeholder:text-zinc-400" />
        <Popover>
          <PopoverTrigger asChild>
            <Button className="bg-zinc-200 hover:bg-zinc-300 font-normal flex gap-2 text-zinc-600 text-sm">
              <Calendar size={16} /> Filter by Date
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="border-[0.5px] border-zinc-300 w-[300px] mt-1 shadow-2xl rounded-xl h-[300px] bg-white p-6 overflow-y-scroll"
            align="end"
          ></PopoverContent>
        </Popover>
      </div>
    </Container>
  );
};

export default DrawerHeader;
