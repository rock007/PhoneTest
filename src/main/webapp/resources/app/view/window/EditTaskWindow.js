
/**
 * 
 **/
  
 Ext.define('PT.view.window.EditTaskWindow',{
 	extend:'Ext.window.Window', 	
 	width:600,
 	height:400,
 	modal:true,
 	rec:null,
 	title:'任务编辑', 	
	initComponent : function() {
		
		var me = this;
		
		var  from =Ext.create('Ext.form.Panel',{
			region:'center',
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
        				fieldLabel: '任务号',
        				name: 'task_code',
        				anchor:'50%',
        				allowBlank: false
    				},{
        				fieldLabel: '任务类型',
        				name: 'task_type',
        				allowBlank: false,
        				xtype:'combobox',
    					store: Ext.create('PT.store.TaskType'),
    					queryMode: 'local',
    					displayField: 'name',
    					valueField: 'value',        						
        				anchor:'50%'
    				},{
        				fieldLabel: '楼宇点位',
        				name: 'locationCode',
        				maxLength :20,
        				allowBlank: false,        	      
        				anchor:'90%'
    				},{
        		                    xtype      : 'fieldcontainer',
        		                    fieldLabel : '呼叫类型',
        		                    defaultType: 'radiofield',
        		                    defaults: {
        		                        flex: 1
        		                    },
        		                    layout: 'hbox',
        		                    anchor:'100%',
        		                    items: [
        		                        {
        		                            boxLabel  : '主叫',
        		                            name      : 'callType',        		                            
        		                            inputValue: 'CL0',
        		                            checked :   true,
        		                            id        : 'callType_radio1'        		                            
        		                        }, {
        		                            boxLabel  : '被叫',
        		                            name      : 'callType',
        		                            
        		                            inputValue: 'CL1',
        		                            id        : 'callType_radio2'
        		                        }
        		                    ]
        		    },{
        				fieldLabel: '主叫/被叫号码',
        				name: 'callTel',
        				maxLength :15,
        				allowBlank: false,        	      
        				anchor:'90%'
    				}
    				,{
        				fieldLabel: '通话持续时间',
        				name: 'callTime',
        				xtype: 'numberfield',
        		        minValue: 0,
        		        value:10,
        				allowBlank: false,        	      
        				anchor:'90%'
    				},{
        				fieldLabel: '呼叫超时',
        				name: 'timeout',
        				xtype: 'numberfield',
        		        minValue: 0,
        		        value:10,
        				allowBlank: false,        	      
        				anchor:'90%'
    				}
    				,{
        				fieldLabel: '次数',
        				xtype:'textfield',
        				name: 'testTimes',
        				xtype: 'numberfield',
        		        minValue: 0,
        		        value:10,
        				anchor:'50%'
    				},{
        				fieldLabel: '测试员',
        				xtype:'textfield',
        				name: 'testUser',
        				maxLength :15,
        				allowBlank: false,         			
        				anchor:'50%'
    				}]			
		});
		
		Ext.applyIf(me, {
			layout:'border',  
			items:[	from],
			 dockedItems:[ {
					xtype : 'toolbar',
					dock : 'top',
					items : [ {
							text : '保存',
							tooltip : '保存添加测试任务',
							iconCls : 'add',
							handler : function() {
								
								var form = me.down('form').getForm();
            					if (form.isValid()) {
                					form.submit({
                						url: 'submitTask',    							
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
							iconCls : 'add',
							handler : function() {
									me.close();
							}
					}]
				}]
			});
		
		me.callParent(arguments);	
		me.on('beforerender',me.on_beforerender);			
			
		},on_beforerender:function(me, eOpts){
		
			var rec=me.rec;
				
			if(rec!=null){
			
					var form=me.child('form').getForm();
			
					form.loadRecord(rec);
			 }
	  }		
	});