import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../data/products';

const priceFormatter = new Intl.NumberFormat('ja-JP');

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const product = Number.isInteger(productId)
    ? getProductById(productId)
    : undefined;

  if (!product) {
    return (
      <div className="detail detail--notfound">
        <p className="empty">
          お探しの商品が見つかりませんでした。URL をご確認ください。
        </p>
        <Link className="back-link" to="/">
          ← 一覧へ戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="detail">
      <Link className="back-link" to="/">
        ← 一覧へ戻る
      </Link>

      <div className="detail__content">
        <div className="detail__imagewrap">
          <img
            className="detail__image"
            src={product.imageUrl}
            alt={product.name}
          />
        </div>

        <div className="detail__body">
          <h2 className="detail__name">{product.name}</h2>
          <p className="detail__price">
            ¥{priceFormatter.format(product.price)}
            <span className="detail__tax">税込</span>
          </p>
          <p className="detail__description">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
