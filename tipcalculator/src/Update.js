import * as R from 'ramda';

export const MSGS = {
  BILL_AMOUNT_INPUT: 'BILL_AMOUNT_INPUT',
  TIP_PERCENT_INPUT: 'TIP_PERCENT_INPUT'
};

export const billAmountInputMsg = billAmount =>  ({
  type: MSGS.BILL_AMOUNT_INPUT,
  billAmount
});

export const tipAmountInputMsg = tipPercent => ({
  type: MSGS.TIP_PERCENT_INPUT,
  tipPercent
})


function update (msg, model) {
  const {type} = msg;

  switch (type) {
    case MSGS.BILL_AMOUNT_INPUT:
      const { billAmount } = msg;
      return {...model, billAmount}
    case MSGS.TIP_PERCENT_INPUT:
      const { tipPercent } = msg;
      return {...model, tipPercent}
    default:
      return model;

  }
}

export default update;
