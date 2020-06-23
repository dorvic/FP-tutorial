import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import {billAmountInputMsg, tipAmountInputMsg} from "./Update";

const {
  div,
  h1,
  pre,
  label,
  input,
  span,
} = hh(h);

const calcTipAndTotal = (billAmount, tipPercent) => {
  const bill = parseFloat(billAmount);
  const tip = bill * parseFloat(tipPercent) / 100 || 0;
  return [tip, bill + tip]
}

const round = places => R.pipe(
    num => num * Math.pow(10, places),
    Math.round,
    num => num * Math.pow(10, -1 * places),
)

const formatMoney = R.curry(
    (symbol, places, number) => R.pipe(
        R.defaultTo(0),
        round(places),
        num => num.toFixed(places),
        R.concat(symbol)
    )(number)

);

function fieldSet(labelText, inputValue, oninput) {
  return div([
    label({className: 'db mb1'}, labelText),
    input({
      className: 'pa2 input-reset ba w-100 mb2',
      value: inputValue,
      type: 'text',
      oninput
    })
  ])
}

function totalField(text, value) {
  return div({className: 'flex justify-between mb2'}, [
    span({className: 'bold'}, text),
    span(`${value}`)
  ])
}

function tipCalculator(dispatch, model) {
  const {billAmount, tipPercent} = model;
  const [tip, total] = calcTipAndTotal(billAmount, tipPercent);
  const toMoney = formatMoney('$', 2);

  return div({className: 'w-50 mb2'},[
    fieldSet('Bill Amount', billAmount, e => dispatch(billAmountInputMsg(e.target.value))),
    fieldSet('Tip %', tipPercent, e => dispatch(tipAmountInputMsg(e.target.value))),
    totalField('Tip:', toMoney(tip)),
    totalField('Total:', toMoney(total)),
  ])
}


function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Tip Calculator'),
    tipCalculator(dispatch, model)
  ]);
}

export default view;
