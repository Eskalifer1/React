"use strict";(self.webpackChunkreact4=self.webpackChunkreact4||[]).push([[165],{1709:function(e,s,a){a.d(s,{I:function(){return m}});var i=a(8683),n=a(5671),t=a(3144),r=a(136),o=a(7277),l=a(2791),c=a(1405),d=a(7689),u=a(184),g=function(e){return{isAuth:e.Auth.isAuth}},m=function(e){var s=function(s){(0,r.Z)(l,s);var a=(0,o.Z)(l);function l(){return(0,n.Z)(this,l),a.apply(this,arguments)}return(0,t.Z)(l,[{key:"render",value:function(){return this.props.isAuth?(0,u.jsx)(e,(0,i.Z)({},this.props)):(0,u.jsx)(d.Fg,{to:"/login"})}}]),l}(l.Component);return(0,c.$j)(g,{})(s)}},2165:function(e,s,a){a.r(s),a.d(s,{default:function(){return v}});var i=a(1405),n=(a(2791),a(5048)),t=a(5705),r="DialogItem_dialog__gLEl8",o="DialogItem_active__J951S",l=a(1087),c=a(184),d=function(e){var s="/dialogs/".concat(e.id);return(0,c.jsx)("div",{className:r,children:(0,c.jsx)(l.OL,{to:s,className:function(e){return e.isActive?o:void 0},children:e.name})})},u={dialogs:"Dialogs_dialogs__BWR-o",messages:"Dialogs_messages__qig1a",sendBlock:"Dialogs_sendBlock__2H8RY",input:"Dialogs_input__5mCZ9",Error:"Dialogs_Error__7YJok",form:"Dialogs_form__j73Gg",title:"Dialogs_title__Z9eqr"},g="Message_messageItem__MAwzk",m=function(e){return(0,c.jsx)("div",{className:g,children:e.message})},_=function(e){return(0,c.jsx)(t.J9,{initialValues:{message:""},onSubmit:function(s){e.addMessage(s.message)},validationSchema:n.Z,children:function(){return(0,c.jsxs)(t.l0,{className:u.form,children:[(0,c.jsx)("div",{children:(0,c.jsx)(t.gN,{className:u.input,name:"message",placeholder:"Enter text",type:"text"})}),(0,c.jsx)(t.Bc,{className:u.Error,name:"message",component:"div"}),(0,c.jsx)("button",{type:"submit",className:u.send,children:"Send message"})]})}})},h=function(e){var s=e.DialogsData.map((function(e){return(0,c.jsx)(d,{name:e.name,id:e.id},e.id)})),a=e.MessageData.map((function(e){return(0,c.jsx)(m,{message:e.message},e.id)}));return(0,c.jsxs)("div",{className:u.dialogs,children:[(0,c.jsx)("div",{className:"dialogsItem",children:s}),(0,c.jsxs)("div",{className:u.messages,children:[(0,c.jsx)("div",{children:a}),(0,c.jsx)("div",{className:u.sendBlock,children:(0,c.jsx)(_,{addMessage:e.addMessage})})]})]})},f=a(1709),j=a(7781),x=a(9098),v=(0,j.qC)((0,i.$j)((function(e){return{DialogsData:e.dialogsPage.DialogsData,MessageData:e.dialogsPage.MessageData}}),{addMessage:x.H}),f.I)(h)},5048:function(e,s,a){var i=a(7103),n=i.Ry().shape({message:i.Z_().min(1,"Enter something").max(300,"Write a little bit less").required("Required")});s.Z=n}}]);
//# sourceMappingURL=165.12b70c30.chunk.js.map