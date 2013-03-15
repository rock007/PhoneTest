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