d3.csv('android-app-data.csv', data => {
  const sortedData = data.map(({ AccessCount, AppName }) => ({
                            AppName,
                            AccessCount: Number.parseInt(AccessCount, 10)
                          }))
                          .sort((a, b) => b.AccessCount - a.AccessCount);
  console.log(sortedData);
});
