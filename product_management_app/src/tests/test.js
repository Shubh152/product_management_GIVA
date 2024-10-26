const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../app");

jest.mock("../app");
process.env.JWT_SECRET = "12345678";

// Mock PrismaClient
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Mock the product property methods explicitly
prisma.product = {
  findMany: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const validToken = jwt.sign({ name: "testuser" }, process.env.JWT_SECRET);

describe("Product API", () => {
  afterAll(async () => {
    // Optional cleanup actions if required
  });

  it("POST /signin - should return an session token", async () => {
    const response = await request(app).post("/signin").send({
      username: "admin2",
      password: "hello",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("GET /products - should return all products", async () => {
    prisma.product.findMany.mockResolvedValue([
      { id: 1, name: "Sample Product" },
    ]);

    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ id: 1, name: "Sample Product" }]);
  });

  it("POST /admin - should add a new product", async () => {
    const mockProduct = {
      name: "Test Product",
      description: "Test Description",
      price: 10.0,
      quantity: 5,
      imageUrl: "http://example.com/image.jpg",
    };

    prisma.product.create.mockResolvedValue(mockProduct);

    const response = await request(app)
      .post("/admin")
      .set("Authorization", `Bearer ${validToken}`)
      .field("name", "Test Product")
      .field("description", "Test Description")
      .field("price", "10.0")
      .field("quantity", "5");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockProduct);
  });

  it("PUT /admin/:id - should update the product", async () => {
    const updatedProduct = {
      name: "Updated Product",
      description: "Updated Description",
      price: 20.0,
      quantity: 10,
      imageUrl: "http://example.com/updated-image.jpg",
    };

    prisma.product.update.mockResolvedValue(updatedProduct);

    const response = await request(app)
      .put("/admin/1")
      .set("Authorization", `Bearer ${validToken}`)
      .send({
        name: "Updated Product",
        description: "Updated Description",
        price: "20.0",
        quantity: "10",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(updatedProduct);
  });

  it("DELETE /admin/:id - should delete the product", async () => {
    prisma.product.delete.mockResolvedValue({ id: 3 });

    const response = await request(app)
      .delete("/admin/3")
      .set("Authorization", `Bearer ${validToken}`);

    expect(response.statusCode).toBe(200);
  });
});
