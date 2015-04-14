var EaseBlock = (function(exports) {

    var undef;

    function EaseBlock() {}

    function init(cfg) {
        speakUtils.mixIn(this, {
            id: '',
            x: 0,
            y: 0,
            func: undef,
            baseColor: '#29282a',
            lineBaseColor: '#525152',
            color: '#f96e6e',
            lineWidth: 3,
            boxWidth: 360,
            boxHeight: 240,
            // font: '14px Lato',
            textColor: '#fff',
            animation: 0
        }, cfg);

        this.container = document.createElement('div');
        this.container.className = 'block';
        this.containerStyle = this.container.style;
        this.container.innerHTML = this.id;
    }

    EaseBlock.width = 360;
    EaseBlock.height = 240;
    EaseBlock.topHeight = 35;
    EaseBlock.boxWidth = 360;
    EaseBlock.boxHeight = 240;
    EaseBlock.seg = 100;
    EaseBlock.bottomHeight = 10;
    EaseBlock.cubeRadius = 10;
    EaseBlock.cubePadding = 10;
    EaseBlock.circleRadius = 30;
    EaseBlock.TYPES = ['line', 'block', 'cube', 'circle'];
    EaseBlock.type = 'line';

    function render(ctx) {
        var ratio;
        var width = EaseBlock.width;
        var height = EaseBlock.height;
        var topHeight = EaseBlock.topHeight;
        var boxWidth = EaseBlock.boxWidth;
        var boxHeight = EaseBlock.boxHeight;
        var cubeRadius = EaseBlock.cubeRadius;
        var cubePadding = EaseBlock.cubePadding;
        var circleRadius = EaseBlock.circleRadius;
        var seg = EaseBlock.seg;

        var animation = this.animation;
        var ease = this.func;
        ctx.save();

        ctx.save();

        if(EaseBlock.type == 'line') {

            ctx.translate(0, topHeight);
            ctx.fillStyle = this.baseColor;
            ctx.fillRect(0, 0, boxWidth, boxHeight);

            ctx.strokeStyle = this.lineBaseColor;
            ctx.lineWidth = this.lineWidth;
            ctx.beginPath();
            ctx.moveTo(0, boxHeight);
            for(var i = 1, len = seg; i < len; i++) {
                ratio = i / (seg - 1);
                ctx.lineTo(ratio * boxWidth, (1 - ease(ratio)) * boxHeight);
            }
            ctx.stroke();
            ctx.closePath();

            ctx.strokeStyle = this.color;
            ctx.beginPath();
            ctx.moveTo(0, boxHeight);
            for(i = 1, len = Math.round(seg * animation); i < len; i++) {
                ratio = i / (seg - 1);
                ctx.lineTo(ratio * boxWidth, (1 - ease(ratio)) * boxHeight);
            }
            ctx.stroke();
            ctx.closePath();
        } else if(EaseBlock.type == 'block') {
            ratio = ease(animation);
            ctx.translate(0, topHeight);
            ctx.fillStyle = this.baseColor;
            ctx.fillRect(0, 0, boxWidth, boxHeight);
            ctx.fillStyle = this.color;
            ctx.fillRect(0, boxHeight * (1 - ratio), boxWidth, boxHeight * ratio);
        } else if(EaseBlock.type == 'cube') {

            ctx.translate(cubeRadius, topHeight + boxHeight / 2);
            ctx.fillStyle = this.baseColor;
            ctx.fillRect(cubePadding -cubeRadius, -cubeRadius, (boxWidth - cubeRadius * 2 - cubePadding * 2), cubeRadius * 2);
            ctx.fillStyle = this.lineBaseColor;
            ctx.fillRect(cubePadding -cubeRadius, -cubeRadius, cubeRadius * 2, cubeRadius * 2);
            ctx.fillRect(cubePadding + boxWidth - cubeRadius * 3 - cubePadding * 2, -cubeRadius, cubeRadius * 2, cubeRadius * 2);

            ctx.translate(ease(animation) * (boxWidth - cubeRadius * 2 - cubePadding * 2), 0);
            ctx.fillStyle = this.color;
            ctx.fillRect(cubePadding-cubeRadius, -cubeRadius, cubeRadius * 2, cubeRadius * 2);
        } else {
            ctx.translate(boxWidth / 2, topHeight + boxHeight / 2);
            ctx.beginPath();
            ctx.fillStyle = this.baseColor;
            ctx.arc(0, 0, circleRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(0, 0, Math.max(circleRadius * ease(animation), 0), 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }

        ctx.restore();

        // ctx.fillStyle = this.textColor;
        // ctx.font = this.font;
        // ctx.textAlign = 'center';
        // ctx.fillText(this.id, boxWidth / 2, 24);

        ctx.restore();
    }

    var _p = EaseBlock.prototype;

    _p.init = init;
    _p.render = render;

    return EaseBlock;

}({}));
