export const httpConstants = {
  METHOD_TYPE: {
    POST: "POST",
    PUT: "PUT",
    GET: "GET",
    DELETE: "DELETE",
  },
  CONTENT_TYPE: {
    APPLICATION_JSON: "application/json",
    MULTIPART_FORM_DATA: "multipart/form-data",
    APPLICATION_FORM_URLENCODED: "application/x-www-form-urlencoded",
    IMAGE_PNG: "image/png",
  },
  DEVICE_TYPE: {
    WEB: "web",
  },
  API_END_POINT: {
    GET_TOKEN_OVERVIEW: "/get-token-overview",
    GET_HISTORY_PRICE: "/get-history-price",
    GET_TOKEN_TRANSFER_COUNT: "/get-token-transfer-count",
    GET_TOKEN_BALANCE: "/get-token-balance",
    GET_TOKEN_LIST: "/getListOfTokens",
    GET_TOKEN_INFO: "/token-info",
    GET_ADDRESS_ANALYTICS: "/get-address-analytics",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    GET_USERS_LIST: "/get-user-list",
    INVITE_ADMIN_USER: "/invite-admin-user",
    UPDATE_USER: "/update-user",
    GET_USER: "/user",
    GET_USER_INFO: "/user-info",

    INVITE_USER: "/invite-user",
    ACCEPT_USER: "/accept-user",
    REJECT_USER: "/reject-user",
    EXPORT_USER: "/export-user",
    SUBSCRIPTION_PLANS: "/subscription-plan",
    FEEDS: "/feeds",
    GEY_USERS_BY_ROLE: "/get-users-by-role",

    POST: "/post",
  },
};

export const userCookiesConstants = {
  FUNCTIONAL_COOKIES: "functionalCookies",
  PERFORMANCE_COOKIES: "performanceCookies",
  ANALYTICAL_COOKIES: "analyticalCookies"
}

export const cookiesConstants = {
  USER: "USER",
  SESSION_TOKEN: "SESSION_TOKEN",
  USER_PERMISSION: "USER_PERMISSION",
  AUTH0_ACCESS_TOKEN: "AUTH0_ACCESS_TOKEN",
  USER_DETAIL: "USER_DETAIL",
  USER_SUB: "USER_SUB",
  USER_TAGGED_ADDRESS: "USER_TAGGED_ADDRESS",
  USER_TRASACTION_LABELS: "USER_TRASACTION_LABELS",
  USER_ADDRESS_WATCHLIST: "USER_ADDRESS_WATCHLIST",
  USER_COOKIES: "userCookies",
  USER_INFO:"userInfo",

 IS_LOGGEDIN:"isLoggedIn",
  USER_PICTURE: "USER_PICTURE",
  USER_ID: "USER_ID",
  EMAIL_ID: "EMAIL_ID",
  AUTH0_ID_TOKEN: "AUTH0_ID_TOKEN",
  JWT_TOKEN: "JWT_TOKEN",

  ACCESS_TOKEN:"ACCESS_TOKEN",
  ID_TOKEN:"ID_TOKEN",
  AUTHENTICATION_PROVIDER:"AUTHENTICATION_PROVIDER"
};

export const eventConstants = {
  HIDE_LOADER: "HIDE_LOADER",
  SHOW_LOADER: "SHOW_LOADER",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  ADD_TO_SEARCH_LIST: 'ADD_TO_SEARCH_LIST',
  CLEAR_SEARCH_LIST: 'CLEAR_SEARCH_LIST',
};

export const genericConstants = {
  INCORRECT_USERNAME_PASS: "Incorrect username or password",
  ENTER_REQUIRED_FIELD: "Please enter the required information",
  INVALID_EMAIL: "Invalid email",
  PASSWORD_DID_NOT_MATCH: "Both the passwords did not match",
  PASSWORD_UPDATE_SUCCESS: "Your Password has been updated.",
  RESET_PASSWORD_MAIL_SENT: "A reset password email has been sent.",
  PASSWORD_UPDATE_FAILED: "Failed to update your password",
  CANNOT_GET_NOTIFICATIONS: "No notifications",
  CANNOT_CLEAR_NOTIFICATIONS: "No notifications",
  WATCHLIST_DELETED: "WatchList deleted",
  CANNOT_DELETE_WATCHLIST: "Cannot delete watchlist",
  CANNOT_DELETE_TXN_PRIVATE_NOTE: "Cannot delete Txn private notes",
  TXN_PRIVATE_NOTE_DELETED: "Txn Private Note Deleted",
  CANNOT_DELETE_TAGGED_ADDRESS: "Cannot delete Tagged Addresses",
  TAGGED_ADDRESS_DELETED: "Tagged Address Deleted",
};

export const statusConstants = {
  PENDING: "PENDING",
  INACTIVE: "INACTIVE",
  INVITED: "INVITED",
  ACTIVE: "ACTIVE",
  PUBLISHED: "PUBLISHED",
  REJECTED: "REJECTED",
};

export const sidebarConstants = {
  USERS: "users",
};
export const reduxEvent = {
  LOGGED_IN: "LOGGED_IN",
  LOGGED_OUT: "LOGGED_OUT",
};

