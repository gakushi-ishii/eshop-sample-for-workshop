import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { products } from './data/products';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('商品詳細ページへの遷移', () => {
  it('商品カードをクリックすると詳細ページへ遷移する', () => {
    const target = products[0];
    renderAt('/');

    const grid = document.querySelector('.grid') as HTMLElement;
    const link = within(grid).getByText(target.name).closest('a')!;
    fireEvent.click(link);

    expect(
      screen.getByRole('heading', { level: 2, name: target.name }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /一覧へ戻る/ })).toBeInTheDocument();
  });

  it('詳細ページの「一覧へ戻る」で一覧へ戻れる', () => {
    renderAt(`/product/${products[0].id}`);

    fireEvent.click(screen.getByRole('link', { name: /一覧へ戻る/ }));

    expect(
      screen.getByRole('heading', { name: 'おすすめのアウトドア用品' }),
    ).toBeInTheDocument();
  });

  it('直接 /product/:id を開くと該当商品の詳細を表示する', () => {
    const target = products[1];
    renderAt(`/product/${target.id}`);

    expect(
      screen.getByRole('heading', { level: 2, name: target.name }),
    ).toBeInTheDocument();
    expect(screen.getByText(target.description)).toBeInTheDocument();
  });

  it('存在しない id ではフォールバック表示になる', () => {
    renderAt('/product/9999');

    expect(
      screen.getByText(/お探しの商品が見つかりませんでした/),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /一覧へ戻る/ })).toBeInTheDocument();
  });

  it('数値でない id ではフォールバック表示になる', () => {
    renderAt('/product/abc');

    expect(
      screen.getByText(/お探しの商品が見つかりませんでした/),
    ).toBeInTheDocument();
  });
});
