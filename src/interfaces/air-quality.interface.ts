export interface Pollution {
  ts: string;
  aqius: number;
  mainus: string;
  aqicn: number;
  maincn: string;
}

export interface Result {
  Pollution: Pollution;
}

export interface ApiResponse {
  Result: Result;
}
