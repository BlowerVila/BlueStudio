var s = skrollr.init();


$(window).scroll(function(evt){
  
  //可同時選擇複數物件
  if($(window).scrollTop()>0)
    $(".explore,.navbar").removeClass("at_top");
  else
    $(".explore,.navbar").addClass("at_top");
  
});

//監看文件中是否點擊(click)連結標籤(a)，有點擊的話就執行function
//該串目標：執行nav點擊的平滑滾動動畫
$(document).on('click','a',function(event){
  
  //不執行預設動作，這邊是阻止超連結跳轉
  event.preventDefault();
  //抓取點擊當下的超連結的href
  var target = $(this).attr("href");
  //利用 jQuery 的 animate 方法實現平滑滾動效果
  //將頁面滾動至目標元素距離頁面頂部的偏移位置，過渡時間500毫秒
  $('html,body').animate({
    scrollTop: $(target).offset().top // 設定垂直滾動距離為目標的偏移值
  },600,'linear');
  
});


//抓滑鼠位置 很多需要滑鼠位置的程式都放進來了
$(window).mousemove(function(evt){
  
  var x = evt.pageX;  //滑鼠移動時於頁面中所在的X座標
  var y = evt.pageY;  //同理，這抓取Y座標
  console.log(x+","+y);
  
 //首頁底端的山移動
  $(".mountain").css("transform","translate("+(x/-20+50)+"px,25px)")
  $(".mountain2").css("transform","translate("+(x/+20-50)+"px,25px) scaleX(1.5)")
  
  
  //叉叉隨滑鼠移動 - crossX or Y 以about介面左上做新原點
  var crossX = x-$("#section_about").offset().left;
  var crossY = y-$("#section_about").offset().top;
  $("#cross").css("left",crossX+"px");
  $("#cross").css("top",crossY+"px");
  
  // ||->或者 outerHeight->最大高度
  if(crossY<0 || crossY>$("#section_about").outerHeight())
    $("#cross").css("opacity",0);
  else
    $("#cross").css("opacity",1);
  
  //about 文字隨滑鼠移動 - 除數愈小位移愈慢 - 需要再理解
  $(".r1text").css("transform","translateX("+(crossY/-5)+"px)")
  $(".r2text").css("transform","translateX("+(crossY/-10)+"px)")
  $(".r3text").css("transform","translateX("+(crossY/-12)+"px)")
  
  $(".tri").css("transform","translateX("+(crossX/-5)+"px) rotate(-15deg)")
  $(".tri2").css("transform","translateX("+(crossX/-10)+"px) rotate(-15deg)")
  $(".tri3").css("transform","translateX("+(crossX/-12)+"px) rotate(-15deg)")
  $(".tri4").css("transform","translateX("+(crossX/-15)+"px) rotate(-15deg)")
  $(".tri5").css("transform","translateX("+(crossX/-18)+"px) rotate(-15deg)")
  
//看星星-優化版
  var catplace=$("#cat").offset().left+$("#cat").width()/2;
  var cattop=$("#cat").offset().top;
  var img_url="https://imgur.com/"
  
  if(x<catplace-50)
    $("#cat").attr("src",img_url+"P6JRpIu.png");
  else if(x>catplace+50)
    $("#cat").attr("src",img_url+"eMVzVxc.png");
  else
    $("#cat").attr("src",img_url+"x7NQkVt.png");
  
  if(x<catplace-50 && y<cattop)
    $("#cat").attr("src",img_url+"lhAZZZS.png");
  
  if(x>catplace+50 && y<cattop)
    $("#cat").attr("src",img_url+"hpVmm2U.png");
  
}); //滑鼠抓取的程式尾端


//contact按鈕、人物移動 2024.12月
function contact_move(){
  var main_right = $("textarea").offset().left - $(".mails").offset().left + $("textarea").width();
  var clean_width = $("textarea").width() - $(".submit").width()*1.9;
  $(".submit").css("margin-left",clean_width+"px");
  
  var textarea_top = $("textarea").offset().top;
  
  if(textarea_top <= 210) $("#people").css("transform","translateY(-20px)");
  else if($(window).width()>=990) $("#people").css("transform","translateY(-20px)");
  else $("#people").css("transform","translateY(-24px)");
  
};
//即時事件變動監聽 2024.12月
document.addEventListener("DOMContentLoaded", function(){
    contact_move();

    $(window).on("scroll resize",function(){
        contact_move();
    });

    // 使用 requestAnimationFrame 進行更新
    function animate() {
        contact_move();
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);  // 開始動畫循環

});


var vm = new Vue({
  el: '#app', 
  data: {
    works: []
  },
  
  mounted:function(){
    var vobj = this;
    $.ajax({
      url:"https://script.google.com/macros/s/AKfycbziTUf0nvJEByUyvAuG7Nj9f6HzPYAR2_bWEHghpOwoXK2lXkP_VTjnwNJKIpEfIVe3/exec",
      success: function(res){
        console.log(res);
        vm.works = res;
      }
    })
  }
})