export default (records) => {
  return records
      .map((record) => record.amount)
      .reduce((sum, value) => sum + value, 0);
};
