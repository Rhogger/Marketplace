import * as http from '../core/infra/HttpResponse';

import { product } from "../core/factories/controllers/ProductFactory ";

type FindRequest = {
	id: number;
}

type DeleteRequest = {
	id: number;
}

type UpdateRequest = {
	id: number;
	name?: string;
	description?: string;
	price?: string;
}

type CreateRequest = {
	name: string;
	description: string;
	price: string;
}

class ProductController {
	static async create({ name, description, price }: CreateRequest): Promise<http.HttpResponse> {
		product.create({
			name,
			description,
			price,
		});

		return http.created();
	}

	static async list(): Promise<http.HttpResponse> {
		return http.ok(product.getAll());
	}

	static async find({ id }: FindRequest): Promise<http.HttpResponse> {
		const productFinded = product.findById(id);

		if (!productFinded) {
			return http.notFound('Produto não encontrado');
		}

		return http.ok(productFinded);
	}

	static async delete({ id }: DeleteRequest): Promise<http.HttpResponse> {
		try {
			product.delete(id);

			return http.ok();
		} catch (error) {
			return http.fail(error);
		}
	}

	static async update({ id, name, description, price }: UpdateRequest): Promise<http.HttpResponse> {
		try {
			product.update({
				id,
				name,
				description,
				price,
			});

			return http.ok();
		} catch (error) {
			return http.fail(error);
		}
	}
}

export default ProductController;