/*
 * jQuery v1.9.1 included
 */

$(document).ready(function() {

  // social share popups
  $(".share a").click(function(e) {
    e.preventDefault();
    window.open(this.href, "", "height = 500, width = 500");
  });

  // show form controls when the textarea receives focus or backbutton is used and value exists
  var $commentContainerTextarea = $(".comment-container textarea"),
  $commentContainerFormControls = $(".comment-form-controls, .comment-ccs");

  $commentContainerTextarea.one("focus", function() {
    $commentContainerFormControls.show();
  });

  if ($commentContainerTextarea.val() !== "") {
    $commentContainerFormControls.show();
  }

  // Expand Request comment form when Add to conversation is clicked
  var $showRequestCommentContainerTrigger = $(".request-container .comment-container .comment-show-container"),
    $requestCommentFields = $(".request-container .comment-container .comment-fields"),
    $requestCommentSubmit = $(".request-container .comment-container .request-submit-comment");

  $showRequestCommentContainerTrigger.on("click", function() {
    $showRequestCommentContainerTrigger.hide();
    $requestCommentFields.show();
    $requestCommentSubmit.show();
    $commentContainerTextarea.focus();
  });

  // Mark as solved button
  var $requestMarkAsSolvedButton = $(".request-container .mark-as-solved:not([data-disabled])"),
    $requestMarkAsSolvedCheckbox = $(".request-container .comment-container input[type=checkbox]"),
    $requestCommentSubmitButton = $(".request-container .comment-container input[type=submit]");

  $requestMarkAsSolvedButton.on("click", function () {
    $requestMarkAsSolvedCheckbox.attr("checked", true);
    $requestCommentSubmitButton.prop("disabled", true);
    $(this).attr("data-disabled", true).closest("form").submit();
  });

  // Change Mark as solved text according to whether comment is filled
  var $requestCommentTextarea = $(".request-container .comment-container textarea");

  $requestCommentTextarea.on("keyup", function() {
    if ($requestCommentTextarea.val() !== "") {
      $requestMarkAsSolvedButton.text($requestMarkAsSolvedButton.data("solve-and-submit-translation"));
      $requestCommentSubmitButton.prop("disabled", false);
    } else {
      $requestMarkAsSolvedButton.text($requestMarkAsSolvedButton.data("solve-translation"));
      $requestCommentSubmitButton.prop("disabled", true);
    }
  });

  // Disable submit button if textarea is empty
  if ($requestCommentTextarea.val() === "") {
    $requestCommentSubmitButton.prop("disabled", true);
  }

  // Submit requests filter form in the request list page
  $("#request-status-select, #request-organization-select")
    .on("change", function() {
      search();
    });

  // Submit requests filter form in the request list page
  $("#quick-search").on("keypress", function(e) {
    if (e.which === 13) {
      search();
    }
  });

  function search() {
    window.location.search = $.param({
      query: $("#quick-search").val(),
      status: $("#request-status-select").val(),
      organization_id: $("#request-organization-select").val()
    });
  }

  $(".header .icon-menu").on("click", function(e) {
    e.stopPropagation();
    var menu = document.getElementById("user-nav");
    var isExpanded = menu.getAttribute("aria-expanded") === "true";
    menu.setAttribute("aria-expanded", !isExpanded);
  });

  if ($("#user-nav").children().length === 0) {
    $(".header .icon-menu").hide();
  }
  

  // Submit organization form in the request page
  $("#request-organization select").on("change", function() {
    this.form.submit();
  });

  // Toggles expanded aria to collapsible elements
  $(".collapsible-nav, .collapsible-sidebar").on("click", function(e) {
    e.stopPropagation();
    var isExpanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", !isExpanded);
  });
  
  //login
  //var currentUrl=("https://www.binance.com/login.html?callback="+window.location.href+"&zendesk=zendesk");
  var currentUrl=("http://www.binance.com/login.html?callback="+window.location.href+"&zendesk=zendesk");
  var $loginA=$(".nav-wrapper a.login");
  $loginA.attr("href",currentUrl);
  $loginA.removeAttr("data-auth-action");
  
  //判斷是否登录
  var requestUrl=("http://www.binance.com/login.html?callback="+window.location.href+"/requests/new&zendesk=zendesk");
  var articleRequestUrl=("http://www.binance.com/login.html?callback="+window.location.href+"&zendesk=zendesk");
  //$(".submit-a-request").attr("href",requestUrl);
  $(".article-more-questions a").attr("href",articleRequestUrl);
  $.ajax({
    type: "get",
    url: "/api/v2/users/me/session.json",
    success: function (data) {
     var loginInfo=data["session"];
     if(loginInfo){
       //$(".submit-a-request").attr("href","/hc/zh-cn/requests/new");
       $(".article-more-questions a").attr("href","/hc/zh-cn/requests/new");

     }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
       $("#launcher").css("opacity","0");
      $("#Embed").css("display","none");
   	}
  });
  
  //编辑个人资料功能隐藏
  var userA=$("#user-menu a");
  userA.each(function(i){
    if($(this).attr("data-action")=="edit-profile"){
   		 console.log("success");
      $(this).css("display","none");
    }
  });
  
  
 	var locationUrl=window.location.href;
  if(locationUrl.indexOf("en-us")>-1){
		$(".submit-a-request").html("Submit Request");
  }
  if(locationUrl.indexOf("zh-cn")>-1){
  	$(".submit-a-request").html("提交工单");
  }
  
  
  
  
  
  
});
