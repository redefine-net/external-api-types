import { ExternalApiErrorBase } from "./errors";

export interface ExternalApiResponse<TData> {
  data?: TData;
  errors?: ExternalApiErrorBase[];
}

export type AddressType =
  | EvmAddressType
  | ContractImplementationType
  | TokenType;

export enum EvmAddressType {
  EOA = "EOA",
  CONTRACT = "CONTRACT",
}

export enum ContractImplementationType {
  GNOSIS_SAFE = "GNOSIS_SAFE",
  ERC20 = "ERC20",
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
}

export enum TokenType {
  ERC20 = "ERC20",
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
  NATIVE = "NATIVE",
}

export enum Web3SupportedMethods {
  PersonalSign = "personal_sign",
  EthSign = "eth_sign",
  EthSignTyped = "eth_signTypedData",
  EthSignTypedV1 = "eth_signTypedData_v1",
  EthSignTypedV3 = "eth_signTypedData_v3",
  EthSignTypedV4 = "eth_signTypedData_v4",
  EthSendTransaction = "eth_sendTransaction",
}

export interface AddressEntity {
  address: string;
  name?: string;
  type?: AddressType;
}

export interface ERC20TokenEntity extends AddressEntity {
  type: TokenType.ERC20;
  amount: TokenAmount;
  decimals?: number;
  symbol?: string;
}

export interface ERC721TokenEntity extends AddressEntity {
  type: TokenType.ERC721;
  symbol?: string;
  tokenId: string;
}

export interface NativeTokenEntity
  extends Required<Omit<ERC20TokenEntity, "address" | "type">> {
  type: TokenType.NATIVE;
}

export interface TokenAmount {
  value: string;
  normalizedValue?: string;
}

export enum TxCategory {
  ERC20_TRANSFER = "ERC20_TRANSFER",
  ERC20_APPROVAL = "ERC20_APPROVAL",
  ERC1155_APPROVAL_FOR_ALL = "ERC1155_APPROVAL_FOR_ALL",
  ERC1155_TRANSFER = "ERC1155_TRANSFER",
  ERC721_APPROVAL_FOR_ALL = "ERC721_APPROVAL_FOR_ALL",
  ERC721_APPROVAL = "ERC721_APPROVAL",
  ERC721_TRANSFER = "ERC721_TRANSFER",
  NATIVE_ASSET_TRANSFER = "NATIVE_ASSET_TRANSFER",
}

export enum InsightRuleSeverity {
  NO_ISSUES = 0,
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  CRITICAL = 4,
}

export enum InsightRuleCategory {
  "GENERAL" = 0,
  "REPUTATION" = 1,
  "WEB_DOMAINS" = 2,
  "GLOBAL_BLOCKLIST" = 3,
  "TRANSACTION_ARGUMENTS" = 4,
  "CODE_RELIABILITY" = 5,
  "GOVERNANCE" = 6,
  "SCAMS" = 7,
  "DISTRIBUTION_OF_HOLDINGS" = 8,
  "TOKEN_SUPPLY" = 9,
  "TOKEN_LIQUIDITY" = 10,
  "COMPLIANCE" = 11,
}

export enum MessageSignCategory {
  EIP712 = "EIP712",
  ARBITRARY_SIGN = "ARBITRARY_SIGN",
}

export interface RiskAnalysisSimulation {
  uuid: string;
  status: {
    isReverted: boolean;
    errors: string[];
  };
  time?: string;
  block?: string;
}

export interface CodeLabelPair<TData> {
  code: TData;
  label: string;
}

export type Severity = CodeLabelPair<InsightRuleSeverity>;

export interface RiskAnalysisInsights {
  issues: {
    description: {
      short: string;
      long: string;
    };
    category: string;
    severity: Severity;
  }[];
  verdict: Severity;
}

export interface TxTransferMetadata {
  recipient: AddressEntity;
  token: ERC20TokenEntity;
}

export interface TxApproveMetadata {
  spender: AddressEntity;
  token: ERC20TokenEntity;
}

export interface TxNativeTransferMetadata {
  recipient: AddressEntity;
  token: NativeTokenEntity;
}

export type RiskAnalysisTxMetadata =
  | TxTransferMetadata
  | TxApproveMetadata
  | TxNativeTransferMetadata;

export interface RiskAnalysisTransaction {
  category: TxCategory[];
  metadata: Record<string, RiskAnalysisTxMetadata>;
  params?: {
    isToContract: boolean;
    target: AddressEntity;
    method: {
      name: string;
      description: string;
      signature: {
        hex: string;
        text: string;
      };
    };
  };
}

export interface EIP712Metadata {
  verifyingContract: string;
  decoded: object;
}

export interface ArbitrarySignMetadata {
  message: string;
}

export type RiskAnalysisMessageMetadata =
  | EIP712Metadata
  | ArbitrarySignMetadata;

export interface RiskAnalysisMessage {
  category: MessageSignCategory;
  metadata: Record<string, RiskAnalysisMessageMetadata>;
}

export interface RiskAnalysisBalanceChange {
  in: BalanceChangeItem[];
  out: BalanceChangeItem[];
}

export type BalanceChangeItem =
  | ERC20TokenEntity
  | ERC721TokenEntity
  | NativeTokenEntity;

export interface RiskAnalysisTxData {
  simulation: RiskAnalysisSimulation;
  insights?: RiskAnalysisInsights;
  transaction?: RiskAnalysisTransaction;
  balanceChange?: RiskAnalysisBalanceChange;
}

export type RiskAnalysisMessageData = {
  balanceChange?: RiskAnalysisBalanceChange;
  insights?: RiskAnalysisInsights;
  simulation: Pick<RiskAnalysisSimulation, "time" | "uuid">;
  message?: RiskAnalysisMessage;
  transaction?: RiskAnalysisTransaction;
};

export type RiskAnalysisMessageResponse =
  ExternalApiResponse<RiskAnalysisMessageData>;
export type RiskAnalysisTxResponse = ExternalApiResponse<RiskAnalysisTxData>;

export interface RiskAnalysisRequest {
  chainId: number;
  domain: string;
  block?: string;
  payload: {
    method: Web3SupportedMethods;
  };
}

export interface RiskAnalysisTxRequest extends RiskAnalysisRequest {
  payload: {
    method: Web3SupportedMethods.EthSendTransaction;
    params: {
      from: string;
      to: string;
      value: string;
      gas?: string;
      data: string;
    }[];
  };
}

export interface RiskAnalysisMessageRequest extends RiskAnalysisRequest {
  payload: {
    method: Exclude<
      Web3SupportedMethods,
      Web3SupportedMethods.EthSendTransaction
    >;
    params: string[];
  };
}
