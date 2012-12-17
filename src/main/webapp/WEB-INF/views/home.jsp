<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
<head>
	<title>无线网络定点拨测数据采集管理系统 </title>
	<link rel="stylesheet" type="text/css" href="<c:url value="resources/ext4/resources/css/ext-all.css" />"/>
     <link rel="stylesheet" type="text/css" href="<c:url value="resources/css/main.css" />   "></link>
     <link rel="stylesheet" type="text/css" href="<c:url value="resources/css/icon.css" />   "></link>
          <link rel="stylesheet" type="text/css" href="<c:url value="resources/css/data-view.css" />   "></link>
    
    <script type="text/javascript" src="resources/ext4/ext-all.js"></script>
    
    
	<script type="text/javascript" src="<c:url value= "resources/ext4/locale/ext-lang-zh_CN.js" />" ></script>
<!--   
	<script type="text/javascript" src="resources/app.js"  ></script>
-->   
    <script type="text/javascript" src="resources/app-all.min.js"  ></script>
 
   
    <script type="text/javascript" >

    	Ext.Loader.setConfig({enabled: true});
    	
    	Ext.onReady(function() {
    	       		
    		var str_userName= "${sessionScope.PHONE_TEST_SESSION.userName}";
    			
    		if(str_userName==""){
    			    			
    			window.location.href="/PhoneTest/login";
    		}
    		
    		 Ext.QuickTips.init();

    		 Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
    		 
    		//设置全局请求处理	 
    		Ext.Ajax.timeout = 300000;
    		
    		 Ext.Ajax.on("requestcomplete", function( conn, response, options){
    		 	
    		    var msg=response.responseText;
    			 	
    			 	if(msg.indexOf('过期')>0){
    			 		
    			 		window.location.href="/PhoneTest/login"; 
    			 	}
    		 });

    		 Ext.Ajax.on("requestexception", function( conn,response, options){
    			 		 
    			 if (response.status!=200){
    				 
    				 alert('程序请求中出现错误,如有问题请刷新重试!');
    				 
    			 }		     		 	
    		 });    		 
    		 
    	     
    	});    	
    	
    </script>
</head>
<body>
<div id="north">
  <div class="logo"> <!--   无线网络定点拨测数据采集管理系统  --></div>
  <div style="float:right;padding-right:20px;padding-top:10px;color:black;font-size:12px" class="top">
  	<span>${sessionScope.PHONE_TEST_SESSION.userName}</span>&nbsp;|&nbsp;
  	<span><a href="javascript:void(0)" >修改密码</a></span>&nbsp;|&nbsp;
  	<span>帮助</span>&nbsp;|&nbsp;
  	<span><a href="logoff" >注销</a></span>
  </div>
  <div class="cleaner"></div>
</div>
</body>
</html>
