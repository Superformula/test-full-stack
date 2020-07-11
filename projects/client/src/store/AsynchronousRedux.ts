export enum AsynchronousActionStatus {
    IN_PROGRESS = "ASYNC_IN_PROGRESS",
    SUCCESS = "ASYNC_SUCCESS",
    FAILURE = "ASYNC_FAILURE"
}

export interface AsynchronousAction {
    status: AsynchronousActionStatus;
}