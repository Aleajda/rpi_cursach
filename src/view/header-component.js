import { AbstractComponent } from "../framework/view/abstract-component.js";

function createHeaderTemplate() {
  return `
    <header class="header">
      <div class="headerTitle">Планировщик привычек</div>
    </header>
  `;
}

export default class HeaderComponent extends AbstractComponent {
  get template() {
    return createHeaderTemplate();
  }
}
