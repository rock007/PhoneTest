
/**
 * 
 **/
  
 Ext.define('PT.view.window.TaskUserWindow',{
 	extend:'Ext.window.Window', 	
 	width:600,
 	height:500,
 	modal:true,
 	rec:null,
 	title:'测试人员安排', 	
	initComponent : function() {
		
		var me = this;
	
		var gridstore=	Ext.create('Ext.data.Store', {    	
			fields:[
			        {name:'mobileId',type:'int'}, 'ecode','ename',{name:'status',type:'int'}
			],    	    			
			proxy: {
    			type: 'ajax',
    			url : 'getMobileList',
    			reader: {
        			type: 'json',
        			root: 'rows'
    			}        	
			}
		});
		
		var grid= Ext.create('Ext.grid.Panel', {		  
		    store: gridstore,
		    region:'center',
		    selModel: Ext.create('Ext.selection.CheckboxModel',{mode:'SIMPLE'}),
		    columns: [
		        { header: '手机号码',  dataIndex: 'mobileId' },
		        { header: '员工编码', dataIndex: 'ecode' },
		        { header: '姓名', dataIndex: 'ename' , flex: 1}		
		    ],
		    height: 220,
		    width: 590
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
						text : '添加',
						tooltip : '添加测试人员',
						iconCls : 'add',
						handler : function() {

							var selModel=me.child('grid').getSelectionModel().getSelection();
							
							if(selModel.length==0){
								
								alert("请选择要添加人员！");
								return;
							}
							
							var idsStr='';
		             		for(var i=0;i<selModel.length;i++ ){			             	
		             			idsStr+=selModel[i].data.mobileId+',';			             	
		             		}

							Ext.Ajax.request({
								url : 'addTestUser',
								params : {
									mobiles : idsStr,
									bid:me.rec.data.bid
							},
							success : function(response) {
								var text = response.responseText;

								var m = Ext.JSON.decode(text);
							
								if(m.success){										
									me.close();
								}else{
									alert(m.msg);
								}
								
							}});
							
							}
						},'-',{
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
		me.on('beforerender',me.on_beforerender);
		
		gridstore.load({params:{status:me.rec.data.bid}});
			
		},on_beforerender:function(me, eOpts){
		
			var rec=me.rec;
				
			if(rec!=null){
			
					//var form=me.child('form').getForm();
			
					//form.loadRecord(rec);
			 }
	  }		
	});