
/**
 * 
 **/
  
 Ext.define('PT.view.window.ViewBuildingWindow2',{
 	extend:'Ext.window.Window', 	
 	width:700,
 	height:440,
 	modal:true,
 	rec:null,
 	title:'楼宇信息查看', 	
	initComponent : function() {
		
		var me = this;
		
		var  from =Ext.create('Ext.form.Panel',{
			region:'north',
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
    				},{
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
    				}***/,{
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
		    height: 200,
		    width: 350
		});
		
		var gridstore2=	Ext.create('Ext.data.Store', {    	
			fields:[
			        {name:'mobileId',type:'int'}, 'ecode','ename',{name:'status',type:'int'}
			],    	    			
			proxy: {
    			type: 'ajax',
    			url : 'getTestUserList',
    			reader: {
        			type: 'json',
        			root: 'rows'
    			}        	
			}
		});
		
		var grid2= Ext.create('Ext.grid.Panel', {	
			title:'测试人员',
		    store: gridstore2,		    
		    selModel: Ext.create('Ext.selection.CheckboxModel',{mode:'SIMPLE'}),
		    columns: [
		        { header: '手机号码',  dataIndex: 'mobileId' },
		        { header: '员工编码', dataIndex: 'ecode' },
		        { header: '姓名', dataIndex: 'ename' , flex: 1},
				{
					xtype : 'actioncolumn',				
					flex : 1,
					items : [ 
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
		    height: 200,
		    width: 350
		});
		
		Ext.applyIf(me, {			 
			layout: {
			    type: 'border'
			},
			items:[	from,{
				region:'center',
				layout:'hbox',
				items:[grid,grid2]}],
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
		gridstore2.load({params:{bid:me.rec.data.bid }});
			
		},on_beforerender:function(me, eOpts){
		
			var rec=me.rec;
				
			if(rec!=null){
			
					var form=me.child('form').getForm();
			
					form.loadRecord(rec);
			 }
	  }		
	});