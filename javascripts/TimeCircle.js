var TimeCircle = new Class({

    Implements: [Options, Events],

    options: {
        type: 'sec', //hour, min, sec
    },

    initialize: function(stage, options) {
        this.setOptions(options);
        this.stage = stage;
        this.vpx = stage.canvas.width / 2;
        this.vpy = stage.canvas.height / 2;
        this.radius = 1000;
        this.fl = 250;
        this.dx = 250;

        if (this.options.type == 'hour') this.counts = 24;
        else this.counts = 60;

        this.pointers = [];

        for (var i = 0; i < this.counts; i++) {
            var text = new createjs.Text(i, "50px Arial", "black");
            stage.addChild(text);
            this.pointers.push(text);
        }
    },

    draw: function() {
        for (var i = 0; i < this.counts; i++) {
            var text = this.pointers[i];
            var ypos = this.radius * Math.sin(i * 360 / this.counts * Math.PI / 180); //distance between y & vpy
            var zpos = this.radius - Math.cos(i * 360 / this.counts * Math.PI / 180) * this.radius;
            var scale = this.fl / (this.fl + zpos);
            var xpos = scale + this.dx;
            text.scaleX = text.scaleY = scale;
            text.alpha = scale + 0.3;
            text.x = this.vpx + xpos * scale;
            text.y = this.vpy + ypos * scale;
        }
        this.pointers[0].color = "brown";
    },

    sync: function() {
        var date = new Date();
        if (this.options.type == 'hour') var t = date.getHours();
        else if (this.options.type == 'min') var t = date.getMinutes();
        else var t = date.getSeconds();

        for (var i = 0; i < this.counts; i++) {
            this.pointers[i].text = t < 10 ? '0' + t : t;
            if (this.options.type == 'hour' && t == 23 || this.options.type != 'hour' && t == 59) t = 0;
            else t++;
        }
        this.draw();
    }

});