/// <reference path="../promise.d.ts" />
import timeout = require("./timeout");

var queue: PromiseTask[] = [],
    isStarted = false;

function start(): void {
    if (isStarted) {
        return;
    }

    isStarted = true;
    execute(); // Start execution flow
}

function execute(): void {
    timeout(() => {
        if (queue.length === 0) {
            isStarted = false;
            return;
        }

        var task = queue.shift(),
            executor = task.executor,
            args = task.args;

        executor.apply(undefined, args);

        execute(); // recurse while queue.lenght > 0
    });
}

export function enqueue(executor: Function, args: any[]): void {
    queue.push({
        executor: executor,
        args: args
    });

    start();
}

export function clear(): void {
    queue = [];
}
