export enum Severity {
  EXTREME = "extreme",
  HIGH = "high",
  MODERATE = "moderate",
  LIGHT = "light",
}

export enum Cause {
  UNKNOWN = "unknown",
  HUMAN = "human",
  NATURAL = "natural",
}

export enum Status {
  ACTIVE = "active",
  CONTAINED = "contained",
  EXTINGUISHED = "extinguished",
}

export enum EvacuationStatus {
  NONE = "evacuation_status",
  ADVISORY = "advisory",
  MANDATORY = "mandatory",
}

export type Report = {
  id: number;
  full_name: string;
  contact_number: string;
  state: string;
  nearest_town: string;
  discovery_date: string;
  discovery_time: string;
  severity: Severity;
  cause: Cause;
  estimated_size: string;
  status: Status;
  evacuation_status: EvacuationStatus;
  description?: string;
};

export type ReportPayload = Report;
