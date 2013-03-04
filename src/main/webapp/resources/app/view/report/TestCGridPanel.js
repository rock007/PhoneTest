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
		        { text: '起始时间 ',  dataIndex: 'beginDateTime', flex: 1 },
		        { text: '结束时间 ', dataIndex: 'endDateTime', flex: 1 },
		        { text: '测试结果 ',  dataIndex: 'key1' },
		        { text: '点位序号（室内） ', dataIndex: 'key2' },
		        { text: 'LAC-CI（室内）', dataIndex: 'key3', flex: 1 },
		        { text: 'RxLvl均值（室内）', dataIndex: 'key4' },
		        { text: '点位序号（室外）', dataIndex: 'key5' },
		        { text: 'LAC-CI（室外）', dataIndex: 'key6' },
		        { text: 'RxLvl均值（室外）', dataIndex: 'key7' },
		        { text: 'CQT质量等级', dataIndex: 'key8' },
		        { text: '呼叫结果', dataIndex: 'key9' }
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