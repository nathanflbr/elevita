import { NextRequest, NextResponse } from "next/server";
import { getAllProducts, getProductById } from "@/data/products";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const productId = parseInt(id, 10);

      if (isNaN(productId)) {
        return NextResponse.json(
          { error: "ID do produto deve ser um número válido" },
          { status: 400 }
        );
      }

      const product = getProductById(productId);

      if (!product) {
        return NextResponse.json(
          { error: "Produto não encontrado" },
          { status: 404 }
        );
      }

      return NextResponse.json({ product });
    }

    const products = getAllProducts();
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Erro na API de produtos:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
