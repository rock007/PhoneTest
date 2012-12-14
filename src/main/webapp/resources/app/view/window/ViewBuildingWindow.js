
/**
 * 
 **/
  
 Ext.define('PT.view.window.ViewBuildingWindow',{
 	extend:'Ext.window.Window', 	
 	width:600,
 	height:500,
 	modal:true,
 	rec:null,
 	title:'楼宇信息查看', 	
	initComponent : function() {
		
		var me = this;
		
		var  from =Ext.create('Ext.form.Panel',{
			region:'center',
			bodyPadding: 5,
			width:590,
			layout: 'anchor',
			fieldDefaults: {
            	labelAlign: 'right'            				
        	},
        	defaults: {
        		anchor: '95%'       					
    		},
    		defaultType: 'textfield',
			items:[
					{
        				fieldLabel: '楼宇代码',
        				name: 'bcode',
        				anchor:'50%',
        				allowBlank: false
    				},{
        				fieldLabel: '名称',
        				name: 'bname',
        				maxLength :20,
        				allowBlank: false,   
        				anchor:'90%'
        				
    				},{
        				fieldLabel: '行政区',
        				name: 'acode',
        				allowBlank: false,
        				xtype:'combobox',
    					store: Ext.create('PT.store.TaskType'),
    					queryMode: 'local',
    					displayField: 'name',
    					valueField: 'value',        						
        				anchor:'50%' 	      
        				
    				},{
    					fieldLabel : '地址',
    					name: 'blocation',
        				maxLength :50,
        				allowBlank: false,        	      
        				anchor:'90%'
        		                    
        		    },{
        				fieldLabel: '楼宇类型',
        				xtype      : 'fieldcontainer',
	                    defaultType: 'radiofield',
	                    defaults: {
	                        flex: 1
	                    },
	                    layout: 'hbox',
	                    anchor:'100%',
	                    items: [
	                        {
	                            boxLabel  : '普通楼宇',
	                            name      : 'btype',        		                            
	                            inputValue: '0',
	                            checked :   true,
	                            id        : 'btype_radio1'        		                            
	                        }, {
	                            boxLabel  : 'VIP',
	                            name      : 'btype',	                            
	                            inputValue: '1',
	                            id        : 'btype_radio2'
	                        }, {
	                            boxLabel  : 'WIP',
	                            name      : 'btype',	                            
	                            inputValue: '2',
	                            id        : 'btype_radio3'
	                        }
	                    ]
    				}
    				,/***{
        				fieldLabel: '巡检频率',
        				name: 'frequency',        		   
        				allowBlank: false,
        				xtype:'combobox',
    					store: Ext.create('PT.store.TaskType'),
    					queryMode: 'local',
    					displayField: 'name',
    					valueField: 'value',  
        				anchor:'50%'
    				},***/{
    					xtype:'textfield',
        				fieldLabel: '经度',
        				name: 'longitude',      	      
        				anchor:'50%'
    				}
    				,{
        				fieldLabel: '纬度',
        				xtype:'textfield',
        				name: 'latitude',        			
        				anchor:'50%'
    				},{
        				fieldLabel: '备注',
        				xtype:'textfield',
        				name: 'remarks',
        				maxLength :255,
        				allowBlank: true,         			
        				anchor:'90%'
    				},{
    			        xtype: 'hiddenfield',
    			        name: 'bid'
    			    }]			
		});
		
		Ext.create('Ext.data.Store', {
		    storeId:'simpsonsStore',
		    fields:['name', 'email', 'phone'],
		    data:{'items':[
		        { 'name': 'Lisa',  "email":"lisa@simpsons.com",  "phone":"555-111-1224"  },
		        { 'name': 'Bart',  "email":"bart@simpsons.com",  "phone":"555-222-1234" },
		        { 'name': 'Homer', "email":"home@simpsons.com",  "phone":"555-222-1244"  },
		        { 'name': 'Marge', "email":"marge@simpsons.com", "phone":"555-222-1254"  }
		    ]},
		    proxy: {
		        type: 'memory',
		        reader: {
		            type: 'json',
		            root: 'items'
		        }
		    }
		});

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
		    title: '点位信息',
		    store: gridstore,
		    columns: [
		        { header: '代码',  dataIndex: 'pcode' },
		        { header: '名称', dataIndex: 'pname' },
		        { header: '任务', dataIndex: 'task' , flex: 1},
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
								listeners:{'beforedestroy':function(){									
																		
									gridstore.load({params:{bid:me.rec.data.bid }});
							}}}).show();
	
						}},
						{
							icon: 'resources/images/icons/fam/delete.gif',
							tooltip : '删除',
							handler : function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								
		
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
			    type: 'vbox'
			},
			items:[	from,grid],
			 dockedItems:[ {
					xtype : 'toolbar',
					dock : 'top',
					items : [ {
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
		me.on('beforerender',me.on_beforerender);
		
		gridstore.load({params:{bid:me.rec.data.bid }});
			
		},on_beforerender:function(me, eOpts){
		
			var rec=me.rec;
				
			if(rec!=null){
			
					var form=me.child('form').getForm();
			
					form.loadRecord(rec);
			 }
	  }		
	});