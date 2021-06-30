// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/CST.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CST = void 0;
exports.CST = {
  SCENES: {
    LOAD: "LOAD",
    MENU: "MENU",
    PLAY: "PLAY"
  },
  CASTDIRECTION: {
    NORTH: 0,
    EAST: 1,
    SOUTH: 2,
    WEST: 3
  }
};
},{}],"src/scenes/LoadScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadScene = void 0;

var CST_1 = require("../CST");

var LoadScene =
/** @class */
function (_super) {
  __extends(LoadScene, _super);

  function LoadScene() {
    return _super.call(this, {
      key: CST_1.CST.SCENES.LOAD
    }) || this;
  }

  LoadScene.prototype.preload = function () {
    this.load.image("play", "./assets/play_button.png");
    this.load.image("options", "options_button.png");
    this.load.spritesheet("enemy", "/assets/enemy.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("Mage", "./assets/mage.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("FireBall", "./assets/Fireball_68x9.png", {
      frameWidth: 68,
      frameHeight: 9
    });
    this.load.spritesheet("EarthBall", "./assets/EarthBall.png", {
      frameWidth: 48,
      frameHeight: 48
    });
    this.load.image("IceBall", "./assets/IceBall.png");
    this.load.spritesheet("Portal", "./assets/Portal.png", {
      frameWidth: 32,
      frameHeight: 32
    });
  };

  LoadScene.prototype.create = function () {
    this.anims.create({
      key: "EarthBall",
      frameRate: 10,
      frames: this.anims.generateFrameNames("EarthBall", {
        start: 0,
        end: 12
      }),
      repeat: -1
    });
    this.anims.create({
      key: "Portal",
      frameRate: 10,
      frames: this.anims.generateFrameNames("Portal", {
        start: 0,
        end: 16
      }),
      repeat: -1
    });
    this.anims.create({
      key: "FireBall",
      frameRate: 10,
      frames: this.anims.generateFrameNames("FireBall", {
        start: 0,
        end: 59
      }),
      repeat: -1
    });
    this.scene.start(CST_1.CST.SCENES.MENU);
    this.anims.create({
      key: "down",
      frameRate: 1,
      frames: this.anims.generateFrameNames("enemy", {
        start: 0,
        end: 2
      }),
      repeat: -1
    });
    this.anims.create({
      key: "left",
      frameRate: 1,
      frames: this.anims.generateFrameNames("enemy", {
        start: 3,
        end: 5
      }),
      repeat: -1
    });
    this.anims.create({
      key: "right",
      frameRate: 1,
      frames: this.anims.generateFrameNames("enemy", {
        start: 7,
        end: 9
      }),
      repeat: -1
    });
    this.anims.create({
      key: "up",
      frameRate: 1,
      frames: this.anims.generateFrameNames("enemy", {
        start: 10,
        end: 12
      }),
      repeat: -1
    });
  };

  return LoadScene;
}(Phaser.Scene);

exports.LoadScene = LoadScene;
},{"../CST":"src/CST.ts"}],"src/scenes/MenuScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuScene = void 0;

var CST_1 = require("../CST");

var MenuScene =
/** @class */
function (_super) {
  __extends(MenuScene, _super);

  function MenuScene() {
    return _super.call(this, {
      key: CST_1.CST.SCENES.MENU
    }) || this;
  }

  MenuScene.prototype.create = function () {
    var _this = this;

    var playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.40, "play");
    playButton.setInteractive();
    this.scene.start(CST_1.CST.SCENES.PLAY);
    playButton.on("pointerup", function () {
      _this.scene.start(CST_1.CST.SCENES.PLAY);
    });
  };

  return MenuScene;
}(Phaser.Scene);

