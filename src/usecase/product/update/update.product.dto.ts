interface UpdateProdcut {
  id: string;
  name: string;
  price: number;
}

export interface InputUpdateProductDto extends UpdateProdcut {}

export interface OutUpdateProductDto extends UpdateProdcut {}