export const messages = {
  MARKET_CAP:
    "The total market value of a cryptocurrency's circulating supply. \nMarket Cap = Current Price x Circulating Supply.",
  CIRCULATING_SUPPLY:
    "The amount of coins that are circulating in the market and are tradeable by the public.",
  TOTAL_SUPPLY:
    "The amount of coins that have been already created, minus any coins that have been burned.",
  VOLUMEX24:
    "A measure of how much of a cryptocurrency was traded in the last 24 hours.",
  FDMP: "Fully Diluted Market Cap = Price x Total supply.",
  HASH: "Unique transaction identifier, also known as the Transaction ID.",
  BLOCK_HEIGHT: "It indicates the length of the blockchain, increases after the addition of the new block.",
  NO_OF_TRANSACTION: "Number of transactions associated with a particular block.",
  AMOUNT: "The number of tokens being transferred.",
  DATE: "Transaction creation date.",
  BLOCK_CREATION_TIME_STAMP: "Block creation timestamp.",
  TRANSACTION_CREATION_TIME_STAMP: "Transaction creation timestamp.",
  AGE: "Time when was the transaction created.",
  BLOCK: "Block number associated with the transaction.",
  DIFFICULTY: "Difficulty.",
  GAS_USED: "The exact unit of gas that was used for the transactions.",
  FROM: "Sender’s account.",
  TO: "Receiver’s account.",
  SI_NO: "Serial Number",
  SYMBOL: "Short name of the token",
  NAME: "Name of the token.",
  TOKEN: "A virtual currency token or a denomination of a cryptocurrency",
  TOKEN_TYPE: "Token type may include XRC20, XRC721 or XRC1155.",
  CONTRACT: "Smart Contract associated with the particular token.",
  HOLDER: "The total number of unique addresses that hold the token",
  TOKEN_TOTAL_SUPPLY: "The number of coins that have been already created, minus any coins that have been burned",
  STATUS: "The token is either verified or unverified.",
  ACCOUNT_ADDRESS: "The unique address of a particular account.",
  ACCOUNT_TYPE: "Account type is either Account, Contract or Token.",
  ACCOUNT_BALANCE: "Balance held by a particular account.",
  WATCHLIST_ADDRESS: "Users' wallet address.",
  WATCHLIST_DESCRIPTION:
    "The description provided by the user while creating the watchlist.",
  WATCHLIST_BALANCE: "The amount available in the wallet.",
  WATCHLIST_ADDED_ON: "Date on which address was added.",
  WATCHLIST_NOTIFICATION: "Notification priorities set by the users.",
  PRIVATE_NOTE: "A private note added to a transaction.",
  PRIVATE_NOTE_ADDED_ON: "Private note creation date.",
  TAG_ADDRESS: "Wallet addresses with tag names.",
  NAME_TAG: "The tag name that is given to an address.",
  TAG_ADDED_ON: "The date on which the address was tagged.",
  CONTRACT_ADDRESS: "The unique address of the contract.",
  TOKEN_NAME: "Name of the token associated with the contract.",
  CONTRACT_NAME: "Name of the Smart Contract.",
  TOKEN_YES_NO:
    "Whether the token is associated with the Smart Contract or not.",
  VALUE: "Amount to tokens being transferred.",
  GAS: "The average transaction fee associated with the transaction.",
  RANK: "Account’s rank sorted on the basis of Balance.",
  PERCENTAGE: "Percentage of holdings out of the total supply.",
  HOLDER_RANK: "Holder’s rank sorted on the basis of Quantity.",
  WALLET_ADDRESS: "Wallet address.",
  QUANTITY: "The amount available in the wallet",
  EMAIL: "Email is required for sending the email notifications",
  Total_Txn: "Total number of incoming and outgoing transaction",
  Highest_Txn: "Highest amount send or received by the user",
  Txn_Fee: "Total transaction fee paid by the user",
  Tokens: "Number of XRC20 tokens available in the user's wallet",
  AVERAGE_BALANCE: "Average daily balance",
  PASSWORD: "Password must have at least 8 characters and contain the following: uppercase letters, lowercase letters, numbers, and symbols.",
  DOWNLOAD_CSV: "Select the transactions from table to download data",
};

export const toolTipMessages = {
  hashid:
    "A transaction hash is a unique character identifier that is generated whenever the transaction is executed.",
  blocknumber:
    "The number of block in which transaction was recorded. Block confirmation indicate how many blocks since the transaction is mined.",
  timestamp: "The date and time at which a transaction is mined.",
  from: "The sending party of the transaction(could be from a contact address)",
  to: "The receiving party of the transaction(could be from a contact address) ",
  value:
    "The value being transacted in XDC and fiat value. Note: You can click the fiat value(if available) to see historical value at the time of Transaction",
  txnfee:
    "The value being transacted in XDC and fiat value. Note: You can click the fiat value(if available) to see historical value at the time of Transaction",
  gasprovided:
    "Maximum amount of gas provided for the transaction. For normal XDC transfers the value is 21,000. For contract this value is higher an bound by block gas limit.",
  gasprice:
    "Cost per unit of gas specified for the transaction, in XDC and Gwei. The higher the gas price the higher hance of getting included in a block",
  gasused: "The exact unit of gas that was used for the transactions.",
  nounced:
    "Sequential running number for an address, beginning with 0 for the first transaction. For example, if the nonce of a transaction is 10, it would be 11th transaction sent from the sender's address.",
  input: "Additional information that is required for the transaction",
  transferToken:
    "The value being transacted in XDC and fiat value. Note: You can click the fiat value (if available) to see historical value at the time of transaction.",
  privatenote: "Private notes",
  age: "Time when was the transaction created.",
  date: "Transaction creation date."
};

export const decimalDivisionValue = {
  DECIMAL_DIVISON_VALUE: 1000000000000000000,
};

export const contractMethodTypes = {
  view: "view",
};


export const recentSearchTypeConstants = {
  TRANSACTION: 'TRANSACTION',
  ACCOUNT: 'WALLET',
  WALLET: 'WALLET',
  BLOCK: 'TOKEN',
  TOKEN: 'TOKEN',
};

export const authenticationProvider = {
  AUTH0: "AUTH0"
}