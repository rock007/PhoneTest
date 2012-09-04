Ext.define('PT.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'PT.view.NavView',
        'Ext.layout.container.Border'
    ],
	layout: 'border',
	items: [{
                region:'north',
                margins:'0 0 0 0',
                contentEl: 'north',
                border:false,
                height:60,
                bodyStyle:""
            },{
               	region: 'west',
				xtype: 'navview'
            },{                    
                    region:'center',
                    margins:'0 5 5 5',
                    layout:'border',
                    border:true,    
                    items:[                    	
                		Ext.create('PT.view.MainContent')            			
                    ]
                }
            ]
});