exports.MenuScene = MenuScene;
},{"../CST":"src/CST.ts"}],"src/components/playerComponents/spells/spell.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Spell =
/** @class */
function (_super) {
  __extends(Spell, _super);

  function Spell(scene, playerX, playerY, textureKey, direction) {
    var _this = _super.call(this, scene, playerX, playerY, textureKey) || this;

    _this.SPEED = 200;
    _this.DIRECTIONS = {
      0: [0, -1],
      1: [1, 0],
      2: [0, 1],
      3: [-1, 0]
    };
    _this.BOXVALUE = {
      1: 180,
      3: 0
    };
    _this.textureKey = textureKey;
    _this.scene = scene;
    _this.playerX = playerX;
    _this.playerY = playerY;
    _this.myDirection = 0;
    scene.add.existing(_this);
    scene.physics.add.existing(_this);

    _this.addToUpdateList();

    _this.addToDisplayList();

    _this.xSpeed = _this.SPEED * _this.DIRECTIONS[_this.myDirection][0];
    _this.ySpeed = _this.SPEED * _this.DIRECTIONS[_this.myDirection][1];

    _this.play(textureKey);

    return _this;
  }

  Spell.prototype.preUpdate = function (time, delta) {
    _super.prototype.preUpdate.call(this, time, delta);

    this.setVelocity(this.xSpeed, this.ySpeed);
  };

  Spell.prototype.Cast = function (x, y, direction) {
    this.myDirection = direction;
    this.xSpeed = this.SPEED * this.DIRECTIONS[this.myDirection][0];
    this.ySpeed = this.SPEED * this.DIRECTIONS[this.myDirection][1];
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.setVelocityX(this.xSpeed);
    this.setVelocityY(this.ySpeed);

    switch (direction) {
      case 3:
        this.setRotation(0);
        break;

      case 0:
        this.setRotation(1.5708);
        break;

      case 1:
        this.setRotation(3.14159);
        break;

      case 2:
        this.setRotation(4.71239);
        break;
    }
  };

  return Spell;
}(Phaser.Physics.Arcade.Sprite);

exports.default = Spell;
},{}],"src/components/playerComponents/spells/basicspell.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var spell_1 = __importDefault(require("./spell"));

var BasicSpell =
/** @class */
function (_super) {
  __extends(BasicSpell, _super);

  function BasicSpell(scene, playerX, playerY, name, direction) {
    var _this = _super.call(this, scene, playerX, playerY, name, direction) || this;

    _this.TRAVELDISTANCE = 10;

    if (_this.myDirection % 2 === 0) {
      _this.angle = -90 * _this.DIRECTIONS[_this.myDirection][1];
      _this.hitboxX = 10;
      _this.hitboxY = 70;
    } else {
      _this.angle = _this.BOXVALUE[_this.myDirection];
      _this.hitboxX = 70;
      _this.hitboxY = 10;
    }

    _this.setSize(_this.hitboxX, _this.hitboxY);

    _this.setAngle(_this.angle);

    return _this;
  }

  BasicSpell.prototype.CalculateBox = function () {};

  BasicSpell.prototype.Behavior = function () {
    if (Phaser.Math.Distance.Between(this.x, this.y, this.playerX, this.playerY) > 100) {
      this.setActive(false);
      this.setVisible(false);
    }
  };

  return BasicSpell;
}(spell_1.default);

exports.default = BasicSpell;
},{"./spell":"src/components/playerComponents/spells/spell.ts"}],"src/components/playerComponents/spellbook/SpellManager.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var basicspell_1 = __importDefault(require("../spells/basicspell"));

var SpellManager =
/** @class */
function (_super) {
  __extends(SpellManager, _super);

  function SpellManager(scene) {
    var _this = _super.call(this, scene.physics.world, scene) || this;

    _this.scene = scene;
    return _this;
  }

  SpellManager.prototype.CreateNewSpell = function (index, x, y, direction) {
    var spellList = [new basicspell_1.default(this.scene, 0, 0, "FireBall", 0), new basicspell_1.default(this.scene, 0, 0, "IceBall", 0), new basicspell_1.default(this.scene, 0, 0, "EarthBall", 0)];
    var spell = spellList[index];
    spell.Cast(x, y, direction);
  };

  SpellManager.prototype.Remove = function () {};

  SpellManager.prototype.update = function () {};

  return SpellManager;
}(Phaser.Physics.Arcade.Group);

exports.default = SpellManager;
},{"../spells/basicspell":"src/components/playerComponents/spells/basicspell.ts"}],"src/components/playerComponents/Player.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = void 0;

var SpellManager_1 = __importDefault(require("./spellbook/SpellManager"));

