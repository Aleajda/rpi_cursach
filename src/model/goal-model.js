export default class GoalModel {
  #goals = [];
  #observers = [];
  #apiService = null;

  constructor(apiService) {
    this.#apiService = apiService;
  }

  addObserver(fn) {
    this.#observers.push(fn);
  }

  _notify() {
    this.#observers.forEach(fn => fn());
  }

  async init() {
    this.#goals = await this.#apiService.goals;
    this._notify();
  }

  async addGoal(title) {
    const newGoal = {
      title,
      days: [false, false, false, false, false, false, false],
      editing: false
    };

    const created = await this.#apiService.addGoal(newGoal);
    this.#goals.push(created);
    this._notify();
  }


  async updateGoal(id, newData) {
    const goal = this.#goals.find(g => g.id === id);
    if (!goal) return;

    const updatedGoal = { ...goal, ...newData };
    const updated = await this.#apiService.updateGoal(updatedGoal);

    this.#goals = this.#goals.map(g => g.id === id ? updated : g);
    this._notify();
  }


  async deleteGoal(id) {
    await this.#apiService.deleteGoal(id);
    this.#goals = this.#goals.filter(g => g.id !== id);
    this._notify();
  }

  async toggleDay(id, dayIndex) {
    const goal = this.#goals.find(g => g.id === id);
    if (!goal) return;

    const newDays = [...goal.days];
    newDays[dayIndex] = !newDays[dayIndex];

    const updatedGoal = { ...goal, days: newDays };
    const updated = await this.#apiService.updateGoal(updatedGoal);

    this.#goals = this.#goals.map(g => g.id === id ? updated : g);
    this._notify();
  }

  get goals() {
    return this.#goals;
  }
}
