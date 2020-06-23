import * as R from 'ramda';
import {CtoF, CtoK, FtoC, KtoC} from "./tempCalculations";

const TYPES = {
  SET_INPUT_VALUE: 'SET_INPUT_VALUE',
  SET_UNIT_VALUE: 'SET_UNIT_VALUE'
}

const convertFunction = {
  'Celsius': {
    'Fahrenheit': CtoF,
    'Kelvin': CtoK,
  },
  'Fahrenheit': {
    'Kelvin': R.pipe(FtoC, CtoK),
    'Celsius': FtoC
  },
  'Kelvin': {
    'Celsius': KtoC,
    'Fahrenheit': R.pipe(KtoC, CtoF)
  }
}


function convert(model) {

  const {leftValue, rightValue, leftUnit, rightUnit, sourceLeft} = model;

  if (leftValue === '' || rightValue === '') {
    return model;
  }

  const sourceValue = sourceLeft ? leftValue : rightValue;

  if (leftUnit === rightUnit) {
    return {
      ...model,
      rightValue: sourceValue,
      leftValue: sourceValue
    }
  }

  if (sourceLeft) {
    return {
      ...model,
      rightValue: Math.round(convertFunction[leftUnit][rightUnit](sourceValue))
    }
  }

  return {
    ...model,
    leftValue: Math.round(convertFunction[rightUnit][leftUnit](sourceValue))
  }
}


export const setInputValueMsg = direction => value => ({
  type: TYPES.SET_INPUT_VALUE,
  payload: {
    value,
    direction
  }
})

export const setUnitValueMsg = direction => value => ({
  type: TYPES.SET_UNIT_VALUE,
  payload: {
    value,
    direction
  }
})

const toInt = R.pipe(parseInt, R.defaultTo(0));

function update(msg, model) {
  const {type, payload} = msg;

  switch (type) {
    case TYPES.SET_INPUT_VALUE:
      return convert({
        ...model,
        [`${payload.direction}Value`]: toInt(payload.value),
        sourceLeft: payload.direction === 'left'
      })
    case TYPES.SET_UNIT_VALUE:
      return convert({
        ...model,
        [`${payload.direction}Unit`]: payload.value,
      })
    default:
      return model;
  }
}

export default update;
