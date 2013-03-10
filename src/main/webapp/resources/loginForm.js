/**
 * 系统登录
 */

Ext.define('App.view.CheckCode',{
    extend: 'Ext.form.field.Text', 
    alias: 'widget.checkcode',
    inputTyle:'codefield',
    codeUrl:Ext.BLANK_IMAGE_URL,
    isLoader:true,
    onRender:function(ct,position){
        this.callParent(arguments);
        this.codeEl = ct.createChild({ tag: 'img', src: Ext.BLANK_IMAGE_URL});
        //this.codeEl.addCls('x-form-code');
        this.codeEl.on('click', this.loadCodeImg, this);
        
        if (this.isLoader) this.loadCodeImg();
    },
    alignErrorIcon: function() {
        this.errorIcon.alignTo(this.codeEl, 'tl-tr', [2, 0]);
    },
    loadCodeImg: function() {  
        this.codeEl.set({ src: this.codeUrl});
    }
});

Ext.define("LoginWindow",{
	extend : 'Ext.window.Window',
	title : '登陆系统',
	width : 400,
	height : 200,
	bodyPadding: 10, 
	collapsible : true,
	defaults : {
		border : false
	},
	closable :false,	
	createFormPanel : function() {

		// 表单重置函数
		function reset() {
			myform.form.reset();
		};

		// 表单提交函数
		function surely() {
			if (myform.getForm().isValid()) {
			
				myform.getForm().submit({
                        clientValidation: true,
                        method : 'post',
                        url: '/PhoneTest/login',
                        waitMsg: '正在提交数据，请稍候...',
                        success: function(form, action) {				 
                        	                        	
                        	if(action.result.success){
                        		Ext.util.Cookies.set('MOBILE_TEST_SESSION', action.result.msg);
								window.location.href = '/PhoneTest/home';
                        	}else{
                        		alert(action.result.msg);	
                        	}
                        },
                        failure: function(form, action) {
                         
                         Ext.MessageBox
							.alert(	'警告', action.result.msg);
                        }
                    });
			}	
		};
			
		
		 var checkcode = Ext.create('App.view.CheckCode',{
	            cls : 'key',
	            fieldLabel : '验证码',
	            name : 'randCode',
	            id : 'randCode',
	            allowBlank : false,
	            isLoader:true,
	            blankText : '验证码不能为空',
	            codeUrl: 'verifycode.do',
	            width : 160,
	            listeners : {
					specialKey : function(field, e) {
						if (e.getKey() == Ext.EventObject.ENTER)
							surely();
					}
				}
	        });
		
		var myform = new Ext.form.Panel({
			defaultType : 'textfield',	
			frame : true,			    
		    fieldDefaults: {		     
		        labelAlign : 'right',
		        labelWidth: 80
		    },		    			
			items : [ {
				xtype: 'textfield',
				name : 'username',
				maxLength :15,
				fieldLabel : '帐 号',
				blankText : '帐号不能为空'
			}, {
				xtype: 'textfield',
				name : 'pwd',
				maxLength :15,
				fieldLabel : '密 码',
				blankText : '密码不能为空',
				inputType : 'password'
			},checkcode
			/**
			{
				xtype:'fieldcontainer',
				layout: 'hbox',
				fieldLabel : '验证码',			
				items:[{
					xtype: 'textfield',
					name : 'randCode',
					id : 'randCode',					
					width : 80,
					blankText : '验证码不能为空',
					listeners : {
						specialKey : function(field, e) {
							if (e.getKey() == Ext.EventObject.ENTER)
								surely();
						}
					}
				},{
				    xtype: 'component',//'box', 
				    autoEl: {
				        tag: 'img',    
				        src: 'validCode.action'    
				    }
				}]
				
			}**/
			
			],
			buttons : [ {
				text : '确定',			
				id : 'btnLogin',
				handler : surely
			}, {
				text : '重置',
				id : 'btnClear',
				handler : reset
			} ]
		});
		return myform;
	},

	initComponent : function() {
		this.callParent();	
		this.fp = this.createFormPanel();
		this.add(this.fp);
	}

});
