export interface CharacteristicInfo {
  path: string[];
  listen: boolean;
}

export interface ScanInstructions {
  addresses: string[];
  characteristicsInfo: CharacteristicInfo[];
}
