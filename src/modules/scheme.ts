import $ from 'jquery';

interface Connection {
  from: string;
  to: string;
  arrow: boolean;
  sharedX?: number;
}

interface NodeCenter {
  x: number;
  y: number;
  l: number;
  r: number;
  t: number;
  b: number;
}

const connections: Connection[] = [
  { from: 'duhast', to: 'allik', arrow: true, sharedX: 520 },
  { from: 'anastasia', to: 'allik', arrow: false, sharedX: 520 },
  { from: 'allik', to: 'stanislav', arrow: false, sharedX: 60 },
  { from: 'alexander', to: 'stanislav', arrow: true },
  { from: 'ludmila', to: 'stanislav', arrow: true, sharedX: 140 },
  { from: 'olga', to: 'stanislav', arrow: true, sharedX: 140 },
  { from: 'sergey', to: 'stanislav', arrow: true, sharedX: 140 },
  { from: 'dmitry', to: 'olga', arrow: true },
  { from: 'kristina', to: 'olga', arrow: false },
  { from: 'maxim', to: 'olga', arrow: false },
  { from: 'igor', to: 'allik', arrow: true, sharedX: 60 },
  { from: 'anton', to: 'allik', arrow: true, sharedX: 60 },
  { from: 'maxim', to: 'dmitry', arrow: true, sharedX: 720 },
];

function getCenter(element: HTMLElement): NodeCenter {
  return {
    x: element.offsetLeft + element.offsetWidth / 2,
    y: element.offsetTop + element.offsetHeight / 2,
    l: element.offsetLeft,
    r: element.offsetLeft + element.offsetWidth,
    t: element.offsetTop,
    b: element.offsetTop + element.offsetHeight,
  };
}

export function initMason(): void {
  const $svg = $('#lines');
  if (!$svg.length) return;

  const container = $svg.parent()[0];

  const nodeElements: Record<string, HTMLElement> = {};

  $(container)
    .find('.node')
    .each(function () {
      const id = $(this).data('id') as string;
      if (id) nodeElements[id] = this;
    });

  const arrowSize = 6;
  let defs = '';
  let paths = '';

  connections.forEach(({ from, to, arrow, sharedX }, i) => {
    const f = getCenter(nodeElements[from]);
    const t = getCenter(nodeElements[to]);

    const fx = f.x < t.x ? f.r : f.l;
    const tx = f.x < t.x ? t.l : t.r;
    const fy = f.y;
    const ty = t.y;
    const mx = sharedX ?? (fx + tx) / 2;

    if (arrow) {
      defs += `<marker id="arr${i}" markerWidth="${arrowSize}" markerHeight="${arrowSize}" refX="${arrowSize - 1}" refY="${arrowSize / 2}" orient="auto" style="overflow:visible">
      <path d="M0,0 L0,${arrowSize} L${arrowSize},${arrowSize / 2} z" fill="#dde1e7" stroke="none" style="fill:#dde1e7"/>
</marker>`;
    }

    const markerEnd = arrow ? `marker-end="url(#arr${i})"` : '';
    paths += `<path d="M${fx},${fy} L${mx},${fy} L${mx},${ty} L${tx},${ty}"${markerEnd}/>`;
  });

  $svg[0].innerHTML = `<defs>${defs}</defs>${paths}`;
}
