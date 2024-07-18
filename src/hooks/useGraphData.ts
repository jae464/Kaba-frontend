import { useEffect, useRef, useState } from 'react';
import { PersonData } from '../type/api/network';
import { Link, Node } from '../components/NetworkGraph/NetworkGraph';
import { CharacterRelationShip } from '../type/api/relation';

export default function useGraphData(
  data: CharacterRelationShip | null,
  page: number,
) {
  const [links, setLinks] = useState<Link[]>([]);
  // const mainNode = useRef<Node>({ name: '주인공' });
  const nodes = useRef<Node[]>([]);

  useEffect(() => {
    if (data == null || page === 0) {
      return;
    }
    console.log(`${data.mainCharacter} ${data.characters} ${data.relationMap}`);
    // const newNodes = [
    //   mainNode.current,
    //   ...data.persons.map((v) => ({
    //     name: v.name,
    //   })),
    // ] as Node[];

    const newNodes = [
      { name: data.mainCharacter },
      ...data.characters.map((v) => ({
        name: v,
      })),
    ] as Node[];

    nodes.current = newNodes;

    // const newLinks = newNodes.map((node) => ({
    //   // source: mainNode.current.name,
    //   // target: node.name,
    //   source: node.name,
    //   target: mainNode.current.name,
    //   description: '친구',
    // }));
    const newLinks = data.relationMap.map((relation) => ({
      source: relation.first,
      target: relation.second,
      description: relation.relationship,
      distance: relation.first === data.mainCharacter ? 400 : 200,
    }));

    setLinks(newLinks);
  }, [data, page]);

  return { nodes: nodes.current, links };
}
