import GoalListComponent from "../view/goal-list-component.js";
import GoalItemComponent from "../view/goal-item-component.js";
import { render } from "../framework/view/render.js";

export default class GoalPresenter {
  #container = null;
  #goalModel = null;
  goalListComponent = new GoalListComponent();
  #chartComponent = null;

  constructor({ container, goalModel, chartComponent }) {
    this.#container = container;
    this.#goalModel = goalModel;
    this.#chartComponent = chartComponent;

    this.#goalModel.addObserver(this.#onModelChange.bind(this));
  }

  async init() {
    await this.#goalModel.init();
    render(this.goalListComponent, this.#container);
    this.#renderGoals();
  }


  #renderGoals() {
    this.goalListComponent.element.innerHTML = "";

    this.#goalModel.goals.forEach(goal => {
      render(new GoalItemComponent({
        goal,
        onEdit: this.#enterEditMode.bind(this),
        onSave: this.#saveGoal.bind(this),
        onDelete: this.#deleteGoal.bind(this),
        onToggleDay: this.#toggleDay.bind(this)
      }), this.goalListComponent.element);
    });

    this.#updateChart();
  }

  #enterEditMode(id) {
    this.#goalModel.updateGoal(id, { editing: true });
  }

  #saveGoal(id, newTitle) {
    this.#goalModel.updateGoal(id, { title: newTitle, editing: false });
  }

  #deleteGoal(id) {
    this.#goalModel.deleteGoal(id);
  }

  #toggleDay(id, dayIndex) {
    this.#goalModel.toggleDay(id, dayIndex);
  }

  #updateChart() {
    const stats = [0, 0, 0, 0, 0, 0, 0];

    this.#goalModel.goals.forEach(goal => {
      goal.days.forEach((done, dayIndex) => {
        if (done) stats[dayIndex] += 1;
      });
    });

    this.#chartComponent.updateChart(stats);
  }

  #onModelChange() {
    this.#renderGoals();
  }
}
