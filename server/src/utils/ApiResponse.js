export default class ApiResponse {
  constructor({
    success = true,
    message = '',
    data = null,
    count = undefined,
  }) {
    this.success = success;
    this.message = message;

    if (count !== undefined) {
      this.count = count;
    }

    if (data !== null) {
      this.data = data;
    }
  }
}
