import $ from 'jquery';

interface ProductData {
  id: number;
  title: string;
}

const products: ProductData[] = [
  {
    id: 1,
    title:
      'Набор настольный BESTAR «Amenhotep» из дерева, 8 предметов, двойной лоток, светлая вишня',
  },
  {
    id: 2,
    title:
      'Набор настольный BESTAR «Charon» из дерева, 7 предметов, двойной лоток, красное дерево',
  },
  {
    id: 3,
    title:
      'Набор настольный BESTAR «Charon» из дерева, 7 предметов, двойной лоток, орех',
  },
  {
    id: 4,
    title:
      'Набор настольный BESTAR «Hercules» из дерева, 5 предметов, двойной лоток, красное дерево',
  },
  {
    id: 5,
    title:
      'Набор настольный BESTAR «Amenhotep» из дерева, 8 предметов, двойной лоток, светлая вишня',
  },
  {
    id: 6,
    title:
      'Набор настольный BESTAR «Charon» из дерева, 7 предметов, двойной лоток, красное дерево',
  },
  {
    id: 7,
    title:
      'Набор настольный BESTAR «Charon» из дерева, 7 предметов, двойной лоток, орех',
  },
  {
    id: 8,
    title:
      'Набор настольный BESTAR «Hercules» из дерева, 5 предметов, двойной лоток, красное дерево',
  },
];

export function initSlider(): void {
  const $slider = $('#slider');
  if (!$slider.length) return;

  $slider.html(products.map(createProductCard).join(''));

  initObserver();
}

function createProductCard(product: ProductData): string {
  return `
      <article class="product-card">
        <div class="product-card__img-wrap">
          <img class="product-card__img" src="./mock/${product.id}.png" alt="${product.title}" loading="lazy" />
          </div>
          <p class="product-card__text">${product.title}</p>
      </article>
    `;
}
function initObserver(): void {
  const sliderWrap = $('#slider').closest('.slider-wrap')[0];

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        $(entry.target).toggleClass(
          'product-card--faded',
          entry.intersectionRatio < 0.5,
        );
      });
    },
    {
      root: sliderWrap,
      threshold: [0, 0.5],
    },
  );

  $('.product-card').each(function () {
    observer.observe(this);
  });
}
