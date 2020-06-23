import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import {h} from 'virtual-dom';
import {setInputValueMsg, setUnitValueMsg} from "./Update";

const {
    div,
    h1,
    pre,
    input,
    select,
    option
} = hh(h);

const UNITS = ['Celsius', 'Fahrenheit', 'Kelvin'];


function unitOptions(selectedUnit) {
    return R.map(
        unit => option({value: unit, selected: selectedUnit === unit}, unit),
        UNITS
    )
}

function tempBlock(dispatch, value, unit, onInputMsg, onChangeMsg) {
    return div({className: 'w-50 ma1'}, [
        input({
            type: 'text',
            className: 'db w-100 mv2 pa2 input-reset ba',
            value,
            oninput: e => dispatch(onInputMsg(e.target.value))
        }),
        select(
            {
                className: 'db w-100 pa2 ba input-reset br1 bg-white ba b--black',
                onchange: e => dispatch(onChangeMsg(e.target.value))
            },
            unitOptions(unit)
        )
    ])
}

function tempCalculator(dispatch, model) {
    return div({className: 'flex'}, [
        tempBlock(dispatch, model.leftValue, model.leftUnit, setInputValueMsg('left'), setUnitValueMsg('left')),
        tempBlock(dispatch, model.rightValue, model.rightUnit, setInputValueMsg('right'), setUnitValueMsg('right')),
    ])
}

function view(dispatch, model) {
    return div({className: 'mw6 center'}, [
        h1({className: 'f2 pv2 bb'}, 'Temperature Unit Converter'),
        tempCalculator(dispatch, model)
    ]);
}

export default view;
