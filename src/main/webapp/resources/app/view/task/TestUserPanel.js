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
					title: '巡检人员管理',
					selModel: Ext.create('Ext.selection.CheckboxModel',{mode:'SIMPLE'}),
    				store: gridstore,
    				columns: [
        				{ header: '手机号码',  dataIndex: 'phoneNo' , flex: 1},
        				{ header: '员工编码', dataIndex: 'ucode' ,renderer:function(v){
        					        					
        					//var record= Ext.create('MobileTest.store.TestTaskType').findRecord('value',v);
		        			//if(record!=null){
		        			//	return record.data.name;
		        			//}
		        			return v;
        				}},
        				{ header: '姓名', dataIndex: 'name', flex: 1 },
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