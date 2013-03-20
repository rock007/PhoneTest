Ext.define('PT.view.task.BuildingPanel', {
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
			items:[	treePanel,		
				{
					xtype:'gridpanel',
					region:'center',
					title: '楼宇管理',
					selModel: Ext.create('Ext.selection.CheckboxModel',{mode:'SIMPLE'}),
    				store: gridstore,
    				columns: [
        				{ header: '楼宇代码',  dataIndex: 'bcode' , flex: 1},
        				{ header: '楼宇名称', dataIndex: 'bname'},
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
        				{
							xtype : 'actioncolumn',	
							header:'楼宇及点位编辑',
							flex : 1,
							items : [ {
								icon: 'resources/images/icons/fam/edit.gif',
								tooltip : '编辑',
								handler : function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);
																		
									Ext.create('PT.view.window.EditBuildingWindow',{
										rec:rec,
										listeners:{'beforedestroy':function(){										
											gridstore.load({params:{taskType:0}});					
									}}}).show();
									
								}},{
										icon: 'resources/images/icons/fam/information.png',
										tooltip : '点位查看',
										handler : function(grid, rowIndex, colIndex) {
											var rec = grid.getStore().getAt(rowIndex);
																				
											Ext.create('PT.view.window.PostionListWindow',{
													rec:rec
												}).show();
											
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
								
								var selModel=me.child('grid').getSelectionModel().getSelection();
								
								if(selModel.length==0){
									
									alert("请选择要删除楼宇！");
									return;
								}
								
								var idsStr='';
			             		for(var i=0;i<selModel.length;i++ ){			             	
			             			idsStr+=selModel[i].data.bid+';';			             	
			             		}
								
								Ext.Msg.show({
			    		 				title:'信息',
			     						msg: '确定要删除选中楼宇吗？',
			     						buttons: Ext.Msg.YESNO,
			     						fn: function(buttonId,text,opt){
			    	 
			    	 						if(buttonId=='yes'){
			    	 							
			    								Ext.Ajax.request({
													url : 'delBuilding',
													params : {
														bidStr : idsStr
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