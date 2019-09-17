$(document).ready(function() {

  $('a[data-toggle="pill"]').on('click', function (e) {
    $('.cc-box-card.active').removeClass('show');
    $('.cc-box-card.active').removeClass('active');

    var sessionName = $(this).find('h4').text();
    $('#menu-session').data('session', sessionName.toLowerCase());

    if(sessionName === 'IAN') {
      var nTitle = '<strong>' + sessionName + '</strong> de &nbsp;<span style="font-weight: 700; color: #c9a471;">"<span data-municipio="" class="municipioName">' + $('.municipioName').text() + '</span>"</span>';
    } else {
      var nTitle = 'Eixo <strong>' + sessionName + '</strong> de &nbsp;<span style="font-weight: 700; color: #c9a471;">"<span data-municipio="" class="municipioName">' + $('.municipioName').text() + '</span>"</span>';
    }

    $('.cc-titulo-principal').html('');
    $('.cc-titulo-principal').html(nTitle);

    var categorias = $('#categorias .tab-pane');

    categorias.each(function (i, el) {

      //let elem = document.getElementsByClassName('tab-pane');
      //for (let i = 0; i < elem.length; i++) {
        //if (elem[i].id == this.id)
      //}

      $(this).removeClass('show');
      $(this).removeClass('active');
    });

    if ($(this).attr('id') === 'v-pills-ian-tab') {
      categorias.each(function (i, el) {
        $(this).addClass('show');
        $(this).addClass('active');
      });
    }

    $(this).find(">:first-child").addClass("active");


    /*setTimeout(function () {
      window.stickySidebar.updateSticky();
    }, 500);*/
  });

  //Carousel 1
  $(".cc-custom-carousel-1").slick({
    slidesToShow:3,
    centerPadding:"0px",
    dots:!0,
    arrows:!1,
    centerMode:!0,
    autoplay:!0,
    infinite:false,
    initialSlide: 1,
    responsive:[
      {
        breakpoint:1200,
        settings: {
          centerPadding:"0px"
          ,arrows:!1,
          slidesToShow:2,
          infinite:false,
          initialSlide: 1
        }
      },
      {
        breakpoint:768,
        settings: {
          centerPadding:"0px"
          ,arrows:!1,
          slidesToShow:1,
          infinite:false,
          initialSlide: 1
        }
      }
    ]
  });

  //Carousel 2
  $(".cc-custom-carousel").slick({
      slidesToShow:2,
      centerPadding:"60px",
      dots:!0,
      arrows:!1,
      centerMode:!0,
      autoplay:!0,
      responsive:[{
          breakpoint:991,
          settings:{
              centerPadding:"0px"
              ,arrows:!1,
              slidesToShow:1,
              infinite:!1
          }
      }],
      responsive:[{
          breakpoint:768,
          settings:{
              centerPadding:"0px"
              ,arrows:!1,
              slidesToShow:1,
              infinite:!1
          }
      }]
  });

  $(document).on('click', '.cc-btn-cluster', function(event) {
    var classe = $(this).find(".fa").attr("class");
    if(classe == "fa fa-plus"){
        classe = "fa-minus";
        $(this).parent().parent().parent().find(".cc-content-cluster").fadeIn("1000");
        $(this).closest(".cc-cabecalho-drop").find(".cc-content-cluster").fadeIn("1000");
    }else{
        classe = "fa-plus";
        $(this).parent().parent().parent().find(".cc-content-cluster").fadeOut("1000");
        $(this).closest(".cc-cabecalho-drop").find(".cc-content-cluster").fadeOut("1000");
    }

    $(this).find(".fa").removeClass("fa-plus");
    $(this).find(".fa").removeClass("fa-minus");
    $(this).find(".fa").addClass(classe);
  });

  $(".cc-custom-label").on("click", function(){
      $(".cc-custom-label").each(function(){
          $(this).removeClass("cc-active");
      });
      $(this).addClass("cc-active");
  });


  //ao clicar no sidebar - IAN
  $(document).on('click', '#v-pills-ian-tab', function (event) {

    document.getElementById('infra-transporte').classList.remove("cc-eixo-active");
    document.getElementById("fa-infra-transporte").classList.remove("fa-minus");
    document.getElementById("fa-infra-transporte").classList.add("fa-plus");

    document.getElementById('infra-seguranca-publica').classList.remove("cc-eixo-active");
    document.getElementById("fa-infra-seguranca-publica").classList.remove("fa-minus");
    document.getElementById("fa-infra-seguranca-publica").classList.add("fa-plus");

    document.getElementById("fa-infra-condicoes-urbanas").classList.remove("fa-plus"); //unico ativo
    document.getElementById("fa-infra-condicoes-urbanas").classList.add("fa-minus"); //unico ativo

    document.getElementById('merc-credito').classList.remove("cc-eixo-active");
    document.getElementById("fa-merc-credito").classList.remove("fa-minus");
    document.getElementById("fa-merc-credito").classList.add("fa-plus");

    document.getElementById('merc-diversidade-setorial').classList.remove("cc-eixo-active");
    document.getElementById("fa-merc-diversidade-setorial").classList.remove("fa-minus");
    document.getElementById("fa-merc-diversidade-setorial").classList.add("fa-plus");

    document.getElementById('merc-inovacao').classList.remove("cc-eixo-active");
    document.getElementById("fa-merc-inovacao").classList.remove("fa-minus");
    document.getElementById("fa-merc-inovacao").classList.add("fa-plus");

    document.getElementById('merc-tamanho-mercado').classList.remove("cc-eixo-active");
    document.getElementById("fa-merc-tamanho-mercado").classList.remove("fa-minus");
    document.getElementById("fa-merc-tamanho-mercado").classList.add("fa-plus");

    document.getElementById('caph-educacao').classList.remove("cc-eixo-active");
    document.getElementById("fa-caph-educacao").classList.remove("fa-minus");
    document.getElementById("fa-caph-educacao").classList.add("fa-plus");

    document.getElementById('caph-qualidade-mao-obra').classList.remove("cc-eixo-active");
    document.getElementById("fa-caph-qualidade-mao-obra").classList.remove("fa-minus");
    document.getElementById("fa-caph-qualidade-mao-obra").classList.add("fa-plus");

    document.getElementById('caph-saude').classList.remove("cc-eixo-active");
    document.getElementById("fa-caph-saude").classList.remove("fa-minus");
    document.getElementById("fa-caph-saude").classList.add("fa-plus");

    document.getElementById('gfiscal').classList.remove("cc-eixo-active");
    document.getElementById("fa-gfiscal").classList.remove("fa-minus");
    document.getElementById("fa-gfiscal").classList.add("fa-plus");
  });

  //ao clicar no sidebar - Infraestrutura
  $(document).on('click', '#v-pills-infra-tab', function (event) {
    document.getElementById('infra-condicoes-urbanas').classList.add("cc-eixo-active");
    document.getElementById('infra-transporte').classList.add("cc-eixo-active");
    document.getElementById("fa-infra-transporte").classList.remove("fa-plus");
    document.getElementById("fa-infra-transporte").classList.add("fa-minus");

    document.getElementById('infra-seguranca-publica').classList.add("cc-eixo-active");
    document.getElementById("fa-infra-seguranca-publica").classList.remove("fa-plus");
    document.getElementById("fa-infra-seguranca-publica").classList.add("fa-minus");

  });

  //ao clicar no sidebar - Potencial de Mercado
  $(document).on('click', '#v-pills-mercado-tab', function (event) {
    document.getElementById('merc-credito').classList.add("cc-eixo-active");
    document.getElementById("fa-merc-credito").classList.remove("fa-plus");
    document.getElementById("fa-merc-credito").classList.add("fa-minus");

    document.getElementById('merc-diversidade-setorial').classList.add("cc-eixo-active");
    document.getElementById("fa-merc-diversidade-setorial").classList.remove("fa-plus");
    document.getElementById("fa-merc-diversidade-setorial").classList.add("fa-minus");

    document.getElementById('merc-inovacao').classList.add("cc-eixo-active");
    document.getElementById("fa-merc-inovacao").classList.remove("fa-plus");
    document.getElementById("fa-merc-inovacao").classList.add("fa-minus");

    document.getElementById('merc-tamanho-mercado').classList.add("cc-eixo-active");
    document.getElementById("fa-merc-tamanho-mercado").classList.remove("fa-plus");
    document.getElementById("fa-merc-tamanho-mercado").classList.add("fa-minus");

  });

  //ao clicar no sidebar - Capital Humano
  $(document).on('click', '#v-pills-humano-tab', function (event) {
    document.getElementById('caph-educacao').classList.add("cc-eixo-active");
    document.getElementById("fa-caph-educacao").classList.remove("fa-plus");
    document.getElementById("fa-caph-educacao").classList.add("fa-minus");

    document.getElementById('caph-qualidade-mao-obra').classList.add("cc-eixo-active");
    document.getElementById("fa-caph-qualidade-mao-obra").classList.remove("fa-plus");
    document.getElementById("fa-caph-qualidade-mao-obra").classList.add("fa-minus");

    document.getElementById('caph-saude').classList.add("cc-eixo-active");
    document.getElementById("fa-caph-saude").classList.remove("fa-plus");
    document.getElementById("fa-caph-saude").classList.add("fa-minus");
  });

  //ao clicar no sidebar - Gestao Fiscal
  $(document).on('click', '#v-pills-fiscal-tab', function (event) {
    document.getElementById('gfiscal').classList.add("cc-eixo-active");
    document.getElementById("fa-gfiscal").classList.remove("fa-plus");
    document.getElementById("fa-gfiscal").classList.add("fa-minus");
  });

  $(document).on('click', '.cc-btn-drop-eixo', function(event) {
    var classe = $(this).find(".fa").attr("class"); //fa fa-plus ou fa fa-minus
    if(classe == "fa fa-plus"){
      classe = "fa-minus";
      $(this).closest(".cc-eixo").find(".cc-content").fadeIn("1000");
    }else{
      classe = "fa-plus";
      $(this).closest(".cc-eixo").find(".cc-content").removeClass("cc-eixo-active");
      $(this).closest(".cc-eixo").find(".cc-content").fadeOut("1000");
    }

    $(this).find(".fa").removeClass("fa-plus");
    $(this).find(".fa").removeClass("fa-minus");
    $(this).find(".fa").addClass(classe);

    /*setTimeout(function () {
      window.stickySidebar.updateSticky();
    }, 1000);*/
  });

  $(document).on('click', '.cc-btn-drop-acordion', function(event) {
      var classe = $(this).find(".fa").attr("class");
      if(classe == "fa fa-plus"){
          classe = "fa-minus";
          $(this).closest(".cc-acordion-conteudo").find(".cc-conteudo").fadeIn("1000");
      }else{
          classe = "fa-plus";
          $(this).closest(".cc-acordion-conteudo").find(".cc-conteudo").fadeOut("1000");
      }

      $(this).find(".fa").removeClass("fa-plus");
      $(this).find(".fa").removeClass("fa-minus");
      $(this).find(".fa").addClass(classe);
  });

  $(".content-carousel").click(function(){
    var descricao = $(this).closest(".cc-box-descricao");
    var resumo = descricao.find(".cc-resumo");
    var aux = resumo.html();
    var textoCompleto = resumo.data("carousel-content");
    $(resumo).html(textoCompleto);
    $(resumo).data("carousel-content", aux);
  });


});
