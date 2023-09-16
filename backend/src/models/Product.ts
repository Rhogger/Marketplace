type ProductProps = {
  id?: number;
  name: string;
  description?: string;
  price: string;
  rating?: number;
  comments?: string[];
};


type UpdateProductProps = {
  id: number;
  name?: string;
  description?: string;
  price?: string;
};

class Product {
  private products: ProductProps[] = [];

  create(product: ProductProps): void {
    this.products.push({
      id: this.products.length + 1,
      ...product
    });
  }

  findById(id: number) {
    return this.products.find((product: ProductProps) => product.id == id);
  }


  findIndexById(id: number): number {
    const productIndex = this.products.findIndex((product: ProductProps) => product.id == id);

    if (productIndex === -1) {
      return 0;
    }

    return productIndex;
  }

  getAll(): ProductProps[] {
    return this.products;
  }

  delete(id: number) {
    const productIndex = this.findIndexById(id);

    if (!productIndex) {
      throw new Error("Produto não encontrado");
    }

    this.products.splice(productIndex, 1);
  }

  update(updatedProduct: UpdateProductProps): void {
    const productIndex = this.findIndexById(updatedProduct.id);

    if (!productIndex) {
      throw new Error("Produto não encontrado");
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updatedProduct,
    };
  }
}

export default Product;
