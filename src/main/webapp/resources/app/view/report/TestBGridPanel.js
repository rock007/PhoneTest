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