
  Ext.define('PT.store.RoleType', {
	extend:'Ext.data.Store',
    fields: ['value', 'name'],
    data : [
        {"value":1, "name":"管理员"},
        {"value":2, "name":"测试员"},
        {"value":3, "name":"操作员"}        
    ]
});