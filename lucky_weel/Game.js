
class Game {

  constructor () {
    this.app = new PIXI.Application();
    this.wheel = new PIXI.Container();
    this.segments = 18;
    this.radius = 200;
    this.numbers = [10, 20, 35, 40, 44,  23, 80, 99, 55, 66,  30, 50, 90, 100, 15, 70, 90, 92]
  }
  
  async init () {

      this.app = new PIXI.Application();
      await this.app.init({
        width: 460,
        height: 460,
        backgroundColor: 0x111111,
      });

      document.body.prepend(this.app.canvas);

      this.createWeel();
      this.addArrow();
    }


  createWeel () {
      this.wheel = new PIXI.Container();
      this.wheel.x = this.app.screen.width / 2;
      this.wheel.y = this.app.screen.height / 2;
      this.app.stage.addChild(this.wheel);
      
      for (let i = 0; i < this.segments; i++) {
        this.addSegment(i);

    }

     this.play();
    
  }

  play () {
    let isPlay = false;
    let speed = 0;

    document.querySelector('.play').addEventListener('click', () => {
        if (isPlay) return;

        isPlay = true;
        speed = Math.random() * 0.35 + 0.4;
      });

      this.app.ticker.add(() => {
        if (!isPlay) return;

        this.wheel.rotation += speed;
        speed *= 0.985;

        if (speed < 0.002) {
          isPlay = false;
          this.getResult();
        }
      });

  }

  addSegment (position) {
    const g = new PIXI.Graphics();
    const start = (position / this.segments) * Math.PI * 2;
    const end = ((position + 1) / this.segments) * Math.PI * 2;

    g.beginFill(position % 2 ? 0xff0000 : 0x000000);
    g.moveTo(0, 0);
    g.arc(0, 0, this.radius, start, end);
    g.lineTo(0, 0);
    g.endFill();

    this.wheel.addChild(g);

    const angle = start + (end - start) / 2;
    const text = new PIXI.Text(this.numbers[position], {
      fontSize: 13,
      fill: 'white',
      fontWeight: 'bold'
    });

    text.anchor.set(0.5);
    text.x = Math.cos(angle) * this.radius * 0.65;
    text.y = Math.sin(angle) * this.radius * 0.65;
    text.rotation = angle + Math.PI / 2;
    this.wheel.addChild(text);
  }

  addArrow () {
      const arrow = new PIXI.Graphics();
      arrow.beginFill(0xffd700);
      arrow.drawPolygon([0, 0, -12, -25, 12, -25]);
      arrow.endFill();
      arrow.x = this.app.screen.width / 2;
      arrow.y = this.app.screen.height / 2 - this.radius;
      this.app.stage.addChild(arrow);
  }

  getResult() {
    let angle = this.wheel.rotation % (Math.PI * 2);
    if (angle < 0) angle += Math.PI * 2;

    const segmentAngle = (Math.PI * 2) / this.segments;

    const currentAngle = (Math.PI * 1.5 - angle) % (Math.PI * 2);

    const index = Math.floor(currentAngle / segmentAngle);

    const currentIndex = (index + this.segments) % this.segments;

    console.log('RESULT:', this.numbers[currentIndex]);
    this.showResult(this.numbers[currentIndex]);
    
  }
  

  showResult(value) {
    const overlay = new PIXI.Graphics();
    overlay.beginFill(0x000000, 0.7);
    overlay.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
    overlay.endFill();
    overlay.interactive = true;

    const box = new PIXI.Graphics();
    box.beginFill(0xffffff);
    box.drawRoundedRect(0, 0, 240, 160, 12);
    box.endFill();
    box.x = this.app.screen.width / 2 - 120;
    box.y = this.app.screen.height / 2 - 80;

    const text = new PIXI.Text(value, {
      fontSize: 48,
      fill: 0x222222,
      fontWeight: 'bold'
    });
    text.anchor.set(0.5);
    text.x = 120;
    text.y = 60;
    box.addChild(text);
    overlay.addChild(box);
    
    this.app.stage.addChild(overlay);

    setTimeout( () => {
      this.app.stage.removeChild(overlay);
    }, 3000);
}
  
}