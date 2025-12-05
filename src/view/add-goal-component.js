import { AbstractComponent } from "../framework/view/abstract-component.js";

function createAddGoalTemplate() {
  return `
    <div class="addGoal">
        <div class="addGoalTitle">Создать новую привычку</div>
        <div class="inputNewContainer">
            <div class="inputNewTitle">Название:</div>
            <input class="inputNew" placeholder="Введите название..." />
        </div>
        <button class="createButton">Создать</button>
        <button class="cancelButton">Отмена</button>
    </div>
  `;
}

export default class AddGoalComponent extends AbstractComponent {

  constructor({onCreate}) {
    super();
    this._onCreate = onCreate;

    this.element.querySelector(".createButton")
        .addEventListener("click", this._createHandler);
  }

  _createHandler = () => {
    const value = this.element.querySelector(".inputNew").value.trim();
    if (!value) return;
    this._onCreate(value);
    this.element.querySelector(".inputNew").value = "";
  };

  get template() {
    return createAddGoalTemplate();
  }
}
