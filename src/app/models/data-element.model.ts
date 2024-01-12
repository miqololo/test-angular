export interface ChildElement {
  id: Number;
  color: string;
}

export interface DataElement {
  id: Number;
  int: number;
  float: number;
  color: string;
  child: ChildElement[];
}
