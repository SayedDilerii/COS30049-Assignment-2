import React from "react";

interface PropertySelectorProps {
  heading?: string;
  caption?: string;
  checkboxItem: string[];
  bool: boolean[];
  formValue: (heading: string, index: number) => void;
}

const PropertySelectorCheckBox: React.FC<PropertySelectorProps> = ({ heading = "heading", caption = "caption", checkboxItem = [], bool = [], formValue }) => {
  return (
    <div className="property-selector border-b pb-8 flex justify-between">
      <div className="flex-col">
        <h2 className="font-semibold text-lg text-gray-800">{heading}</h2>
        <p className="text-zinc-600">{caption}</p>
      </div>
      <div>
        <div className="flex-col">
          {checkboxItem.map((item, index) => (
            <label key={index} className="flex items-center pt-3 cursor-pointer">
              <input type="checkbox" checked={bool[index]} onChange={() => formValue(heading, index)} className="mr-2 " />
              <div className="w-36 font-semibold">{item}</div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertySelectorCheckBox;
