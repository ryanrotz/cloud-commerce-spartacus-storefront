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
    homepage?: string | string[];
    cart?: string | string[];
    search?: string | string[];
    login?: string | string[];
    register?: string | string[];
    resetNewPassword?: string | string[];
    resetPassword?: string | string[];
    checkout?: string | string[];
    orderConfirmation?: string | string[];
    product?: string | string[];
    category?: string | string[];
    storeFinder?: string | string[];

    // myAccount pages
    // TODO: consider if should be prefixed with myAccount_ or not
    myAccount_orders?: string | string[];
    myAccount_orderDetails?: string | string[];

    contact?: string | string[];
    help?: string | string[];
    sale?: string | string[];

    pageNotFound?: string | string[];
  };
}

export const defaultServerConfig: ServerConfig = {
  server: {
    occPrefix: '/rest/v2/'
  },

  routePaths: {
    homepage: '',
    cart: 'cart',
    search: 'search/:query',
    login: 'login',
    register: 'register',
    resetNewPassword: 'reset-new-password/:token',
    resetPassword: 'reset-password',
    checkout: 'checkout',
    orderConfirmation: 'order-confirmation',
    product: 'product/:productCode',
    category: 'category/:categoryCode',
    // spike todo: add support for arrays:
    // [
    //   'category/:categoryCode',
    //   'category/:categoryCode/:title',
    //   'Brands/:brandName/c/:brandCode'
    // ],
    storeFinder: 'store-finder',

    myAccount_orders: 'my-account/orders',
    myAccount_orderDetails: 'my-account/orders/:orderCode',

    contact: 'contact',
    help: 'help',
    sale: 'sale',
    pageNotFound: '**'
  }
};
