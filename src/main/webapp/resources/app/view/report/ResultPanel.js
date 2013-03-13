

/*
 * 测试结果列表
 * */
 
 Ext.define('PT.view.report.ResultPanel', {
			extend:'Ext.panel.Panel',				
			ids:null,
			viewConfig : {
				stripeRows : true
			},			
			initComponent : function() {
				
			var me = this;
		
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
	            							fieldLabel: '任务',	
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
					
	var gridstore=	Ext.create('Ext.data.Store', {    	
    			fields:[
    			        {name:'id',type:'int'}, 'fileName', 'index', 'beginDateTime', 'endDateTime', 'testResult', 'pointIndex', 'lac', 'rxlvl', 'cqt', 'callResult'  				
    			],    	
    			proxy: {
        			type: 'ajax',
        			url : 'testResult',
        			reader: {
            			type: 'json',
            			root: 'rows'
        			}        	
    			}
			});
		
	var loadData=function(){
		
	   	var form= searchForm.getForm();

		var mobileNo=form.findField("txt_phone").getValue();
		
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
		        MobileNum:mobileNo,    
		        TestBeginTime: begin_date+begin_time,		        
		        TestEndTime:end_date+end_time
		    };
	        
	        Ext.apply(store.proxy.extraParams, extraParams);
	      
	    });
		
		gridstore.load({
		    params:{
		    	start:0,    
		        limit: 25
		    }
		});	    	   
	    	   
	};		

var checkedStr='<img src="resources/images/icons/fam/accept.png"  border="0">';

		Ext.applyIf(me, {
			layout:'border',  
			items:[	searchForm,		
				{
					xtype:'gridpanel',
					region:'center',
    				store: gridstore,
    				columns: [
    				{ header: '点位序号', dataIndex: 'pointIndex' },
    				{ header: 'LAC-CI', dataIndex: 'lac' },  
    				{ header: 'RxLvl', dataIndex: 'rxlvl' },   
    				{ header: 'CQT质量等级', dataIndex: 'cqt' ,hidden:false},
    				{ header: '测试结果', dataIndex: 'testResult' ,renderer:function(v){
    					
    					if(v=='00'){
    						
    						return '成功';
    					}else{
    						
    						return '失败';
    					}
    					
    				}}, 
    				{
            			text: '接通状态',
            columns: [{
                text     : '正常',
                width    : 75,
                align:'center',
                renderer : function(v){
                
                	if(v=='101'){
                		
                		return checkedStr;
                	}
                	return '';
                	
                },
                dataIndex: 'callResult'
            }, {
                text     : '噪音',
                width    : 75,
                align:'center',
                renderer : function(v){
                	
                	if(v=='102'){
                		
                		return checkedStr;
                	}
                	return '';
                	
                },
                dataIndex: 'callResult'
            }, {
                text     : '串话',
                width    : 75,
                align:'center',
                renderer : function(v){
                	
                	if(v=='103'){
                		
                		return checkedStr;
                	}
                	return '';
                	
                },
                dataIndex: 'callResult'
            }, {
                text     : '无话音',
                width    : 75,
                align:'center',
                renderer : function(v){
                	
                	if(v=='104'){
                		
                		return checkedStr;
                	}
                	return '';
                	
                },
                dataIndex: 'callResult'
            }, {
                text     : '单通',
                width    : 75,
                align:'center',
                renderer : function(v){
                	
                	if(v=='105'){
                		
                		return checkedStr;
                	}
                	return '';
                	
                },
                dataIndex: 'callResult'
            }, {
                text     : '掉话',
                width    : 75,
                align:'center',
                renderer : function(v){
                	
                	if(v=='106'){
                		
                		return checkedStr;
                	}
                	return '';
                	
                },
                dataIndex: 'callResult'
            }, {
                text     : '单通',
                width    : 75,
                align:'center',
                renderer : function(v){
                	
                	if(v=='107'){
                		
                		return checkedStr;
                	}
                	return '';
                	
                },
                dataIndex: 'callResult'
            }]
        },
    			{
            text: '未接通',
            columns: [{
                text     : '信道忙',
                width    : 75,    
                align:'center',     
                renderer : function(v){
                	
                	if(v=='201'){
                		
                		return checkedStr;
                	}
                	return '';
                	
                },
                dataIndex: 'callResult'
            }, {
                text     : '无信号',
                width    : 75,   
                align:'center',         
                renderer : function(v){
                	
                	if(v=='202'){
                		
                		return checkedStr;
                	}
                	return '';
                	
                },
                dataIndex: 'callResult'
            }, {
                text     : '无声音中断',
                width    : 75, 
                align:'center',           
                renderer : function(v){
                	
                	if(v=='203'){
                		
                		return checkedStr;
                	}
                	return '';
                	
                },
                dataIndex: 'callResult'
            }, {
                text     : '拨通后立即中断',
                width    : 75,  
                align:'center',            
                renderer : function(v){
                	
                	if(v=='204'){
                		
                		return checkedStr;
                	}
                	return '';
                	
                },
                dataIndex: 'callResult'
            }]
        },	
        				{ header: '测试序号',  dataIndex: 'index' ,hidden:true},        				
        				       				
        				
        				{ header: '呼叫结果 ', dataIndex: 'callResult' ,hidden:true},
        				      	
        				     				
        				{ header: '测试开始时间', dataIndex: 'beginDateTime',flex:1 ,renderer:function(v){
        					
        					if(v.length==14){
        						
        						return v.insert(12,':').insert(10,':').insert(8,' ').insert(6,'-').insert(4,'-');
        					}        					
        					return v;
        				}},
        				{ header: '测试结束时间', dataIndex: 'endDateTime',flex:1 ,renderer:function(v){
        					
        					if(v.length==14){
        						
        						return v.insert(12,':').insert(10,':').insert(8,' ').insert(6,'-').insert(4,'-');
        					}        					
        					return v;
        				}}
	        				
    				],
    				dockedItems : [ 
				        {
			        		xtype: 'pagingtoolbar',
			        		store: gridstore,   
			        		dock: 'bottom',
			        		displayInfo: true
			    		}
				    ]
				}
			]
		});
				me.callParent(arguments);	
				
								
			}					
		});