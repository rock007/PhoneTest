Ext.define('PT.view.task.TestUserPanel', {
			extend:'Ext.panel.Panel',				
			ids:null,
			viewConfig : {
				stripeRows : true
			},			
			initComponent : function() {
				
			var me = this;
		
	var gridstore=	Ext.create('Ext.data.Store', {    	
    			fields:[
    			        'mobileId', 'ecode','ename',{name:'status',type:'int'}
    			],    	    			
    			proxy: {
        			type: 'ajax',
        			url : 'getMobileList',
        			reader: {
            			type: 'json',
            			root: 'rows'
        			}        	
    			}
			});
		
		Ext.applyIf(me, {
			layout:'border',  
			items:[			
				{
					xtype:'gridpanel',
					region:'center',
					title: '巡检人员管理',
					selModel: Ext.create('Ext.selection.CheckboxModel',{mode:'SIMPLE'}),
    				store: gridstore,
    				columns: [
        				{ header: '手机号码',  dataIndex: 'mobileId' , flex: 1},
        				{ header: '员工编码', dataIndex: 'ecode' },
        				{ header: '姓名', dataIndex: 'ename', flex: 1 },
        				{
							xtype : 'actioncolumn',				
							flex : 1,
							items : [ {
								icon: 'resources/images/icons/fam/edit.gif',
								tooltip : '查看',
								handler : function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);
									
									Ext.create('PT.view.window.EditTestUserWindow',{
										rec:rec,
										listeners:{'beforedestroy':function(){										
											gridstore.load({params:{taskType:0}});					
									}}}).show();
									
								}}
								
		 					]
						}
    				],
    				dockedItems : [ {
					xtype : 'toolbar',
					dock : 'top',
					items : [ {
						text : '添加',
						tooltip : '添加巡检人员',
						iconCls : 'add',
						handler : function() {

							Ext.create('PT.view.window.EditTestUserWindow',{								
								listeners:{'beforedestroy':function(){										
									gridstore.load({params:{taskType:0}});													
								}}
							}).show();
							
							}
						},{
							text : '删除',
							tooltip : '删除巡检人员',						
							iconCls : 'del',
							handler : function() {
								
								var selModel=me.child('grid').getSelectionModel().getSelection();
								
								if(selModel.length==0){
									
									alert("请选择要删除巡检人员！");
									return;
								}
								
								var idsStr='';
			             		for(var i=0;i<selModel.length;i++ ){			             	
			             			idsStr+=selModel[i].data.mobileId+';';			             	
			             		}
								
								Ext.Msg.show({
			    		 				title:'信息',
			     						msg: '确定要删除选中巡检人员吗？',
			     						buttons: Ext.Msg.YESNO,
			     						fn: function(buttonId,text,opt){
			    	 
			    	 						if(buttonId=='yes'){
			    	 							
			    								Ext.Ajax.request({
													url : 'delMobile',
													params : {
														mobileStr : idsStr
												},
												success : function(response) {
													var text = response.responseText;

													var m = Ext.JSON.decode(text);
												
													if(m.success){										
														gridstore.load({params:{key:''}});
													}else{
														alert(m.msg);
													}
													
												}});
			    	 						}
			     						},							 
			     						icon: Ext.window.MessageBox.QUESTION
								});
								
							}
						} ]}
				        ,{
			        		xtype: 'pagingtoolbar',
			        		store: gridstore,   
			        		dock: 'bottom',
			        		displayInfo: true
			    		}
				    ]
				}
			]
		});
				me.callParent(arguments);	
				
				gridstore.load({params:{taskType:0}});	
				
		
			}
					
		});