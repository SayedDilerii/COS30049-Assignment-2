import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import React from "react";

interface PropertySelectorProps {
  heading?: string;
  caption?: string;
  value: string;
  items: string[];
  formValue: (heading: string, selectedValue: string) => void;
}

const PropertySelector: React.FC<PropertySelectorProps> = ({ heading = "heading", caption = "caption", value = "value", items = [], formValue }) => {
  const isTablet = useMediaQuery("(min-width: 850px) and (max-width: 1199px)");
  const isDesktop = useMediaQuery("(min-width: 1200px)");

  return (
    <div className={`flex border-b pb-8 justify-between ${isDesktop ? "flex-row" : isTablet ? "flex-row" : "flex-col"}`}>
      <div className="flex-col">
        <h2 className="font-medium text-lg">{heading}</h2>
        <p className="text-zinc-500 font-light">{caption}</p>
      </div>
      <div className="mt-2">
        <form>
          <Select onValueChange={(value) => formValue(heading, value)} name={heading}>
            <SelectTrigger className="w-[250px] bg-transparent rounded-xl px-4 bg-white shadow-sm border-zinc-300">
              <SelectValue placeholder={value} />
            </SelectTrigger>
            <SelectContent className="rounded-xl w-[250px]">
              <SelectGroup>
                <SelectLabel>Select:</SelectLabel>
                {items.map((value, index) => (
                  <SelectItem value={value} key={index}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </form>
      </div>
    </div>
  );
};

export default PropertySelector;
