import ApiService from "./api-service.js";

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class GoalsApiService extends ApiService {

  get goals() {
    return this._load({ url: '' })
      .then(ApiService.parseResponse);
  }


  async addGoal(goal) {
    const response = await this._load({
      url: '',
      method: Method.POST,
      body: JSON.stringify(goal),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    });

    return ApiService.parseResponse(response);
  }


  async updateGoal(goal) {
    const response = await this._load({
      url: `${goal.id}`,
      method: Method.PUT,
      body: JSON.stringify(goal),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    });

    return ApiService.parseResponse(response);
  }

  async deleteGoal(goalId) {
    await this._load({
      url: `${goalId}`,
      method: Method.DELETE,
    });
  }
}
