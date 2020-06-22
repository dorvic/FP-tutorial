import {diff, patch} from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

function app(initModel, view, update, node) {
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

export default app;
