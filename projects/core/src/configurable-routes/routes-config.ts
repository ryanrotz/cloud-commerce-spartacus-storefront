import { RoutesTranslations } from './routes-translations';

export interface ParameterNamesMapping {
  product: {
    [_: string]: string;
  };
  category: {
    [_: string]: string;
  };
  myAccount_orderDetails: {
    [_: string]: string;
  };
}

export interface RoutesConfig {
  defaultLanguage: string;
  translations: {
    [languageCode: string]: RoutesTranslations;
  };
  parameterNamesMapping: ParameterNamesMapping;
}

export const defaultRoutesTranslations: RoutesTranslations = {
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
  help: ['faq'],
  sale: ['sale'],
  pageNotFound: ['**']
};

export const defaultParameterNamesMapping: ParameterNamesMapping = {
  product: {
    productCode: 'code'
  },
  category: {
    categoryCode: 'code'
    // spike todo maybe add mappings for :Brands, :title and :brandCode
  },
  myAccount_orderDetails: {
    orderCode: 'code'
  }
};

export const defaultRoutesConfig: RoutesConfig = {
  defaultLanguage: 'defaultRoutes',
  translations: {
    defaultRoutes: defaultRoutesTranslations
  },
  // spike todo:
  parameterNamesMapping: defaultParameterNamesMapping;
};
