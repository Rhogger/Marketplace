type ProductProps = {
  id?: number;
  name: string;
  description?: string;
  price: string;
  rating: number;
  comments?: string[];
};

class Product {
  private products: ProductProps[] = [];

  createProduct(product: ProductProps) {
    this.products.push({
      id: this.products.length + 1,
      name: product.name,
      description: product?.description,
      price: product.price,
      rating: product.rating,
      comments: product?.comments,
    });
  }

  findProductById(id: number) {
    return this.products.find((product: ProductProps) => product.id == id);
  }

  deleteProduct(id: number) {
    const ProductsCount = this.products.length;

    this.products = this.products.filter(
      (product: ProductProps) => product.id != id
    );

    if (ProductsCount === this.products.length) return false;

    return this.products;
  }
}
