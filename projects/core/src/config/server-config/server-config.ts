export abstract class ServerConfig {
  production?: boolean;
  server?: {
    baseUrl?: string;
    occPrefix?: string;
  };

  // TODO move to RoutesConfig
  // TODO consider if all those default routes should be configured in separate modules
  // But do we need them also here in case they are not defined in separate modules then?
  routePaths?: {
    homepage?: string[];
    cart?: string[];
    search?: string[];
    login?: string[];
    register?: string[];
    resetNewPassword?: string[];
    resetPassword?: string[];
    checkout?: string[];
    orderConfirmation?: string[];
    product?: string[];
    category?: string[];
    storeFinder?: string[];

    // myAccount pages
    // TODO: consider if should be prefixed with myAccount_ or not
    myAccount_orders?: string[];
    myAccount_orderDetails?: string[];

    contact?: string[];
    help?: string[];
    sale?: string[];

    pageNotFound?: string[];
  };
}

export const defaultServerConfig: ServerConfig = {
  server: {
    occPrefix: '/rest/v2/'
  },

  routePaths: {
    homepage: [''],
    cart: ['cart'],
    search: ['search/:query'],
    login: ['login'],
    register: ['register'],
    resetNewPassword: ['reset-new-password/:token'],
    resetPassword: ['reset-password'],
    checkout: ['checkout'],
    orderConfirmation: ['order-confirmation'],
    product: ['product/:productCode'],
    category: [
      'category/:categoryCode',
      'category/:categoryCode/:title',
      'Brands/:brandName/c/:brandCode'
    ],
    storeFinder: ['store-finder'],

    myAccount_orders: ['my-account/orders'],
    myAccount_orderDetails: ['my-account/orders/:orderCode'],

    contact: ['contact'],
    help: ['help'],
    sale: ['sale'],
    pageNotFound: ['**']
  }
};
