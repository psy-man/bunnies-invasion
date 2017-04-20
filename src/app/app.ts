import {
  Texture,
  Rectangle,
  Application,
  Sprite,
  Point
} from "pixi.js";

import { RobotBunny } from './objects/bunnies/robot-bunny';
import { SimpleCannon } from './objects/cannons/simple-cannon';
import { Bunny } from './objects/bunnies/bunny';
import { Cannon } from './objects/cannons/cannon';

import { getDistance, getTargetAngle } from './core/helpers';
import { Carrot } from './objects/carrot';
import { SpaceBunny } from './objects/bunnies/space-bunny';
import { SimpleBunny } from './objects/bunnies/simple-bunny';


export default class App {
  public app: any;

  private WIDTH: number = 800;
  private HEIGHT: number = 600;

  private bunnies: Bunny[] = [];
  private cannons: Cannon[] = [];

  constructor() {
  }

  preload() {
    // this.WIDTH = window.innerWidth;
    // this.HEIGHT = window.innerHeight;

    return Promise.resolve();
  }

  bootstrap() {
    this.createScene();
    this.initEvents();

    const bunny = new SpaceBunny(300, 30);
    this.addBunny(bunny);

    const bunny1 = new SimpleBunny(50, 30);
    this.addBunny(bunny1);

    const bunny2 = new RobotBunny(120, 30);
    this.addBunny(bunny2);


    const cannon = new SimpleCannon(400, 130);
    this.addCannon(cannon);

    const cannon1 = new SimpleCannon(200, 350);
    this.addCannon(cannon1);

    const cannon2 = new SimpleCannon(600, 350);
    this.addCannon(cannon2);

    this.render();
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });

    this.bunnies.forEach(b => b.move());
    this.bunnies = this.bunnies.filter(b => b.alpha > 0);

    for (const cannon of this.cannons) {
      let closest = null;
      let target: Bunny = null;

      cannon.carrots.forEach(c => c.move());
      cannon.carrots = cannon.carrots.filter(c => c.alpha > 0);

      if (this.bunnies.length) {
        for (let bunny of this.bunnies) {
          const distance = getDistance(cannon.position, bunny.position);

          if (distance > cannon.range + bunny.width) {
            continue;
          }

          if (!closest || distance < closest) {
            closest = distance;
            target = bunny;
          }
        }

        if (target) {
          cannon.rotation = getTargetAngle(cannon, target);

          if (cannon.carrots.length < 1) {
            const carrot = new Carrot(cannon, target);
            cannon.addCarrot(carrot);
            this.app.stage.addChild(carrot.getMesh());
          }
        }
      }
    }
  }

  private addBunny(bunny: Bunny) {
    this.bunnies.push(bunny);
    this.app.stage.addChild(bunny.getMesh());
  }

  private addCannon(cannon: Cannon) {
    this.cannons.push(cannon);
    this.app.stage.addChild(cannon.getMesh());
  }

  private createScene() {
    this.app = new Application(this.WIDTH, this.HEIGHT, { antialias: true });

    document.body.appendChild(this.app.view);
  }

  private initEvents() {
    // document.body.addEventListener('mousedown', this.onMouseDown.bind(this), false);
    // document.body.addEventListener('mousewheel', this.onMouseWheel.bind(this), false);
    //
    // window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
  }
}
