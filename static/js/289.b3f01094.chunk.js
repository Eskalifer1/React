"use strict";(self.webpackChunkreact4=self.webpackChunkreact4||[]).push([[289],{1709:function(t,e,s){s.d(e,{I:function(){return m}});var i=s(8683),n=s(5671),a=s(3144),r=s(136),o=s(7277),l=s(2791),c=s(1405),u=s(7689),p=s(184),f=function(t){return{isAuth:t.Auth.isAuth}},m=function(t){var e=function(e){(0,r.Z)(l,e);var s=(0,o.Z)(l);function l(){return(0,n.Z)(this,l),s.apply(this,arguments)}return(0,a.Z)(l,[{key:"render",value:function(){return this.props.isAuth?(0,p.jsx)(t,(0,i.Z)({},this.props)):(0,p.jsx)(u.Fg,{to:"/login"})}}]),l}(l.Component);return(0,c.$j)(f,{})(e)}},5048:function(t,e,s){var i=s(7103),n=i.Ry().shape({message:i.Z_().min(1,"Enter something").max(300,"Write a little bit less").required("Required")});e.Z=n},4289:function(t,e,s){s.r(e),s.d(e,{default:function(){return F}});var i=s(8683),n=s(5671),a=s(3144),r=s(136),o=s(7277),l=s(2791),c=s(4802),u=s(7781),p=s(6508),f={textBlock:"MyPost_textBlock__Sxmjq",enterSection:"MyPost_enterSection__h3beP",textArea:"MyPost_textArea__SANaM",input:"MyPost_input__SIHHp",Error:"MyPost_Error__OqZs8",form:"MyPost_form__G4EY4",title:"MyPost_title__YYDVI"},m={item:"Post_item__khzyd",img:"Post_img__VZ3pN",flex:"Post_flex__cBuvM"},d=s(184),h=function(t){return(0,d.jsxs)("div",{className:m.item,children:[(0,d.jsxs)("div",{className:m.flex,children:[(0,d.jsx)("img",{className:m.img,src:"https://img.freepik.com/premium-vector/wolf-mascot-gaming-logo-design-vector-template_441059-290.jpg?w=2000",alt:"user logo"}),(0,d.jsxs)("p",{className:m.message,children:["".concat(t.message)," "]})]}),(0,d.jsxs)("div",{className:m.likes,children:["likes ",t.likesCount]})]})},_=s(5705),x=s(5048),j=l.memo((function(t){return(0,d.jsxs)("div",{className:f.textBlock,children:[(0,d.jsxs)("div",{className:f.enterSection,children:[(0,d.jsx)("h3",{className:f.title,children:"My Posts"}),(0,d.jsx)(g,{addPost:t.addPost})]}),(0,d.jsx)("div",{className:f.posts,children:t.postData.map((function(t){return(0,d.jsx)(h,{message:t.message,likesCount:t.likesCount},t.id)}))})]})})),g=function(t){return(0,d.jsx)(_.J9,{initialValues:{message:""},onSubmit:function(e,s){t.addPost(e.message),s.resetForm()},validationSchema:x.Z,children:function(){return(0,d.jsxs)(_.l0,{className:f.form,children:[(0,d.jsx)("div",{children:(0,d.jsx)(_.gN,{className:f.input,name:"message",placeholder:"Enter text",type:"text"})}),(0,d.jsx)(_.Bc,{className:f.Error,name:"message",component:"div"}),(0,d.jsx)("button",{type:"submit",className:f.send,children:"Add Post"})]})}})},v=j,k=(0,u.qC)((0,c.$j)((function(t){return{postData:t.profilePage.postData}}),{addPost:p.q2}))(v),N={},P=s(9081),I={textBlock:"ProfileInfo_textBlock__k3i43",descriptionBlock:"ProfileInfo_descriptionBlock__0cjXR",img:"ProfileInfo_img__H9kT-",photo:"ProfileInfo_photo__j8gEF",title:"ProfileInfo_title__m0IRx",link:"ProfileInfo_link__W76nQ",jobInfo:"ProfileInfo_jobInfo__FWVqK",name:"ProfileInfo_name__kt1P8",status:"ProfileInfo_status__o03kG",description:"ProfileInfo_description__pgRfh",inputStatus:"ProfileInfo_inputStatus__l5ckx",inputDiv:"ProfileInfo_inputDiv__T+j1J",textDiv:"ProfileInfo_textDiv__iSA+v"},b=s(790),S=s(885),Z=function(t){var e=(0,l.useState)(!1),s=(0,S.Z)(e,2),i=s[0],n=s[1],a=(0,l.useState)(t.status),r=(0,S.Z)(a,2),o=r[0],c=r[1];(0,l.useEffect)((function(){c(t.status)}),[t.status]);return(0,d.jsxs)(d.Fragment,{children:[i||(0,d.jsx)("div",{className:"".concat(I.inputDiv," ").concat(I.textDiv),children:(0,d.jsx)("span",{onDoubleClick:function(){n(!0)},children:t.status})}),i&&(0,d.jsx)("div",{className:I.inputDiv,children:(0,d.jsx)("input",{type:"text",autoFocus:!0,onBlur:function(){n(!1),t.updateStatus(o)},onChange:function(t){c(t.currentTarget.value)},className:I.inputStatus,value:o})})]})},y=function(t){return t.profile?(0,d.jsx)("div",{children:(0,d.jsxs)("div",{className:I.descriptionBlock,children:[(0,d.jsx)("img",{src:t.profile.photos.large||b,alt:"Avatar",className:I.photo}),(0,d.jsx)(Z,{status:t.status||"hi",updateStatus:t.updateStatus}),(0,d.jsx)("h2",{className:I.title,children:"Information about job"}),(0,d.jsxs)("div",{className:I.jobInfo,children:[(0,d.jsx)("p",{className:I.name,children:t.profile.fullName}),t.profile.lookinfForAJob?(0,d.jsx)("p",{className:I.status,children:"Looking for a Job"}):(0,d.jsx)("p",{className:I.status,children:"Not Interested In a Job"}),(0,d.jsx)("p",{className:I.description,children:t.profile.lookingForAJobDescription})]}),(0,d.jsxs)("div",{className:I.contacts,children:[(0,d.jsx)("h2",{className:I.title,children:"My Contacts"}),(0,d.jsxs)("ul",{children:[(0,d.jsx)("li",{className:I.item,children:(0,d.jsx)("a",{className:I.link,href:t.profile.contacts.facebook,target:"_blank",children:"Facebook"})}),(0,d.jsx)("li",{className:I.item,children:(0,d.jsx)("a",{className:I.link,href:t.profile.contacts.website,target:"_blank",children:"Website"})}),(0,d.jsx)("li",{className:I.item,children:(0,d.jsx)("a",{className:I.link,href:t.profile.contacts.vk,target:"_blank",children:"VK"})}),(0,d.jsx)("li",{className:I.item,children:(0,d.jsx)("a",{className:I.link,href:t.profile.contacts.twitter,target:"_blank",children:"Twitter"})}),(0,d.jsx)("li",{className:I.item,children:(0,d.jsx)("a",{className:I.link,href:t.profile.contacts.instagram,target:"_blank",children:"Intsagram"})})]})]})]})}):(0,d.jsx)(P.Z,{})},A=function(t){return(0,d.jsxs)("div",{className:N.profile,children:[(0,d.jsx)(y,{profile:t.profile,status:t.status,updateStatus:t.updateStatus}),(0,d.jsx)(k,{})]})},D=s(1405),C=s(7689),M=s(1709),B=function(t){(0,r.Z)(s,t);var e=(0,o.Z)(s);function s(){var t;(0,n.Z)(this,s);for(var i=arguments.length,a=new Array(i),r=0;r<i;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a))).componentDidMount=function(){var e=t.props.router.params.userId||t.props.userID;e?(t.props.setUser(e),t.props.getStatus(e)):t.props.router.navigate("/login")},t}return(0,a.Z)(s,[{key:"render",value:function(){return(0,d.jsx)(A,(0,i.Z)((0,i.Z)({},this.props),{},{profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatus}))}}]),s}(l.Component);var F=(0,u.qC)((0,D.$j)((function(t){return{profile:t.profilePage.profile,userID:t.Auth.userID,isAuth:t.Auth.isAuth,status:t.profilePage.status}}),{setUser:p.av,getStatus:p.lR,updateStatus:p.Nf}),(function(t){return function(e){var s=(0,C.TH)(),n=(0,C.s0)(),a=(0,C.UO)();return(0,d.jsx)(t,(0,i.Z)((0,i.Z)({},e),{},{router:{location:s,navigate:n,params:a}}))}}),M.I)(B)},790:function(t,e,s){t.exports=s.p+"static/media/defaultLogo.d25733de737dc89acd38.png"}}]);
//# sourceMappingURL=289.b3f01094.chunk.js.map