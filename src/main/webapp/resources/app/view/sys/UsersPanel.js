/**
 * 
 * */

Ext.define('PT.view.sys.UsersPanel', {
			extend:'Ext.panel.Panel',				
			ids:null,
			viewConfig : {
				stripeRows : true
			},			
			initComponent : function() {
				
			var me = this;
					
	var gridstore=	Ext.create('Ext.data.Store', {    	
    			fields:[
    				'userName', 'passWord', 'remarks',  'createIP', 					
    				{name:'createDT',type:'date'},{name: 'role',type:'int'}
    			],    	
    			proxy: {
        			type: 'ajax',
        			url : 'users',
        			reader: {
            			type: 'json',
            			root: 'rows'
        			}        	
    			}
			});
		
		var loadData=function(){
			
			/***
				gridstore.on('beforeload', function (store, options) {	      	        
	        		var extraParams={
	        				key:''		    
		    		};	        
	        		Ext.apply(store.proxy.extraParams, extraParams);	      
	    		});
	    **/
	    	   gridstore.load();
		};		
		
		Ext.applyIf(me, {
			layout:'border',  
			items:[			
				{
					xtype:'gridpanel',
					region:'center',
					title: '用户管理',
    				store: gridstore,
    				selModel: Ext.create('Ext.selection.CheckboxModel',{mode:'SIMPLE'}),
    				columns: [
        				{ header: '用户名',  dataIndex: 'userName'},
        				{ header: '角色', dataIndex: 'role', flex: 1 ,hidden:false,renderer:function(v){
        					var record= Ext.create('PT.store.RoleType').findRecord('value',v);
		        			if(record!=null){
		        				return record.data.name;
		        			}
		        			return v;
        					
        				}},
        				{ header: '备注', dataIndex: 'remarks'  , flex: 1},
        				{ header: '创建时间', dataIndex: 'createDT' },
        				{
							xtype : 'actioncolumn',				
							flex : 1,
							items : [ {
								icon: 'resources/images/icons/fam/information.png',
								tooltip : '查看',
								handler : function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);

									Ext.create('PT.view.window.EditUserWindow',{
										rec:rec,
										listeners:{'beforedestroy':function(){										
											loadData();				
									}}}).show();
			
								}}
		 					]
					}	        				
    				],
    				dockedItems : [ {
					xtype : 'toolbar',
					dock : 'top',
					items : [ {
						text : '添加',
						tooltip : '添加用户',
						iconCls : 'add',
						handler : function() {

							Ext.create('PT.view.window.EditUserWindow',{								
								listeners:{'beforedestroy':function(){										
									loadData();													
								}}
							}).show();
														
							}
						},{
							text : '删除',
							tooltip : '删除用户',						
							iconCls : 'del',
							handler : function() {
								
								var selModel=me.child('grid').getSelectionModel().getSelection();
								
								if(selModel.length==0){
									
									alert("请选择要删除用户！");
									return;
								}
								
								var idsStr='';
			             		for(var i=0;i<selModel.length;i++ ){			             	
			             			idsStr+=selModel[i].data.userName+';';			             	
			             		}
								
								Ext.Msg.show({
			    		 				title:'信息',
			     						msg: '确定要删除选中用户吗？',
			     						buttons: Ext.Msg.YESNO,
			     						fn: function(buttonId,text,opt){
			    	 
			    	 						if(buttonId=='yes'){
			    	 							
			    								Ext.Ajax.request({
													url : 'deleteUser',
													params : {
														users : idsStr
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
							xtype    : 'textfield',
				            name     : 'txt_search_key',
				            emptyText: '请输入要查询用户'
				        },{				          
				            text: '检索',
				            tooltip : '检索查询用户',						
							iconCls : 'search',
				            handler : function() {
								
				            	var key=this.up('toolbar').child('textfield').getValue();
				            	
				               	gridstore.load({params:{key:key}});
				            }
				        } ]}				        
				    ]
				}
			]
		});
				me.callParent(arguments);	
				
				gridstore.load();	
								
			}					
		});