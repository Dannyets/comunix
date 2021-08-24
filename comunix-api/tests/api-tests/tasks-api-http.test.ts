import { expect } from "chai";
import { apiHttpClient } from "../clients";
import { compareUtils } from '../utils';

describe("Tasks Api Http Tests", function (){
  this.timeout(5000);

  it("should get tasks", async () => {
    const res = await apiHttpClient.getTasks();
    const { tasks } = res.body;
    const actual = Array.isArray(tasks);
    expect(actual).to.be.true;
  });

  it("should create task", async () => {
    const task = {
      name: "Danny2",
      status: "IN_PROGRESS",
    };

    const res = await apiHttpClient.createTask(task);
    const { task: newTask } = res.body;
    const { _id } = newTask;
    expect(_id).to.not.be.undefined;
    compareUtils.compareTasks(newTask, task);
  });

  it("should create & update task", async () => {
    const task = {
      name: "Danny",
      status: "IN_PROGRESS",
    };
    const createRes = await apiHttpClient.createTask(task);
    const { task: actual } = createRes.body as any;
    const { _id } = actual;
    expect(_id).to.not.be.undefined;
    compareUtils.compareTasks(actual, task);

    const updatedTask = {
      name: 'UpdatedDanny',
      _id,
      status: 'COMPLETED'
    };
    const updatedRes = await apiHttpClient.updateTask(_id, updatedTask);
    const { message } = updatedRes.body as any;
    expect(message).to.eql(`Updated task: ${_id} successfully`);

    const res = await apiHttpClient.getTasks([_id]);
    const { tasks } = res.body as any;
    const [dbUpdatedTask] = tasks;
    compareUtils.compareTasks(dbUpdatedTask, updatedTask, true); 
  });

  it("should create & delete task", async () => {
    const task = {
      name: "Danny",
      status: "IN_PROGRESS",
    };
    const createRes = await apiHttpClient.createTask(task);
    const { task: actual } = createRes.body as any;
    const { _id } = actual;
    expect(_id).to.not.be.undefined;
    compareUtils.compareTasks(actual, task);

    const updatedRes = await apiHttpClient.removeTask(_id);
    const { message } = updatedRes.body as any;
    expect(message).to.eql(`Deleted task: ${_id} successfully`);

    const res = await apiHttpClient.getTasks([_id]);
    const { tasks } = res.body as any;
    expect(tasks.length).to.eql(0); 
  });
});
