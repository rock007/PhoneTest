Ext.define('PT.view.task.BuildingPanel', {
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
					title: '楼宇管理',
					selModel: Ext.create('Ext.selection.CheckboxModel',{mode:'SIMPLE'}),
    				store: gridstore,
    				columns: [
        				{ header: '楼宇代码',  dataIndex: 'task_code' , flex: 1},
        				{ header: '楼宇名称', dataIndex: 'task_type' ,renderer:function(v){
        					        					
        					//var record= Ext.create('MobileTest.store.TestTaskType').findRecord('value',v);
		        			//if(record!=null){
		        			//	return record.data.name;
		        			//}
		        			return v;
        				}},
        				{ header: '地址', dataIndex: 'locationCode', flex: 1 },
        				{ header: '类型', dataIndex: 'callType', flex: 1 },
        				{ header: '巡检频率', dataIndex: 'callTel', flex: 1 },
        				{ header: '行政区', dataIndex: 'callTime', flex: 1 },
        				{ header: '点位数量(个)', dataIndex: 'callTime', flex: 1 },
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
								}}								
		 					]
						}
    				],
    				dockedItems : [ {
					xtype : 'toolbar',
					dock : 'top',
					items : [ {
						text : '添加',
						tooltip : '添加楼宇',
						iconCls : 'add',
						handler : function() {

							Ext.create('PT.view.window.EditBuildingWindow',{								
								listeners:{'beforedestroy':function(){										
									gridstore.load({params:{taskType:0}});													
								}}
							}).show();
							
							}
						},{
							text : '删除',
							tooltip : '删除楼宇',						
							iconCls : 'del',
							handler : function() {
								
							}
						},'-',{
						
							xtype: 'textfield',
					        name: 'search_key'
						},{
							text : '检索',
							tooltip : '检索关键字',						
							iconCls : 'search',
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