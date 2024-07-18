export interface Relation {
  first: string;
  second: string;
  relationship: string;
}

export interface CharacterRelationShip {
  mainCharacter: string;
  characters: string[];
  relationMap: Relation[];
}
