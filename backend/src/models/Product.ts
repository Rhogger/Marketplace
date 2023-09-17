export type ProductProps = {
  id?: number;
  name: string;
  description?: string;
  price: string;
  rate?: number;
  ratings?: RateProps[];
  comments?: CommentProps[];
};

type UpdateProductProps = {
  id: number;
  name?: string;
  description?: string;
  price?: string;
};

type CommentProps = {
  productId: number;
  userId: number;
  comment: string;
  createdAt?: Date;
};

type RateProps = {
  productId: number;
  userId: number;
  rate: number;
  createdAt?: Date;
};

class Product {
  private products: ProductProps[] = [];

  create(product: ProductProps): void {
    this.products.push({
      id: this.products.length + 1,
      ...product,
      comments: [],
      rate: 0,
      ratings: [],
    });
  }

  findById(id: number) {
    return this.products.find((product: ProductProps) => product.id == id);
  }

  findIndexById(id: number): number {
    const productIndex = this.products.findIndex(
      (product: ProductProps) => product.id == id
    );

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
      throw new Error('Produto não encontrado');
    }

    this.products.splice(productIndex, 1);
  }

  update(updatedProduct: UpdateProductProps): void {
    const productIndex = this.findIndexById(updatedProduct.id);

    if (!productIndex) {
      throw new Error('Produto não encontrado');
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updatedProduct,
    };
  }

  comment(commentProduct: CommentProps) {
    const productIndex = this.findIndexById(commentProduct.productId);

    if (!productIndex) {
      throw new Error('Produto não encontrado');
    }

    this.products[productIndex].comments?.push({
      ...commentProduct,
      createdAt: new Date(),
    });
  }

  private rateIsValid(rate: number) {
    return rate >= 0 && rate <= 5;
  }

  rate(rate: RateProps) {
    const productIndex = this.findIndexById(rate.productId);

    if (!productIndex) {
      throw new Error('Produto não encontrado');
    }

    if (!this.rateIsValid(rate?.rate)) {
      throw new Error('As avaliações devem ir de 0 até 5');
    }

    this.products[productIndex].ratings?.push({
      ...rate,
      createdAt: new Date(),
    });

    const product = this.findById(rate.productId);

    if (product?.ratings) {
      let productRate = 0;
      product?.ratings?.map((item: RateProps) => {
        productRate += item.rate;
      });

      this.products[productIndex].rate = Math.round(
        productRate / product?.ratings?.length
      );
    }
  }

  getRates(productId: number) {
    const productIndex = this.findIndexById(productId);

    if (!productIndex) {
      throw new Error('Produto não encontrado');
    }

    const product = this.findById(productId);

    return { rate: product?.rate, ratings: product?.ratings };
  }
}

export default Product;
