/**
 * 
 **/
  
 Ext.define('PT.view.window.EditPostionWindow',{
 	extend:'Ext.window.Window', 	
 	width:600,
 	height:400,
 	modal:true,
 	rec:null,
 	bid:0,
 	title:'点位信息编辑', 	
	initComponent : function() {
		
		var me = this;
		
		var  from =Ext.create('Ext.form.Panel',{
			region:'center',
			bodyPadding: 5,
			layout: 'anchor',
			fieldDefaults: {
            	labelAlign: 'right'            				
        	},        	
    		defaultType: 'textfield',
			items:[
					{
        				fieldLabel: '点位代码',
        				name: 'pcode',
        				anchor:'50%',
        				allowBlank: false
    				},{
        				fieldLabel: '名称',
        				name: 'pname',
        				allowBlank: false,
        				maxLength :15,				
        				anchor:'50%'
    				},{
    		            xtype: 'fieldcontainer',
    		            fieldLabel: '任务',
    		            defaultType: 'checkboxfield',
    		            items: [
    		                {
    		                    boxLabel  : '定点场强测试',
    		                    name      : 'task',
    		                    inputValue: 'A',
    		                    id        : 'task_checkbox1'
    		                }, {
    		                    boxLabel  : '业务拨测',
    		                    name      : 'task',
    		                    inputValue: 'B',
    		                    checked   : true,
    		                    id        : 'task_checkbox2'
    		                }, {
    		                    boxLabel  : '室内外切换测试',
    		                    name      : 'task',
    		                    inputValue: 'C',
    		                    id        : 'task_checkbox3'
    		                }, {
    		                    boxLabel  : 'CQT测试',
    		                    name      : 'task',
    		                    inputValue: 'D',
    		                    id        : 'task_checkbox4'
    		                }
    		            ]
    		        },{
        				fieldLabel: '备注',
        				name: 'remarks',
        				allowBlank: false,
        				maxLength :100,				
        				anchor:'50%'
    				},{
    			        xtype: 'hiddenfield',
    			        name: 'bid',
    			        value:me.bid
    			    },{
    			        xtype: 'hiddenfield',
    			        name: 'pid',
    			        value:0
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
							tooltip : '保存点位信息',
							iconCls : 'ok',
							handler : function() {
								
								var form = me.down('form').getForm();
            					if (form.isValid()) {
                					form.submit({
                						url: 'updatePostion',    							
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
			
		},on_beforerender:function(me, eOpts){
		
			var rec=me.rec;
				
			if(rec!=null){
			
					var form=me.child('form').getForm();
			
					form.loadRecord(rec);
			 }
	  }		
	});