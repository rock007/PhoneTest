/*
 * 
 * */
Ext.application({
    name: 'PT', 
    paths: {
    	'PT':'resources/app'   
    },
    controllers: [    
        'NavController'
    ],    
    autoCreateViewport: true
});

//
String.prototype.insert = function (index, string) {
 		if (index > 0)
    		return this.substring(0, index) + string + this.substring(index, this.length);
  		else
    		return string + this;
};

 
 Ext.define('PT.controller.NavController', {
    extend: 'Ext.app.Controller',   
    refs: [
    	{ref:'navview',selector:'navview'},
    	{ref:'mainContent',selector:'mainContent'}
    ],
    init: function() {
        
        var me = this;
        
        me.control({
            'viewport > panel': {
                afterlayout: this.onPanelRendered
            }
        });
        
        me.control({
            'navview': {
                tabchange: me.onNavTabchange
            }
        });
           
    },
     onPanelRendered: function() {    
    },
    onLaunch: function() {
    
      	//this.getNavItemsStore().load({params:{ref:1}});
      	//this.getNavsidebar().bindStore(this.getNavItemsStore());
      	
    },
    onSideBarSelectionChange: function(view, records) {
    	
        if (records.length) {
            this.showView(records[0]);
        }
    },
    onNavItemsStoreLoad: function(store, records) {
        Ext.defer(function() {
            if (records.length) {
                var record = records[0],    me = this;
                
                me.getNavsidebar().getSelectionModel().select(record);
            }
        }, 500, this);
    },
    onNavTabchange:function(tabPanel,  newCard,  oldCard,  eOpts){
    
    	this.getNavItemsStore().load({params:{ref:newCard.key}});
    	this.getNavsidebar().bindStore(this.getNavItemsStore());
    },
    showView:function(rec){
    	
    	var pnl=this.getMainContent();
    	
    	if(pnl!=null){
    		
    		if(rec.data.value!=''){
    			pnl.removeAll();
    		    		
    			pnl.add(Ext.create(rec.data.value));
    		}else{
    			
    			alert('配置参数错误');
    		}
    	}    	
    },
    clickNodeChange:function(odel,  selected,  eOpts){
    	
    	var node= selected[0];
 
    	if(!node) return;    	
    	
    	if(node.isLeaf()){
        	        
        	var url=node.data.url;
        	var view=node.data.view;
        	
        	var panel=null;
        	        	
        	if(url&&url!==''){
        		
        		 panel ={
					title: node.data.text ,
					id:node.data.name,
					iconCls: 'tabs',
					html : '加载失败!',
					autoLoad  : {
						url : node.data.url,
						 scripts : true
					},							                       			
					closable: true
				};
				this.openTab(panel);	
        		
        		
        	}else if(view&&view!=''){
        		
        		  panel ={
					title: node.data.text ,
					id:node.data.name,
					iconCls: 'tabs',
					items:[
						Ext.create(node.data.view)
					],							                       			
					closable: true
				};
				this.openTab(panel);        		
        		
        	}else{
        		
        		alert('导航树参数配置错误！');
        		
        	}
    	}else{
    		node.expand();
    		
    	}    	
    },
    
    /**
     * 添加或激活Tab页
     * */
    openTab:function(panel,id){
    	
    	tabContent= this.getViewer();

		var o = (typeof panel == "string" ? panel : id || panel.id);
		var tab =Ext.getCmp(o);       
		if (tab) {
			tabContent.setActiveTab(tab);
		} else if(typeof panel!="string"){
			panel.id = o;
			var p = tabContent.add(panel);
			tabContent.setActiveTab(p);
		}
    	
    }
});

Ext.define('PT.model.ImageModel', {
    extend: 'Ext.data.Model',
    fields: [
       'name',       'id', 'url', 'tooltip', 'thumb_url'
    ]   
});


  Ext.define('PT.store.RoleType', {
	extend:'Ext.data.Store',
    fields: ['value', 'name'],
    data : [
        {"value":1, "name":"管理员"},
        {"value":2, "name":"测试员"},
        {"value":3, "name":"操作员"}        
    ]
});

  Ext.define('PT.store.TaskType', {
	extend:'Ext.data.Store',
    fields: ['value', 'name'],
    data : [
       
        {"value":'D', "name":"定点CQT测试"}         
    ]
});

/**
  {"value":'A', "name":"室分系统定点点位覆盖质量测试"},
        {"value":'B', "name":"室分系统业务质量拨测"},
        {"value":'C', "name":"室内外切换关系测试"} , 
 * **/
 
