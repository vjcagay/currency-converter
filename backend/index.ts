import app from "./src/app";

const port = 8081;

app.listen(port, () => {
  console.log(`Server running at port ${port}.`);
});
