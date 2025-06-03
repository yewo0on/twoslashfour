$(document).ready(function(){
  
  //팝업 버튼 이벤트
  $(".popup_btn .close_btn").click(() => {
    $(".popup").hide();
  });

  //메뉴바 - 아이콘 클릭 이벤트
  $(".header_wrap .menu_icon").click(function(){
    $(this).toggleClass("on");
    $("body").toggleClass("off");
    $("#header nav").toggleClass("on");
    
  });

  //메뉴바 - gnb 클릭 이벤트
  $(".gnb .more .gnb_tit").click(function(e){
    $(".gnb .more .gnb_tit").not($(this)).removeClass("on"); //클릭된 애 빼고 배경 제거
    $(".gnb .more .gnb_tit").not($(this)).siblings(".lnb").stop().slideUp(400); //나빼고 다 올리기

    e.preventDefault();
    $(this).toggleClass("on"); //클릭된 애만 배경색 회색 + 화살표 위로
    $(this).siblings(".lnb").stop().slideToggle(500); //클릭된 애만 슬라이드 업다운
  });

  //메뉴바 - lnb 클릭 이벤트
  $(".lnb .more .lnb_tit").click(function(e){
    e.preventDefault();

    const $parent = $(this).closest(".lnb");
    const $clicked = $(this);
    const $clickedBtn = $(this).closest(".more");
    const $submenu = $clicked.siblings(".sub"); //클릭된 애의 서브메뉴
    const isOpen = $submenu.is(":visible"); // 열려있는 경우

    // 클릭 시 다른 모든 서브메뉴 닫기 + 글자 gray
    $parent.find($(".lnb_tit")).not($clicked).addClass("off").siblings(".sub").stop().slideUp(500);


    if (isOpen) {  // 서브메뉴가 열려있으면
      $submenu.stop().slideUp(400, function () { // → 슬라이드 업
        // 모든 서브메뉴 닫힌 상태인지 확인
        $clickedBtn.removeClass("on");
        if ($(".lnb .sub:visible").length === 0) { // 열려있는 서브메뉴가 0개일 때
          $(".lnb .lnb_tit").removeClass("off");  //  → 글자 모두 검정
        }
      });
    } else {  // 서브메뉴가 닫혀있으면
      $clicked.removeClass("off"); // 클릭된 애는 검정 글자로
      $submenu.stop().slideDown(500);  // →  슬라이드 다운
      $clickedBtn.addClass("on");
    }
  });

  //메뉴바 - search bar 클릭 이벤트
  $("nav #search_bar").focus(function(){
    $("nav .search_terms").addClass("on");
    $("nav .user_service").addClass("off");
  });
  $("nav #search_bar").blur(function(){
    $("nav .search_terms").removeClass("on");
    $("nav .user_service").removeClass("off");
  });
  
  //배너에 오른쪽 화살표 클릭 시
  $(".banner .next").click(function(){
    $(".banner .panel").stop().animate({"margin-left": "-200%"}, 800, function(){
      $(".banner .carousel-item").first().appendTo(".panel");
      $(".banner .panel").css({"margin-left": "-100%"});
    });
  });
  //배너에 왼쪽 화살표 클릭 시
  $(".banner .prev").click(function(){
    $(".banner .panel").stop().animate({"margin-left": "0%"}, 800, function(){
      $(".banner .carousel-item").last().prependTo(".panel");
      $(".banner .panel").css({"margin-left": "-100%"});
    });
  });

  let autoSlideInterval;
  // 오토 슬라이드 켜기
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      $(".banner .panel").stop().animate({"margin-left": "-200%"}, 800, function(){
        $(".banner .carousel-item").first().appendTo(".panel");
        $(".banner .panel").css({"margin-left": "-100%"});
      });
    }, 3000);
  }
  // 오토 슬라이드 끄기
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }
  $(".banner").mouseenter(stopAutoSlide); // 배너에 마우스 올리면 오토슬라이드 끄기
  $(".banner").mouseleave(startAutoSlide); // 배너에 마우스 안올리면 오트슬라이드 시작

  // 카테고리 호버 이벤트
  $(".category .slide").hover(function(){
    $(".category .slide").removeClass('on');
    $(this).addClass("on");
  });

  // 카테고리 슬라이드 이벤트

  let first_ml = "-315px";
  let second_ml = "-260px";
  let third_ml = "-210px";
  let fourth_ml = "-170px";
  $(".category .slide").last().hover(function(){
    if($( window ).width() > 1280) {
      $(".category .c_slider").css({"margin-left" : first_ml });
    } else if( 1279 > $( window ).width() > 1024) {
      $(".category .c_slider").css({"margin-left" : second_ml });
    } else {
      $(".category .c_slider").css({"margin-left" : fourth_ml });
    }
  });
  $(".category .slide").first().hover(function(){
    $(".category .c_slider").css({"margin-left" : "0px"});
  });

  // NEW-BEST 버튼 이벤트
  $(".nb_btns > span").click(function() {

    const $btn = $(this);
    if ($btn.data("click-disabled")) return;
    $btn.data("click-disabled", true);

    setTimeout(() => {
      $btn.data("click-disabled", false);
    }, 1000);

    // 버튼 클릭 시 기존 거 지우기
    $(".nb_btns > span").removeClass("active");
    $(".products_wrap").removeClass("on");
    $(".img_wrap").hide();

    if ($(this).hasClass("new_btn")) {
      // 버튼 변경
      $(this).addClass("active");
      // 상품 변경
      $(".new_wrap").addClass("on");
      // 이미지 변경
      $(".best_img_wrap").fadeOut(800);
      $(".new_img_wrap").fadeIn(800);
    } else if ($(this).hasClass("best_btn")) {
      // 버튼 변경
      $(this).addClass("active");
      // 상품 변경
      $(".best_wrap").addClass("on");
      // 이미지 변경
      $(".new_img_wrap").fadeOut(800);
      $(".best_img_wrap").fadeIn(800);
    }
  });

  // 이미지 화살표 버튼 이벤트
  $(".img_wrap > span").click(function() {

    // 버튼 클릭 시 기존 거 지우기
    $(".nb_btns > span").removeClass("active");
    $(".products_wrap").removeClass("on");
    $(".img_wrap").hide();

    if ($(this).hasClass("next")) {
      // 버튼 변경
      $(".best_btn").addClass("active");
      // 상품 변경
      $(".best_wrap").addClass("on");
      // 이미지 변경
      $(".new_img_wrap").fadeOut(800);
      $(".best_img_wrap").fadeIn(700);
      
    } else if ($(this).hasClass("prev")) {
      // 버튼 변경
      $(".new_btn").addClass("active");
      // 상품 변경
      $(".new_wrap").addClass("on");
      // 이미지 변경
      $(".best_img_wrap").fadeOut(800);
      $(".new_img_wrap").fadeIn(700);
    }
  });

  // 튜토리얼 슬라이드 테두리 회전
  let autoBorderRotate;

  function startBorderRotate() {
    const slide = $(".t_slider .t_info.on");
    resetBorders();

    slide.find(".border_l").animate({ height: "100%" }, 300, function () {
      slide.find(".border_t").animate({ width: "100%" }, 1500, function () {
        slide.find(".border_r").animate({ height: "100%" }, 300, function () {
          slide.find(".border_b").animate({ width: "100%" }, 1500);
        });
      });
    });

    autoBorderRotate = setTimeout(() => {
      startBorderRotate();
    }, 3700); // 다음 루프 전 잠깐 쉼
  }
  
  function stopBorderRotate() {
    clearTimeout(autoBorderRotate);
  }
  
  function resetBorders() {
    const slide = $(".t_slider .t_info");
    slide.find(".border_l, .border_r").css("height", 0);
    slide.find(".border_t, .border_b").css("width", 0);
    slide.find(".border_l, .border_t, .border_r, .border_b").stop(true, true);
    stopBorderRotate();
  }
  // 기존 배경 이미지
  const t_bg_imgs = [
    "main_tutorial_eye_browpowder.jpg",
    "main_tutorial_eye_browcara.jpg",
    "main_tutorial_face_glimmer.jpg",
    "main_tutorial_face_concealer.jpg",
    "main_tutorial_erasing.jpg",
    "main_tutorial_faceblush.jpg",
    "main_tutorial_lipbooster.jpg",
    "main_tutorial_eye_browpowder.jpg",
    "main_tutorial_facecube_re.jpg",
    "main_tutorial_lipshaper.jpg"
  ]
  // t_info 클릭 시 바뀔 이미지
  const t_gif_imgs = [
    ["tutorials_eye_browpowder.gif"],
    ["tutorials_eye_browcara.gif"],
    ["tutorials_face_glimmer.gif"],
    ["tutorials_face_concealer.gif"],
    ["tutorials_facecube_erasingcube.gif"],
    ["tutorials_faceblush_baebeige.gif", "tutorials_faceblush_dimbeige.gif", "tutorials_faceblush_rumbeige.gif"],
    ["tutorials_lipbooster_calmblack.gif"],
    ["tutorials_facecube_white.gif", "tutorials_facecube_purple.gif", "tutorials_facecube_peach.gif"],
    ["tutorials_lipshaper_outtaupe.gif", "tutorials_lipshaper_outteddy.gif", "tutorials_lipshaper_insalmon.gif", "tutorials_lipshaper_outrosy.gif"],
    ["tutorials_lipchanger_nublack.gif", "tutorials_lipchanger_nulavender.gif", "tutorials_lipchanger_nured.gif", "tutorials_lipchanger_nucoco.gif", "tutorials_lipchanger_nublackcherry.gif", "tutorials_lipchanger_nuberry.gif", "tutorials_lipchanger_nuginger.gif"]
  ]

  //튜토리얼 인포 이미지 변경
  const change_bgImg  = function(t_info) {
    const slides = $(".t_slider .slide");
    let on_slide = t_info.closest(".slide");
    let slideIndex = on_slide.index();
    let infoIndex = t_info.index();

    if (slideIndex < 0 || infoIndex < 0) return;

    // 모든 슬라이드 기본 이미지로 초기화
    slides.each(function(item) {
    const defaultImg = `url(images/${t_bg_imgs[item]})`;
    if (defaultImg) {
      $(this).find(".t_bg_img").css("background-image", defaultImg);
      }
    });
    // 클릭한 t_info의 배경 이미지를 gif 이미지로 바꿈
    const gifImage = `url(images/${t_gif_imgs[slideIndex][infoIndex]})`;
    if (gifImage) {
      on_slide.find(".t_bg_img").css("background-image", gifImage);
    }
    // 스크립트로 화면에 뿌리는건 경로가 html 기준
  };

  // 튜토리얼 슬라이드 초기값 셋팅
  const initialSlide = $(".t_slider .t_info.on");
  if (initialSlide.length) {
    startBorderRotate();
    change_bgImg(initialSlide);
  }

  // 튜토리얼 인포 클릭 이벤트
  $(".t_slider .t_info").click(function() {
    $(".t_slider .t_info").removeClass("on");
      $(this).addClass("on");

      change_bgImg($(this));

      resetBorders();
      startBorderRotate();
  });

  // 튜토리얼 슬라이드 버튼 이벤트
  let s_width = $(".t_slider .slide").width()+20;
  let slide_count = $(".t_slider .slide").length; // 슬라이드의 개수
  let current_index = 0; // 현재 슬라이드의 인덱스 (0부터 시작)

  function updateButtonVisibility() {
    // 첫 번째 슬라이드일 경우 prev 숨김
    if (current_index === 0) {
      $(".t_slider .prev").hide();
    } else {
      $(".t_slider .prev").show();
    }

    // 마지막 슬라이드에 도달했을 경우 next 숨김 (3개씩 보일 경우 slide_count - 3)
    if (current_index >= slide_count - 3) {
      $(".t_slider .next").hide();
    } else {
      $(".t_slider .next").show();
    }
  }

  // 초기 버튼 상태 설정
  updateButtonVisibility();

  // 슬라이드 오른쪽 버튼 클릭 시
  $(".t_slider .next").click(function(){
    if (current_index < slide_count - 3) {
      current_index++;
      let marginLeft = -s_width * current_index; // 현재 슬라이드의 index에 맞게 margin-left 계산
      $(".t_slider .slide_track").stop().animate({"margin-left": marginLeft}, 500);
    }
    updateButtonVisibility();
  });
  // 슬라이드 왼쪽 버튼 클릭 시
  $(".t_slider .prev").click(function(){
    if (current_index > 0) {
      current_index--;
      let marginLeft = -s_width * current_index; // 현재 슬라이드의 index에 맞게 margin-left 계산
      $(".t_slider .slide_track").stop().animate({"margin-left": marginLeft}, 500);
    }
    updateButtonVisibility();
  });

  // 슬라이드 드래그 앤 드랍
  let isDown = false;   //마우스가 눌러져있는 상태인지를 체크, true면 눌러져 있는 상태 or 드래그중
  let startX;      //마우스를 처음 눌렀을때의 X좌표를 저장하는 변수
  let scrollLeft;  //수평 스크롤 위치 저장하는 변수

  const $slider = $('.t_slider');
  const $track = $('.t_slider .slide_track');
  const slideWidth = $('.t_slider .slide').outerWidth(); // 슬라이드의 너비

  $slider.on('mousedown', function (e) {
    isDown = true;
    startX = e.pageX; //마우스 클릭한 시작위치 저장.
    scrollLeft = $slider.scrollLeft(); //드래그 시작전, 수평 스크롤값을 저장(기준점)
    $slider.css('cursor', 'grabbing');  // 드래그 중 커서 변경
  });

  $slider.on('mouseup', function () {
    isDown = false;
    $slider.css('cursor', 'grab');  // 드래그 종료 시 커서 변경
  });

  $slider.on('mousemove', function (e) {
    if (!isDown) return;
    e.preventDefault(); //브라우져의 기본 스크롤/드래그 동작 방지
    const x = e.pageX;  //현재 마우스의 X좌표 가져오기
    const walk = (startX - x); // 얼마나 움직였는지 계산
    $slider.scrollLeft(scrollLeft + walk); //시작위치에서 움직인 거리만큼 더해서 스크를 위치 변경
  });
});