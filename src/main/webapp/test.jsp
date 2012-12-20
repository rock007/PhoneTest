<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
	<link rel="stylesheet" type="text/css" href="<c:url value="resources/ext4/resources/css/ext-all.css" />"/>
	
	<style type="text/css">
	
	table.x-datepicker-inner .x-datepicker-checked a {
    	background: none repeat-x scroll left top #E8493F;
    	border: 1px solid #8DB2E3;
	}
	
	</style>
    
    <script type="text/javascript" src="resources/ext4/ext-all.js"></script>
    
    <script type="text/javascript" src="resources/DatePickExt.js"></script>
    
<script type="text/javascript" src="<c:url value= "resources/ext4/locale/ext-lang-zh_CN.js" />" ></script>
   
<script type="text/javascript">
Ext.onReady(function() {
Ext.create('Ext.panel.Panel', {
    title: 'Choose a future date:',
    width: 200,
    bodyPadding: 10,
    renderTo: Ext.getBody(),
    items: [{
        xtype: 'datepickerext',
        minDate: new Date(),
        handler: function(picker, date) {
            // do something with the selected date
        }
    }]
});
});
</script>
</head>
<body>
hello the test page


</body>
</html>