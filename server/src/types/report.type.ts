import { Cause, EvacuationStatus, Severity, Status } from "../enums/report.enum";

export type Report = {
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

export type CreateReportDTO = Report;
