d3.csv('android-app-data.csv', data => {
  const sortedData = data.map(obj => {
    return Object.assign(obj, { AccessCount: Number.parseInt(obj.AccessCount, 10) })
  }).sort((a, b) => b.AccessCount - a.AccessCount);
  console.log(sortedData);
});
