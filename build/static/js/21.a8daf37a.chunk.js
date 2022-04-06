(this["webpackJsonpxinfin-observatory-web-app"]=this["webpackJsonpxinfin-observatory-web-app"]||[]).push([[21],{2276:function(e,t,a){"use strict";a.r(t);var n,r,o,i=a(10),c=a(20),s=a.n(c),l=a(28),u=a(32),d=a(35),m=a(40),p=a(41),g=a(0),f=a.n(g),b=a(278),h=a(21),v=(a(414),a(846)),x=a(880),y=a(879),k=a(878),E=a(876),O=a(877),w=a(688),C=a(406),A=a(408),N=a(409),S=a(681),j=a(142),L=a(37),T=a(779),R=a.n(T),_=a(840),P=a(841),F=a(24),I=a(8),D=a(787),B=a(971),M=F.default.div(n||(n=Object(h.a)(["\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  margin-bottom: 20px;\n"]))),z=F.default.div(r||(r=Object(h.a)(["\n  border-radius: 8px;\n  border: solid 1px #e3e7eb;\n  background-color: #ffffff;\n  padding: 7px 10px;\n  margin-bottom: 4px;\n  margin-right: 10px;\n  ","\n\n  input {\n    outline: none;\n    border: none !important;\n    ","\n  }\n\n  img {\n    width: 16px;\n    height: 16px;\n    margin: 1px 7px 2px 0;\n  }\n\n  @media (max-width: 767px) {\n    width: 100%;\n    margin-right: 0;\n  }\n"])),(function(e){return"dark"===e.theme&&"\n    border: solid 1px #3552a5;\n    background-color: #091b4e;\n  "}),(function(e){return"dark"===e.theme&&"\n      background: transparent;\n      color: #fff;\n    "})),W=function(e){var t=e.searchAndFilters,a=e.updateFiltersAndGetAccounts,n=(e.getListOfAccounts,Object(g.useState)(t.searchQuery)),r=Object(i.a)(n,2),o=r[0],c=r[1],s=Object(g.useState)(t.type),l=Object(i.a)(s,2),u=l[0],d=l[1],m=Object(g.useState)(t.percentage),p=Object(i.a)(m,2),b=p[0],h=(p[1],0);Object(g.useEffect)((function(){(u||b)&&a({searchQuery:o,type:u,percentage:b})}),[u,b]);return f.a.createElement(M,null,f.a.createElement(z,{theme:e.theme},f.a.createElement("img",{src:"/images/Search.svg",alt:"search"}),f.a.createElement("input",{placeholder:"Search",onChange:function(e){return t=e.target.value,h&&clearTimeout(h),void(h=setTimeout((function(){c(t),a({searchQuery:t,type:u,percentage:b})}),500));var t}})),f.a.createElement(B.a,{theme:e.theme,name:"Type",selectedOption:u,onSelect:function(e){return d(e)},options:[{key:"-1",value:"View All"},{key:"0",value:"Account"},{key:"1",value:"Contract"},{key:"2",value:"Token"}]}))},q=Object(S.a)({headingContainer:{display:"flex",justifyContent:"space-between",paddingTop:"30px",paddingBottom:"30px"},heading:{fontSize:"24px",fontWeight:"600",color:"#2a2a2a",fontFamily:"Inter !important"},container:{borderRadius:"0.875rem",boxShadow:"0 0.063rem 0.625rem 0 rgba(0, 0, 0, 0.1)",borderBottom:"none",background:"#fff"},containerDark:{borderRadius:"0.875rem",boxShadow:"0 0.063rem 0.625rem 0 rgba(0, 0, 0, 0.1)",borderBottom:"none",background:"#192a59"},RankColumn:{border:"none !important",borderBottom:"none !important","@media (min-width: 768px) and (max-width: 1240px)":{border:"none !important",borderBottom:"none !important",paddingLeft:"3% !important"}},RankColumnVal:{border:"none !important",borderBottom:"none !important",paddingLeft:"5.7% !important","@media (max-width: 767px)":{RankColumnVal:{border:"none !important",borderBottom:"none !important",paddingLeft:"2% !important"}}},"@media (min-width: 768px) and (max-width: 1240px)":{RankColumnVal:{border:"none !important",borderBottom:"none !important",paddingLeft:"3.2% !important"}},PercentageColumn:{border:"none !important",borderBottom:"none !important",paddingLeft:"0% !important"},PercentageColumnVal:{border:"none !important",borderBottom:"none !important",paddingLeft:"0% !important"},btn:{textAlign:"start",padding:"0px",border:"none !important",background:"none","&:hover":{background:"none"}},sortButton:{color:"#3763dd",height:"20px",width:"15px",marginLeft:"5px"},"@media (max-width: 767px)":{headingContainer:{paddingTop:"15px",paddingBottom:"15px"},heading:{fontSize:"16px",fontWeight:"600"}},"@media (max-width: 1024px)":{container:{height:600},containerDark:{height:600}}}),H=F.default.div(o||(o=Object(h.a)(["\n  display: flex;\n  flex-flow: column;\n  justify-content: center;\n  align-items: center;\n  margin-top: 100px;\n  gap: 10px;\n  @media (min-width: 767px) {\n    margin: 100px !important;\n  }\n"])));function K(e){var t,n,r,o,c,s,l,u,d,m=f.a.useState(),p=Object(i.a)(m,2),b=p[0],h=p[1],S=f.a.useState(!1),T=Object(i.a)(S,2),F=T[0],B=T[1],M=Boolean(b),z=f.a.useState(!1),K=Object(i.a)(z,2),V=K[0],$=K[1],G=f.a.useState(!1),U=Object(i.a)(G,2),Q=U[0],J=U[1],X=f.a.useState(!1),Y=Object(i.a)(X,2),Z=Y[0],ee=Y[1],te=f.a.useState(!1),ae=Object(i.a)(te,2),ne=ae[0],re=ae[1],oe=f.a.useState(!1),ie=Object(i.a)(oe,2),ce=ie[0],se=ie[1];function le(){B(!F)}Object(g.useEffect)((function(){e.sortData("balance")}),[]);var ue=e.state,de=q(),me=ue.from;return f.a.createElement("div",{className:"dark"===e.theme?"dark-theme-bg":""},f.a.createElement(A.a,{theme:e.theme}),f.a.createElement("div",{className:"responsive-table-width-contract-list contact-list-tab "},f.a.createElement("div",{className:de.headingContainer},f.a.createElement("div",{className:"dark"===e.theme?"".concat(de.heading," fc-white"):de.heading},ue.tableName),f.a.createElement("div",{className:" display-none-mobile display-flex flex-direction-column justify-content-center"},f.a.createElement("img",{onClick:function(e){h(e.currentTarget)},className:"p-r-5 h-20 w-20-px cursor-pointer",src:"/images/settings.svg",style:{width:"25px"}}),f.a.createElement(_.a,{isOpen:M,anchorEl:b,handleOnClose:function(){h(null)},tableColumns:e.state.tableColumns,toggleTableColumns:e.toggleTableColumns,theme:e.theme})),f.a.createElement("div",{className:" display-none-tab display-none-desktop display-flex flex-direction-column justify-content-center"},f.a.createElement("img",{onClick:le,className:"p-r-5 h-20 w-20-px cursor-pointer",src:"/images/settings.svg",style:{width:"25px"}}),f.a.createElement(P.a,{isOpen:F,onModalClose:le,tableColumns:e.state.tableColumns,toggleTableColumns:e.toggleTableColumns,theme:e.theme}))),f.a.createElement(W,{searchAndFilters:e.state.searchAndFilters,updateFiltersAndGetAccounts:e.updateFiltersAndGetAccounts,getListOfAccounts:e.getListOfAccounts,theme:e.theme}),f.a.createElement("div",{style:{borderRadius:"0.875rem"},elevation:0},f.a.createElement(O.a,{className:"dark"===e.theme?de.containerDark:de.container,id:"container-table"},f.a.createElement(v.a,null,f.a.createElement(k.a,null,f.a.createElement(E.a,null,e.state.tableColumns.Rank.isActive&&f.a.createElement(y.a,{className:de.RankColumn,align:"center"},f.a.createElement("span",{className:"dark"===e.theme?"tableheaders_1 pl--1 fc-white":"tableheaders_1 pl--1"},"Rank",f.a.createElement(C.a,{open:V,onOpen:function(){return $(!0)},onClose:function(){return $(!1)},placement:"top",title:I.i.RANK},f.a.createElement("img",{onClick:function(){return $(!V)},alt:"question-mark",src:"/images/info.svg",className:"tooltipInfoIconAccount"})))),f.a.createElement(y.a,{style:{border:"none",paddingLeft:"2.2%"},align:"center !important",onClick:function(){e.sortData("address")}},f.a.createElement("span",{className:"dark"===e.theme?"tableheaders_1_address cursor-pointer fc-white":"tableheaders_1_address cursor-pointer"},"Address",f.a.createElement(C.a,{open:Q,onOpen:function(){return J(!0)},onClose:function(){return J(!1)},placement:"top",title:I.i.ACCOUNT_ADDRESS},f.a.createElement("img",{onClick:function(){return $(!Q)},alt:"question-mark",src:"/images/info.svg",className:"tooltipInfoIconAccount"}))),f.a.createElement(C.a,{placement:"top",title:e.getSortTitle(null===e||void 0===e||null===(t=e.state)||void 0===t?void 0:t.sortOrder)},"address"==(null===e||void 0===e||null===(n=e.state)||void 0===n?void 0:n.sortKey)?1===(null===e||void 0===e||null===(r=e.state)||void 0===r?void 0:r.sortOrder)?f.a.createElement("img",{alt:"question-mark",src:"/images/see-more.svg",height:"14px",className:"tooltipInfoIcon rotate-180"}):f.a.createElement("img",{alt:"question-mark",src:"/images/see-more.svg",height:"14px",className:"tooltipInfoIcon"}):f.a.createElement("span",null))),e.state.tableColumns.Type.isActive&&f.a.createElement(y.a,{style:{border:"none",paddingLeft:"5.4%"},align:"center"},f.a.createElement("span",{className:"dark"===e.theme?"tableheaders_1 pl--1 fc-white":"tableheaders_1 pl--1"},"Type",f.a.createElement(C.a,{open:Z,onOpen:function(){return ee(!0)},onClose:function(){return ee(!1)},placement:"top",title:I.i.ACCOUNT_TYPE},f.a.createElement("img",{onClick:function(){return ee(!Z)},alt:"question-mark",src:"/images/info.svg",className:"tooltipInfoIconAccount"})))),e.state.tableColumns.Balance.isActive&&f.a.createElement(y.a,{style:{border:"none",paddingLeft:"5%",paddingRight:"48px"},align:"center",onClick:function(){e.sortData("balance")}},f.a.createElement("span",{className:"dark"===e.theme?"tableheaders_1 cursor-pointer fc-white":"tableheaders_1 cursor-pointer"},"Balance",f.a.createElement(C.a,{open:ne,onOpen:function(){return re(!0)},onClose:function(){return re(!1)},placement:"top",title:I.i.ACCOUNT_BALANCE},f.a.createElement("img",{onClick:function(){return re(!ne)},alt:"question-mark",src:"/images/info.svg",className:"tooltipInfoIconAccount"}))),f.a.createElement(C.a,{placement:"top",title:e.getSortTitle(null===e||void 0===e||null===(o=e.state)||void 0===o?void 0:o.sortOrder)},"balance"==(null===e||void 0===e||null===(c=e.state)||void 0===c?void 0:c.sortKey)?1===(null===e||void 0===e||null===(s=e.state)||void 0===s?void 0:s.sortOrder)?f.a.createElement("img",{alt:"question-mark",src:"/images/see-more.svg",height:"14px",className:"tooltipInfoIcon rotate-180"}):f.a.createElement("img",{alt:"question-mark",src:"/images/see-more.svg",height:"14px",className:"tooltipInfoIcon"}):f.a.createElement("span",null))),e.state.tableColumns.Percentage.isActive&&f.a.createElement(y.a,{className:de.PercentageColumn,align:"center",onClick:function(){e.sortData("percentage")}},f.a.createElement("span",{className:"dark"===e.theme?"tableheaders_1 cursor-pointer fc-white":"tableheaders_1 cursor-pointer"},"Percentage",f.a.createElement(C.a,{open:ce,onOpen:function(){return se(!0)},onClose:function(){return se(!1)},placement:"top",title:I.i.PERCENTAGE},f.a.createElement("img",{onClick:function(){return se(!ce)},alt:"question-mark",src:"/images/info.svg",className:"tooltipInfoIconAccount"}))),f.a.createElement(C.a,{placement:"top",title:e.getSortTitle(null===e||void 0===e||null===(l=e.state)||void 0===l?void 0:l.sortOrder)},"percentage"==(null===e||void 0===e||null===(u=e.state)||void 0===u?void 0:u.sortKey)?1===(null===e||void 0===e||null===(d=e.state)||void 0===d?void 0:d.sortOrder)?f.a.createElement("img",{alt:"question-mark",src:"/images/see-more.svg",height:"14px",className:"tooltipInfoIcon rotate-180"}):f.a.createElement("img",{alt:"question-mark",src:"/images/see-more.svg",height:"14px",className:"tooltipInfoIcon"}):f.a.createElement("span",null))))),1==e.state.isLoading?f.a.createElement(x.a,null,f.a.createElement(E.a,null,f.a.createElement(y.a,{style:{border:"none"},colspan:"6"},f.a.createElement("div",{className:"loader-block-list"},f.a.createElement(j.a,null))))):1==e.state.noData&&f.a.createElement(x.a,null,e.state.accountList&&e.state.accountList.length>=1&&e.state.accountList.map((function(t,a){var n=L.a.decimalDivisonOnly(t.balance,8),r=n.toString(),o=L.a.convertToInternationalCurrencySystem(r),i=o.toString().split(".")[0],c=o.toString().split(".")[1],s=new RegExp("([0-9]+)|([a-zA-Z]+)","g"),l=null===c||void 0===c?void 0:c.match(s),u=l&&l.length?l[0]:0,d=l&&l.length?l[1]:0;me+=1;var m=ue.totalSupply&&ue.totalSupply>0?(n/ue.totalSupply*100).toFixed(8):0,p=m.toString().split(".")[0],g=m.toString().split(".")[1];return f.a.createElement(E.a,{key:t.name,style:a%2!==1?"dark"===e.theme?{background:"#192a59"}:{background:"#f9f9f9"}:"dark"===e.theme?{background:"#192a59"}:{background:"white"}},e.state.tableColumns.Rank.isActive&&f.a.createElement(y.a,{className:"dark"===e.theme?"".concat(de.RankColumnVal," fc-b1c3e1"):" ".concat(de.RankColumnVal),align:"center"},f.a.createElement("span",{className:"tabledata"},me)),f.a.createElement(y.a,{className:"w-1",style:{border:"none",paddingLeft:"25.5px",width:""}},f.a.createElement("a",{className:"dark"===e.theme?"linkTable fc-4878ff":"linkTable",href:"/address-details/"+t.address},f.a.createElement("span",{className:"tabledata"},t.address))),e.state.tableColumns.Type.isActive&&f.a.createElement(y.a,{className:"w-2",style:{border:"none",paddingLeft:"5%"},align:"center"},f.a.createElement("span",{className:"dark"===e.theme?"tabledata fc-b1c3e1":"tabledata"},0==t.accountType?"Account":"Contract")),e.state.tableColumns.Balance.isActive&&f.a.createElement(y.a,{className:"w-3",style:{border:"none",paddingLeft:"5%",cursor:"pointer"},align:"center"},f.a.createElement(C.a,{placement:"right",title:R()({})(n)},c>=0||null==c?f.a.createElement("span",{className:"dark"===e.theme?"tabledata fc-b1c3e1":"tabledata"},i):f.a.createElement("span",{className:"dark"===e.theme?"tabledata fc-b1c3e1":"tabledata"},i,".",f.a.createElement("span",{style:{color:"#9FA9BA"}},u),d))),e.state.tableColumns.Percentage.isActive&&f.a.createElement(y.a,{className:"w-2 ".concat(de.PercentageColumnVal),align:"center"},f.a.createElement("span",{className:"dark"===e.theme?"tabledata fc-b1c3e1":"tabledata"},g?f.a.createElement("span",null,p,".",f.a.createElement("span",{style:{color:"#9FA9BA"}},g),"%"):f.a.createElement("span",null,p,"%"))))})))),0==e.state.noData&&f.a.createElement(H,null,f.a.createElement("img",{src:a(776)}),f.a.createElement("div",{className:"dark"===e.theme?"fc-b1c3e1":""},"No data found.")))),f.a.createElement(w.a,{container:!0,style:{marginTop:"28px"},className:"Pagination"},f.a.createElement(w.a,{item:!0,className:"Pagination_1"},!e.state.isLoading&&e.state.noData?f.a.createElement(f.a.Fragment,null,f.a.createElement("span",{className:"dark"===e.theme?"text fc-b1c3e1":"text"},"Show"),f.a.createElement(D.a,{value:e.state.amount,height:30,handler:e._handleChange,theme:e.theme}),f.a.createElement("span",{className:"dark"===e.theme?"text fc-b1c3e1":"text"},"Records")):""),f.a.createElement(w.a,{item:!0,className:"Pagination_2"},f.a.createElement("button",{id:"btn_12",style:{marginLeft:"0px"},onClick:function(t){return e._FirstPage(t)},className:0===e.state.from?"dark"===e.theme?"btn table-btn-bg-dark pagination-btn-dark-border fc-b1c3e1 disabled":"btn disabled":"dark"===e.theme?"btn table-btn-bg-dark pagination-btn-dark-border fc-b1c3e1":"btn"},"First"),f.a.createElement("button",{id:"btn_12",onClick:function(t){return e._PrevPage(t)},className:0===e.state.from?"dark"===e.theme?"btn table-btn-bg-dark pagination-btn-dark-border fc-b1c3e1 disabled":"btn disabled":"dark"===e.theme?"btn table-btn-bg-dark pagination-btn-dark-border fc-b1c3e1":"btn"},f.a.createElement("img",{className:"back-arrow rotate-180",src:"/images/next.svg",alt:"back"})),f.a.createElement("button",{id:"btn_12",className:"dark"===e.theme?"btn table-btn-bg-dark pagination-btn-dark-border fc-b1c3e1":"btn"},"Page"," ",Math.ceil(ue.totalAccounts/ue.amount)-Math.ceil((ue.totalAccounts-ue.from)/ue.amount)+1," ","of ",Math.ceil(ue.totalAccounts/ue.amount)),f.a.createElement("button",{id:"btn_12",onClick:function(t){return e._NextPage(t)},className:e.state.from+e.state.accountList.length===e.state.totalAccounts?"dark"===e.theme?"btn table-btn-bg-dark pagination-btn-dark-border fc-b1c3e1 disabled":"btn disabled":"dark"===e.theme?"btn table-btn-bg-dark pagination-btn-dark-border fc-b1c3e1":"btn"},f.a.createElement("img",{className:"back-arrow",src:"/images/next.svg"})),f.a.createElement("button",{id:"btn_12",onClick:function(t){return e._LastPage(t)},className:e.state.from+e.state.accountList.length===e.state.totalAccounts?"dark"===e.theme?"btn table-btn-bg-dark pagination-btn-dark-border fc-b1c3e1 disabled":"btn disabled":"dark"===e.theme?"btn table-btn-bg-dark pagination-btn-dark-border fc-b1c3e1":"btn"},"Last")))),f.a.createElement(N.a,null))}var V=a(772),$=a(49),G=function(e){Object(m.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).toggleTableColumns=function(e){var t=n.state.tableColumns;t[e].isActive=!t[e].isActive,n.setState({tableColumns:t})},n._handleChange=function(){var e=Object(l.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.setState({amount:t.target.value});case 2:n.getListOfAccounts("balance",n.state.sortOrder);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n._FirstPage=function(){var e=Object(l.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.setState({from:0});case 2:n.getListOfAccounts("balance",n.state.sortOrder);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n._LastPage=function(){var e=Object(l.a)(s.a.mark((function e(t){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=(Math.ceil(n.state.totalAccounts/n.state.amount)-1)*n.state.amount,e.next=3,n.setState({from:a});case 3:n.getListOfAccounts("balance",n.state.sortOrder);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n._NextPage=function(){var e=Object(l.a)(s.a.mark((function e(t){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(+n.state.amount+ +n.state.from<n.state.totalAccounts)){e.next=5;break}return a=+n.state.amount+ +n.state.from,e.next=4,n.setState({from:a});case 4:n.getListOfAccounts("balance",n.state.sortOrder);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n._PrevPage=function(){var e=Object(l.a)(s.a.mark((function e(t){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(n.state.from-n.state.amount>=0)){e.next=5;break}return a=n.state.from-n.state.amount,e.next=4,n.setState({from:a});case 4:n.getListOfAccounts("balance",n.state.sortOrder);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.sortData=function(){var e=Object(l.a)(s.a.mark((function e(t){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=0,n.state.sortKey.includes(t)?(a=-1*n.state.sortOrder,n.setState({sortOrder:a})):n.setState({sortKey:t,sortOrder:-1}),"percentage"===t&&(t="balance"),n.getListOfAccounts([t],a);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.getSortTitle=function(e){return 1===e?"Ascending":"Descending"},n.updateFiltersAndGetAccounts=function(){var e=Object(l.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.setState({searchAndFilters:t});case 2:n.setState({isLoading:!0}),n.getListOfAccounts();case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.state={from:0,amount:10,tableName:"Accounts",accountList:[],totalAccounts:0,totalSupply:0,noData:1,isLoading:!0,sortKey:"",sortType:0,address:0,tableColumns:{Rank:{isActive:!0,toolTipText:"Account\u2019s rank sorted on the basis of Balance."},Type:{isActive:!0,toolTipText:"Account type is either Account, Contract or Token."},Balance:{isActive:!0,toolTipText:"Balance held by a particular account."},Percentage:{isActive:!0,toolTipText:"Percentage of holdings out of the total supply."}},searchAndFilters:{searchQuery:"",type:"",percentage:""}},n}return Object(d.a)(a,[{key:"componentDidMount",value:function(){this.getListOfAccounts(),this.getCoinMarketTotalSupply()}},{key:"getListOfAccounts",value:function(){var e=Object(l.a)(s.a.mark((function e(t,a){var n,r,o,c,l,u,d,m,p;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=this.state.from||0,r=this.state.amount||10,o={skip:n,limit:r,sortKey:t=t||"balance",sortType:a=a||-1},this.state.searchAndFilters.searchQuery&&(o.searchValue=this.state.searchAndFilters.searchQuery,o.searchKeys=["address"]),this.state.searchAndFilters.type&&"-1"!=this.state.searchAndFilters.type&&(o.accountType=this.state.searchAndFilters.type),this.state.searchAndFilters.percentage&&(o.percentage=this.state.searchAndFilters.percentage),e.next=10,L.a.parseResponse(V.a.getAccountList(o));case 10:if(c=e.sent,l=Object(i.a)(c,2),u=l[0],d=l[1],!u){e.next=16;break}return e.abrupt("return");case 16:m=d.accountList,p=d.totalCount,(null===m||void 0===m?void 0:m.length)>0?(this.setState({noData:1}),this.setState({isLoading:!1})):(this.setState({noData:0}),this.setState({isLoading:!1})),this.setState({accountList:m,totalAccounts:p}),this.setState({isLoading:!1});case 20:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"getCoinMarketTotalSupply",value:function(){var e=Object(l.a)(s.a.mark((function e(){var t,a,n,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L.a.parseResponse(V.c.getCoinMarketTotalSupply());case 2:if(t=e.sent,a=Object(i.a)(t,2),n=a[0],r=a[1],!n&&r){e.next=8;break}return e.abrupt("return");case 8:this.setState({totalSupply:r});case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getTotalAccounts",value:function(){var e=Object(l.a)(s.a.mark((function e(){var t,a,n,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L.a.parseResponse(V.a.getTotalAccount());case 2:if(t=e.sent,a=Object(i.a)(t,2),n=a[0],r=a[1],!n&&r){e.next=8;break}return e.abrupt("return");case 8:this.setState({totalAccounts:r});case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"create_data",value:function(e,t,a,n,r,o,i){return{hash:e,amount:t,age:a,block:n,from:r,to:o,txnfee:i}}},{key:"shorten",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:3;return"".concat(e.slice(0,t)).concat(".".repeat(a)).concat(e.slice(e.length-3,e.length))}},{key:"create_url",value:function(e,t){return e&&e.length?"#".concat(e,"-#{type}"):"..."}},{key:"render",value:function(){return f.a.createElement(K,{toggleTableColumns:this.toggleTableColumns,create_data:this.create_data,state:this.state,shorten:this.shorten,create_url:this.create_url,_PrevPage:this._PrevPage,_NextPage:this._NextPage,_LastPage:this._LastPage,_FirstPage:this._FirstPage,_handleChange:this._handleChange,sortData:this.sortData,getSortTitle:this.getSortTitle,updateFiltersAndGetAccounts:this.updateFiltersAndGetAccounts,getListOfAccounts:this.getListOfAccounts,theme:this.props.theme.currentTheme})}}]),a}(b.a);t.default=Object($.b)((function(e){return{user:e.user,theme:e.theme}}),{dispatchAction:L.b})(G)},773:function(e,t,a){"use strict";var n=a(0),r=n.createContext();t.a=r},776:function(e,t,a){e.exports=a.p+"static/media/XDC-Alert.86b69beb.svg"},779:function(e,t){function a(e){if((e=e||{}).negativeType=e.negativeType||("R"===e.negative?"right":"left"),"string"!==typeof e.negativeLeftSymbol)switch(e.negativeType){case"left":e.negativeLeftSymbol="-";break;case"brackets":e.negativeLeftSymbol="(";break;default:e.negativeLeftSymbol=""}if("string"!==typeof e.negativeRightSymbol)switch(e.negativeType){case"right":e.negativeRightSymbol="-";break;case"brackets":e.negativeRightSymbol=")";break;default:e.negativeRightSymbol=""}function t(t,a){if(a=a||{},!t&&0!==t)return"";var n=[],r="-"===(t=""+t).charAt(0);return t=t.replace(/^\-/g,""),e.negativeLeftOut||a.noUnits||n.push(e.prefix),r&&n.push(e.negativeLeftSymbol),e.negativeLeftOut&&!a.noUnits&&n.push(e.prefix),t=t.split("."),null!=e.round&&function(e,t){if(e[1]&&t>=0&&e[1].length>t){var a=e[1].slice(0,t);if(+e[1].substr(t,1)>=5){for(var n="";"0"===a.charAt(0);)n+="0",a=a.substr(1);(a=n+(a=+a+1+"")).length>t&&(e[0]=+e[0]+ +a.charAt(0)+"",a=a.substring(1))}e[1]=a}}(t,e.round),null!=e.truncate&&(t[1]=function(e,t){e&&(e+="");return e&&e.length>t?e.substr(0,t):e}(t[1],e.truncate)),e.padLeft>0&&(t[0]=function(e,t){e+="";var a=[];for(;a.length+e.length<t;)a.push("0");return a.join("")+e}(t[0],e.padLeft)),e.padRight>0&&(t[1]=function(e,t){e?e+="":e="";var a=[];for(;a.length+e.length<t;)a.push("0");return e+a.join("")}(t[1],e.padRight)),!a.noSeparator&&t[1]&&(t[1]=function(e,t){if(e+="",!t)return e;var a=/(\d{3})(\d+)/;for(;a.test(e);)e=e.replace(a,"$1"+t+"$2");return e}(t[1],e.decimalsSeparator)),!a.noSeparator&&t[0]&&(t[0]=function(e,t){if(e+="",!t)return e;var a=/(\d+)(\d{3})/;for(;a.test(e);)e=e.replace(a,"$1"+t+"$2");return e}(t[0],e.integerSeparator)),n.push(t[0]),t[1]&&(n.push(e.decimal),n.push(t[1])),e.negativeRightOut&&!a.noUnits&&n.push(e.suffix),r&&n.push(e.negativeRightSymbol),e.negativeRightOut||a.noUnits||n.push(e.suffix),n.join("")}function a(t,a){a=a||[],e.allowedSeparators&&e.allowedSeparators.forEach((function(e){a.push(e)})),a.push(e.integerSeparator),a.push(e.decimalsSeparator);var n=t=(t=t.replace(e.prefix,"")).replace(e.suffix,"");do{t=n;for(var r=0;r<a.length;r++)n=n.replace(a[r],"")}while(n!=t);return t}return"boolean"!==typeof e.negativeLeftOut&&(e.negativeLeftOut=!1!==e.negativeOut),"boolean"!==typeof e.negativeRightOut&&(e.negativeRightOut=!1!==e.negativeOut),e.prefix=e.prefix||"",e.suffix=e.suffix||"","string"!==typeof e.integerSeparator&&(e.integerSeparator="string"===typeof e.separator?e.separator:","),e.decimalsSeparator="string"===typeof e.decimalsSeparator?e.decimalsSeparator:"",e.decimal=e.decimal||".",e.padLeft=e.padLeft||-1,e.padRight=e.padRight||-1,t.negative=e.negative,t.negativeOut=e.negativeOut,t.negativeType=e.negativeType,t.negativeLeftOut=e.negativeLeftOut,t.negativeLeftSymbol=e.negativeLeftSymbol,t.negativeRightOut=e.negativeRightOut,t.negativeRightSymbol=e.negativeRightSymbol,t.prefix=e.prefix,t.suffix=e.suffix,t.separate=e.separate,t.integerSeparator=e.integerSeparator,t.decimalsSeparator=e.decimalsSeparator,t.decimal=e.decimal,t.padLeft=e.padLeft,t.padRight=e.padRight,t.truncate=e.truncate,t.round=e.round,t.unformat=a,t}e.exports=a,e.exports.default=a},781:function(e,t,a){"use strict";var n=a(0),r=n.createContext();t.a=r},787:function(e,t,a){"use strict";var n,r,o=a(21),i=a(757),c=a(759),s=a(24),l=a(0),u=a.n(l),d=a(681),m=Object(d.a)({dropdownStyle:{background:"#283966 !important",color:"#ffffff !important"}}),p=Object(s.default)(i.a)(n||(n=Object(o.a)(["\n  width: 100%;\n  height: ","px;\n  margin: 0 10px;\n\n  legend {\n    float: left;\n  }\n"])),(function(e){return e.height})),g=Object(s.default)(i.a)(r||(r=Object(o.a)(["\n  width: 100%;\n  height: ","px;\n  margin: 0 10px;\n  background-color: #283966;\n  border: solid 1px #3552a5;\n  legend {\n    float: left;\n  }\n"])),(function(e){return e.height}));t.a=function(e){var t=e.value,a=e.handler,n=e.height,r=void 0===n?35:n,o=e.theme,i=m();return u.a.createElement(u.a.Fragment,null,"dark"===o?u.a.createElement(g,{value:t,onChange:function(e){return a(e)},displayEmpty:!0,height:r,MenuProps:{classes:{paper:i.dropdownStyle}}},u.a.createElement(c.a,{disabled:!0,value:""},u.a.createElement("em",null,"Select")),u.a.createElement(c.a,{value:10},"10"),u.a.createElement(c.a,{value:25},"25"),u.a.createElement(c.a,{value:50},"50"),u.a.createElement(c.a,{value:75},"75"),u.a.createElement(c.a,{value:100},"100")):u.a.createElement(p,{value:t,onChange:function(e){return a(e)},displayEmpty:!0,height:r},u.a.createElement(c.a,{disabled:!0,value:""},u.a.createElement("em",null,"Select")),u.a.createElement(c.a,{value:10},"10"),u.a.createElement(c.a,{value:25},"25"),u.a.createElement(c.a,{value:50},"50"),u.a.createElement(c.a,{value:75},"75"),u.a.createElement(c.a,{value:100},"100")))}},840:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(686),i=a(406),c=a(196),s=Object(c.a)((function(e){return{paperWidthSm:{maxWidth:"320px",width:"100%",borderRadius:"8px"}}}));t.a=function(e){var t=s();return r.a.createElement(o.a,{classes:{paperWidthSm:t.paperWidthSm},open:e.isOpen,anchorEl:e.anchorEl,onClose:e.handleOnClose,anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"right"}},r.a.createElement("div",{className:"dark"===e.theme?"w-320 table-btn-bg-dark":"w-320"},r.a.createElement("div",{className:"dark"===e.theme?"fs-16 fw-bold p-t-15 p-b-15 display-flex justify-content-center fc-white":"fs-16 fw-bold p-t-15 p-b-15 display-flex justify-content-center"},"Configure Columns"),r.a.createElement("div",{className:"margin-0 m-b-15 b-t-1"}),r.a.createElement("div",{className:"p-l-15 p-r-15"},e.tableColumns&&Object.keys(e.tableColumns).map((function(t){if("Balance"!==t)return r.a.createElement("div",{className:"display-flex justify-content-between p-b-25"},r.a.createElement("div",{className:"display-flex"},r.a.createElement(i.a,{align:"right",title:e.tableColumns[t].toolTipText},r.a.createElement("img",{className:"tooltipInfoIconConfigDesk",src:"/images/info.svg"})),r.a.createElement("div",{className:"dark"===e.theme?"p-l-5 fc-white":"p-l-5"},t)),r.a.createElement("div",{onClick:function(){return e.toggleTableColumns(t)}},e.tableColumns[t].isActive?r.a.createElement("img",{className:"",src:"/images/active-switch.svg"}):r.a.createElement("img",{className:"",src:"/images/inactive-switch.svg"})))})))))}},841:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(400),i=a(406),c=a(196),s=Object(c.a)((function(e){return{paperWidthSm:{maxWidth:"320px",width:"100%",borderRadius:"8px",margin:"20px"}}}));t.a=function(e){var t=s();return r.a.createElement(o.a,{className:"",classes:{paperWidthSm:t.paperWidthSm},open:e.isOpen,onClose:e.onModalClose,"aria-labelledby":"form-dialog-title"},r.a.createElement("div",{className:"dark"===e.theme?"w-320 table-btn-bg-dark":"w-320"},r.a.createElement("div",{className:e.theme?"fs-14 fw-bold p-t-15 p-b-15 display-flex justify-content-center fc-white":"fs-14 fw-bold p-t-15 p-b-15 display-flex justify-content-center"},"Configure Columns"),r.a.createElement("div",{className:"margin-0 m-b-15 b-t-1"}),r.a.createElement("div",{className:"p-l-15 p-r-15"},e.tableColumns&&Object.keys(e.tableColumns).map((function(t){if("Balance"!==t)return r.a.createElement("div",{className:"display-flex justify-content-between p-b-25"},r.a.createElement("div",{className:"display-flex"},r.a.createElement(i.a,{align:"right",title:e.tableColumns[t].toolTipText},r.a.createElement("img",{className:"tooltipInfoIconConfigMob",src:"/images/info.svg"})),r.a.createElement("div",{className:e.theme?"p-l-12 fc-white":"p-l-12"},t)),r.a.createElement("div",{onClick:function(){return e.toggleTableColumns(t)}},e.tableColumns[t].isActive?r.a.createElement("img",{className:"",src:"/images/active-switch.svg"}):r.a.createElement("img",{className:"",src:"/images/inactive-switch.svg"})))})))))}},846:function(e,t,a){"use strict";var n=a(14),r=a(1),o=a(0),i=(a(2),a(3)),c=a(23),s=a(781),l=o.forwardRef((function(e,t){var a=e.classes,c=e.className,l=e.component,u=void 0===l?"table":l,d=e.padding,m=void 0===d?"normal":d,p=e.size,g=void 0===p?"medium":p,f=e.stickyHeader,b=void 0!==f&&f,h=Object(n.a)(e,["classes","className","component","padding","size","stickyHeader"]),v=o.useMemo((function(){return{padding:m,size:g,stickyHeader:b}}),[m,g,b]);return o.createElement(s.a.Provider,{value:v},o.createElement(u,Object(r.a)({role:"table"===u?null:"table",ref:t,className:Object(i.a)(a.root,c,b&&a.stickyHeader)},h)))}));t.a=Object(c.a)((function(e){return{root:{display:"table",width:"100%",borderCollapse:"collapse",borderSpacing:0,"& caption":Object(r.a)({},e.typography.body2,{padding:e.spacing(2),color:e.palette.text.secondary,textAlign:"left",captionSide:"bottom"})},stickyHeader:{borderCollapse:"separate"}}}),{name:"MuiTable"})(l)},876:function(e,t,a){"use strict";var n=a(1),r=a(14),o=a(0),i=(a(2),a(3)),c=a(23),s=a(773),l=a(72),u=o.forwardRef((function(e,t){var a=e.classes,c=e.className,l=e.component,u=void 0===l?"tr":l,d=e.hover,m=void 0!==d&&d,p=e.selected,g=void 0!==p&&p,f=Object(r.a)(e,["classes","className","component","hover","selected"]),b=o.useContext(s.a);return o.createElement(u,Object(n.a)({ref:t,className:Object(i.a)(a.root,c,b&&{head:a.head,footer:a.footer}[b.variant],m&&a.hover,g&&a.selected),role:"tr"===u?null:"row"},f))}));t.a=Object(c.a)((function(e){return{root:{color:"inherit",display:"table-row",verticalAlign:"middle",outline:0,"&$hover:hover":{backgroundColor:e.palette.action.hover},"&$selected, &$selected:hover":{backgroundColor:Object(l.a)(e.palette.secondary.main,e.palette.action.selectedOpacity)}},selected:{},hover:{},head:{},footer:{}}}),{name:"MuiTableRow"})(u)},877:function(e,t,a){"use strict";var n=a(1),r=a(14),o=a(0),i=(a(2),a(3)),c=a(23),s=o.forwardRef((function(e,t){var a=e.classes,c=e.className,s=e.component,l=void 0===s?"div":s,u=Object(r.a)(e,["classes","className","component"]);return o.createElement(l,Object(n.a)({ref:t,className:Object(i.a)(a.root,c)},u))}));t.a=Object(c.a)({root:{width:"100%",overflowX:"auto"}},{name:"MuiTableContainer"})(s)},878:function(e,t,a){"use strict";var n=a(1),r=a(14),o=a(0),i=(a(2),a(3)),c=a(23),s=a(773),l={variant:"head"},u=o.forwardRef((function(e,t){var a=e.classes,c=e.className,u=e.component,d=void 0===u?"thead":u,m=Object(r.a)(e,["classes","className","component"]);return o.createElement(s.a.Provider,{value:l},o.createElement(d,Object(n.a)({className:Object(i.a)(a.root,c),ref:t,role:"thead"===d?null:"rowgroup"},m)))}));t.a=Object(c.a)({root:{display:"table-header-group"}},{name:"MuiTableHead"})(u)},879:function(e,t,a){"use strict";var n=a(14),r=a(1),o=a(0),i=(a(2),a(3)),c=a(23),s=a(30),l=a(72),u=a(781),d=a(773),m=o.forwardRef((function(e,t){var a,c,l=e.align,m=void 0===l?"inherit":l,p=e.classes,g=e.className,f=e.component,b=e.padding,h=e.scope,v=e.size,x=e.sortDirection,y=e.variant,k=Object(n.a)(e,["align","classes","className","component","padding","scope","size","sortDirection","variant"]),E=o.useContext(u.a),O=o.useContext(d.a),w=O&&"head"===O.variant;f?(c=f,a=w?"columnheader":"cell"):c=w?"th":"td";var C=h;!C&&w&&(C="col");var A=b||(E&&E.padding?E.padding:"normal"),N=v||(E&&E.size?E.size:"medium"),S=y||O&&O.variant,j=null;return x&&(j="asc"===x?"ascending":"descending"),o.createElement(c,Object(r.a)({ref:t,className:Object(i.a)(p.root,p[S],g,"inherit"!==m&&p["align".concat(Object(s.a)(m))],"normal"!==A&&p["padding".concat(Object(s.a)(A))],"medium"!==N&&p["size".concat(Object(s.a)(N))],"head"===S&&E&&E.stickyHeader&&p.stickyHeader),"aria-sort":j,role:a,scope:C},k))}));t.a=Object(c.a)((function(e){return{root:Object(r.a)({},e.typography.body2,{display:"table-cell",verticalAlign:"inherit",borderBottom:"1px solid\n    ".concat("light"===e.palette.type?Object(l.d)(Object(l.a)(e.palette.divider,1),.88):Object(l.b)(Object(l.a)(e.palette.divider,1),.68)),textAlign:"left",padding:16}),head:{color:e.palette.text.primary,lineHeight:e.typography.pxToRem(24),fontWeight:e.typography.fontWeightMedium},body:{color:e.palette.text.primary},footer:{color:e.palette.text.secondary,lineHeight:e.typography.pxToRem(21),fontSize:e.typography.pxToRem(12)},sizeSmall:{padding:"6px 24px 6px 16px","&:last-child":{paddingRight:16},"&$paddingCheckbox":{width:24,padding:"0 12px 0 16px","&:last-child":{paddingLeft:12,paddingRight:16},"& > *":{padding:0}}},paddingCheckbox:{width:48,padding:"0 0 0 4px","&:last-child":{paddingLeft:0,paddingRight:4}},paddingNone:{padding:0,"&:last-child":{padding:0}},alignLeft:{textAlign:"left"},alignCenter:{textAlign:"center"},alignRight:{textAlign:"right",flexDirection:"row-reverse"},alignJustify:{textAlign:"justify"},stickyHeader:{position:"sticky",top:0,left:0,zIndex:2,backgroundColor:e.palette.background.default}}}),{name:"MuiTableCell"})(m)},880:function(e,t,a){"use strict";var n=a(1),r=a(14),o=a(0),i=(a(2),a(3)),c=a(23),s=a(773),l={variant:"body"},u=o.forwardRef((function(e,t){var a=e.classes,c=e.className,u=e.component,d=void 0===u?"tbody":u,m=Object(r.a)(e,["classes","className","component"]);return o.createElement(s.a.Provider,{value:l},o.createElement(d,Object(n.a)({className:Object(i.a)(a.root,c),ref:t,role:"tbody"===d?null:"rowgroup"},m)))}));t.a=Object(c.a)({root:{display:"table-row-group"}},{name:"MuiTableBody"})(u)},971:function(e,t,a){"use strict";var n,r,o,i,c=a(10),s=a(21),l=a(0),u=a.n(l),d=a(24),m=d.default.div(n||(n=Object(s.a)(["\n  margin-right: 10px;\n  @media (max-width: 767px) {\n    min-width: 100%;\n    margin-left: 0;\n    margin-top: 4px;\n    margin-bottom: 4px;\n  }\n"]))),p=d.default.div(r||(r=Object(s.a)(["\n  display: flex;\n  width: 100%;\n  flex-direction: row;\n  justify-content: space-between;\n  border-radius: 8px;\n  cursor: pointer;\n  border: solid 1px #e3e7eb;\n  background: white;\n  padding: 7px 10px;\n  ","\n\n  img {\n    width: 11px;\n    margin-left: 8px\n  }\n\n"])),(function(e){return"dark"===e.theme&&"\n    background: transparent;\n    border: solid 1px #3552a5;\n  "})),g=d.default.div(o||(o=Object(s.a)(["\n  display: flex;\n  flex-direction: row;\n  font-size: 15px;\n  font-weight: 500;\n  color: #585858;\n  gap: 25px;\n  ","\n\n  span {\n    font-weight: 600;\n    color: #252525;\n  }\n"])),(function(e){return"dark"===e.theme&&"\n    color: #b1c3e1;\n  "})),f=d.default.div(i||(i=Object(s.a)(["\n  display: flex;\n  flex-direction: column;\n  position: absolute;\n  z-index: 2;\n  overflow-y: scroll;\n  background-color: white;\n  max-height: 250px;\n  margin-top: 3px;\n  border-radius: 4px;\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);\n  border: solid 1px #d4d4d4;\n  min-width: ","px;\n\n  span {\n    padding: 8px;\n    cursor: pointer;\n\n    :hover {\n      background-color: #F9F9F9;\n    }\n  }\n"])),(function(e){return e.containerWidth}));t.a=function(e){var t=e.name,a=e.options,n=e.onSelect,r=e.selectedOption,o=Object(l.useState)(!1),i=Object(c.a)(o,2),s=i[0],d=i[1],b=Object(l.useRef)(null),h=a?a.find((function(e){return e.key===r})):null,v=function(e){b.current&&!b.current.contains(e.target)&&d(!1)};return Object(l.useEffect)((function(){return document.addEventListener("click",v,!0),function(){document.removeEventListener("click",v,!0)}}),[]),u.a.createElement(m,{ref:b},u.a.createElement(p,{theme:e.theme,onClick:function(){d(!s)}},u.a.createElement(g,{theme:e.theme},u.a.createElement("span",{className:"dark"===e.theme?"fc-b1c3e1":""},t||"Filter"),r?h.name||h.value:"All"),u.a.createElement("img",{className:"dark"===e.theme?"white-dropdown-arrow m-t-8":"",src:"dark"===e.theme?"/images/Dropdown.svg":"/images/dropdown-arrow.svg"})),s&&u.a.createElement(f,{containerWidth:b.current.clientWidth},null===a||void 0===a?void 0:a.map((function(e,t){return u.a.createElement("span",{className:"custom-dropdown-option",key:t,onClick:function(){return t=e.key,n(t),void d(!1);var t}},e.value)}))))}}}]);
//# sourceMappingURL=21.a8daf37a.chunk.js.map