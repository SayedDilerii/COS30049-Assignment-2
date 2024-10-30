export type QueryModelDTO = {
  state: string;
  date: string;
  tmin: string;
  tmax: string;
};

export type ModelPrediction = {
  risk_score: number;
  alias: string;
  visualisation: Visualisation;
};

type Visualisation = {
  chart: object;
  graph: object;
};
