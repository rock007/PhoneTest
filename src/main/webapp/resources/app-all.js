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


  Ext.define('PT.store.FrequencyType', {
	extend:'Ext.data.Store',
    fields: ['value', 'name'],
    data : [
        {"value":1, "name":"每周"},
        {"value":2, "name":"每两周"},
        {"value":3, "name":"每月"},    
        {"value":4, "name":"每季"}    
    ]
});

  Ext.define('PT.store.RegionType', {
	extend:'Ext.data.Store',
    fields: ['value', 'name'],
    data : [       
        {"value":"A", "name":"黄浦区"},
        {"value":"B", "name":"卢湾区"},
        {"value": "C", "name":"徐汇区"},
        {"value":"D", "name":"长宁区"},
        {"value":"E", "name":"静安区"},
        {"value":"F", "name":"普陀区"},
        {"value":"G" , "name":"闸北区"},
        {"value":"H", "name":"虹口区"},
        {"value":"I", "name":"杨浦区"},
        {"value":"J", "name":"宝山区"},
        {"value":"K", "name":"闵行区"},
        {"value":"L", "name":"嘉定区"},
        {"value":"M", "name":"浦东新区"},
        {"value":"N", "name":"松江区"},
        {"value":"O", "name":"金山区"},
        {"value":"P", "name":"青浦区"},
        {"value":"Q", "name":"奉贤区"},
        {"value":"R", "name":"崇明县"}

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


  Ext.define('PT.store.ResultTypeStore', {
	extend:'Ext.data.Store',
    fields: ['value2','value1', 'key'],
    data : [               
    {'value2':'正常','value1':'接通','key':'101'},
    {'value2':'噪音','value1':'接通','key':'102'},
    {'value2':'串话','value1':'接通','key':'103'},
    {'value2':'回音','value1':'接通','key':'104'},
    {'value2':'无话音','value1':'接通','key':'105'},
    
    {'value2':'单通','value1':'接通','key':'106'},
    {'value2':'掉话','value1':'接通','key':'107'},
    {'value2':'信道忙','value1':'未接通','key':'201'},
    {'value2':'无信号','value1':'未接通','key':'202'},
    {'value2':'无声音中断','value1':'未接通','key':'203'},
    {'value2':'拨通后立即中断','value1':'未接通','key':'204'}                
    ]
});
 
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


/*
 * 测试结果列表V2
 * */
 
 Ext.define('PT.view.report.ResultV2Panel', {
			extend:'Ext.panel.Panel',				
			ids:null,
			curRb:'A',
			viewConfig : {
				stripeRows : true
			},			
			initComponent : function() {
				
			var me = this;
		
			var gridstore=	Ext.create('Ext.data.Store', {    	
    			fields:[
    			        {name:'id',type:'int'}, 'fileName',  'beginDateTime', 'endDateTime','phone',
    			        {name:'mtype',type:'int'},'key1','key2','key3','key4','key5','key6','key7','key8','key9','key10','createDt'
    			],    	
    			proxy: {
        			type: 'ajax',
        			url : 'testV2Result',
        			reader: {
            			type: 'json',
            			root: 'rows'
        			}        	
    			}
			});
			
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
								},{
	    					        xtype: 'radiogroup',	    					
	    					        columns: 4,
	    					        vertical: false,
	    					        items: [
	    					            { boxLabel: '定点场强测试', name: 'rb', inputValue: 'A' , checked: true},
	    					            { boxLabel: '业务拨测', name: 'rb', inputValue: 'B'},
	    					            { boxLabel: '室内外切换测试', name: 'rb', inputValue: 'C' },
	    					            { boxLabel: 'CQT测试', name: 'rb', inputValue: 'D' }
	    					        ],
	    					        listeners:{'change':function(t,  newValue, oldValue,  eOpts){
	    					        		    					        	
	    					        	var curType=newValue.rb;
	    					        	me.curRb=curType;
	    					        	me.openGrid(curType,gridstore);
	    					        	
	    					        	loadData();	
	    					        	
	    					        }}
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
	            							fieldLabel: '手机号',	
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
					

		
	var loadData=function(){
		
	   	var form= searchForm.getForm();

		var txt_phone=form.findField("txt_phone").getValue();
		
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
	    		phone:txt_phone,
		        mtype:me.curRb,    
		        TestBeginTime: begin_date+begin_time,		        
		        TestEndTime:end_date+end_time
		    };
	        
	        Ext.apply(store.proxy.extraParams, extraParams);
	      
	    });
		
		gridstore.load({
		    params:{
		    	start:0,    
		        limit: 25,
		        index:1
		    }
		});	    	   
	    	   
	};		

		Ext.applyIf(me, {
			layout:'border',  
			items:[	searchForm,		
				{
					id:'grid_manager',
					layout:'border',
					region:'center'					
				}
			]
		});
				me.callParent(arguments);	
				
				me.openGrid('A',gridstore);
				loadData();				
			},
		openGrid:function(m,gridstore){
			
			var gridManager=Ext.getCmp('grid_manager');

        	if(gridManager!=null){
        		
        		var grid=Ext.create('PT.view.report.Test'+m+'GridPanel',{store:gridstore});
        		
        		gridManager.removeAll();
        		gridManager.add(grid);	        		
        	}			
			
		}
		});
/*
 * 
 * A类：定点场强测试
 */

