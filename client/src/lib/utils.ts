import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateRiskColour(risk: string): { colour: string; fontColor: string } {
  const typeography = { colour: "", fontColor: "" };

  if (risk === "Low Risk") {
    typeography.colour = "#bbf7d0";
    typeography.fontColor = "#15803d";
  }

  if (risk === "Moderate Risk") {
    typeography.colour = "#fed7aa";
    typeography.fontColor = "#c2410c";
  }
  if (risk === "High Risk") {
    typeography.colour = "#f97316";
    typeography.fontColor = "#ffffff";
  }
  if (risk === "Extreme Risk") {
    typeography.colour = "#991b1b";
    typeography.fontColor = "#ffffff";
  }

  return typeography;
}
