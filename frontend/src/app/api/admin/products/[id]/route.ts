import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await params in Next.js 15+
    const params = await context.params;
    const { id } = params;

    await prisma.product.delete({
      where: { id },
    });

    const allProducts = await prisma.product.findMany({ orderBy: { createdAt: "asc" } });
    const fs = require('fs/promises');
    const path = require('path');
    await fs.writeFile(
      path.join(process.cwd(), 'src/lib/productData.json'),
      JSON.stringify(allProducts, null, 2)
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error deleting product" }, { status: 500 });
  }
}
