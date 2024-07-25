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
    if (
      data == null ||
      !data.mainCharacter ||
      !data.characters ||
      !data.relationMap ||
      page === 0
    ) {
      return;
    }
    console.log(`${data.mainCharacter} ${data.characters} ${data.relationMap}`);

    const filteredCharacters = data.characters.filter(
      (character) => character !== data.mainCharacter,
    );

    const filteredRelationMap = data.relationMap.filter((relation) => {
      const { first, second } = relation;
      const isFirstValid =
        data.characters.includes(first) || first === data.mainCharacter;
      const isSecondValid =
        data.characters.includes(second) || second === data.mainCharacter;
      return isFirstValid && isSecondValid;
    });

    const newNodes = [
      { name: data.mainCharacter, isCenter: true },
      ...filteredCharacters.map((v) => ({
        name: v,
        isCenter: false,
      })),
    ] as Node[];

    nodes.current = newNodes;

    const newLinks = filteredRelationMap.map((relation) => ({
      source: relation.first,
      target: relation.second,
      description: relation.relationship,
      distance: relation.first === data.mainCharacter ? 400 : 200,
    }));

    setLinks(newLinks);
  }, [data, page]);

  return { nodes: nodes.current, links };
}
