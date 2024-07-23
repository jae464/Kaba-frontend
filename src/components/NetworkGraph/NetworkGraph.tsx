import * as d3 from 'd3';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import useGraphData from '../../hooks/useGraphData';
import useGraph from '../../hooks/useGraph';
import useGraphZoom from '../../hooks/useGraphZoom';

import { CharacterRelationShip } from '../../type/api/relation';
import Lottie from 'react-lottie';
import animationData from '../../constants/book_loading.json';
import failtAnimationData from '../../constants/server_error.json';
import FailureLottie from '../Lotties/FailureLottie';
import LoadingLottie from '../Lotties/LoadingLottie';

export interface Node extends d3.SimulationNodeDatum {
  [key: string]: string | boolean | number | null | undefined;
  name: string;
  isCenter: boolean;
}

export interface Link {
  source: Node | string;
  target: Node | string;
  description: string;
  distance: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 84vh;
  justify-content: center;
  align-items: center;
  // flex-grow: 1;
  background-color: #ffe898;
  border-radius: 15px;
  /* border: 1px solid #ccc; */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;

  @media (max-width: 1224px) {
    width: 100%;
    height: 85vh;
  }

  @media (max-width: 767px) {
    width: 100%;
    height: 80vh;
  }
`;

const Graph = styled.svg`
  width: 80%;
  height: 80%;
  background-color: #ffd953;
  margin: 1rem auto;
  border-radius: 2rem;
  position: relative;
`;

const Links = styled.g`
  /* line {
    stroke: #aaa;
    stroke-width: 2px;
    stroke-dasharray: 1;
  } */
  path {
    fill: #aaa;
  }
`;

const Nodes = styled.g`
  text {
    text-anchor: middle;
    font-family: 'Helvetica Neue', Helvetica, sans-serif;av
    /* fill: #ccc; */
    fill-opacity: 50%;
    font-size: 24px;
    cursor: default;
    :hover {
      fill-opacity: 100%;
    }
  }
`;

interface NetworkGraphProps {
  // bookId: string;
  page: number;
  // data: PersonData | null;
  data: CharacterRelationShip | null;
  isFail?: boolean;
}

const NetworkGraph = ({ page, data, isFail = false }: NetworkGraphProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const linkRef = useRef<SVGGElement | null>(null);
  const nodeRef = useRef<SVGGElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { nodes, links } = useGraphData(data, page);

  const addChildrensNodes = useCallback((name: string) => {
    console.log(name);
  }, []);

  const { drawLink, drawNode } = useGraph(
    nodeRef.current,
    linkRef.current,
    addChildrensNodes,
    addChildrensNodes,
  );

  useGraphZoom(svgRef.current);

  useEffect(() => {
    console.log('인물관계도');
    if (data == null) return;
    if (!svgRef.current || nodes.length === 0 || links.length === 0) return;
    console.log(nodes, links);

    const mainCharacterNode = nodes.find(
      (node) => node.name === data.mainCharacter,
    );
    if (mainCharacterNode) {
      mainCharacterNode.fx = svgRef.current.clientWidth / 2;
      mainCharacterNode.fy = svgRef.current.clientHeight / 2;
    }

    d3.forceSimulation(nodes) // Force algorithm is applied to data.nodes
      .force(
        'link',
        d3
          .forceLink() // This force provides links between nodes
          .id(function (d) {
            return (d as Node).name;
          })
          // This provide  the id of a node
          .links(links)
          .distance((d) => (d as Link).distance), // 각 링크의 거리를 설정하는 부분
        // .distance(400), // and this the list of links
      )
      .force('charge', d3.forceManyBody().strength(-200).distanceMax(600))
      .force(
        'center',
        d3.forceCenter(
          svgRef.current?.clientWidth / 2,
          svgRef.current?.clientHeight / 2,
        ),
      ) // This force attracts nodes to the center of the svg area
      .force('collision', d3.forceCollide().radius(100))
      .on('tick', () => {
        setIsLoading(false);
        drawLink(links);
        drawNode(nodes);
      })
      .on('end', () => {
        console.log('end');
        console.log(links, nodes);
      });
  }, [nodes, links, drawLink, drawNode]);

  return (
    <Container>
      <Title>인물관계도</Title>
      <p style={{ marginTop: '1rem' }}>
        <span style={{ fontWeight: 'bold' }}>{page} 페이지</span>까지의
        관계도입니다.
      </p>
      {(!data || isLoading) && !isFail && (
        <LoadingContainer>
          <LoadingLottie />
        </LoadingContainer>
      )}
      {isFail && (
        <LoadingContainer>
          <FailureLottie />
          <p>서버에서 데이터를 받아오는데 실패했습니다.</p>
        </LoadingContainer>
      )}

      <Graph ref={svgRef}>
        <Links ref={linkRef}></Links>
        <Nodes ref={nodeRef}></Nodes>
      </Graph>
    </Container>
  );
};

const Title = styled.h1`
  font-weight: bold;
  margin-top: 2rem;
  font-size: 1.7rem;
`;

const LoadingContainer = styled.div`
  width: 80%;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export default NetworkGraph;
