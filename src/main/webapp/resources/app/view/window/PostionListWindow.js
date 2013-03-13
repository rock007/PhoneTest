
/**
 * 
 **/
  
 Ext.define('PT.view.window.PostionListWindow',{
 	extend:'Ext.window.Window', 	
 	width:600,
 	height:500,
 	modal:true,
 	rec:null,
 	title:'点位信息查看', 	
	initComponent : function() {
		
		var me = this;
		
		var gridstore=	Ext.create('Ext.data.Store', {    	
			fields:[    			 
			 {name:'bid',type:'int'}, 'pcode', 'pname', 'task',{name: 'pid',type:'int'}, 'remarks'    			 
			],    	    			
			proxy: {
    			type: 'ajax',
    			url : 'getPostionBy',
    			reader: {
        			type: 'json',
        			root: 'rows'
    			}        	
			}
		});
		
		var grid= Ext.create('Ext.grid.Panel', {
		    //title: '点位信息',
		    region:'center',
		    store: gridstore,
		    columns: [
		        { header: '代码',  dataIndex: 'pcode', flex: 1 },
		        { header: '名称', dataIndex: 'pname' , flex: 2},
		        { header: '任务', dataIndex: 'task' ,hidden:true},
				{
					xtype : 'actioncolumn',				
					flex : 1,
					items : [ {
						icon: 'resources/images/icons/fam/information.png',
						tooltip : '修改',
						handler : function(grid, rowIndex, colIndex) {
							var rec = grid.getStore().getAt(rowIndex);

							Ext.create('PT.view.window.EditPostionWindow',{
								rec:rec,
								bid:me.rec.data.bid,
								listeners:{'beforedestroy':function(){									
																		
									gridstore.load({params:{bid:me.rec.data.bid }});
							}}}).show();
	
						}},
						{
							icon: 'resources/images/icons/fam/delete.gif',
							tooltip : '删除',
							handler : function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								
								Ext.Msg.show({
		    		 				title:'信息',
		     						msg: '确定要删除选中点位信息吗？',
		     						buttons: Ext.Msg.YESNO,
		     						fn: function(buttonId,text,opt){
		    	 
		    	 						if(buttonId=='yes'){
		    	 							
		    								Ext.Ajax.request({
												url : 'delPostion',
												params : {
													pid : rec.data.pid
											},
											success : function(response) {
												var text = response.responseText;

												var m = Ext.JSON.decode(text);
											
												if(m.success){										
													gridstore.load({params:{bid:me.rec.data.bid }});
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
		    ]
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
					tooltip : '添加点位',
					iconCls : 'add',
					handler : function() {

						Ext.create('PT.view.window.EditPostionWindow',{
							rec:null,
							bid:me.rec.data.bid,
							listeners:{'beforedestroy':function(){									
																	
								gridstore.load({params:{bid:me.rec.data.bid }});
						}}}).show();
						
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
		
		
		gridstore.load({params:{bid:me.rec.data.bid }});
			
		},on_beforerender:function(me, eOpts){
		
			var rec=me.rec;
				
			if(rec!=null){
			
					var form=me.child('form').getForm();
			
					form.loadRecord(rec);
			 }
	  }		
	});