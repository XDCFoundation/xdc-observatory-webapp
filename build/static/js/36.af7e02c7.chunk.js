(this["webpackJsonpxinfin-observatory-web-app"]=this["webpackJsonpxinfin-observatory-web-app"]||[]).push([[36],{2224:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return E}));var n=t(19),r=t.n(n),i=t(43),o=t(29),s=t(10),c=t(0),l=t.n(c),d=t(395),u=t(266),p=t(46),m=t(766),g=t(40),f=t(80),x=t(24),h=t(401),b=t(402),v=t(16),w=Object(u.a)((function(e){return{add:{backgroundColor:"#2149b9",marginLeft:"90px"},btn:{textAlign:"start",padding:"0px",border:"none !important",background:"none","&:hover":{background:"none"}},value:{width:"400px !important"},cross:{marginTop:"25px",marginLeft:"40px",fontWeight:"500"},dialog:{marginLeft:"10%",marginTop:"2px",width:"80% !important",height:"70% !important",borderRadius:"50px !important"},buttons:{padding:"21px 0px 15px 0px",maxWidth:"343px",width:"100%",marginLeft:"auto",marginRight:"auto"},input:{height:"38px",border:"solid 1px #9fa9ba",backgroundColor:"#ffffff",borderRadius:"4px",marginBottom:"21px",outline:"none",width:"100%"},addbtn:{width:"78px",height:"34px",margin:"0px 0px 15px 2px",borderRadius:"4px",backgroundColor:"#3763dd",color:"white"},cnlbtn:{width:"78px",height:"34px",borderRadius:"4px",backgroundColor:"#9fa9ba",color:"white",margin:"0px 8px 15px 2px"},subCategory:{marginTop:"-12px",marginBottom:"2px",fontFamily:"Inter",fontSize:"14px",color:"#2a2a2a",fontWeight:"500 !important",border:"none !important"},forgotpass:{color:"#2149b9",marginLeft:"123px"},createaccount:{color:"#2149b9",marginLeft:"32px",fontfamily:"Inter",fontsize:"14px"},icon:{marginLeft:"-30px"},userContainer:{marginTop:"12px",padding:"0px",width:"100%",maxWidth:"343px",marginLeft:"auto",marginRight:"auto"},xdc:{color:"#2a2a2a",marginLeft:"30px",fontfamily:"Inter",fontsize:"5px"},error:{color:"red",marginLeft:"2px",marginTop:"-20px"},error1:{color:"red",marginLeft:"2px"},heading:{marginTop:"30px",marginBottom:"30px",marginLeft:"auto",marginRight:"auto",fontFamily:"Inter",fontWeight:"600",fontSize:"18px",color:"#2a2a2a",maxWidth:"343px",width:"100%"},dialogBox:{width:"553px",position:"absolute",top:"111px",borderRadius:"12px"},createWatchlistMobile:{marginTop:"14px"},lastContainer:{maxWidth:"343px",width:"100%",padding:"11px 12px 10px 13px",borderRadius:"6px",backgroundColor:"#fff3f3",marginLeft:"auto",marginRight:"auto",marginBottom:"25px"},lastContainerText:{fontSize:"12px",fontFamily:"Inter !important",color:"#ff0202",lineHeight:"1.58"},"@media (max-width: 767px)":{heading:{fontSize:"16px"},dialogBox:{width:"362px",top:"95px"},error:{color:"red",marginLeft:"2px"}}}}));function E(){var e=l.a.useState(!1),a=Object(s.a)(e,2),t=(a[0],a[1]),n=l.a.useState(!1),c=Object(s.a)(n,2),u=(c[0],c[1],l.a.useState(!1)),E=Object(s.a)(u,2),k=E[0],S=E[1],y=l.a.useState(!1),C=Object(s.a)(y,2),N=(C[0],C[1],l.a.useState("")),T=Object(s.a)(N,2),O=T[0],L=T[1],R=l.a.useState(""),j=Object(s.a)(R,2),A=j[0],I=j[1];function D(){return(D=Object(o.a)(r.a.mark((function e(){var a,n,i,o,c;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(L(""),I(""),a={userId:x.a.getDataFromCookies("userId"),address:k,tagName:q},k){e.next=7;break}L("Please enter required field"),e.next=46;break;case 7:if(k&&43===k.length&&"xdc"===k.slice(0,3)){e.next=12;break}return L("Please add address that is having 43 characters and initiates with xdc "),e.abrupt("return");case 12:if(0!==q.length){e.next=17;break}return I("Use comma(,) to add multiple tag"),e.abrupt("return");case 17:if(!(q&&q.length>5)){e.next=22;break}return I("You can not add Name tag more than 5"),e.abrupt("return");case 22:return e.next=24,g.a.parseResponse(m.i.addPrivateTagToAddress(a));case 24:if(n=e.sent,i=Object(s.a)(n,2),o=i[0],i[1],!o){e.next=31;break}return g.a.apiFailureToast("Address is already in use"),e.abrupt("return");case 31:if(!(c=localStorage.getItem(v.c.USER_TAGGED_ADDRESS))){e.next=40;break}if(c=JSON.parse(c),!c.find((function(e){return e.address==k&&e.userId==a.userId}))){e.next=38;break}return g.a.apiFailureToast("Address is already in use"),e.abrupt("return");case 38:e.next=41;break;case 40:c=[];case 41:c.push(a),localStorage.setItem(v.c.USER_TAGGED_ADDRESS,JSON.stringify(c)),g.a.apiSuccessToast("Tag Added"),window.location.href="loginprofile",t(!1);case 46:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var W=w();function z(){var e=window;return{width:e.innerWidth,height:e.innerHeight}}var F=l.a.useState(z()),B=Object(s.a)(F,2),G=B[0],J=B[1];l.a.useEffect((function(){function e(){J(z())}return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),G.width>=760&&f.a.push("/loginprofile");var M=l.a.useState(""),U=Object(s.a)(M,2),_=U[0],P=U[1],H=l.a.useState([]),K=Object(s.a)(H,2),q=K[0],Y=K[1],Q=l.a.useState(!1),V=Object(s.a)(Q,2),X=V[0],Z=V[1];return l.a.createElement("div",null,l.a.createElement(h.a,null),l.a.createElement("div",{className:W.createWatchlistMobile},l.a.createElement(p.Row,null,l.a.createElement("div",{className:W.heading,id:"form-dialog-title"},"Add a new Address Tag")),l.a.createElement("div",{className:W.userContainer},l.a.createElement("p",{className:W.subCategory},"Address"),l.a.createElement("input",{className:W.input,onChange:function(e){S(e.target.value),L("")}}),O?l.a.createElement("div",{className:W.error},O):l.a.createElement(l.a.Fragment,null)),l.a.createElement("div",{className:W.userContainer},l.a.createElement("p",{className:W.subCategory},"Name Tag"),l.a.createElement("div",{className:"containerTagMobile"},q.map((function(e,a){return l.a.createElement("div",{className:"tag"},e,l.a.createElement("button",{onClick:function(){return function(e){Y((function(a){return a.filter((function(a,t){return t!==e}))}))}(a)}},"x"))})),l.a.createElement("input",{value:_,placeholder:"Enter a tag",onKeyDown:function(e){var a=e.key,t=_.trim();if(","===a&&t.length&&!q.includes(t)){if(e.preventDefault(),t.length>15)return void I("Nametag cannot be longer than 15 characters");if(q.length>=5)return void I("Maximum 5 Name tags are allowed");Y((function(e){return[].concat(Object(i.a)(e),[t])})),P(""),I("")}if("Backspace"===a&&!_.length&&q.length&&X){var n=Object(i.a)(q),r=n.pop();e.preventDefault(),Y(n),P(r)}Z(!1)},onKeyUp:function(){Z(!0)},onChange:function(e){I("");var a=e.target.value;P(a)}})),A?l.a.createElement("div",{className:W.error1},A):l.a.createElement(l.a.Fragment,null)),l.a.createElement(d.a,{className:W.buttons},l.a.createElement("span",null,l.a.createElement("button",{className:W.cnlbtn,onClick:function(){t(!1),L(""),I(""),S(""),Y([]),f.a.push("/loginprofile")}},"Cancel")),l.a.createElement("span",null,l.a.createElement("button",{className:W.addbtn,onClick:function(){return D.apply(this,arguments)}},"Add"))),l.a.createElement("div",{className:W.lastContainer},l.a.createElement("div",{className:W.lastContainerText},"To protect your privacy, data related to the address tags, is added on your local device. Cleaning the browsing history or cookies will clean the address tags saved in your profile."))),l.a.createElement(b.a,null))}}}]);
//# sourceMappingURL=36.af7e02c7.chunk.js.map