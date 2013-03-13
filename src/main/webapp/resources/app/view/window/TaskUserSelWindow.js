
/**
 * 
 **/
  
 Ext.define('PT.view.window.TaskUserSelWindow',{
 	extend:'Ext.window.Window', 	
 	width:600,
 	height:500,
 	modal:true,
 	bid:null, 	
 	title:'测试人员安排', 	
	initComponent : function() {
		
		var me = this;
		
		var gridstore=	Ext.create('Ext.data.Store', {    	
			fields:[
			        {name:'mobileId',type:'int'}, 'ecode','ename',{name:'status',type:'int'}
			],    	    			
			proxy: {
    			type: 'ajax',
    			url : 'getTestUserList',
    			reader: {
        			type: 'json',
        			root: 'rows'
    			}        	
			}
		});
		
		var grid= Ext.create('Ext.grid.Panel', {		  
		    store: gridstore,
		    region:'center',
		    selModel: Ext.create('Ext.selection.CheckboxModel',{mode:'SIMPLE'}),
		    columns: [
		        { header: '手机号码',  dataIndex: 'mobileId' },
		        { header: '员工编码', dataIndex: 'ecode' },
		        { header: '姓名', dataIndex: 'ename' , flex: 1},
		        {
					xtype : 'actioncolumn',				
					flex : 1,
					items : [ 
						{
							icon: 'resources/images/icons/fam/delete.gif',
							tooltip : '删除',
							handler : function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								
								Ext.Msg.show({
		    		 				title:'信息',
		     						msg: '确定要删除测试人员吗？',
		     						buttons: Ext.Msg.YESNO,
		     						fn: function(buttonId,text,opt){
		    	 
		    	 						if(buttonId=='yes'){
		    	 							
		    								Ext.Ajax.request({
												url : 'delTestUser',
												params : {
													bid:me.rec.data.bid,
													mobile : rec.data.mobileId
											},
											success : function(response) {
												var text = response.responseText;

												var m = Ext.JSON.decode(text);
											
												if(m.success){										
													gridstore.load({params:{bid:me.bid }});
												}else{
													alert(m.msg);
												}
												
											}});
		    	 						}
		     						},							 
		     						icon: Ext.window.MessageBox.QUESTION
							});
		
							}
						}
 					]
				}
		    ],
		    height: 220,
		    width: 590
		});
		
		Ext.applyIf(me, {			 
			layout: {
			    type: 'border'
			},
			items:[	grid],
			 dockedItems:[ {
					xtype : 'toolbar',
					dock : 'top',
					items : [{
						text : '添加',
						tooltip : '添加测试人员',
						iconCls : 'add',
						handler : function() {

							Ext.create('PT.view.window.TaskUserWindow',{								
								bid:me.bid,
								listeners:{'beforedestroy':function(){									
									
									gridstore.load({params:{bid:me.bid }});
								}}
							}).show();
							
							}
						},'-',{
							text : '关闭',
							tooltip : '关闭窗口',
							iconCls : 'cross',
							handler : function() {
									me.close();
							}
					}]
				}]
			});
		
		me.callParent(arguments);	
		//me.on('beforerender',me.on_beforerender);
		
		gridstore.load({params:{bid:me.bid}});
			
		},on_beforerender:function(me, eOpts){
		
			var rec=me.bid;
				
			if(rec!=null){
			
					var form=me.child('form').getForm();
			
					form.loadRecord(rec);
			 }
	  }		
	});