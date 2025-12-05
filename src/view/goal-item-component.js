import { AbstractComponent } from "../framework/view/abstract-component.js";

function createGoalItemView(goal) {
  return `
    <div class="goal">
      <div class="goalHeader">
          <div class="goalTitle">${goal.title}</div>
          <div class="goalEdit">Редактировать</div>
      </div>
      <table class="goalTable">
          <tr>
            <td>ПН</td><td>ВТ</td><td>СР</td><td>ЧТ</td><td>ПТ</td><td>СБ</td><td>ВС</td>
          </tr>
          <tr>
            ${goal.days
              .map((checked, index) => `
              <td><input type="checkbox" data-day="${index}" ${checked ? "checked" : ""} /></td>
            `).join("")}
          </tr>
      </table>
    </div>
  `;
}

function createGoalItemEdit(goal) {
  return `
    <div class="goal">
      <div class="goalHeader">
          <div class="goalSave">Сохранить</div>
          <div class="goalDelete">Удалить</div>
      </div>
      <div class="inputEditContainer">
          <div class="inputEditTitle">Название:</div>
          <input class="inputEdit" value="${goal.title}" />
      </div>
    </div>
  `;
}

export default class GoalItemComponent extends AbstractComponent {
  #goal = null;
  #onEdit = null;
  #onSave = null;
  #onDelete = null;
  #onToggleDay = null;

  constructor({ goal, onEdit, onSave, onDelete, onToggleDay }) {
    super();
    this.#goal = goal;

    this.#onEdit = onEdit;
    this.#onSave = onSave;
    this.#onDelete = onDelete;
    this.#onToggleDay = onToggleDay;

    this.element.addEventListener("click", this.#clickHandler);
  }

  #clickHandler = (e) => {
    if (e.target.classList.contains("goalEdit")) {
      this.#onEdit(this.#goal.id);
    }
    if (e.target.classList.contains("goalSave")) {
      const newTitle = this.element.querySelector(".inputEdit").value;
      this.#onSave(this.#goal.id, newTitle);
    }
    if (e.target.classList.contains("goalDelete")) {
      this.#onDelete(this.#goal.id);
    }
    if (e.target.dataset.day !== undefined) {
      const dayIndex = Number(e.target.dataset.day);
      this.#onToggleDay(this.#goal.id, dayIndex);
    }
  };

  get template() {
    return this.#goal.editing
      ? createGoalItemEdit(this.#goal)
      : createGoalItemView(this.#goal);
  }
}
