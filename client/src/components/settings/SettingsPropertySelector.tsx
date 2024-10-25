import React from "react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";

interface PropertySelectorProps {
  selectedItem?: string;
  onSelect: (item: string) => void;
  heading?: string;
  caption?: string;
  triggerText?: string;
  items: string[];
}

const PropertySelector: React.FC<PropertySelectorProps> = ({
  selectedItem,
  onSelect,
  heading = "heading",
  caption = "caption",
  triggerText = "Open",
  items = [],
}) => {
  return (
    <div className="flex border-b pb-8">
      <div className="flex-col">
        <h2 className="font-semibold text-lg">{heading}</h2>
        <p className="text-zinc-600">{caption}</p>
      </div>
      <div className="flex ml-auto mr-16 mt-1">
        <DropdownMenu>
          <DropdownMenuTrigger className="border border-gray-300 rounded-xl shadow-md text-left pr-4 pl-4 justify-start w-56">
            {selectedItem || triggerText}
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            {items.map((item, index) => (
              <DropdownMenuItem key={index} onClick={() => onSelect(item)}>
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default PropertySelector;
