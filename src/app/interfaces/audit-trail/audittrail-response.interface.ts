import { AuditTrail } from './audittrail.interface';

export interface AuditTrailResponse {
  content: AuditTrail[];
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
}