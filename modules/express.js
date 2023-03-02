const express = require("express");
const UserModel = require("../src/database/models/user.model");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request type: ${req.method}`);
  console.log(`Content Type: ${req.headers.contentType}`);
  console.log(`Date: ${new Date()}`);

  next();
});

app.get("/views/users", async (req, res) => {
  const users = await UserModel.find({});
  res.render("index", { users });
});

const port = 8080;

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

app.post("/users", async (req, res) => {
  // Criar usuário
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/users", async (req, res) => {
  // Buscar usuário
  try {
    const users = await UserModel.find({});

    res.status(200).json(users);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.get("/users/:id", async (req, res) => {
  // Buscar usuário por ID
  try {
    const id = req.params.id;

    const user = await UserModel.findById(id);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.patch("/users/:id", async (req, res) => {
  // Atualizar usuário por ID
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/users/:id", async (req, res) => {
  // Deletar usuário por ID
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndRemove(id);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
