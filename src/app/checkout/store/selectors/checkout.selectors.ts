import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './../reducers';
import * as fromReducer from './../reducers/checkout.reducer';

export const getCheckoutStepsState = createSelector(
  fromFeature.getCheckoutState,
  (state: fromFeature.CheckoutState) => state.steps
);

export const getDeliveryAddress: MemoizedSelector<any, any> = createSelector(
  getCheckoutStepsState,
  fromReducer.getDeliveryAddress
);

export const getDeliveryMode: MemoizedSelector<any, any> = createSelector(
  getCheckoutStepsState,
  fromReducer.getDeliveryMode
);

export const getSupportedDeliveryModes: MemoizedSelector<
  any,
  any
> = createSelector(getDeliveryMode, deliveryMode => {
  return Object.keys(deliveryMode.supported).map(
    code => deliveryMode.supported[code]
  );
});

export const getSelectedDeliveryMode: MemoizedSelector<
  any,
  any
> = createSelector(getDeliveryMode, deliveryMode => {
  if (deliveryMode.selected !== '') {
    return deliveryMode.supported[deliveryMode.selected];
  }
});

export const getPaymentDetails: MemoizedSelector<any, any> = createSelector(
  getCheckoutStepsState,
  fromReducer.getPaymentDetails
);