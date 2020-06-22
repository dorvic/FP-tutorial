import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import {h} from 'virtual-dom';
import {
    showFormAction,
    inputDescriptionAction,
    inputCaloriesAction,
    saveMealAction,
    deleteMealAction,
    editMealAction
} from "./Update";

const { pre, div, h1, button, label, input, form, table, tr,th, td, tbody, i } = hh(h);


function buttonSet(dispatch) {
    return div([
        button(
            {
                className: 'f3 pv2 ph3 bg-blue white bn mr2 dim',
                type: 'submit'
            },
            'Save'
        ),
        button(
            {
                className: 'f3 pv2 ph3 bg-light-gray black bn dim',
                type: 'button',
                onclick: () => dispatch(showFormAction(false))
            },
            'Cancel'
        )
    ])
}

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

function formView(dispatch, model) {
    const { description, calories, showForm } = model;
    if (showForm) {
        return form(
            {
                className: 'w-100 mv2',
                onsubmit: e => {
                    e.preventDefault();
                    dispatch(saveMealAction)
                }
            },
            [
                fieldSet('Meal', description,
                    e => dispatch(inputDescriptionAction(e.target.value))
                ),
                fieldSet('Calories', calories || '',
                    e => dispatch(inputCaloriesAction(e.target.value))),
                buttonSet(dispatch)
            ]
        )
    }

    return (
        button(
            {
                className: 'f3 pv2 ph3 bg-blue white bn',
                type: 'button',
                onclick: () => dispatch(showFormAction(true))
            },
            'Add Meal'
            )
    );

}

function cell(tag, className, value) {
    return tag({className}, value);
}

const tableHeader = tr([
        cell(th, 'pa tl', 'Meal'),
        cell(th, 'pa tr', 'Calories'),
        cell(th, '', '')
    ]
)

function mealRow(dispatch, className, meal) {
    const {description, calories, id} = meal;

    return tr({className}, [
            cell(td, 'pa2', description),
            cell(td, 'pa2 tr', calories),
            cell(td, 'pa2 tr', [
                i({
                    className: 'ph1 fa fa-trash-o pointer',
                    onclick: () => dispatch(deleteMealAction(id))
                }),
                i({
                    className: 'ph1 fa fa-pencil-square-o pointer',
                    onclick: () => dispatch(editMealAction(id))
                })
            ]),
    ])
}

function totalRow(meals) {
    const total = R.pipe(
        R.map(({calories}) => calories),
        R.sum,
    )(meals);

    return tr(
        {className: 'bt b'},
        [
            cell(td, 'pa2 tr', 'Total: '),
            cell(td, 'pa2 tr', total),
            cell(td, '', '')
        ]
    )
}

function mealsBody(dispatch, className, meals) {
    return R.compose(
        R.partial(tbody, [className]),
        R.append(totalRow(meals)),
        R.map(R.partial(mealRow, [dispatch, 'stripe-dark'])),
    )(meals)
}


function tableView(dispatch, model) {
    const {meals} = model;
    if (!meals.length) {
        return div({className: 'mv2 i black-50'}, 'No meals added');
    }

    return table({
        className: 'mv2 w-100 collapse'
    },[
            tableHeader,
            mealsBody(dispatch,'', meals)
    ])
}

function view(dispatch, model) {
    return div(
        {className: 'mw6 center'},
        [
            h1({className: 'f2 pv2 bb'}, 'Calorie Counter'),
            formView(dispatch, model),
            tableView(dispatch, model)
        ]
    )
}

export default view;
