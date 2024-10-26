import express from "express";
import cors from "cors";
import multer from "multer";
import {
  getProductAll,
  editProduct,
  deleteProduct,
  createProduct,
  createCover,
  getProduct,
  getUser,
  createUser,
} from "./utils/dataQuery.js";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const app = express();
const PORT = 5000;
const upload = multer({});
const saltRounds = 10;

app.use(cors());
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));

if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => {
    console.log(`Server is listening at port: ${PORT}`);
  });
}
app.post("/signin", async (req, res) => {
  try {
    const userName = req.body.username;
    const passWord = req.body.password;
    const response = await getUser(userName);
    const userHash = response.password;
    const result = await bcrypt.compare(passWord, userHash);
    if (result == true) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
          username: userName,
        },
        process.env.JWT_SECRET
      );
      res.status(200).json(token);
    } else {
      res.status(401).send("Wrong Password");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

app.post("/signup", async (req, res) => {
  const userPassword = req.body.password;
  const userName = req.body.username;
  const adminKey = req.body.adminkey;
  if (adminKey == process.env.ADMIN_KEY) {
    try {
      const hash = await bcrypt.hash(userPassword, saltRounds);
      const response = await createUser(userName, hash);
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.get("/", async (req, res) => {
  const response = await getProductAll();
  res.status(200).json(response);
});

app.get("/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  const response = await getProduct(productId);
  res.status(200).json(response);
});

app.put("/admin/:id", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded == undefined) {
      console.log("no token");
      res.status(401).send("Unauthorized");
    }
    const productId = parseInt(req.params.id);
    const productName = req.body.productName;
    const productPrice = parseFloat(req.body.productPrice);
    const productDesc = req.body.productDescription;
    const productQuantity = parseInt(req.body.productQuantity);
    const response = await editProduct(
      productId,
      productName,
      productDesc,
      productQuantity,
      productPrice
    );
    res.status(200).json(response);
  } catch (err) {
    // err
  }
});

app.post(`/admin`, upload.single("coverImage[]"), async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded == undefined) {
      console.log("no token");
      res.status(401).send("Unauthorized");
    }
    const productName = req.body["productName"];
    const productDesc = req.body["productDescription"];
    const productPrice = parseFloat(req.body["productPrice"]);
    const productQuantity = parseInt(req.body["productQuantity"]);
    const cover = req.file;
    const cover_key = productName + "_" + cover.originalname + "_" + Date.now();
    const coverImageUrl = await createCover(cover, cover_key);

    const response = await createProduct(
      productName,
      productDesc,
      productPrice,
      productQuantity,
      coverImageUrl,
      cover_key
    );
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

app.delete("/admin/:id", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded == undefined) {
      console.log("no token");
      res.status(401).send("Unauthorized");
    }
    const productId = parseInt(req.params.id);
    const response = deleteProduct(productId);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});
