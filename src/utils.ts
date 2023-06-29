export class SeriviceCard {
  constructor(
    public image: string,
    public list: EachServiceClass[],
    public color?: string,
    public imgPosition?: React.CSSProperties
  ) {}
}

export class EachServiceClass {
  constructor(
    public amount: number | string,
    public data: number | string,
    public days: number | string
  ) {}
}
