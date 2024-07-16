import * as d3 from 'd3';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { PersonData } from '../../type/api/network';
import useGraphData from '../../hooks/useGraphData';
import useGraph from '../../hooks/useGraph';
import useGraphZoom from '../../hooks/useGraphZoom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { getNetworkGraphDataAPI } from '../../api/openai';

export interface Node extends d3.SimulationNodeDatum {
  [key: string]: string | boolean | number | null | undefined;
  name: string;
}

export interface Link {
  source: Node | string;
  target: Node | string;
  description: string;
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
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Graph = styled.svg`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const Links = styled.g`
  line {
    stroke: #aaa;
    stroke-width: 0.5px;
    stroke-dasharray: 1;
  }
  path {
    fill: #aaa;
  }
`;

const Nodes = styled.g`
  text {
    text-anchor: middle;
    font-family: 'Helvetica Neue', Helvetica, sans-serif;av
    fill: #ccc;
    fill-opacity: 50%;
    font-size: 16px;
    cursor: default;
    :hover {
      fill-opacity: 100%;
    }
  }
`;

interface NetworkGraphProps {
  // bookId: string;
  // page: number;
  data: PersonData | null;
}

const NetworkGraph = ({ data }: NetworkGraphProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const linkRef = useRef<SVGGElement | null>(null);
  const nodeRef = useRef<SVGGElement | null>(null);
  // const [networkData, setNetworkData] = useState<PersonData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { nodes, links } = useGraphData(data);

  // const fetchPeopleData = async () => {
  //   if (bookId != null) {
  //     const datas = await getNetworkGraphData(bookId, 0, 100);
  //     console.log('fetchPeopleData : ' + datas);
  //     setNetworkData(datas);
  //   }
  // };

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
    if (!svgRef.current || nodes.length === 0 || links.length === 0) return;
    console.log(nodes, links);

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
          .distance(200), // and this the list of links
      )
      .force('charge', d3.forceManyBody().strength(-400).distanceMax(400))
      .force(
        'center',
        d3.forceCenter(
          svgRef.current?.clientWidth / 2,
          svgRef.current?.clientHeight / 2,
        ),
      ) // This force attracts nodes to the center of the svg area
      .on('end', () => {
        console.log('end');
        console.log(links, nodes);
        drawLink(links);
        drawNode(nodes);
        setIsLoading(false);
      });
  }, [nodes, links, drawLink, drawNode]);

  return (
    <Container>
      <Title>인물관계도</Title>
      {(!data || isLoading) && <LoadingSpinner />}
      <Graph ref={svgRef}>
        <Links ref={linkRef}></Links>
        <Nodes ref={nodeRef}></Nodes>
      </Graph>
    </Container>
  );
};

const Title = styled.h1`
  color: white;
  margin-top: 2rem;
  font-size: 1.7rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 84vh; // Container와 같은 높이로 설정
`;

export default NetworkGraph;
