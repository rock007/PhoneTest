
/**
 * 
 **/
  
 Ext.define('PT.view.window.TaskListWindow',{
 	extend:'Ext.window.Window', 	
 	width:600,
 	height:500,
 	modal:true,
 	rec:null,
 	title:'任务信息查看', 	
	initComponent : function() {
		
		var me = this;
		
		var gridstore=	Ext.create('Ext.data.Store', {    	
			fields:[    			 
			 {name:'bid',type:'int'}, 'pcode', 'pname', 'task',{name: 'pid',type:'int'}, 'remarks'    			 
			],    	    			
			proxy: {
    			type: 'ajax',
    			url : 'getPostionBy',
    			reader: {
        			type: 'json',
        			root: 'rows'
    			}        	
			}
		});
		
		var grid= Ext.create('Ext.grid.Panel', {
		    //title: '点位信息',
		    region:'center',
		    store: gridstore,
		    columns: [
		        { header: '代码',  dataIndex: 'pcode',hidden:true },
		        { header: '名称', dataIndex: 'pname',hidden:true},
		        { header: '任务', dataIndex: 'task' , flex: 1,renderer:function(v){
		        	
		        	var msg="";
		        	var list=v.split(',');
		        	for (var i=0;i<list.length ;i++ )    
		            {    
		                if( list[i]=="A"){
		                	
		                	msg+="定点场强测试 ";
		                }else if(list[i]=="B"){
		                	msg+="业务拨测 ";
		                }else if(list[i]=="C"){
		                	msg+="室内外切换测试 ";
		                }else if(list[i]=="D"){
		                	msg+="CQT测试 ";
		                }		                
		            } 
		        	return msg;
		        	
		        }},
				{
					xtype : 'actioncolumn',				
					flex : 1,
					items : [ {
						icon: 'resources/images/icons/fam/information.png',
						tooltip : '修改',
						handler : function(grid, rowIndex, colIndex) {
							var rec = grid.getStore().getAt(rowIndex);

							Ext.create('PT.view.window.EditPostionTaskWindow',{
								rec:rec,
								bid:me.rec.data.bid,
								listeners:{'beforedestroy':function(){									
																		
									gridstore.load({params:{bid:me.rec.data.bid }});
							}}}).show();
	
						}}
 					]
				}
		    ]
		});
		
		Ext.applyIf(me, {			 
			layout: {
			    type: 'border'
			},
			items:[	grid],
			
		    dockedItems:[ {
				xtype : 'toolbar',
				dock : 'top',
				items : [{
						text : '关闭',
						tooltip : '关闭窗口',
						iconCls : 'cross',
						handler : function() {
								me.close();
						}
				}]
			}]
			
			});
		
		me.callParent(arguments);	
		//me.on('beforerender',me.on_beforerender);
		
		
		gridstore.load({params:{bid:me.rec.data.bid }});
			
		},on_beforerender:function(me, eOpts){
		
			var rec=me.rec;
				
			if(rec!=null){
			
					var form=me.child('form').getForm();
			
					form.loadRecord(rec);
			 }
	  }		
	});