import HeaderComponent from "./view/header-component.js";
import AddGoalComponent from "./view/add-goal-component.js";
import ChartComponent from "./view/chart-component.js";
import GoalPresenter from "./presenter/goal-presenter.js";
import GoalModel from "./model/goal-model.js";
import { render, RenderPosition } from "./framework/view/render.js";
import GoalsApiService from "./framework/api/goal-api-service.js";

const body = document.querySelector(".body");
const main = document.querySelector(".main");

const goalApiService = new GoalsApiService("https://68f206afb36f9750deeb1de1.mockapi.io/goals");
const goalModel = new GoalModel(goalApiService);

const chartComponent = new ChartComponent();

function handleAddGoal(title) {
  goalModel.addGoal(title);
}

render(new HeaderComponent(), body, RenderPosition.AFTERBEGIN);
render(new AddGoalComponent({ onCreate: handleAddGoal }), main);

const presenter = new GoalPresenter({
  container: main,
  goalModel,
  chartComponent
});

presenter.init();

render(chartComponent, main);
chartComponent.initChart();
