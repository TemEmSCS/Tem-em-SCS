// Google API

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Meu código
$(document).ready(function() {

  var activePlayer;
  var curPlayer = [];

  /* ========== Checa se é menu ou index ========== */
  if(window.location.hash && parseInt(window.location.hash.substring(1))) { // se vier hash
    $('main').css('display', 'none');
    $('section').css('display', 'block');

    var entrada = window.location.hash.substring(1);
    mudaPagina(entrada);
    $("#tagline").html(entrada.name);
  } else { //senão
    $('main').css('display', 'grid');
    $('section').css('display', 'none');
  }

  /* ========== INDEX ========== */
    $("img").mouseover( function(){
      $("figcaption").removeClass("show_tit");
      $("#" + $(this).attr('data')).addClass("show_tit");
    });

    $("img").on('click', function(){
      $('main').css('display', 'none');
      $('section').css('display', 'block');
    });

  /* ========== FUNCIONAMENTO BASICO SITE ========== */

  // MENU

  $('.dropdown ul').html(function(){
    var menu = '';
    for(i=0;i<12;i++){
      menu += '<li><a class="menuTrigger" href="#' + i + '">' + mapaDeNavegacao[i].name.replace(/(Tem )|( em São Caetano\?)/g, '') + '</a></li>';
    }
    return menu;
  });

  // CREDITOS

  $('aside a').on('click', function(){
    if(!$('footer').hasClass('show')){
      $('footer').addClass('show');
    } else {
      $('footer').removeClass('show');
    }
  });
  $('footer').on('click', function(){
    $('footer').removeClass('show');
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
    $('#tagline').html(personagem.name.replace(/(Tem )|( em São Caetano\?)/g, ''));
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
          $(".perguntas").removeClass("show");
          break;
      case YT.PlayerState.PAUSED:
      case YT.PlayerState.ENDED:
          $(".perguntas").addClass("show");
          break;
    }
  }

  //preload de videos e troca de links

  function preload(personagem){
    let preld = [];

    for(i=0;i<3;i++){
      /* altera botões de pergunta*/
      $("#p" + (i+1) + " a").attr('href', "#" + personagem.pergunta[i]);
      $("#p" + (i+1) + " a").html(mapaDeNavegacao[personagem.pergunta[i]].name);
      preld.push(mapaDeNavegacao[personagem.pergunta[i]].video);
    }
    return preld;
  }

  //atualiza página pelo hash
  function mudaPagina(info) {

    if (buscaPersonagem(info)) { //Se retornar um objeto
      let personagem = buscaPersonagem(info)

      let preld = preload(personagem);
      if ($('.player').is("div")){ // Cria players pela primeira vez
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
          $('.main').removeClass('main');
          $('#player'+mainpl).addClass('main');
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
      for(i=0;i<4;i++){
        let newNode = document.createElement('div');
        if(i == 0){
          newNode.className = 'player main';
        } else {
          newNode.className = 'player';
        }
        newNode.setAttribute('id', 'player' + i);
        $('.player')[i].parentNode.replaceChild(newNode, $('.player')[i]);
      }
      $('main').css('display', 'grid');
      $('section').css('display', 'none');
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
  $(window).keypress(function (e) {
    if (e.key === ' ' || e.key === 'Spacebar') {
      // ' ' is standard, 'Spacebar' was used by IE9 and Firefox < 37
      e.preventDefault();
      console.log(activePlayer);
      curPlayer[activePlayer].getPlayerState() == 1 ? curPlayer[activePlayer].pauseVideo() : curPlayer[activePlayer].playVideo();
    }
  })

  $(window).bind('hashchange',function(){
    mudaPagina(window.location.hash.substring(1));
  });

  $('.abertura').on('click', function(){
    newPlayers(buscaPersonagem($(this).attr('id').substring(1)));
  });

  $('.menuTrigger').on('click', function(){
    $('#tagline').html($(this).html());
  });

});

$(window).on("load", function() {
    $('.loader_warper').css("display","none");
});
