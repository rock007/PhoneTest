<%@ page  isELIgnored = "false" %>  
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>无线网络定点拨测数据采集管理系统 -登陆页</title>
 <link rel="stylesheet" type="text/css" href="<c:url value="resources/ext4/resources/css/ext-all.css" />"/>
	
	<style type="text/css">
#randCode {
	float: left;
}
.x-form-code {
	width: 73px;
	height: 20px;
	vertical-align: middle;
	cursor: pointer;
	float: left;
	margin-left: 7px;
}
</style>

 <script type="text/javascript" src="resources/ext4/ext-all.js"></script>

<script type="text/javascript" src="resources/loginForm.min.js"></script>
 
<script type="text/javascript">
Ext.QuickTips.init();

Ext.onReady(function() {
	var win = new LoginWindow();

	win.show();
	
	var msg= '${requestScope.tip}';
	
	if(msg != ''){
		
		alert(msg);
		
	}
	
	var str_userName= "${sessionScope.PHONE_TEST_SESSION.userName }";
	
	if(str_userName!=""){
		
		window.location.href="/PhoneTest/home";
	}
	
});
</script>
</head>
<body>

</body>
</html>