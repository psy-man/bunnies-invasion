import { Graphics, Container } from 'pixi.js';
import { Cannon } from './cannon';
import App from '../../app';


export class CannonType2 extends Cannon {

  public price: number = 15;
  public range: number = 170;

  public shotsPerSecond: number = 1;
  public speed: number = 20;

  public damage: number = 2;
  public radius: number = 18;

  constructor(public game: App, public posX: number, public posY: number) {
    super(game, posX, posY);

    this.game.states.money -= this.price;

    const cannon = new Container();

    const circle = new Graphics();
    circle.beginFill(0x38FF00);
    circle.drawCircle(0, 0, this.radius);
    circle.endFill();

    const line = new Graphics();
    line.lineStyle(4, 0xFFFFFF, 1);
    line.moveTo(0, 1);
    line.lineTo(25, 1);

    const radius = new Graphics();
    radius.lineStyle(1, 0x38FF00, 0.4);
    radius.drawCircle(0, 0, this.range);

    cannon.addChild(circle);
    cannon.addChild(line);
    cannon.addChild(radius);

    this.addChild(cannon);
  }
}
