
 
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