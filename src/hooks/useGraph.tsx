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
        .attr('y2', (d) => (d.target as Node).y || null)
        .attr('stroke', '#aaa')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', 1);

      // link 중간에 연결관계 표시
      const textSelection = d3
        .select(linkSelector)
        .selectAll('text')
        .data(links)
        .join('text')
        .attr('x', (d) => ((d.source as Node).x + (d.target as Node).x) / 2)
        .attr('y', (d) => ((d.source as Node).y + (d.target as Node).y) / 2)
        .attr('dy', -5) // 텍스트의 y 위치 조정
        .attr('text-anchor', 'middle')
        .attr('fill', 'black')
        .attr('opacity', 0.3) // 초기에는 텍스트를 숨김
        .text((d) => d.description || '');

      // 텍스트 백그라운드 추가
      textSelection.each(function (d) {
        const bbox = this.getBBox();
        d3.select(this)
          .insert('rect', ':first-child')
          .attr('x', bbox.x - 2)
          .attr('y', bbox.y - 2)
          .attr('width', bbox.width + 4)
          .attr('height', bbox.height + 4)
          .attr('fill', 'white')
          .attr('stroke', 'none');
      });
    },
    [linkSelector],
  );

  const drawNode = useCallback(
    (nodes: Node[]) => {
      const RECT_WIDTH = 160;
      const RECT_HEIGHT = 80;
      const RECT_RADIUS = 10;

      // 직사각형
      d3.select(nodeSelector)
        .selectAll('rect')
        .data(nodes)
        .join('rect')
        .attr('x', (d) => (d.x || 0) - RECT_WIDTH / 2)
        .attr('y', (d) => (d.y || 0) - RECT_HEIGHT / 2)
        .attr('width', RECT_WIDTH)
        .attr('height', RECT_HEIGHT)
        .attr('stroke', 'black') // 경계선 색상
        .attr('stroke-width', 2) // 경계선 두께
        .attr('rx', RECT_RADIUS) // x축 둥근 반경
        .attr('ry', RECT_RADIUS) // y축 둥근 반경
        .attr('fill', 'white')
        .on('mouseover', (_, d) => d.name && changeHoveredNode(d.name))
        .on('mouseout', () => changeHoveredNode(''))
        .on('click', (_, d) => d.name && addChildrensNodes(d.name));

      const handleMouseOver = (_, d) => {
        if (d.name) {
          changeHoveredNode(d.name);

          // 노드 강조
          d3.select(nodeSelector)
            .selectAll('rect')
            .filter((nd) => nd === d)
            .attr('stroke', 'blue')
            .attr('stroke-width', 4);

          // 관련된 링크 강조 및 텍스트 표시
          d3.select(linkSelector)
            .selectAll('line')
            .filter(
              (link) =>
                (link.source as Node).name === d.name ||
                (link.target as Node).name === d.name,
            )
            .attr('stroke', 'blue')
            .attr('stroke-width', 4);

          d3.select(linkSelector)
            .selectAll('text')
            .filter(
              (link) =>
                (link.source as Node).name === d.name ||
                (link.target as Node).name === d.name,
            )
            .attr('opacity', 1);

          // 노드 텍스트 진하게
          d3.select(nodeSelector)
            .selectAll('text')
            .filter((nd) => nd === d)
            .attr('opacity', 1)
            .style('font-weight', 900);
        }
      };

      const handleMouseOut = () => {
        changeHoveredNode('');

        // 노드 강조 해제
        d3.select(nodeSelector)
          .selectAll('rect')
          .attr('stroke', 'black')
          .attr('stroke-width', 2);

        d3.select(linkSelector)
          .selectAll('line')
          .attr('stroke', '#aaa')
          .attr('stroke-width', 2)
          .attr('stroke-dasharray', 1);

        // 링크 텍스트 숨기기
        d3.select(linkSelector).selectAll('text').attr('opacity', 0.3);

        // 노드 텍스트 연하게
        d3.select(nodeSelector)
          .selectAll('text')
          .attr('opacity', 0.6)
          .style('font-weight', 700);
      };

      const handleDrag = d3
        .drag()
        .on('start', function (event, d) {})
        .on('drag', function (event, d) {
          d.x = event.x;
          d.y = event.y;
          d3.select(nodeSelector)
            .selectAll('text')
            .filter((nd) => nd === d)
            .attr('x', d.x)
            .attr('y', d.y);
          d3.select(nodeSelector)
            .selectAll('rect')
            .filter((nd) => nd === d)
            .attr('x', d.x - RECT_WIDTH / 2)
            .attr('y', d.y - RECT_HEIGHT / 2);
          d3.select(linkSelector)
            .selectAll('line')
            .filter(
              (link) =>
                (link.source as Node).name === d.name ||
                (link.target as Node).name === d.name,
            )
            .attr('x1', (link) => (link.source as Node).x)
            .attr('y1', (link) => (link.source as Node).y)
            .attr('x2', (link) => (link.target as Node).x)
            .attr('y2', (link) => (link.target as Node).y);
          d3.select(linkSelector)
            .selectAll('text')
            .filter(
              (link) =>
                (link.source as Node).name === d.name ||
                (link.target as Node).name === d.name,
            )
            .attr(
              'x',
              (link) => ((link.source as Node).x + (link.target as Node).x) / 2,
            )
            .attr(
              'y',
              (link) => ((link.source as Node).y + (link.target as Node).y) / 2,
            );
        })
        .on('end', function (event, d) {});

      const nodeSelection = d3
        .select(nodeSelector)
        .selectAll('rect')
        .data(nodes)
        .join('rect')
        .attr('x', (d) => (d.x || 0) - RECT_WIDTH / 2)
        .attr('y', (d) => (d.y || 0) - RECT_HEIGHT / 2)
        .attr('width', RECT_WIDTH)
        .attr('height', RECT_HEIGHT)
        .attr('rx', RECT_RADIUS) // x축 둥근 반경
        .attr('ry', RECT_RADIUS) // y축 둥근 반경
        .attr('stroke', 'black') // 경계선 색상
        .attr('stroke-width', 2) // 경계선 두께
        .attr('fill', 'white')
        .call(handleDrag)
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut);

      d3.select(nodeSelector)
        .selectAll('text')
        .data(nodes)
        .join('text')
        .text((d) => d.name)
        .attr('x', (d) => d.x || null)
        .attr('y', (d) => (d.y ? d.y : null))
        .attr('dy', 5)
        .attr('opacity', 0.6) // 초기에는 텍스트를 연하게 설정
        .style('font-weight', 700)
        .attr('fill', 'black')
        .style('color', '#222')
        .call(handleDrag)
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut);
    },
    [nodeSelector, addChildrensNodes, changeHoveredNode],
  );
  return { drawLink, drawNode };
};

export default useGraph;
