export interface ExternalApiErrorBase {
  code: number;
  message: string;
}

export interface ExternalApiError<TExtendedInfo = never>
  extends ExternalApiErrorBase {
  extendedInfo?: TExtendedInfo;
}

export enum ExternalApiErrorCode {
  ExternalApiGeneralError = 500,
  AnalysisInProgressError = 1000,
  SimulationFailedError = 1001,
  MissingTokenDataError = 1002,
  MissingAddressNameError = 1003,
  FailedToAnalyzeError = 1004,
  InputValidationError = 2000,
  ContractTypeMismatch = 2001,
  BadRequestError = 3000,
}
