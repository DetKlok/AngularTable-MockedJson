export interface MockResponse {
  offset: number;
  limit: number;
  total: number;
  result: ResponseData[]
}

export interface Column {
  key: string,
  dataType: any
}

export interface InitialElState {
  cell: string,
  value: string | number | boolean | null | undefined,
  index: number
}

export interface ResponseData {
  [key: string]: string | number | boolean | null | undefined
  // healthIndex?: number,
  // endDate?: number,
  // minValueDateTime?: number,
  // type?: string
  // cowId?: number,
  // animalId?: number,
  // eventId?: number,
  // deletable?: boolean,
  // lactationNumber?: number,
  // daysInLactation?: number,
  // ageInDays?: number,
  // startDateTime?: number,
  // reportingDateTime?: number,
  // alertType?: string,
  // duration?: number,
  // originalStartDateTime?: number,
  // endDateTime?: number,
  // daysInPregnancy?: number,
  // heatIndexPeak?: number,
  // newGroupId?: number,
  // newGroupName?: string,
  // currentGroupId?: number,
  // currentGroupName?: string,
  // destinationGroup?: number,
  // destinationGroupName?: string,
  // calvingEase?: string | number | boolean, // no value for this field given
  // oldLactationNumber?: number,
  // newborns?: string | number | boolean, // no value for this field given,
  // cowEntryStatus?: string,
  // birthDateCalculated?: boolean,
  // sire?: string | number | boolean, // no value for this field given,
  // breedingNumber?: number,
  // isOutOfBreedingWindow?: boolean,
  // interval?: number
}
