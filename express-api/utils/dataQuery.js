import {
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { prisma, s3 } from "./dataClient.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function createProduct(
  productName,
  productDesc,
  productPrice,
  productQuantity,
  coverImageUrl,
  cover_key
) {
  try {
    const product = await prisma.product.create({
      data: {
        name: productName,
        description: productDesc,
        price: parseFloat(productPrice),
        cover: coverImageUrl,
        quantity: productQuantity,
        cover_key: cover_key,
      },
    });
    return product;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function createCover(coverImage, cover_key) {
  console.log(coverImage);

  const coverBuffer = coverImage.buffer;
  const createCover = new PutObjectCommand({
    Body: coverBuffer,
    ContentType: coverImage.mimetype,
    Key: cover_key,
    Bucket: process.env.COVER_IMAGE_BUCKET,
  });
  const getCover = new GetObjectCommand({
    Bucket: process.env.COVER_IMAGE_BUCKET,
    Key: cover_key,
  });
  try {
    await s3.send(createCover);
    const signedUrl = await getSignedUrl(s3, getCover, {
      expiresIn: 604800,
    });
    console.log(signedUrl);
    return signedUrl;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function getProduct(productId) {
  try {
    const response = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        name: true,
        description: true,
        price: true,
        quantity: true,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function getProductAll() {
  try {
    const response = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        cover: true,
        quantity: true,
        description: true,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function editProduct(
  productId,
  productName,
  productDesc,
  productPrice,
  productQuantity
) {
  try {
    const response = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name: productName,
        description: productDesc,
        price: productPrice,
        quantity: productQuantity,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function editPrice(productPrice) {
  try {
    const response = await prisma.product.updateMany({
      where: {
        price: {
          equals: productPrice,
        },
      },
      data: {
        price: productPrice,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function deleteProduct(productId) {
  try {
    const getKey = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        cover_key: true,
      },
    });
    const response = await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    const deleteCover = new DeleteObjectCommand({
      Key: response.cover_key,
      Bucket: process.env.COVER_IMAGE_BUCKET,
    });

    await s3.send(deleteCover);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function createUser(userName, passWord) {
  try {
    const response = prisma.user.create({
      data: {
        username: userName,
        password: passWord,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function getUser(username) {
  try {
    const response = prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        password: true,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
