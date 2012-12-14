Ext.define('PT.view.task.PostionPanel', {
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
	
	var store = Ext.create('Ext.data.TreeStore', {
	    root: {
	        expanded: true,
	        children: [
	            {"value":"A", "text":"黄浦区", leaf: true },
	            {"value":"B", "text":"卢湾区", leaf: true },
	            {"value": "C", "text":"徐汇区", leaf: true },
	            {"value":"D", "text":"长宁区", leaf: true },
	            {"value":"E", "text":"静安区", leaf: true },
	            {"value":"F", "text":"普陀区", leaf: true },
	            {"value":"G" , "text":"闸北区", leaf: true },
	            {"value":"H", "text":"虹口区", leaf: true },
	            {"value":"I", "text":"杨浦区", leaf: true },
	            {"value":"J", "text":"宝山区", leaf: true },
	            {"value":"K", "text":"闵行区", leaf: true },
	            {"value":"L", "text":"嘉定区", leaf: true },
	            {"value":"M", "text":"浦东新区", leaf: true },
	            {"value":"N", "text":"松江区", leaf: true },
	            {"value":"O", "text":"金山区", leaf: true },
	            {"value":"P", "text":"青浦区", leaf: true },
	            {"value":"Q", "text":"奉贤区", leaf: true },
	            {"value":"R", "text":"崇明县", leaf: true }
	        ]
	    }
	});

 var treePanel=	Ext.create('Ext.tree.Panel', {
	    title: '区域信息',
	    width: 200,
	   // height: 150,
	    store: store,
	    region:'west',
	    rootVisible: true
	});
	
		Ext.applyIf(me, {
			layout:'border',  
			items:[treePanel,			
				{
					xtype:'gridpanel',
					region:'center',
					title: '楼宇管理',
					//selModel: Ext.create('Ext.selection.CheckboxModel',{mode:'SIMPLE'}),
    				store: gridstore,
    				columns: [
        				{ header: '楼宇代码',  dataIndex: 'bcode' , flex: 1},
        				{ header: '楼宇名称', dataIndex: 'bname' ,renderer:function(v){
        					        					
        					//var record= Ext.create('MobileTest.store.TestTaskType').findRecord('value',v);
		        			//if(record!=null){
		        			//	return record.data.name;
		        			//}
		        			return v;
        				}},
        				{ header: '地址', dataIndex: 'blocation', flex: 1 },
        				{ header: '类型', dataIndex: 'btype', flex: 1  ,renderer:function(v){
        					        		
		        			if(v==0){
		        				return "普通楼宇";
		        			}else if(v==1){
		        				return "VIP";
		        			}else if(v==2){
		        				return "WIP";
		        			}
		        			return v;
        				}},        		
        				{ header: '行政区', dataIndex: 'acode', flex: 1  ,renderer:function(v){
        					        					
        					var record= Ext.create('PT.store.RegionType').findRecord('value',v);
		        			if(record!=null){
		        				return record.data.name;
		        			}
		        			return v;
        				}},
        				{ header: '点位数量(个)', dataIndex: 'callTime', flex: 1 },
        				{
							xtype : 'actioncolumn',				
							flex : 1,
							items : [/**** {
								icon: 'resources/images/icons/fam/edit.gif',
								tooltip : '编辑',
								handler : function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);
																		
									Ext.create('PT.view.window.EditBuildingWindow',{
										rec:rec,
										listeners:{'beforedestroy':function(){										
											gridstore.load({params:{taskType:0}});					
									}}}).show();
									
								}},***/
								 {
									icon: 'resources/images/icons/fam/image_add.png',
									tooltip : '添加点位',
									handler : function(grid, rowIndex, colIndex) {
										var rec = grid.getStore().getAt(rowIndex);
																			
										Ext.create('PT.view.window.EditPostionWindow',{
											bid:rec.data.bid,
											listeners:{'beforedestroy':function(){										
												//gridstore.load({params:{taskType:0}});					
										}}}).show();
										
									}},
									 {
										icon: 'resources/images/icons/fam/information.png',
										tooltip : '查看',
										handler : function(grid, rowIndex, colIndex) {
											var rec = grid.getStore().getAt(rowIndex);
																				
											Ext.create('PT.view.window.ViewBuildingWindow',{
												rec:rec,
												listeners:{'beforedestroy':function(){										
													//gridstore.load({params:{taskType:0}});					
											}}}).show();
											
										}}
		 					]
						}
    				],
    				dockedItems : [ /***{
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
							
						} ]}, ***/
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
				
				gridstore.load({params:{taskType:0}});	
				
		
			}
					
		});