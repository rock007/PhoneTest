/**
 * 
 **/
  
 Ext.define('PT.view.window.EditUserWindow',{
 	extend:'Ext.window.Window', 	
 	width:600,
 	height:400,
 	modal:true,
 	rec:null,
 	title:'用户信息编辑', 	
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
        				fieldLabel: '用户名',
        				name: 'userName',
        				anchor:'50%',
        				allowBlank: false
    				},{
        				fieldLabel: '密码',
        				name: 'passWord',
        				allowBlank: false,
        				maxLength :15,				
						blankText : '密码不能为空',
						inputType : 'password',
        				anchor:'50%'
    				},{
        				fieldLabel: '角色',
        				name: 'role',
        				allowBlank: false,
        	        	xtype:'combobox',
    					store: Ext.create('PT.store.RoleType'),
    					queryMode: 'local',
    					displayField: 'name',
    					valueField: 'value',
        				anchor:'50%'
    				},{
        				fieldLabel: '备注',
        				xtype:'textareafield',
        				name: 'remarks',
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
							tooltip : '保存用户信息',
							iconCls : 'add',
							handler : function() {
								
								var form = me.down('form').getForm();
            					if (form.isValid()) {
                					form.submit({
                						url: 'submitUser',    							
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