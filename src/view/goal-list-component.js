import { AbstractComponent } from "../framework/view/abstract-component.js";

function createGoalListTemplate() {
  return `<div class="goalList"></div>`;
}

export default class GoalListComponent extends AbstractComponent {
  get template() {
    return createGoalListTemplate();
  }
}
