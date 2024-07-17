import { useCallback } from 'react';
import * as d3 from 'd3';
import { Link, Node } from '../components/NetworkGraph/NetworkGraph';

const useGraph = (
  nodeSelector: SVGGElement | null,
  linkSelector: SVGGElement | null,
  addChildrensNodes: (name: string) => void,
  changeHoveredNode: (name: string) => void,
) => {
  const drawLink = useCallback(
    (links: Link[]) => {
      d3.select(linkSelector)
        .selectAll('line')
        .data(links)
        .join('line')
        .attr('x1', (d) => (d.source as Node).x || null)
        .attr('y1', (d) => (d.source as Node).y || null)
        .attr('x2', (d) => (d.target as Node).x || null)
        .attr('y2', (d) => (d.target as Node).y || null);

      // link 중간에 연결관계 표시
      d3.select(linkSelector)
        .selectAll('text')
        .data(links)
        .join('text')
        .attr('x', (d) => ((d.source as Node).x + (d.target as Node).x) / 2)
        .attr('y', (d) => ((d.source as Node).y + (d.target as Node).y) / 2)
        .attr('dy', -5) // 텍스트의 y 위치 조정
        .attr('text-anchor', 'middle')
        .attr('fill', 'black')
        .text((d) => d.description || ''); // 연결 정보를 의미하는 텍스트
    },
    [linkSelector],
  );

  const drawNode = useCallback(
    (nodes: Node[]) => {
      const NORMAL_SYMBOL_SIZE = 200;
      const STAR_SYMBOL_SIZE = 100;
      const CIRCLE_RADIUS = 40;
      const RECT_WIDTH = 80;
      const RECT_HEIGHT = 40;

      const normalSymbol = d3
        .symbol()
        .type(d3.symbolSquare)
        .size(NORMAL_SYMBOL_SIZE)();

      const starSymbol = d3
        .symbol()
        .type(d3.symbolStar)
        .size(STAR_SYMBOL_SIZE)();

      const convertToColor = (value: number) => {
        const loged = Math.trunc(Math.log10(value));
        return d3
          .scaleLinear([0, 4], ['white', '#FFD600'])
          .interpolate(d3.interpolateRgb)(loged);
      };

      // 직사각형
      // d3.select(nodeSelector)
      //   .selectAll('rect')
      //   .data(nodes)
      //   .join('rect')
      //   .attr('x', (d) => (d.x || 0) - RECT_WIDTH / 2)
      //   .attr('y', (d) => (d.y || 0) - RECT_HEIGHT / 2)
      //   .attr('width', RECT_WIDTH)
      //   .attr('height', RECT_HEIGHT)
      //   .attr('stroke', 'black') // 경계선 색상
      //   .attr('stroke-width', 2) // 경계선 두께
      //   // .attr('transform', (d) => `translate(${[d.x, d.y]})`)
      //   // .attr('d', (d) => normalSymbol)
      //   // .attr('r', 40)
      //   .attr('fill', (d) => convertToColor(d.index || 1))
      //   .attr('fill-opacity', (d) => (d.name ? 1 : 0.5))
      //   .on('mouseover', (_, d) => d.name && changeHoveredNode(d.name))
      //   .on('mouseout', () => changeHoveredNode(''))
      //   .on('click', (_, d) => d.name && addChildrensNodes(d.name));

      // 원
      d3.select(nodeSelector)
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('cx', (d) => d.x || 0)
        .attr('cy', (d) => d.y || 0)
        .attr('r', CIRCLE_RADIUS)
        .attr('stroke', 'black') // 경계선 색상
        .attr('stroke-width', 2) // 경계선 두께
        .attr('fill', (d) => convertToColor(d.index || 1))
        .attr('fill-opacity', (d) => (d.name ? 1 : 0.5))
        .on('mouseover', (_, d) => d.name && changeHoveredNode(d.name))
        .on('mouseout', () => changeHoveredNode(''))
        .on('click', (_, d) => d.name && addChildrensNodes(d.name));

      d3.select(nodeSelector)
        .selectAll('text')
        .data(nodes)
        .join('text')
        .text((d) => d.name)
        .attr('x', (d) => d.x || null)
        .attr('y', (d) => (d.y ? d.y : null))
        .attr('dy', 5)
        .style('font-weight', 700)
        .attr('fill', 'black')
        .style('color', '#222');
      // .on('mouseover', (_, d) => d.doi && changeHoveredNode(d.key))
      // .on('mouseout', () => changeHoveredNode(''))
      // .on('click', (_, d) => d.doi && addChildrensNodes(d.doi));
    },
    [nodeSelector, addChildrensNodes, changeHoveredNode],
  );
  return { drawLink, drawNode };
};

export default useGraph;
