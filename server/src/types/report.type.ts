import { Cause, EvacuationStatus, Severity, Status } from "../enums/report.enum";

type Datetime = {
  discovery_date: string;
  discovery_time: string;
};

export type Report = {
  full_name: string;
  contact_number: string;
  state: string;
  nearest_town: string;
  datetime: Datetime;
  severity: Severity;
  cause: Cause;
  estimated_size: string;
  status: Status;
  evacuation_status: EvacuationStatus;
  description?: string;
};
