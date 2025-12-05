import { AbstractComponent } from "../framework/view/abstract-component.js";

function createChartTemplate() {
  return `
    <div class="chartContainer">
      <div class="chartTitle">Статистика выполнения</div>
      <canvas id="statsChart"></canvas>
    </div>
  `;
}

export default class ChartComponent extends AbstractComponent {
  #chart = null;

  get template() {
    return createChartTemplate();
  }

  initChart() {
    const ctx = this.element.querySelector("#statsChart");

    this.#chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["ПН","ВТ","СР","ЧТ","ПТ","СБ","ВС"],
        datasets: [{
          label: "Выполнено задач",
          data: [0,0,0,0,0,0,0],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  updateChart(values) {
    if (!this.#chart) return;
    this.#chart.data.datasets[0].data = values;
    this.#chart.update();
  }
}
