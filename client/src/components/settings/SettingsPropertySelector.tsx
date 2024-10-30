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
        <h2 className="font-semibold text-lg">{heading}</h2>
        <p className="text-zinc-600">{caption}</p>
      </div>
      <div className="mt-2">
        <form>
          <select
            id="config-selector"
            name={heading}
            className="border border-gray-300 rounded-xl shadow-md text-left pr-4 pl-4 py-2 w-56 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => formValue(heading, e.target.value)}
            value={value}
          >
            {items.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </form>
      </div>
    </div>
  );
};

export default PropertySelector;
