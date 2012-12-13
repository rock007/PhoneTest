
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