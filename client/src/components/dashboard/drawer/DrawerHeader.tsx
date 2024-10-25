import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { states } from "@/constants/states";
import { Calendar, Cpu } from "lucide-react";
const DrawerHeader: React.FC = () => {
  return (
    <Container className="px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Cpu size={40} color="green" />
        <p className="text-[1.8em] font-medium">Risk Predictions</p>
      </div>
      <div className="flex items-center gap-2">
        <Select>
          <SelectTrigger className="w-[550px] bg-transparent rounded-full px-4 bg-white shadow-sm border-zinc-300">
            <SelectValue placeholder="Select a state:" />
          </SelectTrigger>
          <SelectContent className="rounded-xl w-[550px]">
            <SelectGroup>
              <SelectLabel>Select a state:</SelectLabel>
              {states.map((value) => (
                <SelectItem value={value.abbreviation}>
                  {value.name} <span className="text-zinc-400">({value.abbreviation})</span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="bg-white border border-zinc-300 hover:bg-zinc-100 font-light flex gap-2 text-zinc-600 shadow-sm">
              <Calendar size={14} />
              <p className="text-[14px] font-normal">Filter date</p>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="border-[0.5px] border-zinc-400 w-[500px] mt-1 shadow-xl rounded-xl h-[400px] bg-white p-6 overflow-y-scroll" align="end">
            <div>
              <p className="text-zinc-400">Select by date:</p>
            </div>
          </PopoverContent>
        </Popover>
        <Button className="text-[14px]">
          <p className="text-[14px] font-normal">Search</p>
        </Button>
      </div>
    </Container>
  );
};

export default DrawerHeader;