var Player =
/** @class */
function (_super) {
  __extends(Player, _super);

  function Player(scene, x, y, textrue, keyboard) {
    var _this = _super.call(this, scene, x, y, textrue) || this;

    scene.add.existing(_this);
    scene.sys.updateList.add(_this);
    scene.sys.displayList.add(_this);
    scene.physics.add.existing(_this);

    _this.setOrigin(0, 0);

    scene.physics.world.enableBody(_this);

    _this.setCollideWorldBounds(true);

    _this.setScale(.7);

    _this.setSize(35, 32).setOffset(15, 30);

    _this.keyboard = keyboard;
    _this.health = 100;
    _this.direction = 0;
    _this.spellManager = new SpellManager_1.default(_this.scene);

    _this.keyboard.addKeys('W,A,S,D,ONE,TWO,THREE');

    _this.currentSpell = 0;

    _this.create();

    return _this;
  }

  Player.prototype.preload = function () {};

  Player.prototype.create = function () {
    var _this = this;

    this.anims.create({
      key: "up",
      frameRate: 7,
      frames: this.anims.generateFrameNames("Mage", {
        start: 1,
        end: 8
      }),
      repeat: -1
    });
    this.anims.create({
      key: "idle-up",
      frameRate: 1,
      frames: this.anims.generateFrameNames("Mage", {
        start: 0,
        end: 0
      }),
      repeat: -1
    });
    this.anims.create({
      key: "left",
      frameRate: 7,
      frames: this.anims.generateFrameNames("Mage", {
        start: 10,
        end: 17
      }),
      repeat: -1
    });
    this.anims.create({
      key: "idle-left",
      frameRate: 1,
      frames: this.anims.generateFrameNames("Mage", {
        start: 9,
        end: 9
      }),
      repeat: -1
    });
    this.anims.create({
      key: "down",
      frameRate: 7,
      frames: this.anims.generateFrameNames("Mage", {
        start: 19,
        end: 26
      }),
      repeat: -1
    });
    this.anims.create({
      key: "idle-down",
      frameRate: 1,
      frames: this.anims.generateFrameNames("Mage", {
        start: 18,
        end: 18
      }),
      repeat: -1
    });
    this.anims.create({
      key: "right",
      frameRate: 7,
      frames: this.anims.generateFrameNames("Mage", {
        start: 27,
        end: 37
      }),
      repeat: -1
    });
    this.anims.create({
      key: "idle-right",
      frameRate: 1,
      frames: this.anims.generateFrameNames("Mage", {
        start: 27,
        end: 27
      }),
      repeat: -1
    });
    this.scene.input.on('pointerdown', function (pointer) {
      _this.Casting();
    }, this.scene);
    this.keyboard.on('keydown-ONE', function () {
      _this.currentSpell = 0;
      console.log("spell 1");
    });
    this.keyboard.on('keydown-TWO', function () {
      _this.currentSpell = 1;
      console.log("spell 2");
    });
    this.keyboard.on('keydown-THREE', function () {
      _this.currentSpell = 2;
      console.log("spell 3");
    });
    this.keyboard.on('keydown-W', function () {
      _this.setVelocityY(-250);

      _this.direction = 0;
    });
    this.keyboard.on('keydown-D', function () {
      _this.setVelocityX(250);

      _this.direction = 1;
    }, this);
    this.keyboard.on('keydown-S', function () {
      _this.setVelocityY(250);

      _this.direction = 2;
    });
    this.keyboard.on('keydown-A', function () {
      _this.setVelocityX(-250);

      _this.direction = 3;
    }, this);
    this.keyboard.on('keyup-A', function () {
      _this.setVelocityX(0);

      _this.play('idle-left', true);
    }, this);
    this.keyboard.on('keyup-D', function () {
      _this.setVelocityX(0);

      _this.play('idle-right', true);
    }, this);
    this.keyboard.on('keyup-W', function () {
      _this.setVelocityY(0);

      _this.play('idle-up', true);
    }, this);
    this.keyboard.on('keyup-S', function () {
      _this.setVelocityY(0);

      _this.play('idle-down', true);
    }, this);
  };

  Player.prototype.update = function () {
    this.Movement();
    this.ChangeSpell();
    this.spellManager.update();

    if (this.health == 0) {
      this.scene.scene.restart();
    }
  };

  Player.prototype.ChangeSpell = function () {};

  Player.prototype.Casting = function () {
    this.spellManager.CreateNewSpell(this.currentSpell, this.body.x + this.body.width / 2, this.body.y + this.body.height / 2, this.direction);
  };

  Player.prototype.Movement = function () {
    this.body.velocity.normalize().scale(100);

    if (this.body.velocity.x > 0 || this.body.velocity.x < 0 || this.body.velocity.y > 0 || this.body.velocity.y < 0) {
      if (this.body.velocity.x > 0) {
        if (this.body.velocity.y > 0) this.play("down", true);else this.play("right", true);
      } else if (this.body.velocity.x < 0) {
        if (this.body.velocity.y > 0) this.play("down", true);else this.play("left", true);
      } else {
        if (this.body.velocity.y > 0) this.play("down", true);else if (this.body.velocity.y < 0) this.play("up", true);
      }
      /*  if(this.body.velocity.y < 0){
            console.log("sad")
            this.play("up",true);
        }
        else if(this.body.velocity.y > 0){
            this.play("down",true)
        }*/

    }
  };

  Player.prototype.GetBody = function () {
    return this.body;
  };

  return Player;
}(Phaser.Physics.Arcade.Sprite);