Ext.define('PT.view.report.TestAGridPanel', {  
    extend:'Ext.grid.Panel',
    store:null,
    initComponent : function() {
		
		var me = this;
		
		Ext.applyIf(me, {			
			store: me.store,
			region:'center',
		    columns: [
		        { text: '起始时间 ',  dataIndex: 'beginDateTime', flex: 1,renderer:function(v){
					
					if(v.length==14){
						
						return v.insert(12,':').insert(10,':').insert(8,' ').insert(6,'-').insert(4,'-');
					}        					
					return v;
				} },
		        { text: '结束时间 ', dataIndex: 'endDateTime', flex: 1 ,renderer:function(v){
					
					if(v.length==14){
						
						return v.insert(12,':').insert(10,':').insert(8,' ').insert(6,'-').insert(4,'-');
					}        					
					return v;
				}},
				{ text: '手机号 ', dataIndex: 'phone' },
		        { text: '测试结果 ',  dataIndex: 'key1',renderer:testResult },
		        { text: '点位序号 ', dataIndex: 'key2' },
		        { text: 'LAC-CI', dataIndex: 'key3', flex: 1 },
		        { text: 'RxLvl均值', dataIndex: 'key4' }
		    ],
		    dockedItems : [ 
				{
					xtype: 'pagingtoolbar',
					store: me.store,   
					dock: 'bottom',
					displayInfo: true
				 } ]
		});		
		
		me.callParent(arguments);	
    }
});
/*
 * B类：业务拨测
 **/
Ext.define('PT.view.report.TestBGridPanel', {    
    extend:'Ext.grid.Panel',
    store:null,
    initComponent : function() {
		
		var me = this;
		
		/***
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
		***/
		
		Ext.applyIf(me, {			
			store: me.store,
			region:'center',
		    columns: [
		        { text: '起始时间 ',  dataIndex: 'beginDateTime', flex: 1 ,renderer:function(v){
					
					if(v.length==14){
						
						return v.insert(12,':').insert(10,':').insert(8,' ').insert(6,'-').insert(4,'-');
					}        					
					return v;
				}},
		        { text: '结束时间 ', dataIndex: 'endDateTime', flex: 1 ,renderer:function(v){
					
					if(v.length==14){
						
						return v.insert(12,':').insert(10,':').insert(8,' ').insert(6,'-').insert(4,'-');
					}        					
					return v;
				}},
				{ text: '手机号 ', dataIndex: 'phone' },
		        { text: '业务拨测种类代码 ',  dataIndex: 'key1' },
		        { text: '测试结果  ', dataIndex: 'key2' ,renderer:testResult},
		        { text: '测试值', dataIndex: 'key3', flex: 1 }		        
		    ],
		    dockedItems : [ 
		         {
				 	xtype: 'pagingtoolbar',
				    store: me.store,   
				    dock: 'bottom',
				    displayInfo: true
				 }]
		   });		
		
		me.callParent(arguments);	
    }
});
/**
 * C类：室内外切换测试
 **/

Ext.define('PT.view.report.TestCGridPanel', {  
    extend:'Ext.grid.Panel',
    store:null,
    initComponent : function() {
		
		var me = this;
		
		Ext.applyIf(me, {			
			store: me.store,
			region:'center',
		    columns: [
		        { text: '起始时间 ',  dataIndex: 'beginDateTime', flex: 1 ,renderer:function(v){
					
					if(v.length==14){
						
						return v.insert(12,':').insert(10,':').insert(8,' ').insert(6,'-').insert(4,'-');
					}        					
					return v;
				}},
		        { text: '结束时间 ', dataIndex: 'endDateTime', flex: 1 ,renderer:function(v){
					
					if(v.length==14){
						
						return v.insert(12,':').insert(10,':').insert(8,' ').insert(6,'-').insert(4,'-');
					}        					
					return v;
				}},
				{ text: '手机号 ', dataIndex: 'phone' },
		        { text: '测试结果 ',  dataIndex: 'key1' ,renderer:testResult},
		        { text: '点位序号（室内） ', dataIndex: 'key2' },
		        { text: 'LAC-CI（室内）', dataIndex: 'key3', flex: 1 },
		        { text: 'RxLvl均值（室内）', dataIndex: 'key4' },
		        { text: '点位序号（室外）', dataIndex: 'key5' },
		        { text: 'LAC-CI（室外）', dataIndex: 'key6' },
		        { text: 'RxLvl均值（室外）', dataIndex: 'key7' },
		        { text: 'CQT质量等级', dataIndex: 'key8' },
		        { text: '呼叫结果', dataIndex: 'key9' ,renderer:function(v){
		        
		        	var store=Ext.create('PT.store.ResultTypeStore');
					var record= store.findRecord('key',v);
					
        			if(record!=null){
        				return record.data.value1+' '+record.data.value2;
        			}
        			return v;
		        	
		        }}
		    ],
		    dockedItems : [ 
				{
					xtype: 'pagingtoolbar',
					store: me.store,   
					dock: 'bottom',
					displayInfo: true
				 } ]
		});		
		
		me.callParent(arguments);	
    }
});
/**
 * 
 * D类：CQT测试
 **/

