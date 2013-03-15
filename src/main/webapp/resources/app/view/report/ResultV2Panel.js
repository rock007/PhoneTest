

/*
 * 测试结果列表V2
 * */
 
 Ext.define('PT.view.report.ResultV2Panel', {
			extend:'Ext.panel.Panel',				
			ids:null,
			curRb:'A',
			viewConfig : {
				stripeRows : true
			},			
			initComponent : function() {
				
			var me = this;
		
			var gridstore=	Ext.create('Ext.data.Store', {    	
    			fields:[
    			        {name:'id',type:'int'}, 'fileName',  'beginDateTime', 'endDateTime','phone',
    			        {name:'mtype',type:'int'},'key1','key2','key3','key4','key5','key6','key7','key8','key9','key10','createDt'
    			],    	
    			proxy: {
        			type: 'ajax',
        			url : 'testV2Result',
        			reader: {
            			type: 'json',
            			root: 'rows'
        			}        	
    			}
			});
			
		var searchForm=Ext.create('Ext.form.Panel',{							
							region:'north',
    						fieldDefaults: {
        						msgTarget: 'side',
        						labelAlign : 'right',
        						labelWidth: 105
    						},
    						defaults: {
        						anchor: '100%'
    						},
    						items: [{        
        						collapsible: true,
        						collapsed: false,        						
        						bodyStyle : 'padding:5px' ,
        						title:'检索条件',
        						defaultType: 'textfield',
        						layout: 'anchor',
        						defaults: {
            						anchor: '50%'
        						},
        						items :[ 
									{
										fieldLabel : '<span style="color: #f00">*</span>开始时间',
										xtype : 'fieldcontainer',
										anchor:'100%',
										layout:'hbox',
										items:[{
											xtype : 'datefield',
											name : 'txt_begin_date',
											format : 'Y-m-d',
											value:new Date() ,
											allowBlank: false 
										},{
											xtype : 'timefield',
											name : 'txt_begin_time',
											format : 'H:i:s',
											value:'00:00:00',
											allowBlank: false
										}]							
								}, 
								{
									fieldLabel : '<span style="color: #f00">*</span>结束时间',
									xtype : 'fieldcontainer',
									anchor:'100%',
									layout:'hbox',
									items:[{
											xtype : 'datefield',
											name : 'txt_end_date',
											format : 'Y-m-d',
											value:new Date() ,
											allowBlank: false 
										},{
											xtype : 'timefield',
											name : 'txt_end_time',
											format : 'H:i:s',
											value:'23:59:59',
											allowBlank: false
										}]							
								},{
	    					        xtype: 'radiogroup',	    					
	    					        columns: 4,
	    					        vertical: false,
	    					        items: [
	    					            { boxLabel: '定点场强测试', name: 'rb', inputValue: 'A' , checked: true},
	    					            { boxLabel: '业务拨测', name: 'rb', inputValue: 'B'},
	    					            { boxLabel: '室内外切换测试', name: 'rb', inputValue: 'C' },
	    					            { boxLabel: 'CQT测试', name: 'rb', inputValue: 'D' }
	    					        ],
	    					        listeners:{'change':function(t,  newValue, oldValue,  eOpts){
	    					        		    					        	
	    					        	var curType=newValue.rb;
	    					        	me.curRb=curType;
	    					        	me.openGrid(curType,gridstore);
	    					        	
	    					        	loadData();	
	    					        	
	    					        }}
	    					    },	
								{
	        						xtype: 'container',
	        						layout: 'column',
	        						anchor: '0',
	        						items: [{
	            						xtype: 'container',		         
	            						columnWidth: 0.3,
	            						items: [{
	            							xtype: 'textfield',
	            							fieldLabel: '手机号',	
	            							maxLength:11,
	                						name: 'txt_phone'
	            						}]
	        						}]
	    						}],
        buttons: [{
            text: '检索',
            handler:function(){
            	
            	loadData();
            }
        },{
        	text:'清空',
        	handler:function(){        		
        		
        		var form =this.up('form').getForm();
        		 
        		form.reset();       		
        		loadData();
        	}
        }]
    }]			
		});			
					

		
	var loadData=function(){
		
	   	var form= searchForm.getForm();

		var txt_phone=form.findField("txt_phone").getValue();
		
		var temp= form.findField("txt_begin_date").value;
		var begin_date=Ext.Date.format(temp,'Ymd');
		
		temp=form.findField("txt_begin_time").getValue();
		var begin_time=Ext.Date.format(temp,'His');
		
		temp=form.findField("txt_end_date").getValue();
		
		var end_date=Ext.Date.format(temp,'Ymd');
		
		temp=form.findField("txt_end_time").getValue();
		var end_time=Ext.Date.format(temp,'His');
		
		gridstore.on('beforeload', function (store, options) {
	      	        
	    var extraParams={
	    		phone:txt_phone,
		        mtype:me.curRb,    
		        TestBeginTime: begin_date+begin_time,		        
		        TestEndTime:end_date+end_time
		    };
	        
	        Ext.apply(store.proxy.extraParams, extraParams);
	      
	    });
		
		gridstore.load({
		    params:{
		    	start:0,    
		        limit: 25,
		        index:1
		    }
		});	    	   
	    	   
	};		

		Ext.applyIf(me, {
			layout:'border',  
			items:[	searchForm,		
				{
					id:'grid_manager',
					layout:'border',
					region:'center'					
				}
			]
		});
				me.callParent(arguments);	
				
				me.openGrid('A',gridstore);
				loadData();				
			},
		openGrid:function(m,gridstore){
			
			var gridManager=Ext.getCmp('grid_manager');

        	if(gridManager!=null){
        		
        		var grid=Ext.create('PT.view.report.Test'+m+'GridPanel',{store:gridstore});
        		
        		gridManager.removeAll();
        		gridManager.add(grid);	        		
        	}			
			
		}
		});