Ext.define('PT.view.MainContent',
 {
 	extend:'Ext.panel.Panel',
    region:'center',
    margins:'5 5 5 0',
    id:'mainContent',
    alias: 'widget.mainContent',
    cls:'empty',
    layout:'fit',
    bodyStyle:'background:#f1f1f1', 
    html:'<br/><br/>&lt;这是个空页&gt;'
});

Ext.define('PT.view.NavView',{
	extend:'Ext.panel.Panel',
	requires: [
	           'Ext.data.*',
	           'Ext.util.*',
	           'Ext.view.View'
	           ],
    title : '操作管理',
    alias: 'widget.navview',  
	split : true,
	width : 250,
	minWidth : 200,
	maxWidth : 400,
	collapsible : false,
	animCollapse : true,
	margins : '0 0 0 3',
	layout : 'accordion',
    initComponent: function() {
    	
    	var me=this;
    	
    	Ext.applyIf(me, {			 
			items:[{
				title : '任务管理',
				id:'monitor_menu',
				cls:'images-view',
				frame:true,
				iconCls : 'info'
			}, {
				title : '统计分析',
				id:'report_menu',
				cls:'images-view',
				frame:true,				
				iconCls : 'report'
			}, {
				title : '用户中心',
				id:'userCenter_menu',
				cls:'images-view',
				frame:true,
				iconCls : 'user'
			}	]});
    	
    	
        me.callParent(arguments);
        me.on('boxready',me.on_boxready);
       
    },
    on_boxready:function(me,  width,  height,  eOpts ){
    	    	    	
    	Ext.define('ImageModel', {
    	    extend: 'Ext.data.Model',
    	    fields: [
    	       'name',       'id', 'url', 'tooltip', 'thumb_url'
    	    ]   
    	});

    	var monitoreMenuStore = Ext.create('Ext.data.Store', {
    	    model: 'ImageModel',
    	    autoLoad:false,
    	    proxy: {
    	        type: 'ajax',
    	        url: 'resources/data/MonitorMenu.json',
    	        reader: {
    	            type: 'json',
    	            root: 'images'
    	        }
    	    }
    	});
    	monitoreMenuStore.load({
    	    scope: this,
    	    callback: function(records, operation, success) {
    	    	
    	    	var monitor_menu=Ext.getCmp('monitor_menu');		
    	    	monitor_menu.add(me.initDataView(monitoreMenuStore));
    	    }
    	});
    	    	
    	var reportMenuStore = Ext.create('Ext.data.Store', {
    	    model: 'ImageModel',
    	    autoLoad:false,
    	    proxy: {
    	        type: 'ajax',
    	        url: 'resources/data/ReportMenu.json',
    	        reader: {
    	            type: 'json',
    	            root: 'images'
    	        }
    	    }
    	});
    	
    	reportMenuStore.load({
    	    scope: this,
    	    callback: function(records, operation, success) {
    	    	var report_menu=Ext.getCmp('report_menu');		
    			report_menu.add(me.initDataView(reportMenuStore));
    	    }
    	});
    	
    	var userMenuStore = Ext.create('Ext.data.Store', {
    	    model: 'ImageModel',
    	    autoLoad:false,
    	    proxy: {
    	        type: 'ajax',
    	        url: 'resources/data/UserMenu.json',
    	        reader: {
    	            type: 'json',
    	            root: 'images'
    	        }
    	    }
    	});
    	userMenuStore.load({
    	    scope: this,
    	    callback: function(records, operation, success) {
    	    	var user_menu=Ext.getCmp('userCenter_menu');		
    			user_menu.add(me.initDataView(userMenuStore));
    	    }
    	});
    	
    },
    initDataView:function(store ){
		 var v=	Ext.create('Ext.view.View', {
	            store: store,
	            tpl: [
	                '<tpl for=".">',
	                    '<div class="thumb-wrap" id="{name}">',
	                    '<div class="thumb"><img  src="{thumb_url}" title="{tooltip}"></div>',
	                    '<span class="x-editable">{name}</span></div>',
	                '</tpl>',
	                '<div class="x-clear"></div>'
	            ],
	            multiSelect: false,				
	            trackOver: true,
	            overItemCls: 'x-item-over',
	            itemSelector: 'div.thumb-wrap',
	            emptyText: '没有数据显示...',
	            listeners: {
	                itemclick: function(dv, nodes ){
	                	
	                	if(nodes==null)return;
	                	
	                	   var node=nodes.getData();
	                	
	                	var pnl=Ext.getCmp('mainContent');
	                   	
	                   	if(pnl!=null){
	                   		
	                   		if(node.url!=''){
	                   			pnl.removeAll();
	                   		    		
	                   			pnl.add(Ext.create(node.url));
	                   		}else{
	                   			
	                   			alert('配置参数错误');
	                   		}
	                   	}
	                	
	                }
	            }
	        });
	        
	        return v;
		}
});
Ext.define('PT.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'PT.view.NavView',
        'Ext.layout.container.Border'
    ],
	layout: 'border',
	items: [{
                region:'north',
                margins:'0 0 0 0',
                contentEl: 'north',
                border:false,
                height:60,
                bodyStyle:""
            },{
               	region: 'west',
				xtype: 'navview'
            },{                    
                    region:'center',
                    margins:'0 5 5 5',
                    layout:'border',
                    border:true,    
                    items:[                    	
                		Ext.create('PT.view.MainContent')            			
                    ]
                }
            ]
});



