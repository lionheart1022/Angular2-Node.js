export interface ITarget {
  id: string;
  targetName: string;
  imsi: string;
  base64TargetImage: string;
  synopsis: string;
  listOfBase64TargetImages: any[];
  mapOfBase64TargetImages: object;
  foundNames: any[];
  created: number;
  lastUpdated: number;
  generatedFromLookup: null | any;
  lastLookupForTarget: null | any;
  caseIdList: string[];
  identifiers: any[];
  targetData: object;
  friendRefs: any[];
  vlrLookupResp: object;
  mobileNetworkLocations: object;
}
