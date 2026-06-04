import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const product = await prisma.product.create({
      data: {
        name: data.name,
        category: data.category || "men",
        price: parseFloat(data.price),
        image: data.image,
        images: data.images ? JSON.stringify(data.images) : null,
        stock: parseInt(data.stock) || 0,
        description: data.description,
      },
    });

    const allProducts = await prisma.product.findMany({ orderBy: { createdAt: "asc" } });
    const fs = require('fs/promises');
    const path = require('path');
    await fs.writeFile(
      path.join(process.cwd(), 'src/lib/productData.json'),
      JSON.stringify(allProducts, null, 2)
    );

    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error creating product" }, { status: 500 });
  }
}
