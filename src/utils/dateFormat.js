export default class DateFormatter extends Date {
  euFormat() {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const fullYear = this.getFullYear();
    const month = months[this.getMonth()];
    const date = this.getDate();
    return `${date}-${month}-${fullYear}`;
  }
  isoFormat() {
    const fullYear = this.getFullYear();
    const month =
      this.getMonth() + 1 < 10 ? `0${this.getMonth() + 1}` : this.getMonth();
    const date = this.getDate();
    return `${fullYear}-${month}-${date}`;
  }
}
