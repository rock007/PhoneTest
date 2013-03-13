Ext.define('PT.view.task.ManagerPanel', {
			extend:'Ext.panel.Panel',				
			ids:null,
			searchKey:'',
			curAddress:'',
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
			var loadData=function(){
				
				gridstore.on('beforeload', function (store, options) {
			      	        
			        var extraParams={
			        	bname:me.searchKey,	
			        	acode:me.curAddress
				    };
			        
			        Ext.apply(store.proxy.extraParams, extraParams);
			      
			    });
				
				gridstore.load({
				    params:{
				    	start:0,    
				        limit: 25,
				        index:1
				    }
				});
			};
			
			var store = Ext.create('Ext.data.TreeStore', {
			    root: {
			        expanded: true,
			        children: [
			                   { text: "上海市", expanded: true, 
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
		                       		            ] }       
			            
			        ]
			    }
			});

		 var treePanel=	Ext.create('Ext.tree.Panel', {
			    title: '区域信息',
			    width: 200,
			    store: store,
			    region:'west',
			    rootVisible: false,
			    listeners:{'selectionchange':function( t,  selected,  eOpts){
			    	
			    	if(selected!=null&&selected.length>0){
			    		
			    		if(selected[0].raw.value){
			    			
			    			me.curAddress=selected[0].raw.value;
			    			loadData();
			    		}else{
			    			me.curAddress='';
			    			loadData();
			    		}	    		
			    			
			    	}
			    }}
			});
			
		Ext.applyIf(me, {
			layout:'border',  
			items:[		treePanel,	
				{
					xtype:'gridpanel',
					region:'center',
					title: '任务管理',					
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
        				{
							xtype : 'actioncolumn',	
							header: '人员及任务安排',
							items : [ {
								icon: 'resources/images/icons/fam/edit.gif',
								tooltip : '人员安排',
								handler : function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);
																		
									Ext.create('PT.view.window.TaskUserSelWindow',{
											rec:rec,
											bid:rec.data.bid
										}).show();
									
								}},
								{
								icon: 'resources/images/icons/fam/arrow_down.png',
								tooltip : '任务安排',
								handler : function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);
									
									Ext.create('PT.view.window.TaskListWindow',{
											rec:rec
										}).show();
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