Ext.define('PT.view.report.TestDGridPanel', {  
    extend:'Ext.grid.Panel',
    store:null,
    initComponent : function() {
		
		var me = this;
		
		Ext.applyIf(me, {			
			store: me.store,
			region:'center',
		    columns: [
		        { text: '起始时间 ',  dataIndex: 'beginDateTime', flex: 1 ,renderer:function(v){
					
					if(v.length==14){
						
						return v.insert(12,':').insert(10,':').insert(8,' ').insert(6,'-').insert(4,'-');
					}        					
					return v;
				}},
		        { text: '结束时间 ', dataIndex: 'endDateTime', flex: 1 ,renderer:function(v){
					
					if(v.length==14){
						
						return v.insert(12,':').insert(10,':').insert(8,' ').insert(6,'-').insert(4,'-');
					}        					
					return v;
				}},
				{ text: '手机号 ', dataIndex: 'phone' },
		        { text: '测试结果 ',  dataIndex: 'key1' ,renderer:testResult},
		        { text: '点位序号 ', dataIndex: 'key2' },
		        { text: 'LAC-CI', dataIndex: 'key3', flex: 1 },
		        { text: 'RxLvl均值', dataIndex: 'key4' },
		        { text: 'CQT质量等级', dataIndex: 'key5' },
		        { text: '呼叫结果', dataIndex: 'key6',renderer:function(v){
		        
		        	var store=Ext.create('PT.store.ResultTypeStore');
					var record= store.findRecord('key',v);
					
        			if(record!=null){
        				return record.data.value1+' '+record.data.value2;
        			}
        			return v;
		        	
		        } }
		    ],
		    dockedItems : [ 
				{
					xtype: 'pagingtoolbar',
					store: me.store,   
					dock: 'bottom',
					displayInfo: true
				 } ]
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
		
		var loadData=function(v){
			
				gridstore.on('beforeload', function (store, options) {	      	        
	        		var extraParams={
	        				key:v		    
		    		};	        
	        		Ext.apply(store.proxy.extraParams, extraParams);	      
	    		});
	   
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
											loadData('');				
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
									loadData('');													
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
														loadData('');
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
				            	
				            	loadData(key);
				            }
				        } ]}				        
				    ]
				}
			]
		});
				me.callParent(arguments);	
				
				loadData('');	
								
			}					
		});
