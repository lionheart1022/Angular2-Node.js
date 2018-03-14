import { ITarget } from './target.interface';
import { ITargetSort } from './target-sort.interface';

export interface ITargetResponse {
  content: ITarget[];
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  sort: ITargetSort[];
  size: number;
  number: number;
}
