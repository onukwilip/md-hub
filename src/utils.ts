export class SeriviceCard {
  constructor(
    public image: string,
    public priceList?: EachServiceClass[],
    public randomList?: string[],
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

export class ContactListClass {
  constructor(
    public icon: string,
    public name: string,
    public descrption: string
  ) {}
}
