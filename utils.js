let Utilites = {};

Utilites.unlock = {
  init: function(scene)
  {
    /*Security.allowDomain("*");
    Security.allowDomain("coolmath-games.com");*/
    window.addEventListener("unlockAllLevels",Utilites.unlock.unlockAllLevels);
    scene.events.on("unlockAllLevels",Utilites.unlock.unlockAllLevels);

    //scene.events.on("resize",Utilites.unlock.unlockAllLevels);
    //window.addEventListener("resize",Utilites.unlock.unlockAllLevels);

  },

  unlockAllLevels: function(scene) {
    console.log('unlocked');
    for(let i = 0; i< Utilites.storage.levelArray.length; i++){
      let current = Utilites.storage.levelArray[i];
      if(current === 0)
        Utilites.storage.levelArray[i] = 1;
    }
    Utilites.storage.saveStorage();
  }
},

  Utilites.storage = {
    levelArray: [],
    saveData: [],
    medalArray: [],
    loadStorage: function(scene) {

      Utilites.storage.levelArray = [];
      Utilites.storage.medalArray = [];

      let file = null;
      let levelNumber = 60;
      if(this.checkLocalStorage()) {
        file = JSON.parse(localStorage.getItem('mower4'));
      }

      let last = 0;

      if(file){
        Utilites.storage.levelArray = file.levels;
        Utilites.storage.medalArray = file.medals;

      }
      else {
        for(let i = 0; i< levelNumber; i++){
          Utilites.storage.levelArray.push(0);
          Utilites.storage.medalArray.push(0);
        }
        Utilites.storage.levelArray[0] = 1;

        scene.registry.set('direct', false);
        scene.registry.set('directLevel', -1);
        scene.registry.set('level', 0);
      }

      scene.registry.set('level', last);

      if(this.checkLocalStorage())
        this.saveStorage();
      //console.log('file 0k   ');

      for(let i = 0; i< Utilites.storage.levelArray.length; i++){
        let current = Utilites.storage.levelArray[i];
        if(current!=0) {
          last = i;
        }
      }
      scene.registry.set('level', last);
    },

    saveStorage: function() {
      let file = {
        levels: Utilites.storage.levelArray,
        saves: Utilites.storage.saveData,
        medals: Utilites.storage.medalArray,

      };
      console.log('save');
      if(this.checkLocalStorage())
        window.localStorage.setItem('mower4',JSON.stringify(file));
    },

    resetStorage: function(scene) {
      let levelNumber = 60;
      Utilites.storage.levelArray = [];
      Utilites.storage.medalArray = [];
      Utilites.storage.saveData = [];
      for(let i = 0; i< levelNumber; i++){
        Utilites.storage.levelArray.push(0);
        Utilites.storage.medalArray.push(0);
      }
      Utilites.storage.levelArray[0] = 1;


      scene.registry.set('directLevel', -1);

      scene.registry.set('level', 0);

      this.saveStorage();
    },

    checkLocalStorage: function() {
      try {
        let locStorage = window.localStorage;
        return true;
      } catch (exception) {
        return false;
      }
    }

  };



