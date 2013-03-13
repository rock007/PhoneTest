
/**
 * 
 **/
  
 Ext.define('PT.view.window.EditFullBuildingWindow',{
 	extend:'Ext.window.Window', 
 	maximizable :true,
 	width:750,
 	height:540,
 	modal:true,
 	rec:null,
 	title:'楼宇信息详细', 	
	initComponent : function() {
		
		var me = this;
		
		var  from =Ext.create('Ext.form.Panel',{
			region:'north',
			bodyPadding: 5,			
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
    					store: Ext.create('PT.store.RegionType'),
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
    				,{
        				fieldLabel: '巡检频率',
        				name: 'frequency',        		   
        				allowBlank: false,
        				xtype:'combobox',
    					store: Ext.create('PT.store.FrequencyType'),
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
    				},{
        				fieldLabel: '备注',
        				xtype:'textfield',
        				name: 'remarks',
        				maxLength :255,
        				allowBlank: true,         			
        				anchor:'90%'
    				},{
    			        xtype: 'hiddenfield',
    			        name: 'bid',
    			        value:0
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
								
								Ext.Msg.show({
		    		 				title:'信息',
		     						msg: '确定要删除点位信息吗？',
		     						buttons: Ext.Msg.YESNO,
		     						fn: function(buttonId,text,opt){
		    	 
		    	 						if(buttonId=='yes'){
		    	 							
		    								Ext.Ajax.request({
												url : 'delPostion',
												params : {
													bid:me.rec.data.bid
											},
											success : function(response) {
												var text = response.responseText;

												var m = Ext.JSON.decode(text);
											
												if(m.success){										
													gridstore.load({params:{bid:me.rec.data.bid }});
												}else{
													alert(m.msg);
												}
												
											}});
		    	 						}
		     						},							 
		     						icon: Ext.window.MessageBox.QUESTION
							});
								
		
							}
						}
 					]
				}
		    ],	
		    dockedItems : [{
				xtype : 'toolbar',
				dock : 'top',
				items : [ {
					text : '添加',
					tooltip : '添加点位信息',
					iconCls : 'add',
					handler : function() {

						Ext.create('PT.view.window.EditPostionWindow',{
							bid:me.rec.data.bid,
							listeners:{'beforedestroy':function(){										
								gridstore.load({params:{bid:me.rec.data.bid }});					
						}}}).show();
						
						}
					} ]}
		    ]
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
								
								Ext.Msg.show({
		    		 				title:'信息',
		     						msg: '确定要删除测试人员吗？',
		     						buttons: Ext.Msg.YESNO,
		     						fn: function(buttonId,text,opt){
		    	 
		    	 						if(buttonId=='yes'){
		    	 							
		    								Ext.Ajax.request({
												url : 'delTestUser',
												params : {
													bid:me.rec.data.bid,
													mobileId : rec.data.mobileId
											},
											success : function(response) {
												var text = response.responseText;

												var m = Ext.JSON.decode(text);
											
												if(m.success){										
													gridstore2.load({params:{bid:me.rec.data.bid }});
												}else{
													alert(m.msg);
												}
												
											}});
		    	 						}
		     						},							 
		     						icon: Ext.window.MessageBox.QUESTION
							});
		
							}
						}
 					]
				}
		    ],
		    dockedItems : [{
				xtype : 'toolbar',
				dock : 'top',
				items : [ {
					text : '添加',
					tooltip : '添加人员',
					iconCls : 'add',
					handler : function() {

						Ext.create('PT.view.window.TaskUserWindow',{
							bid:me.rec.data.bid,
							
							listeners:{'beforedestroy':function(){										
								gridstore2.load({params:{bid:me.rec.data.bid }});				
						}}}).show();
						
						}
					} ]}
		    ]
		});
		
		Ext.applyIf(me, {			 
			layout: {
			    type: 'border'
			},
			items:[	from,{
				xtype: 'tabpanel',
				region:'center',
				items:[grid,grid2]
			}],
			 dockedItems:[ {
					xtype : 'toolbar',
					dock : 'top',
					items : [{
						text : '保存',
						tooltip : '保存信息',
						iconCls : 'ok',
						handler : function() {
							
							var form = me.down('form').getForm();
        					if (form.isValid()) {
            					form.submit({
            						url: 'updateBuilding',    							
                					success: function(form, action) {
                   						Ext.Msg.alert('Success', action.result.msg);
                   						
                   						me.close();
                					},
                					failure: function(form, action) {
                    					Ext.Msg.alert('Failed', action.result.msg);
                					}
            					});
        					}
						
						}
					}, {
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