exports.Player = Player;
},{"./spellbook/SpellManager":"src/components/playerComponents/spellbook/SpellManager.ts"}],"src/components/NPC/walker.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Walker =
/** @class */
function (_super) {
  __extends(Walker, _super);

  function Walker(scene, x, y, texture, player) {
    var _this = _super.call(this, scene, x, y, texture) || this;

    _this.STATES = ["IDLE", "CHASE"];
    _this.scene = scene;
    scene.add.existing(_this);
    scene.physics.add.existing(_this);

    _this.addToUpdateList();

    _this.addToDisplayList();

    _this.player = player;

    _this.play("down");

    return _this;
  }

  Walker.prototype.update = function () {
    var playerBody = this.player.GetBody();

    if (Phaser.Math.Distance.BetweenPoints(this.body, playerBody) < 300) {
      this.scene.physics.moveToObject(this, playerBody, 50);
    } else {
      this.scene.physics.moveToObject(this, playerBody, 0);
    }

    if (Phaser.Math.Distance.BetweenPoints(this.body, playerBody) < 25) {
      this.player.health -= 1;
    }
  };

  return Walker;
}(Phaser.Physics.Arcade.Sprite);

exports.default = Walker;
},{}],"src/BSP/BinaryTree.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BinaryTree = void 0;

var BinaryTree =
/** @class */
function () {
  function BinaryTree(root) {
    this.root = root;
  }

  BinaryTree.prototype.preOrder = function (rooms) {
    var current = this.root;

    var traverse = function traverse(node) {
      if (node.left == undefined && node.right == undefined) {
        rooms.push(node.container);
      }

      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };

    traverse(current);
  };

  return BinaryTree;
}();

exports.BinaryTree = BinaryTree;
},{}],"src/BSP/Point.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Point = void 0;

var Point =
/** @class */
function () {
  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  return Point;
}();

exports.Point = Point;
},{}],"src/BSP/Container.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Container = void 0;

var Point_1 = require("./Point");

var Container =
/** @class */
function () {
  function Container(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.center = new Point_1.Point(Math.floor(this.x + this.w / 2), Math.floor(this.y + this.h / 2));
  }

  return Container;
}();

exports.Container = Container;
},{"./Point":"src/BSP/Point.ts"}],"src/BSP/TreeNode.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeNode = void 0;

var TreeNode =
/** @class */
function () {
  function TreeNode(container) {
    this.container = container;
    this.left = this.right = undefined;
  }

  return TreeNode;
}();

exports.TreeNode = TreeNode;
},{}],"src/BSP.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var BinaryTree_1 = require("./BSP/BinaryTree");

var Container_1 = require("./BSP/Container");

var TreeNode_1 = require("./BSP/TreeNode");