Ext.define('PT.view.task.ManagerPanel', {
			extend:'Ext.panel.Panel',				
			ids:null,
			searchKey:'',
			curAddress:'',
			viewConfig : {
				stripeRows : true
			},			
			initComponent : function() {
				
			var me = this;
		
			var gridstore=	Ext.create('Ext.data.Store', {    	
    			fields:[    			 
    			 {name:'bid',type:'int'}, 'bcode', 'bname', 'blocation',{name: 'btype',type:'int'},{name: 'frequency',type:'int'}, 'acode', 'remarks', 'longitude', 'latitude'    			 
    			],    	    			
    			proxy: {
        			type: 'ajax',
        			url : 'getBuildings',
        			reader: {
            			type: 'json',
            			root: 'rows'
        			}        	
    			}
			});
			var loadData=function(){
				
				gridstore.on('beforeload', function (store, options) {
			      	        
			        var extraParams={
			        	bname:me.searchKey,	
			        	acode:me.curAddress
				    };
			        
			        Ext.apply(store.proxy.extraParams, extraParams);
			      
			    });
				
				gridstore.load({
				    params:{
				    	start:0,    
				        limit: 25,
				        index:1
				    }
				});
			};
			
			var store = Ext.create('Ext.data.TreeStore', {
			    root: {
			        expanded: true,
			        children: [
			                   { text: "上海市", expanded: true, 
			                	   children: [
		{"value":"A", "text":"黄浦区", leaf: true },
		{"value":"B", "text":"卢湾区", leaf: true },
		{"value": "C", "text":"徐汇区", leaf: true },
		{"value":"D", "text":"长宁区", leaf: true },
		{"value":"E", "text":"静安区", leaf: true },
		{"value":"F", "text":"普陀区", leaf: true },
		{"value":"G" , "text":"闸北区", leaf: true },
		{"value":"H", "text":"虹口区", leaf: true },
		{"value":"I", "text":"杨浦区", leaf: true },
		{"value":"J", "text":"宝山区", leaf: true },
		{"value":"K", "text":"闵行区", leaf: true },
		{"value":"L", "text":"嘉定区", leaf: true },
		{"value":"M", "text":"浦东新区", leaf: true },
		{"value":"N", "text":"松江区", leaf: true },
		{"value":"O", "text":"金山区", leaf: true },
		{"value":"P", "text":"青浦区", leaf: true },
		{"value":"Q", "text":"奉贤区", leaf: true },
		{"value":"R", "text":"崇明县", leaf: true }
		                       		            ] }       
			            
			        ]
			    }
			});

		 var treePanel=	Ext.create('Ext.tree.Panel', {
			    title: '区域信息',
			    width: 200,
			    store: store,
			    region:'west',
			    rootVisible: false,
			    listeners:{'selectionchange':function( t,  selected,  eOpts){
			    	
			    	if(selected!=null&&selected.length>0){
			    		
			    		if(selected[0].raw.value){
			    			
			    			me.curAddress=selected[0].raw.value;
			    			loadData();
			    		}else{
			    			me.curAddress='';
			    			loadData();
			    		}	    		
			    			
			    	}
			    }}
			});
			
		Ext.applyIf(me, {
			layout:'border',  
			items:[		treePanel,	
				{
					xtype:'gridpanel',
					region:'center',
					title: '任务管理',					
    				store: gridstore,
    				columns: [
        				{ header: '行政区域',  dataIndex: 'acode'  ,renderer:function(v){
        					        					
        					var record= Ext.create('PT.store.RegionType').findRecord('value',v);
		        			if(record!=null){
		        				return record.data.name;
		        			}
		        			return v;
        				}},
        				{ header: '楼宇名称', dataIndex: 'bname' , flex: 1},
        				{ header: '类型', dataIndex: 'btype', flex: 1  ,renderer:function(v){
			        		
		        			if(v==0){
		        				return "普通楼宇";
		        			}else if(v==1){
		        				return "VIP";
		        			}else if(v==2){
		        				return "WIP";
		        			}
		        			return v;
        				}}, 
        				{
							xtype : 'actioncolumn',	
							header: '人员及任务安排',
							items : [ {
								icon: 'resources/images/icons/fam/edit.gif',
								tooltip : '人员安排',
								handler : function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);
																		
									Ext.create('PT.view.window.TaskUserSelWindow',{
											rec:rec,
											bid:rec.data.bid
										}).show();
									
								}},
								{
								icon: 'resources/images/icons/fam/arrow_down.png',
								tooltip : '任务安排',
								handler : function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);
									
									Ext.create('PT.view.window.TaskListWindow',{
											rec:rec
										}).show();
								}}
		 					]
						}
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
				
				gridstore.load();	
				
		
			}
					
		});
Ext.define('PT.view.task.BuildingPanel', {
			extend:'Ext.panel.Panel',				
			ids:null,
			searchKey:'',
			curAddress:'',
			viewConfig : {
				stripeRows : true
			},			
			initComponent : function() {
				
			var me = this;
		
	var gridstore=	Ext.create('Ext.data.Store', {    	
    			fields:[    			 
    			 {name:'bid',type:'int'}, 'bcode', 'bname', 'blocation',{name: 'btype',type:'int'},{name: 'frequency',type:'int'}, 'acode', 'remarks', 'longitude', 'latitude'    			 
    			],    	    			
    			proxy: {
        			type: 'ajax',
        			url : 'getBuildings',
        			reader: {
            			type: 'json',
            			root: 'rows'
        			}        	
    			}
			});
		
	var loadData=function(){
		
		gridstore.on('beforeload', function (store, options) {
	      	        
	        var extraParams={
	        	bname:me.searchKey,	
	        	acode:me.curAddress
		    };
	        
	        Ext.apply(store.proxy.extraParams, extraParams);
	      
	    });
		
		gridstore.load({
		    params:{
		    	start:0,    
		        limit: 25,
		        index:1
		    }
		});
	};
	
	var store = Ext.create('Ext.data.TreeStore', {
	    root: {
	        expanded: true,
	        children: [
	                   { text: "上海市", expanded: true, 
	                	   children: [
{"value":"A", "text":"黄浦区", leaf: true },
{"value":"B", "text":"卢湾区", leaf: true },
{"value": "C", "text":"徐汇区", leaf: true },
{"value":"D", "text":"长宁区", leaf: true },
{"value":"E", "text":"静安区", leaf: true },
{"value":"F", "text":"普陀区", leaf: true },
{"value":"G" , "text":"闸北区", leaf: true },
{"value":"H", "text":"虹口区", leaf: true },
{"value":"I", "text":"杨浦区", leaf: true },
{"value":"J", "text":"宝山区", leaf: true },
{"value":"K", "text":"闵行区", leaf: true },
{"value":"L", "text":"嘉定区", leaf: true },
{"value":"M", "text":"浦东新区", leaf: true },
{"value":"N", "text":"松江区", leaf: true },
{"value":"O", "text":"金山区", leaf: true },
{"value":"P", "text":"青浦区", leaf: true },
{"value":"Q", "text":"奉贤区", leaf: true },
{"value":"R", "text":"崇明县", leaf: true }
                       		            ] }       
	            
	        ]
	    }
	});

 var treePanel=	Ext.create('Ext.tree.Panel', {
	    title: '区域信息',
	    width: 200,
	    store: store,
	    region:'west',
	    rootVisible: false,
	    listeners:{'selectionchange':function( t,  selected,  eOpts){
	    	
	    	if(selected!=null&&selected.length>0){
	    		
	    		if(selected[0].raw.value){
	    			
	    			me.curAddress=selected[0].raw.value;
	    			loadData();
	    		}else{
	    			me.curAddress='';
	    			loadData();
	    		}	    		
	    			
	    	}
	    }}
	});
		Ext.applyIf(me, {
			layout:'border',  
			items:[	treePanel,		
				{
					xtype:'gridpanel',
					region:'center',
					title: '楼宇管理',
					selModel: Ext.create('Ext.selection.CheckboxModel',{mode:'SIMPLE'}),
    				store: gridstore,
    				columns: [
        				{ header: '楼宇代码',  dataIndex: 'bcode' , flex: 1},
        				{ header: '楼宇名称', dataIndex: 'bname'},
        				{ header: '地址', dataIndex: 'blocation', flex: 1 },
        				{ header: '类型', dataIndex: 'btype', flex: 1  ,renderer:function(v){
        					        		
		        			if(v==0){
		        				return "普通楼宇";
		        			}else if(v==1){
		        				return "VIP";
		        			}else if(v==2){
		        				return "WIP";
		        			}
		        			return v;
        				}},        			
        				{ header: '行政区', dataIndex: 'acode', flex: 1  ,renderer:function(v){
        					        					
        					var record= Ext.create('PT.store.RegionType').findRecord('value',v);
		        			if(record!=null){
		        				return record.data.name;
		        			}
		        			return v;
        				}},        				
        				{
							xtype : 'actioncolumn',	
							header:'楼宇及点位编辑',
							flex : 1,
							items : [ {
								icon: 'resources/images/icons/fam/edit.gif',
								tooltip : '编辑',
								handler : function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);
																		
									Ext.create('PT.view.window.EditBuildingWindow',{
										rec:rec,
										listeners:{'beforedestroy':function(){										
											gridstore.load({params:{taskType:0}});					
									}}}).show();
									
								}},{
										icon: 'resources/images/icons/fam/information.png',
										tooltip : '点位查看',
										handler : function(grid, rowIndex, colIndex) {
											var rec = grid.getStore().getAt(rowIndex);
																				
											Ext.create('PT.view.window.PostionListWindow',{
													rec:rec
												}).show();
											
										}}
		 					]
						}
    				],
    				dockedItems : [ {
					xtype : 'toolbar',
					dock : 'top',
					items : [ {
						text : '添加',
						tooltip : '添加楼宇',
						iconCls : 'add',
						handler : function() {

							Ext.create('PT.view.window.EditBuildingWindow',{								
								listeners:{'beforedestroy':function(){										
									gridstore.load({params:{taskType:0}});													
								}}
							}).show();
							
							}
						},{
							text : '删除',
							tooltip : '删除楼宇',						
							iconCls : 'del',
							handler : function() {
								
								var selModel=me.child('grid').getSelectionModel().getSelection();
								
								if(selModel.length==0){
									
									alert("请选择要删除楼宇！");
									return;
								}
								
								var idsStr='';
			             		for(var i=0;i<selModel.length;i++ ){			             	
			             			idsStr+=selModel[i].data.bid+';';			             	
			             		}
								
								Ext.Msg.show({
			    		 				title:'信息',
			     						msg: '确定要删除选中楼宇吗？',
			     						buttons: Ext.Msg.YESNO,
			     						fn: function(buttonId,text,opt){
			    	 
			    	 						if(buttonId=='yes'){
			    	 							
			    								Ext.Ajax.request({
													url : 'delBuilding',
													params : {
														bidStr : idsStr
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
						
							xtype: 'textfield',
					        name: 'search_key'
						},{
							text : '检索',
							tooltip : '检索关键字',						
							iconCls : 'search',
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
Ext.define('PT.view.task.PostionPanel', {
			extend:'Ext.panel.Panel',				
			ids:null,
			viewConfig : {
				stripeRows : true
			},			
			initComponent : function() {
				
			var me = this;
		
	var gridstore=	Ext.create('Ext.data.Store', {    	
    			fields:[    			 
    			 {name:'bid',type:'int'}, 'bcode', 'bname', 'blocation',{name: 'btype',type:'int'},{name: 'frequency',type:'int'}, 'acode', 'remarks', 'longitude', 'latitude'    			 
    			],    	    			
    			proxy: {
        			type: 'ajax',
        			url : 'getBuildings',
        			reader: {
            			type: 'json',
            			root: 'rows'
        			}        	
    			}
			});
	
	var store = Ext.create('Ext.data.TreeStore', {
	    root: {
	        expanded: true,
	        children: [
	            {"value":"A", "text":"黄浦区", leaf: true },
	            {"value":"B", "text":"卢湾区", leaf: true },
	            {"value": "C", "text":"徐汇区", leaf: true },
	            {"value":"D", "text":"长宁区", leaf: true },
	            {"value":"E", "text":"静安区", leaf: true },
	            {"value":"F", "text":"普陀区", leaf: true },
	            {"value":"G" , "text":"闸北区", leaf: true },
	            {"value":"H", "text":"虹口区", leaf: true },
	            {"value":"I", "text":"杨浦区", leaf: true },
	            {"value":"J", "text":"宝山区", leaf: true },
	            {"value":"K", "text":"闵行区", leaf: true },
	            {"value":"L", "text":"嘉定区", leaf: true },
	            {"value":"M", "text":"浦东新区", leaf: true },
	            {"value":"N", "text":"松江区", leaf: true },
	            {"value":"O", "text":"金山区", leaf: true },
	            {"value":"P", "text":"青浦区", leaf: true },
	            {"value":"Q", "text":"奉贤区", leaf: true },
	            {"value":"R", "text":"崇明县", leaf: true }
	        ]
	    }
	});

 var treePanel=	Ext.create('Ext.tree.Panel', {
	    title: '区域信息',
	    width: 200,
	   // height: 150,
	    store: store,
	    region:'west',
	    rootVisible: true
	});
	
		Ext.applyIf(me, {
			layout:'border',  
			items:[treePanel,			
				{
					xtype:'gridpanel',
					region:'center',
					title: '楼宇管理',
					//selModel: Ext.create('Ext.selection.CheckboxModel',{mode:'SIMPLE'}),
    				store: gridstore,
    				columns: [
        				{ header: '楼宇代码',  dataIndex: 'bcode' , flex: 1},
        				{ header: '楼宇名称', dataIndex: 'bname' ,renderer:function(v){
        					        					
        					//var record= Ext.create('MobileTest.store.TestTaskType').findRecord('value',v);
		        			//if(record!=null){
		        			//	return record.data.name;
		        			//}
		        			return v;
        				}},
        				{ header: '地址', dataIndex: 'blocation', flex: 1 },
        				{ header: '类型', dataIndex: 'btype', flex: 1  ,renderer:function(v){
        					        		
		        			if(v==0){
		        				return "普通楼宇";
		        			}else if(v==1){
		        				return "VIP";
		        			}else if(v==2){
		        				return "WIP";
		        			}
		        			return v;
        				}},        		
        				{ header: '行政区', dataIndex: 'acode', flex: 1  ,renderer:function(v){
        					        					
        					var record= Ext.create('PT.store.RegionType').findRecord('value',v);
		        			if(record!=null){
		        				return record.data.name;
		        			}
		        			return v;
        				}},
        				{ header: '点位数量(个)', dataIndex: 'callTime', flex: 1 },
        				{
							xtype : 'actioncolumn',				
							flex : 1,
							items : [/**** {
								icon: 'resources/images/icons/fam/edit.gif',
								tooltip : '编辑',
								handler : function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);
																		
									Ext.create('PT.view.window.EditBuildingWindow',{
										rec:rec,
										listeners:{'beforedestroy':function(){										
											gridstore.load({params:{taskType:0}});					
									}}}).show();
									
								}},***/
								 {
									icon: 'resources/images/icons/fam/image_add.png',
									tooltip : '添加点位',
									handler : function(grid, rowIndex, colIndex) {
										var rec = grid.getStore().getAt(rowIndex);
																			
										Ext.create('PT.view.window.EditPostionWindow',{
											bid:rec.data.bid,
											listeners:{'beforedestroy':function(){										
												//gridstore.load({params:{taskType:0}});					
										}}}).show();
										
									}},
									 {
										icon: 'resources/images/icons/fam/information.png',
										tooltip : '查看',
										handler : function(grid, rowIndex, colIndex) {
											var rec = grid.getStore().getAt(rowIndex);
																				
											Ext.create('PT.view.window.ViewBuildingWindow',{
												rec:rec,
												listeners:{'beforedestroy':function(){										
													//gridstore.load({params:{taskType:0}});					
											}}}).show();
											
										}}
		 					]
						}
    				],
    				dockedItems : [ /***{
					xtype : 'toolbar',
					dock : 'top',
					items : [ {
						text : '添加',
						tooltip : '添加楼宇',
						iconCls : 'add',
						handler : function() {

							Ext.create('PT.view.window.EditBuildingWindow',{								
								listeners:{'beforedestroy':function(){										
									gridstore.load({params:{taskType:0}});													
								}}
							}).show();
							
							}
						},{
							text : '删除',
							tooltip : '删除楼宇',						
							iconCls : 'del',
							handler : function() {
								
							}
						},'-',{
						
							xtype: 'textfield',
					        name: 'search_key'
						},{
							text : '检索',
							tooltip : '检索关键字',						
							iconCls : 'search',
							handler : function() {
								
							}
							
						} ]}, ***/
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
				
				gridstore.load({params:{taskType:0}});	
				
		
			}
					
		});
Ext.define('PT.view.task.TestUserPanel', {
			extend:'Ext.panel.Panel',				
			ids:null,
			viewConfig : {
				stripeRows : true
			},			
			initComponent : function() {
				
			var me = this;
		
	var gridstore=	Ext.create('Ext.data.Store', {    	
    			fields:[
    			        'mobileId', 'ecode','ename',{name:'status',type:'int'}
    			],    	    			
    			proxy: {
        			type: 'ajax',
        			url : 'getMobileList',
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
					title: '巡检人员管理',
					selModel: Ext.create('Ext.selection.CheckboxModel',{mode:'SIMPLE'}),
    				store: gridstore,
    				columns: [
        				{ header: '手机号码',  dataIndex: 'mobileId' , flex: 1},
        				{ header: '员工编码', dataIndex: 'ecode' },
        				{ header: '姓名', dataIndex: 'ename', flex: 1 },
        				{
							xtype : 'actioncolumn',				
							flex : 1,
							items : [ {
								icon: 'resources/images/icons/fam/edit.gif',
								tooltip : '查看',
								handler : function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);
									
									Ext.create('PT.view.window.EditTestUserWindow',{
										rec:rec,
										listeners:{'beforedestroy':function(){										
											gridstore.load({params:{taskType:0}});					
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
						tooltip : '添加巡检人员',
						iconCls : 'add',
						handler : function() {

							Ext.create('PT.view.window.EditTestUserWindow',{								
								listeners:{'beforedestroy':function(){										
									gridstore.load({params:{taskType:0}});													
								}}
							}).show();
							
							}
						},{
							text : '删除',
							tooltip : '删除巡检人员',						
							iconCls : 'del',
							handler : function() {
								
								var selModel=me.child('grid').getSelectionModel().getSelection();
								
								if(selModel.length==0){
									
									alert("请选择要删除巡检人员！");
									return;
								}
								
								var idsStr='';
			             		for(var i=0;i<selModel.length;i++ ){			             	
			             			idsStr+=selModel[i].data.mobileId+';';			             	
			             		}
								
								Ext.Msg.show({
			    		 				title:'信息',
			     						msg: '确定要删除选中巡检人员吗？',
			     						buttons: Ext.Msg.YESNO,
			     						fn: function(buttonId,text,opt){
			    	 
			    	 						if(buttonId=='yes'){
			    	 							
			    								Ext.Ajax.request({
													url : 'delMobile',
													params : {
														mobileStr : idsStr
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
/**
 * 
 **/
  
 Ext.define('PT.view.window.EditPostionWindow',{
 	extend:'Ext.window.Window', 	
 	width:500,
 	height:300,
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
    		            hidden:true,
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
							iconCls : 'ok',
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

/**
 * 
 **/
  
 Ext.define('PT.view.window.TaskUserSelWindow',{
 	extend:'Ext.window.Window', 	
 	width:600,
 	height:500,
 	modal:true,
 	bid:null, 	
 	title:'测试人员安排', 	
	initComponent : function() {
		
		var me = this;
		
		var gridstore=	Ext.create('Ext.data.Store', {    	
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
		
		var grid= Ext.create('Ext.grid.Panel', {		  
		    store: gridstore,
		    region:'center',
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
													mobile : rec.data.mobileId
											},
											success : function(response) {
												var text = response.responseText;

												var m = Ext.JSON.decode(text);
											
												if(m.success){										
													gridstore.load({params:{bid:me.bid }});
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
		    height: 220,
		    width: 590
		});
		
		Ext.applyIf(me, {			 
			layout: {
			    type: 'border'
			},
			items:[	grid],
			 dockedItems:[ {
					xtype : 'toolbar',
					dock : 'top',
					items : [{
						text : '添加',
						tooltip : '添加测试人员',
						iconCls : 'add',
						handler : function() {

							Ext.create('PT.view.window.TaskUserWindow',{								
								bid:me.bid,
								listeners:{'beforedestroy':function(){									
									
									gridstore.load({params:{bid:me.bid }});
								}}
							}).show();
							
							}
						},'-',{
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
		//me.on('beforerender',me.on_beforerender);
		
		gridstore.load({params:{bid:me.bid}});
			
		},on_beforerender:function(me, eOpts){
		
			var rec=me.bid;
				
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
							iconCls : 'ok',
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

/**
 * 
 **/
  
 Ext.define('PT.view.window.PostionListWindow',{
 	extend:'Ext.window.Window', 	
 	width:600,
 	height:500,
 	modal:true,
 	rec:null,
 	title:'点位信息查看', 	
	initComponent : function() {
		
		var me = this;
		
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
		    //title: '点位信息',
		    region:'center',
		    store: gridstore,
		    columns: [
		        { header: '代码',  dataIndex: 'pcode', flex: 1 },
		        { header: '名称', dataIndex: 'pname' , flex: 2},
		        { header: '任务', dataIndex: 'task' ,hidden:true},
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
								bid:me.rec.data.bid,
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
		     						msg: '确定要删除选中点位信息吗？',
		     						buttons: Ext.Msg.YESNO,
		     						fn: function(buttonId,text,opt){
		    	 
		    	 						if(buttonId=='yes'){
		    	 							
		    								Ext.Ajax.request({
												url : 'delPostion',
												params : {
													pid : rec.data.pid
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
		    ]
		});
		
		Ext.applyIf(me, {			 
			layout: {
			    type: 'border'
			},
			items:[	grid],
			
		    dockedItems:[ {
				xtype : 'toolbar',
				dock : 'top',
				items : [{
					text : '添加',
					tooltip : '添加点位',
					iconCls : 'add',
					handler : function() {

						Ext.create('PT.view.window.EditPostionWindow',{
							rec:null,
							bid:me.rec.data.bid,
							listeners:{'beforedestroy':function(){									
																	
								gridstore.load({params:{bid:me.rec.data.bid }});
						}}}).show();
						
						}
					},'-',{
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
		//me.on('beforerender',me.on_beforerender);
		
		
		gridstore.load({params:{bid:me.rec.data.bid }});
			
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
  
 Ext.define('PT.view.window.EditPostionTaskWindow',{
 	extend:'Ext.window.Window', 	
 	width:500,
 	height:300,
 	modal:true,
 	rec:null,
 	bid:0,
 	title:'点位任务编辑', 	
	initComponent : function() {
		
		var me = this;
		
		var checkTask=function(v){
			
			if(me.rec.data.task.indexOf(v)==-1){
				
				return false;
			}
			return true;
		};
		
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
        				hidden:true,
        				allowBlank: false
    				},{
        				fieldLabel: '名称',
        				name: 'pname',
        				allowBlank: false,
        				maxLength :15,
        				hidden:true,
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
    		                    checked:checkTask('A'),
    		                    id        : 'task_checkbox1'
    		                }, {
    		                    boxLabel  : '业务拨测',
    		                    name      : 'task',
    		                    inputValue: 'B',    
    		                    checked:checkTask('B'),
    		                    id        : 'task_checkbox2'
    		                }, {
    		                    boxLabel  : '室内外切换测试',
    		                    name      : 'task',
    		                    inputValue: 'C',
    		                    checked:checkTask('C'),
    		                    id        : 'task_checkbox3'
    		                }, {
    		                    boxLabel  : 'CQT测试',
    		                    name      : 'task',
    		                    inputValue: 'D',
    		                    checked:checkTask('D'),
    		                    id        : 'task_checkbox4'
    		                }
    		            ]
    		        },{
        				fieldLabel: '备注',
        				name: 'remarks',
        				hidden:true,
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
		me.on('afterrender',me.on_beforerender);			
			
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
  
 Ext.define('PT.view.window.TaskListWindow',{
 	extend:'Ext.window.Window', 	
 	width:600,
 	height:500,
 	modal:true,
 	rec:null,
 	title:'任务信息查看', 	
	initComponent : function() {
		
		var me = this;
		
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
		    //title: '点位信息',
		    region:'center',
		    store: gridstore,
		    columns: [
		        { header: '代码',  dataIndex: 'pcode',hidden:true },
		        { header: '名称', dataIndex: 'pname',hidden:true},
		        { header: '任务', dataIndex: 'task' , flex: 1,renderer:function(v){
		        	
		        	var msg="";
		        	var list=v.split(',');
		        	for (var i=0;i<list.length ;i++ )    
		            {    
		                if( list[i]=="A"){
		                	
		                	msg+="定点场强测试 ";
		                }else if(list[i]=="B"){
		                	msg+="业务拨测 ";
		                }else if(list[i]=="C"){
		                	msg+="室内外切换测试 ";
		                }else if(list[i]=="D"){
		                	msg+="CQT测试 ";
		                }		                
		            } 
		        	return msg;
		        	
		        }},
				{
					xtype : 'actioncolumn',				
					flex : 1,
					items : [ {
						icon: 'resources/images/icons/fam/information.png',
						tooltip : '修改',
						handler : function(grid, rowIndex, colIndex) {
							var rec = grid.getStore().getAt(rowIndex);

							Ext.create('PT.view.window.EditPostionTaskWindow',{
								rec:rec,
								bid:me.rec.data.bid,
								listeners:{'beforedestroy':function(){									
																		
									gridstore.load({params:{bid:me.rec.data.bid }});
							}}}).show();
	
						}}
 					]
				}
		    ]
		});
		
		Ext.applyIf(me, {			 
			layout: {
			    type: 'border'
			},
			items:[	grid],
			
		    dockedItems:[ {
				xtype : 'toolbar',
				dock : 'top',
				items : [{
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
		//me.on('beforerender',me.on_beforerender);
		
		
		gridstore.load({params:{bid:me.rec.data.bid }});
			
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
  
 Ext.define('PT.view.window.TaskUserWindow',{
 	extend:'Ext.window.Window', 	
 	width:500,
 	height:300,
 	modal:true,
 	bid:null,
 	title:'添加测试人员', 	
	initComponent : function() {
		
		var me = this;
	
		var gridstore=	Ext.create('Ext.data.Store', {    	
			fields:[
			        {name:'mobileId',type:'int'}, 'ecode','ename',{name:'status',type:'int'}
			],    	    			
			proxy: {
    			type: 'ajax',
    			url : 'getMobileList',
    			reader: {
        			type: 'json',
        			root: 'rows'
    			}        	
			}
		});
		
		var grid= Ext.create('Ext.grid.Panel', {		  
		    store: gridstore,
		    region:'center',
		    selModel: Ext.create('Ext.selection.CheckboxModel',{mode:'SIMPLE'}),
		    columns: [
		        { header: '手机号码',  dataIndex: 'mobileId' },
		        { header: '员工编码', dataIndex: 'ecode' },
		        { header: '姓名', dataIndex: 'ename' , flex: 1}		
		    ],
		    height: 220,
		    width: 590
		});
		
		Ext.applyIf(me, {			 
			layout: {
			    type: 'border'
			},
			items:[	grid],
			 dockedItems:[ {
					xtype : 'toolbar',
					dock : 'top',
					items : [{
						text : '添加',
						tooltip : '添加测试人员',
						iconCls : 'add',
						handler : function() {

							var selModel=me.child('grid').getSelectionModel().getSelection();
							
							if(selModel.length==0){
								
								alert("请选择要添加人员！");
								return;
							}
							
							var idsStr='';
		             		for(var i=0;i<selModel.length;i++ ){			             	
		             			idsStr+=selModel[i].data.mobileId+',';			             	
		             		}

							Ext.Ajax.request({
								url : 'addTestUser',
								params : {
									mobiles : idsStr,
									bid:me.bid
							},
							success : function(response) {
								var text = response.responseText;

								var m = Ext.JSON.decode(text);
							
								if(m.success){										
									me.close();
								}else{
									alert(m.msg);
								}
								
							}});
							
							}
						},'-',{
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
		//me.on('beforerender',me.on_beforerender);
		
		gridstore.load({params:{status:me.bid}});
			
		},on_beforerender:function(me, eOpts){
		
			var rec=me.bid;
				
			if(rec!=null){
			
					var form=me.child('form').getForm();
			
					form.loadRecord(rec);
			 }
	  }		
	});

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

/**
 * 
 **/
  
 Ext.define('PT.view.window.ViewBuildingWindow2',{
 	extend:'Ext.window.Window', 
 	maximizable :true,
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
								
								Ext.Msg.show({
		    		 				title:'信息',
		     						msg: '确定要删除点位信息吗？',
		     						buttons: Ext.Msg.YESNO,
		     						fn: function(buttonId,text,opt){
		    	 
		    	 						if(buttonId=='yes'){
		    	 							
		    								Ext.Ajax.request({
												url : 'delPostion',
												params : {
													bid : rec.data.bid,
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
		    //selModel: Ext.create('Ext.selection.CheckboxModel',{mode:'SIMPLE'}),
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
