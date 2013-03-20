/**
 * 
 **/
  
 Ext.define('PT.view.window.EditTestUserWindow',{
 	extend:'Ext.window.Window', 	
 	width:500,
 	height:300,
 	modal:true,
 	rec:null,
 	title:'巡检人员编辑', 	
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
        				fieldLabel: '手机号码',
        				name: 'mobileId',
        				maxLength :11,
        				minLength :11,	
        				anchor:'70%',
        				allowBlank: false
    				},{
        				fieldLabel: '姓名',
        				name: 'ename',
        				allowBlank: false,
        				maxLength :15,				
        				anchor:'70%'
    				},{
        				fieldLabel: '员工编码',
        				name: 'ecode',
        				allowBlank: false,
        				allowBlank: false,
        				maxLength :15,
        				anchor:'70%'
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
							tooltip : '保存用户信息',
							iconCls : 'ok',
							handler : function() {
								
								var form = me.down('form').getForm();
            					if (form.isValid()) {
                					form.submit({
                						url: 'updateMobile',    							
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