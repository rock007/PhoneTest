
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