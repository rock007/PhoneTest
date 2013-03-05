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