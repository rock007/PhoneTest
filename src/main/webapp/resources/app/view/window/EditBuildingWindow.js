
/**
 * 
 **/
  
 Ext.define('PT.view.window.EditBuildingWindow',{
 	extend:'Ext.window.Window', 	
 	width:600,
 	height:400,
 	modal:true,
 	rec:null,
 	title:'楼宇编辑', 	
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
    					value:1,
    					hidden:true,
    					displayField: 'name',
    					valueField: 'value',  
        				anchor:'50%'
    				},{
    					xtype:'textfield',
        				fieldLabel: '经度',
        				hidden:true,
        				name: 'longitude',      	      
        				anchor:'50%'
    				}
    				,{
        				fieldLabel: '纬度',
        				xtype:'textfield',
        				hidden:true,
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
		
				
		Ext.applyIf(me, {			 
			layout: {
			    type: 'border'
			},
			items:[	from],
			 dockedItems:[ {
					xtype : 'toolbar',
					dock : 'top',
					items : [ {
							text : '保存',
							tooltip : '保存楼宇信息',
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
			
		},on_beforerender:function(me, eOpts){
		
			var rec=me.rec;
				
			if(rec!=null){
			
					var form=me.child('form').getForm();
			
					form.loadRecord(rec);
			 }
	  }		
	});