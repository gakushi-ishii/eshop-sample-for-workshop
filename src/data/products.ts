import type { Product } from '../types';

/**
 * アウトドア用品店のサンプル商品データ。
 * 画像は public/images 配下に配置されています。
 */
export const products: Product[] = [
  {
    id: 1,
    name: 'ソーラー充電式フラッシュライト',
    description: '太陽光で充電できるアウトドア向けの高輝度フラッシュライト。防災用としても活躍します。',
    price: 2480,
    imageUrl: '/images/product1.png',
  },
  {
    id: 2,
    name: 'トレッキングポール',
    description: '登山やハイキングでの膝への負担を軽減する伸縮式トレッキングポールです。',
    price: 3980,
    imageUrl: '/images/product2.png',
  },
  {
    id: 3,
    name: 'アウトドアレインジャケット',
    description: '防水透湿素材を採用し、雨の日でも暖かく快適に過ごせるレインジャケットです。',
    price: 8900,
    imageUrl: '/images/product3.png',
  },
  {
    id: 4,
    name: 'サバイバルキット',
    description: '非常時やアウトドアの冒険に欠かせない道具を1つにまとめたサバイバルキットです。',
    price: 6480,
    imageUrl: '/images/product4.png',
  },
  {
    id: 5,
    name: 'アウトドアバックパック',
    description: 'アウトドアに必要な荷物をすべて収納できる大容量バックパックです。',
    price: 7980,
    imageUrl: '/images/product5.png',
  },
  {
    id: 6,
    name: 'キャンプ用調理器具セット',
    description: '屋外での調理に便利な鍋・フライパンをまとめたクッキングセットです。',
    price: 5480,
    imageUrl: '/images/product6.png',
  },
  {
    id: 7,
    name: 'キャンプストーブ',
    description: '屋外での調理に最適なコンパクトなキャンプ用ストーブです。',
    price: 4980,
    imageUrl: '/images/product7.png',
  },
  {
    id: 8,
    name: 'キャンプランタン',
    description: 'キャンプサイトを明るく照らす、長時間点灯できるランタンです。',
    price: 3480,
    imageUrl: '/images/product8.png',
  },
  {
    id: 9,
    name: 'キャンプテント',
    description: '設営が簡単で、快適な居住空間を提供するキャンプ用テントです。',
    price: 12800,
    imageUrl: '/images/product9.png',
  },
];

/**
 * id から商品を1件取得する。該当がなければ undefined を返す。
 */
export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id);
}
