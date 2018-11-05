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
  translations: {
    default: RoutesTranslations;
    [languageCode: string]: RoutesTranslations;
  };
  parameterNamesMapping: ParameterNamesMapping;
}

export const defaultRoutesConfig: RoutesConfig = {
  translations: {
    default: {
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
    }
  },
  parameterNamesMapping: {
    product: {
      productCode: 'code'
    },
    category: {
      categoryCode: 'code'
    },
    myAccount_orderDetails: {
      orderCode: 'code'
    }
  }
};
