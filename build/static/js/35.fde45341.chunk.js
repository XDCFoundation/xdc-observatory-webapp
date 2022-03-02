(this["webpackJsonpxinfin-observatory-web-app"]=this["webpackJsonpxinfin-observatory-web-app"]||[]).push([[35],{1380:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return O}));var r=a(19),n=a.n(r),s=a(28),o=a(10),i=a(0),c=a.n(i),p=a(399),u=a(270),l=a(48),m=a(80),d=a(20),h=a(2241),f=a(2249),x=a(2224),g=a(2223),v=a(775),b=a(42),w=a(406),y=a(407),P=a(11),j=Object(u.a)((function(e){return{add:{backgroundColor:"#2149b9",marginLeft:"90px"},btn:{textAlign:"start",padding:"0px",border:"none !important",background:"none","&:hover":{background:"none"}},value:{width:"400px !important"},main_div:{marginTop:"4px"},createWatchlistMobile:{paddingLeft:"2em",paddingRight:"2em",marginTop:"14px"},radio:{},cross:{marginTop:"25px",marginLeft:"40px",fontWeight:"500"},dialog:{marginLeft:"10%",marginTop:"-30px",width:"80% !important",height:"90% !important",borderRadius:"50px !important",padding:"15px"},input:{width:"503px",height:"3px",border:"solid 1px #c6c8ce",backgroundColor:"#ffffff",borderRadius:"7px",padding:"20px",marginBottom:"20px",outline:"none"},addbtn:{width:"78px",height:"34px",margin:"14px -8px 15px 2px",borderRadius:"4px",backgroundColor:"#3763dd",color:"white"},cnlbtn:{width:"78px",height:"34px",borderRadius:"4px",backgroundColor:"#9fa9ba",color:"white",margin:"14px 8px 15px 2px"},buttons:{padding:"15px 35px 20px 0px"},subCategory:{marginTop:"-12px",marginBottom:"2px",fontFamily:"Inter",fontSize:"14px",color:"#2a2a2a",fontWeight:"500",border:"none !important"},forgotpass:{color:"#2149b9",marginLeft:"123px"},createaccount:{color:"#2149b9",marginLeft:"32px",fontfamily:"Inter",fontsize:"14px"},icon:{marginLeft:"-30px"},xdc:{color:"#2a2a2a",marginLeft:"30px",fontfamily:"Inter",fontsize:"5px"},error:{color:"red",marginLeft:"2px",marginTop:"-20px"},error1:{color:"red",marginBottom:"8px",marginTop:"-20px"},heading:{marginTop:"30px",marginBottom:"30px",fontFamily:"Inter",fontWeight:"600",fontSize:"18px",color:"#2a2a2a"},dialogBox:{width:"553px",position:"absolute",top:"111px",borderRadius:"12px"},notifyLabel:{fontSize:"14px",color:"#2a2a2a"},lastContainer:{maxWidth:"343px",width:"100%",padding:"11px 12px 10px 13px",borderRadius:"6px",backgroundColor:"#fff3f3",marginLeft:"auto",marginRight:"auto",marginBottom:"25px"},lastContainerText:{fontSize:"12px",fontFamily:"Inter !important",color:"#ff0202",lineHeight:"1.58"},"@media (max-width: 714px)":{heading:{fontSize:"16px"},dialogBox:{width:"362px",top:"95px"},input:{maxWidth:"503px",width:"100%"},notifyLabel:{fontSize:"13px",width:"250px"},subCategory1:{marginTop:"0px",marginBottom:"2px",fontFamily:"Inter",fontSize:"14px",color:"#2a2a2a",fontWeight:"500",border:"none !important"}},"@media (max-width: 900px)":{}}}));function O(){var e=c.a.useState(!1),t=Object(o.a)(e,2),a=(t[0],t[1]),r=c.a.useState(""),i=Object(o.a)(r,2),u=i[0],O=i[1],E=c.a.useState(""),T=Object(o.a)(E,2),D=T[0],C=T[1],k=c.a.useState(""),S=Object(o.a)(k,2),N=S[0],z=S[1],L=c.a.useState(""),A=Object(o.a)(L,2),I=A[0],W=A[1],R=c.a.useState(""),U=Object(o.a)(R,2),_=U[0],F=U[1],H=c.a.useState(!1),B=Object(o.a)(H,2),J=(B[0],B[1]),Y=c.a.useState(!1),M=Object(o.a)(Y,2),G=(M[0],M[1],c.a.useState("female")),X=Object(o.a)(G,2),q=X[0],Q=X[1],K=c.a.useState(!1),Z=Object(o.a)(K,2),V=(Z[0],Z[1],window.innerHeight,function(){var e=Object(s.a)(n.a.mark((function e(){var t,r,s,i,c,p;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(z(""),W(""),F(""),u||D){e.next=6;break}return F("Please enter required fields"),e.abrupt("return");case 6:if(t={userId:d.a.getDataFromCookies("userId"),address:u,description:D,type:q,isEnabled:!0},u){e.next=11;break}z("Please enter required field"),e.next=46;break;case 11:if(D){e.next=15;break}W("Please enter description"),e.next=46;break;case 15:if(u&&43===u.length&&"xdc"===u.slice(0,3)){e.next=19;break}z("Address should start with xdc and consist of 43 characters"),e.next=46;break;case 19:return"NO"===q&&(t.isEnabled=!1),e.next=22,b.a.parseResponse(v.a.addWatchlist(t));case 22:if(r=e.sent,s=Object(o.a)(r,2),i=s[0],c=s[1],!i&&c){e.next=29;break}return W("Address already exist in table"),e.abrupt("return");case 29:if(!(p=localStorage.getItem(P.c.USER_ADDRESS_WATCHLIST))){e.next=38;break}if(p=JSON.parse(p),!p.find((function(e){return e.address==t.address&&e.userId==t.userId}))){e.next=36;break}return b.a.apiFailureToast("Address already exists"),e.abrupt("return");case 36:e.next=39;break;case 38:p=[];case 39:p.push(t),localStorage.setItem(P.c.USER_ADDRESS_WATCHLIST,JSON.stringify(p)),b.a.apiSuccessToast("Address added to watchlist"),window.location.href="loginprofile",O(""),C(""),a(!1);case 46:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),$=j();function ee(){var e=window;return{width:e.innerWidth,height:e.innerHeight}}var te=c.a.useState(ee()),ae=Object(o.a)(te,2),re=ae[0],ne=ae[1];return c.a.useEffect((function(){function e(){ne(ee())}return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),re.width>=760&&m.a.push("/loginprofile"),c.a.createElement("div",null,c.a.createElement(w.a,null),c.a.createElement("div",{className:$.createWatchlistMobile},c.a.createElement(l.Row,null,c.a.createElement("div",{className:$.heading,id:"form-dialog-title"},"Add a New Address to your Watchlist")),_?c.a.createElement("div",{className:$.error1},_):c.a.createElement(c.a.Fragment,null),c.a.createElement("div",null,c.a.createElement("p",{className:$.subCategory},"Address"),c.a.createElement("input",{className:$.input,onChange:function(e){O(e.target.value),z("")}}),N?c.a.createElement("div",{className:$.error},N):c.a.createElement(c.a.Fragment,null)),c.a.createElement("p",null,c.a.createElement("p",{className:$.subCategory1},"Description"),c.a.createElement("input",{type:"text",className:$.input,onChange:function(e){C(e.target.value),W("")}}),I?c.a.createElement("div",{className:$.error},I):c.a.createElement(c.a.Fragment,null)),c.a.createElement("p",null,c.a.createElement("p",{className:$.subCategory},"Notifications"),c.a.createElement(g.a,{component:"fieldset",style:{backgoundColor:"red !important"},className:$.main_div},c.a.createElement(f.a,{className:$.radio,style:{margin:"-5px 28px -3px --5px"},value:q,onChange:function(e){Q(e.target.value)}},c.a.createElement(x.a,{className:"radio-inside-dot",value:"NO",control:c.a.createElement(h.a,{style:{color:"#979797"}}),style:{margin:"5px 2px -5px -9px"},classes:{label:$.notifyLabel},label:"No Notifications",onClick:function(e){return J(e.target.value)}}),c.a.createElement(x.a,{className:"radio-inside-dot",value:"INOUT",control:c.a.createElement(h.a,{style:{color:"#979797"}}),style:{margin:"-5px 26px -5px -9px"},classes:{label:$.notifyLabel},label:"Notify on Incoming & Outgoing Txns",onClick:function(e){return J(e.target.value)}}),c.a.createElement(x.a,{className:"radio-inside-dot",value:"IN",control:c.a.createElement(h.a,{style:{color:"#979797"}}),style:{margin:"-5px 26px -5px -9px"},classes:{label:$.notifyLabel},label:"Notify on Incoming (Recieve) Txns Only",onClick:function(e){return J(e.target.value)}}),c.a.createElement(x.a,{className:"radio-inside-dot",value:"OUT",control:c.a.createElement(h.a,{style:{color:"#979797"}}),style:{margin:"-5px 26px -5px -9px"},classes:{label:$.notifyLabel},label:"Notify on Outgoing (Sent) Txns Only",onClick:function(e){return J(e.target.value)}})))),c.a.createElement(p.a,null,c.a.createElement("span",{onClick:function(){a(!1),O(""),C(""),z(""),W("")}},c.a.createElement("button",{className:$.cnlbtn,onClick:function(){m.a.push("/loginprofile"),z("")}},"Cancel")),c.a.createElement("span",null,c.a.createElement("button",{className:$.addbtn,onClick:V},"Add"))),c.a.createElement("div",{className:$.lastContainer},c.a.createElement("div",{className:$.lastContainerText},"Privacy is very important to us. To protect sensitive information, all custom tags and data related to the Watchlists are saved on your local device. Clearing the browsing history or cookies will remove the watchlist data saved in your profile."))),c.a.createElement(y.a,null))}},775:function(e,t,a){"use strict";var r=a(19),n=a.n(r),s=a(28),o=a(117),i=a(11);function c(){return{"Content-Type":i.g.CONTENT_TYPE.APPLICATION_JSON,"X-API-key":"UYIQSLAYpd1i6aOAXL1okajcWJhoDQJr5KX82Zlu"}}function p(){return(p=Object(s.a)(n.a.mark((function e(t){var a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="https://mr9rmpio4a.execute-api.us-east-2.amazonaws.com/dev/watchlist-srv/transaction-private-note/"+t,e.abrupt("return",Object(o.a)("GET",c(),{},a).then((function(e){return e.success&&200===e.responseCode&&e.responseData&&0!==e.responseData.length?Promise.resolve(e.responseData):Promise.reject()})).catch((function(e){return Promise.reject(e)})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function u(){return(u=Object(s.a)(n.a.mark((function e(t){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://mr9rmpio4a.execute-api.us-east-2.amazonaws.com/dev/watchlist-srv/add-transaction-label",e.abrupt("return",Object(o.a)("POST",c(),t,"https://mr9rmpio4a.execute-api.us-east-2.amazonaws.com/dev/watchlist-srv/add-transaction-label").then((function(e){return e.success&&200===e.responseCode&&e.responseData&&0!==e.responseData.length?Promise.resolve(e.responseData):Promise.reject()})).catch((function(e){return Promise.reject(e)})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function l(){return(l=Object(s.a)(n.a.mark((function e(t){var a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="https://mr9rmpio4a.execute-api.us-east-2.amazonaws.com/dev/watchlist-srv/getAddress/"+t,e.abrupt("return",Object(o.a)("GET",c(),{},a).then((function(e){return e.success&&200===e.responseCode&&e.responseData&&0!==e.responseData.length?Promise.resolve(e.responseData):Promise.reject()})).catch((function(e){return Promise.reject(e)})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function m(){return(m=Object(s.a)(n.a.mark((function e(t){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://mr9rmpio4a.execute-api.us-east-2.amazonaws.com/dev/watchlist-srv/add-address-tag",e.abrupt("return",Object(o.a)("POST",c(),t,"https://mr9rmpio4a.execute-api.us-east-2.amazonaws.com/dev/watchlist-srv/add-address-tag").then((function(e){return e.success&&200===e.responseCode&&e.responseData&&0!==e.responseData.length?Promise.resolve(e.responseData):Promise.reject()})).catch((function(e){return Promise.reject(e)})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function d(){return(d=Object(s.a)(n.a.mark((function e(t){var a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="https://mr9rmpio4a.execute-api.us-east-2.amazonaws.com/dev/watchlist-srv/get-address-tag/"+t,e.abrupt("return",Object(o.a)("GET",c(),{},a).then((function(e){return e.success&&200===e.responseCode&&e.responseData&&0!==e.responseData.length?Promise.resolve(e.responseData):Promise.reject()})).catch((function(e){return Promise.reject(e)})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function h(){return(h=Object(s.a)(n.a.mark((function e(t){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://mr9rmpio4a.execute-api.us-east-2.amazonaws.com/dev/watchlist-srv/add-watchlist",e.abrupt("return",Object(o.a)("POST",c(),t,"https://mr9rmpio4a.execute-api.us-east-2.amazonaws.com/dev/watchlist-srv/add-watchlist").then((function(e){return e.success&&200===e.responseCode&&e.responseData&&0!==e.responseData.length?Promise.resolve(e.responseData):Promise.reject()})).catch((function(e){return Promise.reject(e)})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function f(){return(f=Object(s.a)(n.a.mark((function e(t){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://mr9rmpio4a.execute-api.us-east-2.amazonaws.com/dev/watchlist-srv/edit-watchlist",e.abrupt("return",Object(o.a)("PUT",c(),t,"https://mr9rmpio4a.execute-api.us-east-2.amazonaws.com/dev/watchlist-srv/edit-watchlist").then((function(e){return e.success&&200===e.responseCode&&e.responseData&&0!==e.responseData.length?Promise.resolve(e.responseData):Promise.reject()})).catch((function(e){return Promise.reject(e)})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function x(){return(x=Object(s.a)(n.a.mark((function e(t){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://mr9rmpio4a.execute-api.us-east-2.amazonaws.com/dev/watchlist-srv/edit-address-tag",e.abrupt("return",Object(o.a)("PUT",c(),t,"https://mr9rmpio4a.execute-api.us-east-2.amazonaws.com/dev/watchlist-srv/edit-address-tag").then((function(e){return e.success&&200===e.responseCode&&e.responseData&&0!==e.responseData.length?Promise.resolve(e.responseData):Promise.reject()})).catch((function(e){return Promise.reject(e)})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function g(){return(g=Object(s.a)(n.a.mark((function e(t){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://mr9rmpio4a.execute-api.us-east-2.amazonaws.com/dev/watchlist-srv/edit-transaction-Private-note",e.abrupt("return",Object(o.a)("PUT",c(),t,"https://mr9rmpio4a.execute-api.us-east-2.amazonaws.com/dev/watchlist-srv/edit-transaction-Private-note").then((function(e){return e.success&&200===e.responseCode&&e.responseData&&0!==e.responseData.length?Promise.resolve(e.responseData):Promise.reject()})).catch((function(e){return Promise.reject(e)})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function v(){return(v=Object(s.a)(n.a.mark((function e(t){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://mr9rmpio4a.execute-api.us-east-2.amazonaws.com/dev/watchlist-srv/search",e.abrupt("return",Object(o.a)("POST",c(),t,"https://mr9rmpio4a.execute-api.us-east-2.amazonaws.com/dev/watchlist-srv/search").then((function(e){return e.success&&200===e.responseCode&&e.responseData&&0!==e.responseData.length?Promise.resolve(e.responseData):Promise.reject()})).catch((function(e){return Promise.reject(e)})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function b(){return(b=Object(s.a)(n.a.mark((function e(t){var a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://mr9rmpio4a.execute-api.us-east-2.amazonaws.com/dev/watchlist-srv/get-content-watchlist",a=c(),e.abrupt("return",Object(o.a)(i.g.METHOD_TYPE.POST,a,t,"https://mr9rmpio4a.execute-api.us-east-2.amazonaws.com/dev/watchlist-srv/get-content-watchlist").then((function(e){return e.success&&200===e.responseCode&&e.responseData&&0!==e.responseData.length?Promise.resolve(e.responseData):Promise.reject(e)})).catch((function(e){return Promise.reject(e)})));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function w(){return(w=Object(s.a)(n.a.mark((function e(t){var a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://mr9rmpio4a.execute-api.us-east-2.amazonaws.com/dev/watchlist-srv/get-content-txn-label",a=c(),e.abrupt("return",Object(o.a)(i.g.METHOD_TYPE.POST,a,t,"https://mr9rmpio4a.execute-api.us-east-2.amazonaws.com/dev/watchlist-srv/get-content-txn-label").then((function(e){return e.success&&200===e.responseCode&&e.responseData&&0!==e.responseData.length?Promise.resolve(e.responseData):Promise.reject(e)})).catch((function(e){return Promise.reject(e)})));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function y(){return(y=Object(s.a)(n.a.mark((function e(t){var a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://mr9rmpio4a.execute-api.us-east-2.amazonaws.com/dev/watchlist-srv/get-content-tag-address",a=c(),e.abrupt("return",Object(o.a)(i.g.METHOD_TYPE.POST,a,t,"https://mr9rmpio4a.execute-api.us-east-2.amazonaws.com/dev/watchlist-srv/get-content-tag-address").then((function(e){return e.success&&200===e.responseCode&&e.responseData&&0!==e.responseData.length?Promise.resolve(e.responseData):Promise.reject(e)})).catch((function(e){return Promise.reject(e)})));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function P(){return(P=Object(s.a)(n.a.mark((function e(t){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://mr9rmpio4a.execute-api.us-east-2.amazonaws.com/dev/auth-srv/privacy-consent",e.abrupt("return",Object(o.a)(i.g.METHOD_TYPE.POST,c(),t,"https://mr9rmpio4a.execute-api.us-east-2.amazonaws.com/dev/auth-srv/privacy-consent").then((function(e){return e.success&&200===e.responseCode&&e.responseData&&0!==e.responseData.length?Promise.resolve(e.responseData):Promise.reject()})).catch((function(e){return Promise.reject(e)})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}t.a={getUserPrivateNote:function(e){return p.apply(this,arguments)},postUserPrivateNote:function(e){return u.apply(this,arguments)},getUserWatchlist:function(e){return l.apply(this,arguments)},addPrivateTagToAddress:function(e){return m.apply(this,arguments)},getPrivateTagToAddress:function(e){return d.apply(this,arguments)},addWatchlist:function(e){return h.apply(this,arguments)},putWatchlist:function(e){return f.apply(this,arguments)},putTaggedAddress:function(e){return x.apply(this,arguments)},editUserPrivateNote:function(e){return g.apply(this,arguments)},getWatchlistList:function(e){return b.apply(this,arguments)},getTxnLabelList:function(e){return w.apply(this,arguments)},getTagAddresstList:function(e){return y.apply(this,arguments)},Search:function(e){return v.apply(this,arguments)},privacyConsent:function(e){return P.apply(this,arguments)}}}}]);
//# sourceMappingURL=35.fde45341.chunk.js.map