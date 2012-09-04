
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