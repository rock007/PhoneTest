Ext.define('PT.view.task.ManagerPanel', {
			extend:'Ext.panel.Panel',				
			ids:null,
			viewConfig : {
				stripeRows : true
			},			
			initComponent : function() {
				
			var me = this;
		
	var gridstore=	Ext.create('Ext.data.Store', {    	
    			fields:[
    			        'task_code', 'task_type', 'params', {name:'testTimes',type:'int'}, 'testUser', {name:'createDt',type:'date'},{name: 'status',type:'int'}    			        
    			 ,'locationCode',  'callType', 'callTel', 'callTime', 'timeout'
    			],    	
    			
    			proxy: {
        			type: 'ajax',
        			url : 'getTasks',
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
					title: '任务管理',
					selModel: Ext.create('Ext.selection.CheckboxModel',{mode:'SIMPLE'}),
    				store: gridstore,
    				columns: [
        				{ header: '任务号',  dataIndex: 'task_code' , flex: 1},
        				{ header: '类型', dataIndex: 'task_type' ,renderer:function(v){
        					        					
        					//var record= Ext.create('MobileTest.store.TestTaskType').findRecord('value',v);
		        			//if(record!=null){
		        			//	return record.data.name;
		        			//}
		        			return v;
        				}},
        				{ header: '楼宇点位', dataIndex: 'locationCode', flex: 1 },
        				{ header: '呼叫类型', dataIndex: 'callType', flex: 1 },
        				{ header: '主叫/被叫号码', dataIndex: 'callTel', flex: 1 },
        				{ header: '通话持续时间', dataIndex: 'callTime', flex: 1 },
        				
        				{ header: '次数', dataIndex: 'testTimes', flex: 1 },        				
        				{ header: '状态', dataIndex: 'status' ,renderer:function(v){

		        			if(v==0){
		        				return "未生效";
		        			}else if (v==1){
		        				return "生效";
		        			}
		        			return v;
        				}},
        				{
							xtype : 'actioncolumn',				
							flex : 1,
							items : [ {
								icon: 'resources/images/icons/fam/edit.gif',
								tooltip : '查看',
								handler : function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);
									
									/**
									Ext.create('PT.view.window.EditTaskWindow',{
										rec:rec,
										listeners:{'beforedestroy':function(){										
											gridstore.load({params:{taskType:0}});					
									}}}).show();
									**/
								}},
								{
								icon: 'resources/images/icons/fam/arrow_down.png',
								tooltip : '立即生效',
								handler : function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);

							Ext.Msg.show({
			    		 				title:'信息',
			     						msg: '确定要设置任务有效吗？',
			     						buttons: Ext.Msg.YESNO,
			     						fn: function(buttonId,text,opt){
			    	 
			    	 						if(buttonId=='yes'){
			    	 							
									Ext.Ajax.request({
													url : 'validTask',
													params : {
														taskid : rec.data.testTaskCode
												},
												success : function(response) {
													var text = response.responseText;

													var m = Ext.JSON.decode(text);
												
													if(m.success){										
														gridstore.load({params:{taskType:0}});	
													}else{
														alert(m.msg);
													}
													
												}});			    	 							
			    	 							
			    	 						}}});

								}}
		 					]
						}
    				],
    				dockedItems : [ {
					xtype : 'toolbar',
					dock : 'top',
					items : [ {
						text : '添加',
						tooltip : '添加测试任务',
						iconCls : 'add',
						handler : function() {

							Ext.create('PT.view.window.EditTaskWindow',{								
								listeners:{'beforedestroy':function(){										
									gridstore.load({params:{taskType:0}});													
								}}
							}).show();
							
							}
						},{
							text : '删除',
							tooltip : '删除测试任务',						
							iconCls : 'del',
							handler : function() {
								
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