export type StateName =
  | "Alabama"
  | "Alaska"
  | "Arizona"
  | "Arkansas"
  | "California"
  | "Colorado"
  | "Connecticut"
  | "Delaware"
  | "Florida"
  | "Georgia"
  | "Hawaii"
  | "Idaho"
  | "Illinois"
  | "Indiana"
  | "Iowa"
  | "Kansas"
  | "Kentucky"
  | "Louisiana"
  | "Maine"
  | "Maryland"
  | "Massachusetts"
  | "Michigan"
  | "Minnesota"
  | "Mississippi"
  | "Missouri"
  | "Montana"
  | "Nebraska"
  | "Nevada"
  | "New Hampshire"
  | "New Jersey"
  | "New Mexico"
  | "New York"
  | "North Carolina"
  | "North Dakota"
  | "Ohio"
  | "Oklahoma"
  | "Oregon"
  | "Pennsylvania"
  | "Rhode Island"
  | "South Carolina"
  | "South Dakota"
  | "Tennessee"
  | "Texas"
  | "Utah"
  | "Vermont"
  | "Virginia"
  | "Washington"
  | "West Virginia"
  | "Wisconsin"
  | "Wyoming";

export type StateCode =
  | "AL"
  | "AK"
  | "AZ"
  | "AR"
  | "CA"
  | "CO"
  | "CT"
  | "DE"
  | "FL"
  | "GA"
  | "HI"
  | "ID"
  | "IL"
  | "IN"
  | "IA"
  | "KS"
  | "KY"
  | "LA"
  | "ME"
  | "MD"
  | "MA"
  | "MI"
  | "MN"
  | "MS"
  | "MO"
  | "MT"
  | "NE"
  | "NV"
  | "NH"
  | "NJ"
  | "NM"
  | "NY"
  | "NC"
  | "ND"
  | "OH"
  | "OK"
  | "OR"
  | "PA"
  | "RI"
  | "SC"
  | "SD"
  | "TN"
  | "TX"
  | "UT"
  | "VT"
  | "VA"
  | "WA"
  | "WV"
  | "WI"
  | "WY";

export const fipsToStateCode: Record<string, string> = {
  "1": "AL",
  "2": "AK",
  "4": "AZ",
  "5": "AR",
  "6": "CA",
  "8": "CO",
  "9": "CT",
  "10": "DE",
  "11": "DC",
  "12": "FL",
  "13": "GA",
  "15": "HI",
  "16": "ID",
  "17": "IL",
  "18": "IN",
  "19": "IA",
  "20": "KS",
  "21": "KY",
  "22": "LA",
  "23": "ME",
  "24": "MD",
  "25": "MA",
  "26": "MI",
  "27": "MN",
  "28": "MS",
  "29": "MO",
  "30": "MT",
  "31": "NE",
  "32": "NV",
  "33": "NH",
  "34": "NJ",
  "35": "NM",
  "36": "NY",
  "37": "NC",
  "38": "ND",
  "39": "OH",
  "40": "OK",
  "41": "OR",
  "42": "PA",
  "44": "RI",
  "45": "SC",
  "46": "SD",
  "47": "TN",
  "48": "TX",
  "49": "UT",
  "50": "VT",
  "51": "VA",
  "53": "WA",
  "54": "WV",
  "55": "WI",
  "56": "WY",
};

export interface StateData {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

export interface GoogleMapsProps {
  selectedState: StateName;
  highlightColor: string;
}

export interface MapContentProps {
  selectedState: StateName;
  highlightColor: string;
}

export type StateNameToCode = {
  [key in StateName]: StateCode;
};

export type StateDataMap = {
  [key in StateCode]: StateData;
};