var BSP =
/** @class */
function () {
  function BSP() {
    this.GROUND = 300;
    this.WALL = 510;
    this.minSize = 6;
    this.HEIGHT = 80;
    this.WIDTH = 80;
    this.width = this.WIDTH;
    this.height = this.HEIGHT;
    this.roomCount = 0;
    this.world = 0;
    this.leafs = [];
  }

  BSP.prototype.BSPController = function () {
    var _this = this;

    var rootContainer = new Container_1.Container(0, 0, this.width, this.height);
    var rooms = [];
    var root = this.SplitDirection(rootContainer, 3);
    var tree = new BinaryTree_1.BinaryTree(root);
    tree.preOrder(rooms);
    this.world = this.CreateWorld(this.width, this.height);
    rooms.forEach(function (room) {
      var roomPos = room.y * _this.width + room.x;

      for (var i = 0; i < room.w; i++) {
        _this.world[roomPos + i] = _this.WALL;
        _this.world[roomPos + i + _this.width * (room.h - 1)] = _this.WALL;

        for (var j = 0; j < room.h; j++) {
          var index = roomPos + _this.width * j;
          _this.world[index] = _this.WALL;
          _this.world[index + room.w - 1] = _this.WALL;
        }
      }
    });
    this.leafs = rooms;
    this.PostOrderTraversal(tree.root);
    var cWorld = [];

    while (this.world.length) {
      cWorld.push(this.world.splice(0, this.width));
    }

    return cWorld;
  };

  BSP.prototype.PostOrderTraversal = function (node) {
    if (node != undefined) {
      this.PostOrderTraversal(node.left);
      this.PostOrderTraversal(node.right);

      if (node.left != undefined && node.right != undefined) {
        this.ConnectContainers(node.left, node.right);
      }
    }
  };

  BSP.prototype.ConnectContainers = function (nodeLeft, nodeRight) {
    if (nodeLeft.container.center.x < nodeRight.container.center.x) {
      for (var x = nodeLeft === null || nodeLeft === void 0 ? void 0 : nodeLeft.container.center.x; x <= nodeRight.container.center.x; x++) {
        var xPos = nodeLeft.container.center.y * this.width + x;
        var xPosPad = (nodeLeft.container.center.y + 1) * this.width + x;
        this.world[xPos] = this.GROUND;
        this.world[xPosPad] = this.GROUND;
      }
    }

    if (nodeLeft.container.center.y < nodeRight.container.center.y) {
      for (var y = nodeLeft === null || nodeLeft === void 0 ? void 0 : nodeLeft.container.center.y; y <= nodeRight.container.center.y; y++) {
        var yPos = y * this.width + nodeLeft.container.center.x;
        var yPosPad = y * this.width + nodeLeft.container.center.x + 1;
        this.world[yPos] = this.GROUND;
        this.world[yPosPad] = this.GROUND;
      }
    }
  };

  BSP.prototype.GetXY = function (x, y) {
    var xPos = y * this.width + x;
    return xPos;
  };

  BSP.prototype.SplitDirection = function (container, iterations) {
    var node = new TreeNode_1.TreeNode(container);

    if (iterations != 0) {
      var rand = Math.floor(Math.random() * 100 + 0);

      if (rand % 2 == 0) {
        var splits = this.WorldCopyX(container);
        node.left = this.SplitDirection(splits[0], iterations - 1);
        node.right = this.SplitDirection(splits[1], iterations - 1);
      } else {
        var splits = this.WorldCopyY(container);
        node.left = this.SplitDirection(splits[0], iterations - 1);
        node.right = this.SplitDirection(splits[1], iterations - 1);
      }
    }

    return node;
  };

  BSP.prototype.WorldCopyX = function (container) {
    var min = Math.floor(container.w * 0.40);
    var max = Math.floor(container.w * 0.70);
    var splitOn = Math.floor(Math.random() * (max - min) + min);
    var remainder = container.w - splitOn;
    var containerL = new Container_1.Container(container.x, container.y, container.w - remainder, container.h);
    var containerR = new Container_1.Container(container.x + splitOn, container.y, container.w - splitOn, container.h);

    if (containerL.w < this.minSize || containerR.w < this.minSize) {
      return this.WorldCopyX(container);
    } else {
      return [containerL, containerR];
    }
  };

  BSP.prototype.WorldCopyY = function (container) {
    var min = Math.floor(container.h * 0.30);
    var max = Math.floor(container.h * 0.70);
    var splitOn = Math.floor(Math.random() * (max - min) + min);
    var remainder = container.h - splitOn;
    var containerL = new Container_1.Container(container.x, container.y, container.w, container.h - remainder);
    var containerR = new Container_1.Container(container.x, container.y + splitOn, container.w, container.h - splitOn);

    if (containerL.h < this.minSize || containerR.h < this.minSize) {
      return this.WorldCopyY(container);
    } else {
      return [containerL, containerR];
    }
  };

  BSP.prototype.CreateWorld = function (width, height) {
    var level = [];

    for (var i = 0; i < width; i++) {
      for (var j = 0; j < height; j++) {
        level.push(this.GROUND);
      }
    }

    return level;
  };

  return BSP;
}();

exports.default = BSP;
},{"./BSP/BinaryTree":"src/BSP/BinaryTree.ts","./BSP/Container":"src/BSP/Container.ts","./BSP/TreeNode":"src/BSP/TreeNode.ts"}],"src/components/exit/exit.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Exit =
/** @class */
function (_super) {
  __extends(Exit, _super);

  function Exit(scene, x, y, texture, player) {
    var _this = _super.call(this, scene, x, y, texture) || this;

    _this.scene = scene;
    scene.add.existing(_this);
    scene.physics.add.existing(_this);

    _this.addToUpdateList();

    _this.addToDisplayList();

    _this.player = player;

    _this.anims.play("Portal");

    return _this;
  }

  Exit.prototype.update = function () {
    var playerBody = this.player.GetBody();

    if (Phaser.Math.Distance.BetweenPoints(this.body.center, playerBody.center) <= 25) {
      this.scene.scene.restart();
    }
  };

  return Exit;
}(Phaser.Physics.Arcade.Sprite);

