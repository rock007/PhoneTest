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
		        { text: '起始时间 ',  dataIndex: 'beginDateTime', flex: 1 },
		        { text: '结束时间 ', dataIndex: 'endDateTime', flex: 1 },
		        { text: '测试结果 ',  dataIndex: 'key1' },
		        { text: '点位序号 ', dataIndex: 'key2' },
		        { text: 'LAC-CI', dataIndex: 'key3', flex: 1 },
		        { text: 'RxLvl均值', dataIndex: 'key4' },
		        { text: 'CQT质量等级', dataIndex: 'key5' },
		        { text: '呼叫结果', dataIndex: 'key6' }
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