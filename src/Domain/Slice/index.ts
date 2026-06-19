export enum DataStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}

export interface BaseSliceState<T> {
  data: T | null;
  status: DataStatus;
  error: string | null;
}

export interface ModelWithFiles<T> {
  model: T;
  files: File[];
}
