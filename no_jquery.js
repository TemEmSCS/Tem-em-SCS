// Google API

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Meu código



function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}


function fn() {

  var activePlayer;
  var curPlayer = [];

  /* ========== Checa se é menu ou index ========== */
  if(window.location.hash && parseInt(window.location.hash.substring(1))) { // se vier hash
    document.querySelectorAll('main').css('display', 'none');
    document.querySelectorAll('section').css('display', 'block');

    var entrada = window.location.hash.substring(1);
    mudaPagina(entrada);
    document.querySelectorAll("#tagline").html(entrada.name);
  } else { //senão
    document.querySelectorAll('main').css('display', 'grid');
    document.querySelectorAll('section').css('display', 'none');
  }

  /* ========== INDEX ========== */
    document.querySelectorAll("img").mouseover( function(){
      document.querySelectorAll("figcaption").removeClass("show_tit");
      document.querySelectorAll("#" + document.querySelectorAll(this).attr('data')).addClass("show_tit");
    });

    document.querySelectorAll("img").on('click', function(){
      document.querySelectorAll('main').css('display', 'none');
      document.querySelectorAll('section').css('display', 'block');
    });

  /* ========== FUNCIONAMENTO BASICO SITE ========== */

  // MENU

  document.querySelectorAll('.dropdown ul').html(function(){
    var menu = '';
    for(i=0;i<12;i++){
      menu += '<li><a class="menuTrigger" href="#' + i + '">' + mapaDeNavegacao[i].name.replace(/(Tem )|( em São Caetano\?)/g, '') + '</a></li>';
    }
    return menu;
  });

  // CREDITOS

  document.querySelectorAll('aside a').on('click', function(){
    if(!document.querySelectorAll('footer').hasClass('show')){
      document.querySelectorAll('footer').addClass('show');
    } else {
      document.querySelectorAll('footer').removeClass('show');
    }
  });
  document.querySelectorAll('footer').on('click', function(){
    document.querySelectorAll('footer').removeClass('show');
  });

  /* ========== INTERAÇÕES WEBDOC ========== */

  // seleciona objeto
  function buscaPersonagem(personagem){
    return mapaDeNavegacao[personagem];
  };

  //cria Players
  function newPlayers(personagem) {
    activePlayer = 0;
    let preld = preload(personagem)
    let vidOrder = [personagem.video, preld[0], preld[1], preld[2]];
    for(var i = 0; i < 4;i++) {
      curPlayer[i] = createPlayer(i, vidOrder[i]);
    }
    document.querySelectorAll('#tagline').html(personagem.name.replace(/(Tem )|( em São Caetano\?)/g, ''));
  }

  function createPlayer(playerInfo, curVideo) {
    return new YT.Player('player' + playerInfo, {
      videoId: curVideo,
      playerVars: {rel: 0, showinfo: 0, controls:0, fs: 0, iv_load_policy: 3, modestbranding: 1},
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    curPlayer[activePlayer].playVideo();
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false;
  function onPlayerStateChange(event) {
    switch (event.data) {
      case YT.PlayerState.PLAYING:
          document.querySelectorAll(".perguntas").removeClass("show");
          break;
      case YT.PlayerState.PAUSED:
      case YT.PlayerState.ENDED:
          document.querySelectorAll(".perguntas").addClass("show");
          break;
    }
  }

  //preload de videos e troca de links

  function preload(personagem){
    let preld = [];

    for(i=0;i<3;i++){
      /* altera botões de pergunta*/
      document.querySelectorAll("#p" + (i+1) + " a").attr('href', "#" + personagem.pergunta[i]);
      document.querySelectorAll("#p" + (i+1) + " a").html(mapaDeNavegacao[personagem.pergunta[i]].name);
      preld.push(mapaDeNavegacao[personagem.pergunta[i]].video);
    }
    return preld;
  }

  //atualiza página pelo hash
  function mudaPagina(info) {

    if (buscaPersonagem(info)) { //Se retornar um objeto
      let personagem = buscaPersonagem(info)

      let preld = preload(personagem);
      if (document.querySelectorAll('.player') === document.querySelectorAll("div")){ // Cria players pela primeira vez
        window.onYouTubeIframeAPIReady = function(){
          newPlayers(personagem);
        }
      } else { // depois dos players criados
        let mainpl = 'erro';
        for(i=0;i<4;i++){
          if(curPlayer[i].getVideoUrl().replace("https://www.youtube.com/watch?v=", "") == personagem.video)  {
            mainpl = i;
          }
        }
        if(mainpl != 'erro') { // se existir o link, troca
          curPlayer[activePlayer].pauseVideo();
          document.querySelectorAll('.main').removeClass('main');
          document.querySelectorAll('#player'+mainpl).addClass('main');
          activePlayer = mainpl; // trioca div e ajusta novo player ativo
        } else {
          curPlayer[activePlayer].loadVideoById(personagem.video);
        }
        //automa menu?
        curPlayer[activePlayer].playVideo() //play novo video
        videoPreload(preld, activePlayer)//Add proximo preload
        console.log(preld + "    "  + activePlayer);
      }
    } else {
      console.log("deu ruim");
    }
  }

  // Redistribui os videos para novo preload (no caso do principal ter loadado)
  function videoPreload(videos, skipId) {
    videos.forEach( function(value, index){
      var validId = index;
      if(index == skipId){ validId = 3 }
      curPlayer[validId].loadVideoById(value);
      curPlayer[validId].pauseVideo();
    });
  }

  // Automação Perguntas -- Videos
  document.querySelectorAll(window).keypress(function (e) {
    if (e.key === ' ' || e.key === 'Spacebar') {
      // ' ' is standard, 'Spacebar' was used by IE9 and Firefox < 37
      e.preventDefault();
      console.log(activePlayer);
      curPlayer[activePlayer].getPlayerState() == 1 ? curPlayer[activePlayer].pauseVideo() : curPlayer[activePlayer].playVideo();
    }
  })

  document.querySelectorAll(window).bind('hashchange',function(){
    mudaPagina(window.location.hash.substring(1));
  });

  document.querySelectorAll('.abertura').on('click', function(){
    newPlayers(buscaPersonagem(document.querySelectorAll(this).attr('id').substring(1)));
  });

  document.querySelectorAll('.menuTrigger').on('click', function(){
    document.querySelectorAll('#tagline').html(document.querySelectorAll(this).html());
  });

});

document.querySelectorAll(window).on("load", function() {
    document.querySelectorAll('.loader_warper').css("display","none");
});
