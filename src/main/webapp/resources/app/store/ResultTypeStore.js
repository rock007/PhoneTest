

  Ext.define('PT.store.ResultTypeStore', {
	extend:'Ext.data.Store',
    fields: ['value2','value1', 'key'],
    data : [               
    {'value2':'正常','value1':'接通','key':'101'},
    {'value2':'噪音','value1':'接通','key':'102'},
    {'value2':'串话','value1':'接通','key':'103'},
    {'value2':'回音','value1':'接通','key':'104'},
    {'value2':'无话音','value1':'接通','key':'105'},
    
    {'value2':'单通','value1':'接通','key':'106'},
    {'value2':'掉话','value1':'接通','key':'107'},
    {'value2':'信道忙','value1':'未接通','key':'201'},
    {'value2':'无信号','value1':'未接通','key':'202'},
    {'value2':'无声音中断','value1':'未接通','key':'203'},
    {'value2':'拨通后立即中断','value1':'未接通','key':'204'}                
    ]
});