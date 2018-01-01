"use strict";

const environment = {
  feeRecipient: "0x00000000000",
  development: {
    contracts: {
      "Exchange": "0xb69e673309512a9d726f87304c6984054f87a93b",
      "TokenTransferProxy": "0x871dd7c2b4b25e1aa18728e9d5f2af4c4e431f5c",
      "ZRXToken": "0x25b8fe1de9daf8ba351890744ff28cf7dfa8f5e3",
      "EtherToken": "0x48bacb9266a570d521063ef5dd96e61686dbe788",
      "TokenRegistry": "0x0b1ba0af832d7c05fd64161e0db78e85978e8082"
    }
  },
  kovan: {
    networkId: 42,
    contracts: {
      "Exchange": "0x90fe2af704b34e0224bf2299c838e04d4dcf1364",
      "TokenTransferProxy": "0x087Eed4Bc1ee3DE49BeFbd66C662B434B15d49d4",
      "ZRXToken": "0x6ff6c0ff1d68b964901f986d4c9fa3ac68346570",
      "EtherToken": "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
      "MultiSigWalletWithTimeLockExceptRemoveAuthorizedAddress":
        "0x9301A2B0dCA791Ba27B1A074Aba3Bf47bcd80Cb9",
      "TokenRegistry": "0xf18e504561f4347bea557f3d4558f559dddbae7f"
    }
  },
  mainnet: {
    contracts: {
      "Exchange": "0x12459c951127e0c374ff9105dda097662a027093",
      "TokenTransferProxy": "0x8da0d80f5007ef1e431dd2127178d224e32c2ef4",
      "ZRXToken": "0xe41d2489571d322189246dafa5ebde1f4699f498",
      "EtherToken": "0x2956356cd2a2bf3202f771f50d3d14a367b48070",
      "TokenRegistry": "0x926a74c5c36adf004c87399e65f75628b0f98d2c"
    }
  },
  currencies: [
    "1ST",
    "ADT",
    "ANT",
    "BAT",
    "BNT",
    "BQX",
    "CFI",
    "CVC",
    "DGD",
    "DNT",
    "EDG",
    "EOS",
    "FUN",
    "GNO",
    "GNT",
    "ICN",
    "KNC",
    "LUN",
    "MCO",
    "MKR",
    "MLN",
    "MTL",
    "NMR",
    "OMG",
    "PAY",
    "QTUM",
    "REP",
    "RLC",
    'ROL',
    "SAN",
    "SNGLS",
    "SNT",
    "STORJ",
    "TAAS",
    "TKN",
    "TRST",
    "WETH",
    "WINGS",
    "ZRX"
  ]
};

try {
  module.exports = environment;
} catch (error) {}
