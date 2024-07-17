import { useEffect, useRef, useState } from 'react';
import { PersonData } from '../type/api/network';
import { Link, Node } from '../components/NetworkGraph/NetworkGraph';

export default function useGraphData(data: PersonData | null, page: number) {
  const [links, setLinks] = useState<Link[]>([]);
  const mainNode = useRef<Node>({ name: '주인공' });
  const nodes = useRef<Node[]>([]);

  useEffect(() => {
    if (data == null || page === 0) {
      return;
    }
    const newNodes = [
      mainNode.current,
      ...data.persons.map((v) => ({
        name: v.name,
      })),
    ] as Node[];

    nodes.current = newNodes;

    const newLinks = newNodes.map((node) => ({
      source: mainNode.current.name,
      target: node.name,
      description: '친구',
    }));

    setLinks(newLinks);
  }, [data, page]);

  return { nodes: nodes.current, links };
}
