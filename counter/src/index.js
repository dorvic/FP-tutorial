import hh from 'hyperscript-helpers';
import {h, diff, patch} from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

const {div, button} = hh(h);

const INITIAL_MODEL = 0;

const view = (dispatch, model) => {
    return div(
        [
            div({className: 'mb2'}, `Count: ${model}`),
            button({className: 'pv1 ph2 mr2 pointer', onclick: () => dispatch('plus')},'+'),
            button({className: 'pv1 ph2 pointer', onclick: () => dispatch('minus')},'-')
    ])
}

const update = (type, model) => {
    switch (type) {
        case 'plus':
            return model + 1;
        case 'minus':
            return  model - 1;
        default:
            return model
    }
}


const app = (initModel,view,update, node) => {
    let model = initModel;
    let currentView = view(dispatch, model);
    let rootNode = createElement(currentView);
    node.appendChild(rootNode);

    function dispatch(type) {
        model = update(type, model);
        const newView = view(dispatch, model);
        const patches = diff(currentView, newView);
        rootNode = patch(rootNode, patches);
        currentView = newView;
    }
}

const node = document.getElementById('app');
app(INITIAL_MODEL, view, update, node);
