import { RoutesTranslations } from './routes-translations';

export interface RoutesConfig {
  defaultLanguage: string;
  translations: {
    [languageCode: string]: RoutesTranslations;
  };
}

export const defaultRoutesConfig: RoutesConfig = {
  defaultLanguage: 'default',
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
      help: ['help'],
      sale: ['sale'],
      pageNotFound: ['**']
    }
  }
};
