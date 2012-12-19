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
    			 {name:'bid',type:'int'}, 'bcode', 'bname', 'blocation',{name: 'btype',type:'int'},{name: 'frequency',type:'int'}, 'acode', 'remarks', 'longitude', 'latitude'    			 
    			],    	    			
    			proxy: {
        			type: 'ajax',
        			url : 'getBuildings',
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
					//selModel: Ext.create('Ext.selection.CheckboxModel',{mode:'SIMPLE'}),
    				store: gridstore,
    				columns: [
        				{ header: '行政区域',  dataIndex: 'acode'  ,renderer:function(v){
        					        					
        					var record= Ext.create('PT.store.RegionType').findRecord('value',v);
		        			if(record!=null){
		        				return record.data.name;
		        			}
		        			return v;
        				}},
        				{ header: '楼宇名称', dataIndex: 'bname' , flex: 1},
        				{ header: '巡检频率', dataIndex: 'frequency',renderer:function(v){
        					        					
        					var record= Ext.create('PT.store.FrequencyType').findRecord('value',v);
		        			if(record!=null){
		        				return record.data.name;
		        			}
		        			return v;
        				}  },
        				{
							xtype : 'actioncolumn',				
					
							items : [ {
								icon: 'resources/images/icons/fam/edit.gif',
								tooltip : '人员安排',
								handler : function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);
																		
									Ext.create('PT.view.window.TaskUserWindow',{
										rec:rec,
										listeners:{'beforedestroy':function(){										
											//gridstore.load({params:{taskType:0}});					
									}}}).show();
									
								}},
								{
								icon: 'resources/images/icons/fam/arrow_down.png',
								tooltip : '任务安排',
								handler : function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);

									Ext.create('PT.view.window.EditPostionWindow',{
										bid:rec.data.bid,
										listeners:{'beforedestroy':function(){										
											//gridstore.load({params:{taskType:0}});					
									}}}).show();

								}}
		 					]
						},
        				{
							xtype : 'actioncolumn',				
					
							items : [
									 {
										icon: 'resources/images/icons/fam/information.png',
										tooltip : '查看',
										handler : function(grid, rowIndex, colIndex) {
											var rec = grid.getStore().getAt(rowIndex);
																				
											Ext.create('PT.view.window.ViewBuildingWindow2',{
												rec:rec,
												listeners:{'beforedestroy':function(){										
													//gridstore.load({params:{taskType:0}});					
											}}}).show();
											
										}}
		 					]
						}
    				],
    				dockedItems : [ 
				        {
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
				
				gridstore.load();	
				
		
			}
					
		});