/*
 * 测试结果列表
 * */
 
 Ext.define('PT.view.report.ResultPanel', {
			extend:'Ext.panel.Panel',				
			ids:null,
			viewConfig : {
				stripeRows : true
			},			
			initComponent : function() {
				
			var me = this;
		
		var searchForm=Ext.create('Ext.form.Panel',{							
							region:'north',
    						fieldDefaults: {
        						msgTarget: 'side',
        						labelAlign : 'right',
        						labelWidth: 105
    						},
    						defaults: {
        						anchor: '100%'
    						},
    						items: [{        
        						collapsible: true,
        						collapsed: false,        						
        						bodyStyle : 'padding:5px' ,
        						title:'检索条件',
        						defaultType: 'textfield',
        						layout: 'anchor',
        						defaults: {
            						anchor: '50%'
        						},
        						items :[ 
									{
										fieldLabel : '<span style="color: #f00">*</span>开始时间',
										xtype : 'fieldcontainer',
										anchor:'100%',
										layout:'hbox',
										items:[{
											xtype : 'datefield',
											name : 'txt_begin_date',
											format : 'Y-m-d',
											value:new Date() ,
											allowBlank: false 
										},{
											xtype : 'timefield',
											name : 'txt_begin_time',
											format : 'H:i:s',
											value:'00:00:00',
											allowBlank: false
										}]							
								}, 
								{
									fieldLabel : '<span style="color: #f00">*</span>结束时间',
									xtype : 'fieldcontainer',
									anchor:'100%',
									layout:'hbox',
									items:[{
											xtype : 'datefield',
											name : 'txt_end_date',
											format : 'Y-m-d',
											value:new Date() ,
											allowBlank: false 
										},{
											xtype : 'timefield',
											name : 'txt_end_time',
											format : 'H:i:s',
											value:'23:59:59',
											allowBlank: false
										}]							
								},	
								{
	        						xtype: 'container',
	        						layout: 'column',
	        						anchor: '0',
	        						items: [{
	            						xtype: 'container',		         
	            						columnWidth: 0.3,
	            						items: [{
	            							xtype: 'textfield',
	            							fieldLabel: '任务',	
	            							maxLength:11,
	                						name: 'txt_phone'
	            						}]
	        						}]
	    						}],
        buttons: [{
            text: '检索',
            handler:function(){
            	
            	loadData();
            }
        },{
        	text:'清空',
        	handler:function(){        		
        		
        		var form =this.up('form').getForm();
        		 
        		form.reset();       		
        		loadData();
        	}
        }]
    }]			
		});			
					
	var gridstore=	Ext.create('Ext.data.Store', {    	
    			fields:[
    			        {name:'id',type:'int'}, 'fileName', 'index', 'beginDateTime', 'endDateTime', 'testResult', 'pointIndex', 'lac', 'rxlvl', 'cqt', 'callResult'  				
    			],    	
    			proxy: {
        			type: 'ajax',
        			url : 'testResult',
        			reader: {
            			type: 'json',
            			root: 'rows'
        			}        	
    			}
			});
		
	var loadData=function(){
		
	   	var form= searchForm.getForm();

		var mobileNo=form.findField("txt_phone").getValue();
		
		var temp= form.findField("txt_begin_date").value;
		var begin_date=Ext.Date.format(temp,'Ymd');
		
		temp=form.findField("txt_begin_time").getValue();
		var begin_time=Ext.Date.format(temp,'His');
		
		temp=form.findField("txt_end_date").getValue();
		
		var end_date=Ext.Date.format(temp,'Ymd');
		
		temp=form.findField("txt_end_time").getValue();
		var end_time=Ext.Date.format(temp,'His');
		
		gridstore.on('beforeload', function (store, options) {
	      	        
	    var extraParams={
		        MobileNum:mobileNo,    
		        TestBeginTime: begin_date+begin_time,		        
		        TestEndTime:end_date+end_time
		    };
	        
	        Ext.apply(store.proxy.extraParams, extraParams);
	      
	    });
		
		gridstore.load({
		    params:{
		    	start:0,    
		        limit: 25
		    }
		});	    	   
	    	   
	};		

var checkedStr='<img src="resources/images/icons/fam/accept.png"  border="0">';

		Ext.applyIf(me, {
			layout:'border',  
			items:[	searchForm,		
				{
					xtype:'gridpanel',
					region:'center',
    				store: gridstore,
    				columns: [
    				{ header: '点位序号', dataIndex: 'pointIndex' },
    				{ header: 'LAC-CI', dataIndex: 'lac' },  
    				{ header: 'RxLvl', dataIndex: 'rxlvl' },   
    				{ header: 'CQT质量等级', dataIndex: 'cqt' ,hidden:false},
    				{ header: '测试结果', dataIndex: 'testResult' ,renderer:function(v){
    					
    					if(v=='00'){
    						
    						return '成功';
    					}else{
    						
    						return '失败';
    					}
    					
    				}}, 
    				{
            			text: '接通状态',
            columns: [{
                text     : '正常',
                width    : 75,
                align:'center',
                renderer : function(v){
                
                	if(v=='101'){
                		
                		return checkedStr;
                	}
                	return '';
                	
                },
                dataIndex: 'callResult'
            }, {
                text     : '噪音',
                width    : 75,
                align:'center',
                renderer : function(v){
                	
                	if(v=='102'){
                		
                		return checkedStr;
                	}
                	return '';
                	
                },
                dataIndex: 'callResult'
            }, {
                text     : '串话',
                width    : 75,
                align:'center',
                renderer : function(v){
                	
                	if(v=='103'){
                		
                		return checkedStr;
                	}
                	return '';
                	
                },
                dataIndex: 'callResult'
            }, {
                text     : '无话音',
                width    : 75,
                align:'center',
                renderer : function(v){
                	
                	if(v=='104'){
                		
                		return checkedStr;
                	}
                	return '';
                	
                },
                dataIndex: 'callResult'
            }, {
                text     : '单通',
                width    : 75,
                align:'center',
                renderer : function(v){
                	
                	if(v=='105'){
                		
                		return checkedStr;
                	}
                	return '';
                	
                },
                dataIndex: 'callResult'
            }, {
                text     : '掉话',
                width    : 75,
                align:'center',
                renderer : function(v){
                	
                	if(v=='106'){
                		
                		return checkedStr;
                	}
                	return '';
                	
                },
                dataIndex: 'callResult'
            }, {
                text     : '单通',
                width    : 75,
                align:'center',
                renderer : function(v){
                	
                	if(v=='107'){
                		
                		return checkedStr;
                	}
                	return '';
                	
                },
                dataIndex: 'callResult'
            }]
        },
    			{
            text: '未接通',
            columns: [{
                text     : '信道忙',
                width    : 75,    
                align:'center',     
                renderer : function(v){
                	
                	if(v=='201'){
                		
                		return checkedStr;
                	}
                	return '';
                	
                },
                dataIndex: 'callResult'
            }, {
                text     : '无信号',
                width    : 75,   
                align:'center',         
                renderer : function(v){
                	
                	if(v=='202'){
                		
                		return checkedStr;
                	}
                	return '';
                	
                },
                dataIndex: 'callResult'
            }, {
                text     : '无声音中断',
                width    : 75, 
                align:'center',           
                renderer : function(v){
                	
                	if(v=='203'){
                		
                		return checkedStr;
                	}
                	return '';
                	
                },
                dataIndex: 'callResult'
            }, {
                text     : '拨通后立即中断',
                width    : 75,  
                align:'center',            
                renderer : function(v){
                	
                	if(v=='204'){
                		
                		return checkedStr;
                	}
                	return '';
                	
                },
                dataIndex: 'callResult'
            }]
        },	
        				{ header: '测试序号',  dataIndex: 'index' ,hidden:true},        				
        				       				
        				
        				{ header: '呼叫结果 ', dataIndex: 'callResult' ,hidden:true},
        				      	
        				     				
        				{ header: '测试开始时间', dataIndex: 'beginDateTime',flex:1 ,renderer:function(v){
        					
        					if(v.length==14){
        						
        						return v.insert(12,':').insert(10,':').insert(8,' ').insert(6,'-').insert(4,'-');
        					}        					
        					return v;
        				}},
        				{ header: '测试结束时间', dataIndex: 'endDateTime',flex:1 ,renderer:function(v){
        					
        					if(v.length==14){
        						
        						return v.insert(12,':').insert(10,':').insert(8,' ').insert(6,'-').insert(4,'-');
        					}        					
        					return v;
        				}}
	        				
    				],
    				dockedItems : [ 
				        {
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
				
								
			}					
		});
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
Ext.define('PT.view.task.ManagerPanel', {
			extend:'Ext.panel.Panel',				
			ids:null,
			viewConfig : {
				stripeRows : true
			},			
			initComponent : function() {
				
			var me = this;
		
	var gridstore=	Ext.create('Ext.data.Store', {    	
    			fields:[
    			        'task_code', 'task_type', 'params', {name:'testTimes',type:'int'}, 'testUser', {name:'createDt',type:'date'},{name: 'status',type:'int'}    			        
    			 ,'locationCode',  'callType', 'callTel', 'callTime', 'timeout'
    			],    	
    			
    			proxy: {
        			type: 'ajax',
        			url : 'getTasks',
        			reader: {
            			type: 'json',
            			root: 'rows'
        			}        	
    			}
			});
		
		Ext.applyIf(me, {
			layout:'border',  
			items:[			
				{
					xtype:'gridpanel',
					region:'center',
					title: '任务管理',
					selModel: Ext.create('Ext.selection.CheckboxModel',{mode:'SIMPLE'}),
    				store: gridstore,
    				columns: [
        				{ header: '任务号',  dataIndex: 'task_code' , flex: 1},
        				{ header: '类型', dataIndex: 'task_type' ,renderer:function(v){
        					        					
        					//var record= Ext.create('MobileTest.store.TestTaskType').findRecord('value',v);
		        			//if(record!=null){
		        			//	return record.data.name;
		        			//}
		        			return v;
        				}},
        				{ header: '楼宇点位', dataIndex: 'locationCode', flex: 1 },
        				{ header: '呼叫类型', dataIndex: 'callType', flex: 1 },
        				{ header: '主叫/被叫号码', dataIndex: 'callTel', flex: 1 },
        				{ header: '通话持续时间', dataIndex: 'callTime', flex: 1 },
        				
        				{ header: '次数', dataIndex: 'testTimes', flex: 1 },        				
        				{ header: '状态', dataIndex: 'status' ,renderer:function(v){

		        			if(v==0){
		        				return "未生效";
		        			}else if (v==1){
		        				return "生效";
		        			}
		        			return v;
        				}},
        				{
							xtype : 'actioncolumn',				
							flex : 1,
							items : [ {
								icon: 'resources/images/icons/fam/edit.gif',
								tooltip : '查看',
								handler : function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);
									
									/**
									Ext.create('PT.view.window.EditTaskWindow',{
										rec:rec,
										listeners:{'beforedestroy':function(){										
											gridstore.load({params:{taskType:0}});					
									}}}).show();
									**/
								}},
								{
								icon: 'resources/images/icons/fam/arrow_down.png',
								tooltip : '立即生效',
								handler : function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);

							Ext.Msg.show({
			    		 				title:'信息',
			     						msg: '确定要设置任务有效吗？',
			     						buttons: Ext.Msg.YESNO,
			     						fn: function(buttonId,text,opt){
			    	 
			    	 						if(buttonId=='yes'){
			    	 							
									Ext.Ajax.request({
													url : 'validTask',
													params : {
														taskid : rec.data.testTaskCode
												},
												success : function(response) {
													var text = response.responseText;

													var m = Ext.JSON.decode(text);
												
													if(m.success){										
														gridstore.load({params:{taskType:0}});	
													}else{
														alert(m.msg);
													}
													
												}});			    	 							
			    	 							
			    	 						}}});

								}}
		 					]
						}
    				],
    				dockedItems : [ {
					xtype : 'toolbar',
					dock : 'top',
					items : [ {
						text : '添加',
						tooltip : '添加测试任务',
						iconCls : 'add',
						handler : function() {

							Ext.create('PT.view.window.EditTaskWindow',{								
								listeners:{'beforedestroy':function(){										
									gridstore.load({params:{taskType:0}});													
								}}
							}).show();
							
							}
						},{
							text : '删除',
							tooltip : '删除测试任务',						
							iconCls : 'del',
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