exports.default = Exit;
},{}],"src/scenes/PlayScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayScene = void 0;

var CST_1 = require("../CST");

var Player_1 = require("../components/playerComponents/Player");

var walker_1 = __importDefault(require("../components/NPC/walker"));

var BSP_1 = __importDefault(require("../BSP"));

var exit_1 = __importDefault(require("../components/exit/exit"));

var PlayScene =
/** @class */
function (_super) {
  __extends(PlayScene, _super);

  function PlayScene() {
    var _this = _super.call(this, {
      key: CST_1.CST.SCENES.PLAY
    }) || this;

    _this.WALL = 510;
    _this.tileSize = 16;
    return _this;
  }

  PlayScene.prototype.preload = function () {
    this.load.image("terrain", "./assets/terrain.png");
    this.load.tilemapTiledJSON("map", "./assets/map.json");
  };

  PlayScene.prototype.create = function () {
    var bsp = new BSP_1.default();
    var world = bsp.BSPController();
    var map = this.make.tilemap({
      data: world,
      tileWidth: this.tileSize,
      tileHeight: this.tileSize
    });
    var tiles = map.addTilesetImage('terrain');
    var layer = map.createLayer(0, tiles, 0, 0);
    layer.setCollision(this.WALL, true);
    var terrain = map.addTilesetImage("terrain", "terrain");
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    var keyboard = this.input.keyboard;
    this.mage = new Player_1.Player(this, map.width, map.height, "Mage", keyboard);
    this.cameras.main.setSize(800, 600);
    this.cameras.main.startFollow(this.mage);
    this.cameras.main.setBounds(0, 0, 80 * this.tileSize, this.tileSize * 80);
    this.physics.add.collider(this.mage, layer);
    var rooms = bsp.leafs;
    var exitRoom = Math.floor(Math.random() * rooms.length + 0);
    console.log(rooms[exitRoom]);
    console.log(rooms[exitRoom]["center"].x, rooms[exitRoom]["center"].y);
    var xPos = rooms[exitRoom]["center"].x * this.tileSize;
    var yPos = rooms[exitRoom]["center"].y * this.tileSize;
    this.exit = new exit_1.default(this, xPos, yPos, "Portal", this.mage);
    this.healthText = this.add.text(16, 16, "Health: " + this.mage.health, {
      fontSize: '32px',
      color: "#ffffff"
    });
    this.healthText.setScrollFactor(0);
    this.testEnemy = new walker_1.default(this, 150, 150, "enemy", this.mage);
    this.physics.add.collider(this.testEnemy, layer);
  };

  PlayScene.prototype.update = function (time, delta) {
    this.mage.update();
    this.testEnemy.update();
    this.exit.update();
    this.healthText.setText("Health: " + this.mage.health);
  };

  return PlayScene;
}(Phaser.Scene);

exports.PlayScene = PlayScene;
},{"../CST":"src/CST.ts","../components/playerComponents/Player":"src/components/playerComponents/Player.ts","../components/NPC/walker":"src/components/NPC/walker.ts","../BSP":"src/BSP.ts","../components/exit/exit":"src/components/exit/exit.ts"}],"src/main.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** @type {import("../typings/phaser")} */

var LoadScene_1 = require("./scenes/LoadScene");

var MenuScene_1 = require("./scenes/MenuScene");

var PlayScene_1 = require("./scenes/PlayScene");

var game = new Phaser.Game({
  width: 800,
  height: 600,
  scene: [LoadScene_1.LoadScene, MenuScene_1.MenuScene, PlayScene_1.PlayScene],
  render: {
    pixelArt: true
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  }
});
},{"./scenes/LoadScene":"src/scenes/LoadScene.ts","./scenes/MenuScene":"src/scenes/MenuScene.ts","./scenes/PlayScene":"src/scenes/PlayScene.ts"}],"../../.nvm/versions/node/v15.13.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "42721" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../.nvm/versions/node/v15.13.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.ts"], null)
//# sourceMappingURL=/main.b0a109ad.js.map