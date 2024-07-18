export interface Relation {
  start_character: string;
  end_character: string;
  relationship: string;
}

export interface CharacterRelationShip {
  mainCharacter: string;
  characters: string[];
  relations: Relation[];
}
