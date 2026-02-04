export class Album {
  constructor(
    public id: number,
    public title: string,
    public artist: string,
    public price: number,
    public image_url: string,
    public year: number
  ) {}
}