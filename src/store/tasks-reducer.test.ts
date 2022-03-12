import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC, setTaskAC,
    tasksReducer,
    TaskStateType
} from './tasks-reducer'
import {addTodolistAC, removeTodolistAC, setTodolistsAC, TodolistDomainType, todolistsReducer} from './todolist-reducer'
import {TaskStatuses, TaskType, TodoTaskPriorities} from '../api/todolist-api'

let startState: TaskStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", description: '',
                status: TaskStatuses.New, priority: TodoTaskPriorities.Low,
                startDate: '',  deadline: '', todoListId: "todolistId1",
                order: 0, addedDate: '' },
            { id: "2", title: "JS", description: '',
                status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
                startDate: '',  deadline: '', todoListId: "todolistId1",
                order: 0, addedDate: '' },
            { id: "3", title: "React", description: '',
                status: TaskStatuses.New, priority: TodoTaskPriorities.Low,
                startDate: '',  deadline: '', todoListId: "todolistId1",
                order: 0, addedDate: '' }
        ],
        "todolistId2": [
            { id: "1", title: "bread", description: '',
                status: TaskStatuses.New, priority: TodoTaskPriorities.Low,
                startDate: '',  deadline: '', todoListId: "todolistId2",
                order: 0, addedDate: '' },
            { id: "2", title: "milk", description: '',
                status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
                startDate: '',  deadline: '', todoListId: "todolistId2",
                order: 0, addedDate: '' },
            { id: "3", title: "tea", description: '',
                status: TaskStatuses.New, priority: TodoTaskPriorities.Low,
                startDate: '',  deadline: '', todoListId: "todolistId2",
                order: 0, addedDate: '' }
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", description: '',
                status: TaskStatuses.New, priority: TodoTaskPriorities.Low,
                startDate: '',  deadline: '', todoListId: "todolistId1",
                order: 0, addedDate: ''},
            { id: "2", title: "JS", description: '',
                status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
                startDate: '',  deadline: '', todoListId: "todolistId1",
                order: 0, addedDate: ''  },
            { id: "3", title: "React", description: '',
                status: TaskStatuses.New, priority: TodoTaskPriorities.Low,
                startDate: '',  deadline: '', todoListId: "todolistId1",
                order: 0, addedDate: '' }
        ],
        "todolistId2": [
            { id: "1", title: "bread", description: '',
                status: TaskStatuses.New, priority: TodoTaskPriorities.Low,
                startDate: '',  deadline: '', todoListId: "todolistId2",
                order: 0, addedDate: '' },
            { id: "3", title: "tea", description: '',
                status: TaskStatuses.New, priority: TodoTaskPriorities.Low,
                startDate: '',  deadline: '', todoListId: "todolistId2",
                order: 0, addedDate: ''  }
        ]
    });

});

test('correct task should be added to correct array', () => {

    const task = { id: "9", title: "juice", description: '',
        status: TaskStatuses.New, priority: TodoTaskPriorities.Low,
        startDate: '',  deadline: '', todoListId: "todolistId2",
        order: 0, addedDate: ''  }

    const action = addTaskAC(task, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juice');
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC("2", TaskStatuses.New, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(0);
    expect(endState["todolistId1"][1].status).toBe(2);
});

test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC("2", 'Buble-Gum', "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("Buble-Gum");
    expect(endState["todolistId1"][1].title).toBe("JS");
});

test('new array should be added when new todolist is added', () => {
    const todolist: TodolistDomainType = {
        id: "todoListID_1", title: 'What to learn', filter: 'all', addedDate: '', order: 0
    }
    const action = addTodolistAC(todolist);

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];
    const todolist: TodolistDomainType = {
        id: "todoListID_1", title: 'What to learn', filter: 'all', addedDate: '', order: 0
        }

    const action = addTodolistAC(todolist);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('empty arrays should be added when we add todolists', () => {

    const todolists: Array<TodolistDomainType> = [
        {id: "todolistId1", title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: "todolistId2", title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]

    const action = setTodolistsAC(todolists);

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState["todolistId1"]).toStrictEqual([]);
    expect(endState["todolistId2"]).toStrictEqual([]);
});

test('tasks array should be added for todolist', () => {

    const tasks: Array<TaskType> = [
        { id: "1", title: "CSS", description: '',
            status: TaskStatuses.New, priority: TodoTaskPriorities.Low,
            startDate: '',  deadline: '', todoListId: "todolistId1",
            order: 0, addedDate: ''},
        { id: "2", title: "JS", description: '',
            status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
            startDate: '',  deadline: '', todoListId: "todolistId1",
            order: 0, addedDate: ''  },
        { id: "3", title: "React", description: '',
            status: TaskStatuses.New, priority: TodoTaskPriorities.Low,
            startDate: '',  deadline: '', todoListId: "todolistId1",
            order: 0, addedDate: '' }
    ]

    const action = setTaskAC(tasks, "todolistId4");

    const endState = tasksReducer({
        'tdl_2' : [],
        'tdl_3' : [],
    }, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(3);
    expect(endState["todolistId4"][0].id).toBe('1');
    expect(endState["todolistId4"][2].title).toBe('React');
    expect(endState["todolistId1"]).toBeUndefined();
});






