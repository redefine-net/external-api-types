# Redefine External API - Types

This package provides required types for Redefine's External API

## Usage

### Install

`npm install`

### Build

`npm run build`

### Import types

Import the types you need.
Choose the right type based on the endpoint invoked:

```
// Typed request for /risk-analysis/txns
import {RiskAnalysisTxRequest} from '@redefine/external-api-types`

// Typed response for /risk-analysis/txns
import {RiskAnalysisTxResponse} from '@redefine/external-api-types`


// Typed request for /risk-analysis/messages
import {RiskAnalysisMessageRequest} from '@redefine/external-api-types`

// Typed response for /risk-analysis/messages
import {RiskAnalysisMessageResponse} from '@redefine/external-api-types`
```

To handle errors properly, You can use the following Enum to determine the value of `error.code`:

```
enum ExternalApiErrorCode {
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
```

which is imported from:

```
import {ExternalApiErrorCode} from '@redefine/external-api-types
```
