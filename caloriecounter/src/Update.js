import * as R from 'ramda';

const TYPES = {
    SHOW_FORM: 'SHOW_FORM',
    INPUT_DESCRIPTION: 'INPUT_DESCRIPTION',
    INPUT_CALORIES: 'INPUT_CALORIES',
    SAVE_MEAL: 'SAVE_MEAL',
    DELETE_MEAL: 'DELETE_MEAL',
    EDIT_MEAL: 'EDIT_MEAL'
}

export function showFormAction(showForm) {
    return ({
        type: TYPES.SHOW_FORM,
        showForm
    })
}

export function inputDescriptionAction(description) {
    return ({
        type: TYPES.INPUT_DESCRIPTION,
        description
    })
}

export function inputCaloriesAction(calories) {
    return ({
        type: TYPES.INPUT_CALORIES,
        calories
    })
}

export function deleteMealAction(id) {
    return ({
        type: TYPES.DELETE_MEAL,
        id
    })
}

export function editMealAction(editId) {
    return ({
        type: TYPES.EDIT_MEAL,
        editId
    })

}

export const saveMealAction = {type: TYPES.SAVE_MEAL}

function update(action, model) {
    switch (action.type) {
        case TYPES.SHOW_FORM:
            return {
                ...model,
                showForm: action.showForm,
                description: '',
                calories: 0
            }
        case TYPES.INPUT_CALORIES:
            const calories = R.pipe(
                parseInt,
                R.defaultTo(0)
            )(action.calories)
            return {
                ...model,
                calories
            }
        case TYPES.INPUT_DESCRIPTION:
            const {description} = action;
            return {
                ...model,
                description
            }
        case TYPES.SAVE_MEAL:
            return model.editId !== null ? editMeal(model) : addMeal(model)
        case TYPES.DELETE_MEAL:
            const {id} = action;
            return {
                ...model,
                meals: R.filter(
                    m => m.id !== id,
                    model.meals
                )
            }
        case TYPES.EDIT_MEAL:
            const {editId} = action;
            const meal = R.find(
                m => m.id === editId,
                model.meals
            );

            return {
                ...model,
                showForm: true,
                description: meal.description,
                calories: meal.calories,
                editId
            }
        default:
            return model;
    }
}

function editMeal(model) {
    const {editId, description, calories, meals} = model
    const editedMeals = R.map(
        meal => {
            if (meal.id === editId) {
                return {...meal, description, calories}
            }
            return meal;
        },
        meals
    )

    return {
        ...model,
        description: '',
        calories: 0,
        editId: null,
        showForm: false,
        meals: editedMeals
    }
}

function addMeal(model) {
    const { meals, description, calories, nextId} = model;
    const newMeal = {
        id: nextId,
        description,
        calories
    }

    return {
        ...model,
        nextId: nextId + 1,
        description: '',
        showForm: false,
        calories: 0,
        meals: [...meals, newMeal]
    }
}

export default update;
