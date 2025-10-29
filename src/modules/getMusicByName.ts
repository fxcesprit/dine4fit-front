export interface ITunesResult {
  resultCount: number;
  results: {
    wrapperType: string;
    artworkUrl100: string;
    artistName: string;
    collectionCensoredName: string;
    trackViewUrl: string;
    collectionId: number;
  }[];
}
