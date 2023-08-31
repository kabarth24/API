require("express-async-errors");

const database = require("./database");

const AppError = require("./utils/App.Error");

const express = require("express"); // Importar o Express

const routes = require("./routes");

const app = express(); // Inicializar o Express
app.use(express.json());

app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

// Configurando a porta em que vai rodar
const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
