/* Editable 20-slide PowerPoint, carefully matched to the HTML presentation.
   All text, cards, lines and DFD nodes are native PowerPoint objects. */
const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');
const pptx = new pptxgen();
pptx.layout='LAYOUT_WIDE';pptx.author='Software Engineering Visual Guide';pptx.subject='DFD, Extreme Programming, Scrum and XP principles';pptx.title='Software Engineering · Visual Guide';pptx.company='Educational presentation';pptx.lang='en-US';
pptx.theme={headFontFace:'Inter',bodyFontFace:'Inter',lang:'en-US'};
const S=pptx.ShapeType;const C={navy:'0B1425',navy2:'132638',deep:'07111F',paper:'F6F8F6',white:'FFFFFF',ink:'17283A',muted:'627784',border:'DCE7E6',teal:'117D79',teal2:'16A69B',tealLite:'E8F3EE',lime:'C6F36E',gold:'B8843F',goldLite:'F8EFE0',blue:'517D95',blueLite:'EAF2F7'};
const N=20;
function box(sl,x,y,w,h,fill=C.white,line=C.border,r=0.14,opacity=0){sl.addShape(r===0?S.rect:S.roundRect,{x,y,w,h,rectRadius:r,fill:{color:fill,transparency:opacity},line:{color:line,transparency:line===fill?100:0,width:.75},radius:r});}
function text(sl,t,x,y,w,h,opts={}){sl.addText(t,{x,y,w,h,margin:0,breakLine:false,fontFace:'Inter',fontSize:opts.size||16,bold:opts.bold||false,color:opts.color||C.ink,align:opts.align||'left',valign:opts.valign||'mid',fit:'shrink',lineSpacingMultiple:1.1, ...opts});}
function line(sl,x1,y1,x2,y2,color=C.teal,width=2.1,arrow='none',dash){const o={x:x1,y:y1,w:x2-x1,h:y2-y1,line:{color,width}};if(arrow==='end')o.line.endArrowType='triangle';if(arrow==='begin')o.line.beginArrowType='triangle';if(dash)o.line.dashType='dash';sl.addShape(S.line,o);}
function circle(sl,x,y,d,fill,lineColor=fill){sl.addShape(S.ellipse,{x,y,w:d,h:d,fill:{color:fill},line:{color:lineColor,width:1}})}
function shadow(sl,x,y,w,h){box(sl,x+.035,y+.06,w,h,'DFE6E4','DFE6E4',.14)}
function smallTag(sl,s,x=.83,y=.75,color=C.teal){line(sl,x,y+.11,x+.25,y+.11,color,2.8);text(sl,s.toUpperCase(),x+.39,y,8,.28,{size:10,bold:true,color,charSpacing:1.2})}
function title(sl,t,em='',size=32){if(!em){text(sl,t,.83,1.07,11.7,.67,{size,bold:true});return}
 const runs=[{text:t,options:{bold:true,color:C.ink}},{text:em,options:{bold:true,color:C.teal}}];text(sl,runs,.83,1.04,11.7,.72,{size});}
function under(sl,t,y=1.8){text(sl,t,.83,y,11.7,.36,{size:15.4,color:C.muted});}
function bar(sl,s){box(sl,.83,6.65,11.65,.42,'EAF4EF','D6E7DE',.12);box(sl,1.01,6.73,.04,.25,C.teal,C.teal,0);text(sl,s,1.2,6.74,10.9,.23,{size:11.3,color:'365B56'});}
function base(ch,idx,{dark=false,tag='',notes=''}={}){const sl=pptx.addSlide();sl.background={color:dark?C.navy:C.paper};
 // muted top chrome + 4-square emblem
 const lm=dark?'E8F1EE':C.ink;
 for(let r=0;r<2;r++)for(let c=0;c<2;c++)box(sl,.53+c*.105,.38+r*.105,.08,.08,C.lime,C.lime,0,r===c?0:40);
 text(sl,'SE  /  VISUAL GUIDE',.83,.36,3,.25,{size:9.5,bold:true,color:dark?'D5E8E6':C.ink,charSpacing:.8});
 text(sl,ch.toUpperCase(),7.5,.36,4.2,.25,{size:8.9,bold:true,color:dark?'9CC0BF':C.muted,align:'right',charSpacing:1});
 text(sl,String(idx).padStart(2,'0')+' / '+N,12.04,.36,.58,.25,{size:9.2,bold:true,color:dark?'A3C6BD':C.muted,align:'right'});
 // quiet progress line
 box(sl,.53,7.21,11.9,.025,dark?'334356':'D9E4E1',dark?'334356':'D9E4E1',0);
 box(sl,.53,7.21,11.9*(idx/N),.025,C.lime,C.lime,0);
 if(notes){sl.addNotes(notes)}
 return sl;
}
function card(sl,x,y,w,h,{fill=C.white,border=C.border,round=.14}={}){box(sl,x,y,w,h,fill,border,round)}
function topCard(sl,x,y,w,n,titleS,body){card(sl,x,y,w,2.05);text(sl,n,x+.2,y+.18,w-.4,.24,{size:10,bold:true,color:C.teal});text(sl,titleS,x+.2,y+.66,w-.4,.34,{size:17.8,bold:true});text(sl,body,x+.2,y+1.14,w-.4,.62,{size:12.4,color:C.muted});}
function chapter(sl,num,title1,title2,desc,example){
 text(sl,num,.83,.92,4,.28,{size:11,bold:true,color:'A6D0C8',charSpacing:1.5});
 text(sl,title1,.82,1.9,6.6,.75,{size:46,bold:true,color:C.white});
 text(sl,title2,.82,2.68,6.6,.76,{size:46,bold:true,color:C.lime});
 text(sl,desc,.83,3.75,5.8,1.25,{size:17,color:'B9CAD1',breakLine:false});
 box(sl,.83,5.52,5.9,.79,C.navy2,'416061',.14);
 box(sl,.83,5.52,.05,.79,C.lime,C.lime,0);
 text(sl,'LAB EXAMPLE',1.04,5.63,2,.22,{size:9.7,bold:true,color:'9FC4BA',charSpacing:1});
 text(sl,example,1.04,5.91,5.45,.29,{size:12.2,bold:true,color:'E9F6F0'});
}
// native DFD drawing helpers in SVG-inspired reference coord system
const map=(x,y)=>({x:.96+x/1120*11.44,y:2.39+y/450*3.76});
function dEntity(sl,x,y,w,h,label){let a=map(x,y),b=map(x+w,y+h);box(sl,a.x,a.y,b.x-a.x,b.y-a.y,C.blueLite,'5A89A1',.035);text(sl,label,a.x+.02,a.y+.06,b.x-a.x-.04,b.y-a.y-.12,{size:Math.min(15,14*w/170),bold:true,color:'285469',align:'center'});}
function dProcess(sl,x,y,w,h,label){let a=map(x,y),b=map(x+w,y+h);box(sl,a.x,a.y,b.x-a.x,b.y-a.y,'E2F1EA',C.teal,.28);text(sl,label,a.x+.06,a.y+.06,b.x-a.x-.12,b.y-a.y-.12,{size:w>250?15.5:13.3,bold:true,color:'11685F',align:'center'});}
function dStore(sl,x,y,w,h,label){let a=map(x,y),b=map(x+w,y+h);line(sl,a.x,a.y,b.x,a.y,C.gold,1.9);line(sl,a.x,b.y,b.x,b.y,C.gold,1.9);line(sl,a.x,a.y,a.x,b.y,C.gold,1.9);text(sl,label,a.x+.10,a.y+.08,b.x-a.x-.2,b.y-a.y-.14,{size:12.6,bold:true,color:'805D2F',align:'center'});}
function dEdge(sl,pts,label,lx,ly){for(let i=1;i<pts.length;i++){const a=map(...pts[i-1]),b=map(...pts[i]);let opts='none';if(i===pts.length-1)opts='end'; if(b.x<a.x || b.y<a.y){ // supports reverse lines, use begin arrow on normalized direction
   if(i===pts.length-1){line(sl,b.x,b.y,a.x,a.y,C.teal,1.8,'begin')}else line(sl,b.x,b.y,a.x,a.y,C.teal,1.8);
  } else line(sl,a.x,a.y,b.x,b.y,C.teal,1.8,opts);
 }
 if(label){let a=map(lx,ly);text(sl,label,a.x-.77,a.y-.09,1.54,.24,{size:10.3,bold:true,color:'426778',align:'center',fill:{color:C.white,transparency:2}})}
}
function dPanel(sl){box(sl,.83,2.2,11.68,3.98,'FFFFFF','DAE6E5',.15)}
function pNote(sl,t){text(sl,t,.92,6.25,11.4,.36,{size:11.5,color:'6A838C',align:'center'});}

// 01 — Hero
{
 const sl=base('WELCOME',1,{dark:true,notes:'Introduce the four subjects. One fictional lab management system will connect all the examples.'});
 text(sl,'SOFTWARE ENGINEERING / VISUAL GUIDE',.85,1.36,5.4,.24,{size:10.8,bold:true,color:'A0C9BE',charSpacing:1});
 text(sl,'Understand the flow.',.83,2.1,7.55,.79,{size:44,bold:true,color:C.white});
 text(sl,'Build with care.',.83,2.93,7.55,.81,{size:44,bold:true,color:C.lime});
 text(sl,'Data flow diagrams, Extreme Programming, Scrum and the principles behind XP—explained through one small lab system.',.86,4.15,6.25,.98,{size:17,color:'BCD0D1'});
 [['01','DFD'],['02','XP'],['03','SCRUM'],['04','PRINCIPLES']].forEach(([n,x],i)=>{box(sl,.87+i*1.36,5.66,1.2,.42,'15283B','345663',.16);text(sl,n+' '+x,.89+i*1.36,5.74,1.17,.17,{size:9.5,color:'C6D9D3',bold:true,align:'center'});});
 // circular branded focal point, native editable rings
 for(let d=0;d<3;d++){sl.addShape(S.ellipse,{x:9.05+d*.47,y:1.36+d*.47,w:3.3-d*.94,h:3.3-d*.94,line:{color:d===2?'668F6E':'376269',width:1.1,dash:d===0?'dash':'solid'},fill:{color:C.navy,transparency:100}})}
 circle(sl,9.96,2.32,1.55,C.lime);text(sl,'SE',10.15,2.70,1.19,.58,{size:42,bold:true,color:'183B2B',align:'center'});
 [['DFD',8.94,2],['XP',12.15,2.2],['SCRUM',11.6,5.1],['14 PRINCIPLES',8.93,5.0]].forEach(([t,x,y])=>{box(sl,x,y,1.25,.42,C.navy2,'476469',.12);text(sl,t,x,y+.08,1.25,.25,{size:9,bold:true,color:'CFEBDF',align:'center'})});
 text(sl,'Fundamentals first  /  simple examples  /  clear diagrams',.85,6.7,8,.3,{size:11.8,color:'9BAEB2'});
}
// 02 - lab story
{
const sl=base('THE EXAMPLE',2,{notes:'All later examples follow the imaginary lab report from registration to result delivery.'});smallTag(sl,'Our shared example');title(sl,'A lab report, from start to finish.');under(sl,'A simple system registers patients, records test results and delivers reports.');
 const items=[['01','Register','Receptionist saves patient details.'],['02','Request','Receptionist creates a test order.'],['03','Test','Technician enters the results.'],['04','Report','Patient receives the report.']];
 items.forEach((it,i)=>{let x=.83+i*3.08;card(sl,x,2.75,2.65,2.85);text(sl,it[0],x+.22,3.02,1,.23,{size:11,bold:true,color:'8A999F'});box(sl,x+.22,3.44,.72,.68,i%2===0?'E5F3EA':'FFF0D8',i%2===0?'E5F3EA':'FFF0D8',.13);text(sl,['ID','LAB','✓','PDF'][i],x+.24,3.61,.68,.3,{size:i===3?16:17,bold:true,color:i%2===0?'287B69':'9C7432',align:'center'});text(sl,it[1],x+.22,4.32,2.17,.4,{size:19,bold:true});text(sl,it[2],x+.22,4.92,2.2,.49,{size:13,color:C.muted});if(i<3)text(sl,'→',x+2.7,3.79,.3,.4,{size:28,color:'73A49B',align:'center'})});
 bar(sl,'One example explains what a DFD shows, what XP builds, and how Scrum organizes delivery.');
}
// 03 DFD definition
{
const sl=base('DATA FLOW DIAGRAMS',3,{notes:'DFD shows the movement of data, not interface elements or algorithms.'});smallTag(sl,'01 / Data flow diagrams');title(sl,'A picture of how ','data moves.');
 text(sl,'A Data Flow Diagram (DFD) shows where information comes from, how it is processed, where it is stored, and where it goes.',.83,2.0,5.5,1.13,{size:18,color:'516A76'});
 box(sl,.85,3.55,5.24,.56,C.white,'D9E5E2',.08);text(sl,'Shows:  Data movement and processing',1.01,3.72,4.95,.25,{size:12.8,color:C.ink,bold:true});
 box(sl,.85,4.27,5.24,.56,C.white,'D9E5E2',.08);text(sl,'Does not show:  screen design or code',1.01,4.44,4.95,.25,{size:12.6,color:C.muted,bold:true});
 card(sl,6.55,1.95,5.85,3.98);text(sl,'One simple data flow',6.83,2.25,5.2,.32,{size:16.8,bold:true});
 // aligned entity -> process -> store
  // For this card map coordinates are global so replace with local direct
 // cover diagram above with a white card subpanel, and add neatly positioned native shapes
 box(sl,6.73,2.87,5.49,1.75,'FFFFFF','FFFFFF',0);
 box(sl,6.86,3.3,1.42,.65,C.blueLite,'5B8BA2',.04);text(sl,'Receptionist',6.91,3.48,1.32,.2,{size:12.2,bold:true,color:'305870',align:'center'});
 line(sl,8.29,3.62,8.63,3.62,C.teal,1.6,'end');
 box(sl,8.68,3.27,1.58,.72,'E4F3EA',C.teal,.24);text(sl,'Register',8.75,3.50,1.44,.22,{size:12.4,bold:true,color:'116A5E',align:'center'});
 line(sl,10.28,3.62,10.57,3.62,C.teal,1.6,'end');
 dStoreCard(sl,10.68,3.34,1.39,.55,'D1 Patients');
 text(sl,'patient details',8.08,3.01,1.2,.24,{size:10,color:C.muted,align:'center'});text(sl,'saved record',10.12,3.01,1.15,.24,{size:10,color:C.muted,align:'center'});
 text(sl,'Information moves left → right through labeled arrows.',6.88,5.20,4.99,.4,{size:12,color:C.muted});
}
function dStoreCard(sl,x,y,w,h,t){line(sl,x,y,x+w,y,C.gold,1.7);line(sl,x,y+h,x+w,y+h,C.gold,1.7);line(sl,x,y,x,y+h,C.gold,1.7);text(sl,t,x+.08,y+.16,w-.16,.22,{size:11.4,bold:true,color:'8A652C',align:'center'});}
// 04 DFD symbols
{
const sl=base('DATA FLOW DIAGRAMS',4,{notes:'The symbols have different meanings: external entity, process, data store and data flow.'});smallTag(sl,'Learn the notation');title(sl,'Each DFD shape has ','one job.');
 const data=[['01','External entity','A person or outside system that sends or receives data.','Receptionist'],['02','Process','An action that handles or changes information.','Register Patient'],['03','Data store','Saved information that a process can use later.','D1 Patients'],['04','Data flow','A labeled arrow showing moving information.','Patient details']];
 data.forEach((a,i)=>{let x=.83+(i%2)*6.05,y=2.05+Math.floor(i/2)*2.18;card(sl,x,y,5.68,1.98);let fx=x+.18,fy=y+.36;box(sl,fx,fy,1.34,1.14,i===0?'EAF3F7':i===1?'E7F5ED':i===2?'F9F0DE':'EDF2F8','FFFFFF',.13);
 if(i===0)box(sl,fx+.28,fy+.37,.8,.41,'EAF3F7','5A8BA0',.02);
 if(i===1)box(sl,fx+.21,fy+.32,.9,.47,'E7F5ED',C.teal,.23);
 if(i===2)dStoreCard(sl,fx+.25,fy+.29,.86,.5,'');
 if(i===3)line(sl,fx+.23,fy+.55,fx+1.09,fy+.55,C.blue,2.2,'end');
 text(sl,a[0]+' / '+a[1].toUpperCase(),x+1.77,y+.26,3.5,.27,{size:10.5,bold:true,color:C.teal,charSpacing:.5});
 text(sl,a[1],x+1.77,y+.62,3.56,.31,{size:18.5,bold:true});
 text(sl,a[2],x+1.77,y+1.07,3.56,.43,{size:12.9,color:C.muted});
 text(sl,'Example: '+a[3],x+1.77,y+1.58,3.56,.20,{size:11,color:C.teal,bold:true});
 });
}
// 05 Context
{
 const sl=base('DATA FLOW DIAGRAMS',5,{notes:'One process represents the whole system. Three external entities exchange clearly labeled data with it.'});smallTag(sl,'Context / the big picture');title(sl,'Show the whole system ','as one process.');under(sl,'The context diagram shows the system boundary and the people outside it.');dPanel(sl);
 dEdge(sl,[[248,169],[397,169]],'patient details',330,136);
 dEdge(sl,[[720,147],[880,147]],'test worklist',806,116);
 dEdge(sl,[[893,217],[734,217]],'test results',807,249);
 dEdge(sl,[[720,300],[877,344]],'completed report',838,300);
 dEntity(sl,48,127,200,90,'Receptionist');dProcess(sl,410,127,310,190,'0. Lab Management System');dEntity(sl,893,105,194,90,'Lab Technician');dEntity(sl,893,316,194,90,'Patient');
 pNote(sl,'1 central process     /     3 external entities     /     labeled data flows');
}
// 06 Level 0
{
 const sl=base('DATA FLOW DIAGRAMS',6,{notes:'The context diagram is decomposed into three major processes. External entities must interact with processes rather than directly with stores.'});smallTag(sl,'DFD / one level deeper');title(sl,'Break the system into ','major processes.');under(sl,'Three core activities and the records they use.');dPanel(sl);
 const E=[[[190,128],[241,128]],[[452,128],[488,128]],[[704,128],[738,128]],[[954,128],[998,128]],[[344,180],[344,267]],[[604,180],[604,267]],[[854,180],[854,267]],[[1055,356],[1055,240],[966,240],[966,192]]];
 const labels=[['details',218,58],['patient ID',476,58],['test order',728,58],['report',986,58],['patient',386,245],['order',647,245],['results',900,245],['test results',1068,228]];
 E.forEach((e,i)=>dEdge(sl,e,...labels[i]));
 dEntity(sl,28,91,162,78,'Receptionist');dProcess(sl,252,78,200,102,'1.0 Register');dProcess(sl,500,78,204,102,'2.0 Create Order');dProcess(sl,750,78,204,102,'3.0 Prepare Report');dEntity(sl,1010,91,92,78,'Patient');
 dStore(sl,249,280,192,68,'D1 Patients');dStore(sl,510,280,190,68,'D2 Orders');dStore(sl,760,280,190,68,'D3 Results');dEntity(sl,977,356,125,78,'Technician');
 bar(sl,'Rule: an external entity exchanges information with a process—not directly with a data store.');
}
// 07 Level1
{
 const sl=base('DATA FLOW DIAGRAMS',7,{notes:'Level 1 expands a single process 3.0 Prepare Report into steps 3.1, 3.2, 3.3.'});smallTag(sl,'DFD / zoom into 3.0');title(sl,'Look inside ','one process.');under(sl,'We expand “3.0 Prepare Report” into Enter, Check, and Publish.');dPanel(sl);
 [ [[193,136],[246,136]],[[457,136],[501,136]],[[710,136],[748,136]],[[957,136],[991,136]],[[360,192],[360,285]] ].forEach((p,i)=>dEdge(sl,p,...[['raw values',225,57],['entered values',485,57],['checked values',735,57],['PDF report',980,57],['saved values',414,251]][i]));
 dEntity(sl,27,92,166,89,'Technician');dProcess(sl,258,82,199,110,'3.1 Enter Results');dProcess(sl,513,82,197,110,'3.2 Check Results');dProcess(sl,760,82,197,110,'3.3 Publish Report');dEntity(sl,1003,92,101,89,'Patient');dStore(sl,250,298,220,78,'D3 Results');
 pNote(sl,'3.1 Enter    →    3.2 Check    →    3.3 Publish');
}
// 08 flow simulation - PPT preserves a clear static step-by-step path
{
 const sl=base('DATA FLOW DIAGRAMS',8,{notes:'HTML version includes step-by-step interactions. On PowerPoint, point through these five labeled stages from left to right.'});smallTag(sl,'A report in five steps');title(sl,'Follow the ','information.');
 box(sl,.82,2.15,11.72,2.7,C.navy2,C.navy2,.15);
 const d=[['Reception','Patient details','entity'],['Register','Process','process'],['D1 Patients','Data store','store'],['Record Results','Process','process'],['Patient','Report','entity']];
 d.forEach((a,i)=>{let x=1.08+i*2.3;let y=3.1;box(sl,x,y,1.75,.75,i===0?C.lime:'254152',i===0?C.lime:'5F8186',a[2]==='process'?.32:.04);text(sl,a[0],x+.1,y+.17,1.55,.36,{size:12.7,bold:true,color:i===0?C.navy:C.white,align:'center'});text(sl,a[1],x,y+1.03,1.75,.27,{size:11.2,color:'B6D0CD',align:'center'});if(i<4)text(sl,'→',x+1.8,y+.11,.45,.44,{size:27,color:C.lime,align:'center'})});
 text(sl,'STEP 1 / 5',.97,5.27,2,.3,{size:10.2,bold:true,color:C.teal,charSpacing:1});text(sl,'Reception collects the details.',.97,5.72,8,.47,{size:23,bold:true});text(sl,'The HTML presentation lets you reveal each step with one click.',.97,6.25,11,.35,{size:12.8,color:C.muted});
}
// 09 XP intro
{
const sl=base('EXTREME PROGRAMMING',9,{dark:true,notes:'XP is an Agile development approach focused on high-quality code, frequent feedback, teamwork, small steps.'});chapter(sl,'02 / EXTREME PROGRAMMING','Small steps.','Strong habits.','XP is an Agile software development approach that uses frequent feedback, teamwork, and disciplined coding practices.','Build patient search first. Test it. Get feedback. Improve it.');
 // native concentric iteration visual
 for(let d=0;d<3;d++){sl.addShape(S.ellipse,{x:8.35+d*.39,y:1.38+d*.39,w:3.9-d*.78,h:3.9-d*.78,fill:{color:C.navy,transparency:100},line:{color:d===0?'507477':'355A5D',dash:d===0?'dash':'solid',width:1.1}})}
 circle(sl,9.56,2.59,1.5,C.lime);text(sl,'REPEAT',9.73,3.03,1.16,.42,{size:19,bold:true,color:'24432E',align:'center'});
 [['PLAN',9.58,1.17],['CODE',11.68,3.1],['TEST',9.58,5.35],['FEEDBACK',7.56,3.1]].forEach(([a,x,y])=>{box(sl,x,y,1.65,.48,C.navy2,'476B6E',.11);text(sl,a,x+.1,y+.12,1.45,.22,{size:10.2,bold:true,color:C.white,align:'center'})});
}
// 10 XP values
{
 const sl=base('EXTREME PROGRAMMING',10,{notes:'These five are values, not 14 principles or prescribed practices.'});smallTag(sl,'XP / five values');title(sl,'Good software starts with ','good habits.');
 const dat=[['Communication','Talk often so the team understands.'],['Simplicity','Build what is needed now.'],['Feedback','Test and listen early.'],['Courage','Improve code and discuss problems.'],['Respect','Care for teammates and users.']];
 dat.forEach((a,i)=>{let x=.83+i*2.39;card(sl,x,2.25,2.23,3.54);text(sl,'0'+(i+1),x+.2,2.5,1,.23,{size:11.3,bold:true,color:'859A99'});circle(sl,x+.21,3.11,.76,['D9EEE6','ECF0D9','DFEFF3','F2E1D6','E2E3F5'][i]);circle(sl,x+.48,3.37,.2,C.teal);text(sl,a[0],x+.19,4.2,1.9,.32,{size:15.7,bold:true});text(sl,a[1],x+.19,4.78,1.87,.72,{size:12.2,color:C.muted});});
 bar(sl,'Example: receptionists give feedback that makes patient search easier to use.');
}
// 11 XP loop
{
const sl=base('EXTREME PROGRAMMING',11,{notes:'An XP iteration includes choosing a small story, implementing and testing it, showing it, and using feedback to improve.'});smallTag(sl,'XP / short repeating cycle');title(sl,'Finish a small feature. ','Then repeat.');
const a=[['01','Choose a story','Find a patient using a phone number.'],['02','Build & test','Write a test and make the feature work.'],['03','Show the result','Ask the receptionist to try it.'],['04','Improve & repeat','Fix issues, then choose the next story.']];
a.forEach((e,i)=>{let x=.83+i*3.05;card(sl,x,2.4,2.74,3.18);text(sl,e[0],x+.24,2.79,1,.34,{size:13,bold:true,color:C.teal});text(sl,e[1],x+.24,4.11,2.26,.35,{size:17.3,bold:true});text(sl,e[2],x+.24,4.73,2.26,.62,{size:12.6,color:C.muted});if(i<3)text(sl,'→',x+2.72,3.6,.34,.5,{size:28,color:'7DB5A9',align:'center'})});
 text(sl,'↶   NEXT SMALL IMPROVEMENT',4.15,5.98,4.8,.27,{size:12,bold:true,color:C.teal,align:'center'});
}
// 12 practices
{
const sl=base('EXTREME PROGRAMMING',12,{notes:'Six practical XP techniques; this is a representative subset, not a claim of an exhaustive practice list.'});smallTag(sl,'XP / six practices');title(sl,'Simple ideas, practiced ','consistently.');
 const a=[['Pair programming','Two developers work on the same code.'],['Test-driven development','Write a failing test before code.'],['Continuous integration','Combine and check changes often.'],['Refactoring','Improve code without changing behavior.'],['Small releases','Deliver useful changes in small pieces.'],['Customer collaboration','Ask users for feedback while building.']];
a.forEach((e,i)=>{let x=.83+(i%3)*4.02,y=2.12+Math.floor(i/3)*2.17;card(sl,x,y,3.69,2.0);box(sl,x+.22,y+.19,.54,.51,C.tealLite,C.tealLite,.12);text(sl,String(i+1).padStart(2,'0'),x+.23,y+.34,.5,.18,{size:11,bold:true,color:C.teal,align:'center'});text(sl,e[0],x+.22,y+.92,3.23,.35,{size:16,bold:true});text(sl,e[1],x+.22,y+1.46,3.23,.39,{size:12.8,color:C.muted});});
}
// 13 TDD
{
 const sl=base('EXTREME PROGRAMMING',13,{notes:'HTML animates Red-Green-Refactor. PowerPoint represents all three stages as editable cards.'});smallTag(sl,'XP / test-driven development');title(sl,'Test first. ','Then code.');
 const a=[['01','RED','Write a test that fails.','Patient ID 102 should return Amina.'],['02','GREEN','Make the test pass.','Implement the smallest working search.'],['03','REFACTOR','Improve the code.','Clean up without breaking behavior.']];
 a.forEach((e,i)=>{let x=.82+i*4.11;card(sl,x,2.12,3.87,3.55);box(sl,x+.2,2.34,3.45,.72,['FCEDE8','E8F5EB','EAF3F7'][i],['FCEDE8','E8F5EB','EAF3F7'][i],.13);text(sl,e[0],x+.38,2.57,.5,.22,{size:13,bold:true,color:C.muted});text(sl,e[1],x+1.0,2.5,2.1,.36,{size:21,bold:true,color:i===0?'C25B50':i===1?'3C9D69':'517CA4'});text(sl,e[2],x+.24,3.53,3.31,.37,{size:18,bold:true});text(sl,e[3],x+.24,4.27,3.26,.74,{size:14.4,color:C.muted});});
 bar(sl,'TDD uses a repeating RED → GREEN → REFACTOR cycle.');
}
// 14 Scrum intro
{
 const sl=base('SCRUM',14,{dark:true,notes:'Scrum is a lightweight framework organizing work into Sprints, each producing at least one usable Increment.'});chapter(sl,'03 / SCRUM FRAMEWORK','A shared goal.','One Sprint at a time.','Scrum is a lightweight framework where a team delivers value in periods called Sprints—one month or less.','Sprint goal: reception can register and find patients reliably.');
 const a=[['Product Backlog','What is needed'],['Sprint','Work toward goal'],['Increment','Something usable']];
 a.forEach((e,i)=>{let x=7.16+i*1.83;let y=i===1?2.39:2.68;box(sl,x,y,1.55,i===1?2.42:1.89,i===1?C.lime:C.navy2,i===1?C.lime:'4D6971',.16);text(sl,'0'+(i+1),x+.18,y+.24,1.15,.25,{size:10.6,bold:true,color:i===1?'4C7041':'9FCAC1'});text(sl,e[0],x+.13,y+.72,1.31,.58,{size:16,bold:true,color:i===1?C.navy:C.white,align:'center'});text(sl,e[1],x+.12,y+1.47,1.32,.31,{size:10.5,color:i===1?'54734B':'AFC7CD',align:'center'});if(i<2)text(sl,'→',x+1.57,3.31,.3,.31,{size:20,color:C.lime,align:'center'})});
}
// 15 Scrum roles
{
 const sl=base('SCRUM',15,{notes:'Three accountabilities within one Scrum Team: Product Owner, Scrum Master, Developers.'});smallTag(sl,'Scrum / three accountabilities');title(sl,'Three accountabilities. ','One team.');
 const a=[['Product Owner','Orders the Product Backlog by value.','Prioritizes patient search.'],['Scrum Master','Helps the team use Scrum effectively.','Helps remove obstacles.'],['Developers','Build and test a usable Increment.','Implement registration and search.']];
 a.forEach((e,i)=>{let x=.83+i*4.08;card(sl,x,2.13,3.78,3.93);box(sl,x+.03,2.15,3.71,1.55,['E7F4EB','EAF1F7','F0F3E6'][i],['E7F4EB','EAF1F7','F0F3E6'][i],.12);
  const col=['328F7C','6889A4','91A453'][i];for(let j=0;j<3;j++){circle(sl,x+1.12+j*.55,2.47,.38,col);box(sl,x+1.08+j*.55,2.87,.46,.42,col,col,.12)}
  text(sl,e[0],x+.23,4.0,3.32,.4,{size:19.4,bold:true});text(sl,e[1],x+.23,4.61,3.32,.64,{size:13.8,color:C.muted});line(sl,x+.23,5.42,x+3.51,5.42,'D7E3E2',1);text(sl,'Example: '+e[2],x+.23,5.56,3.32,.33,{size:11.9,color:C.teal,bold:true});});
}
// 16 events
{
 const sl=base('SCRUM',16,{notes:'Five Scrum events: the Sprint plus four events within it. Daily Scrum is held by Developers.'});smallTag(sl,'Scrum / five events');title(sl,'Four events happen ','inside a Sprint.');
 card(sl,.83,2.12,11.69,3.88);box(sl,1.09,2.42,2.8,.48,C.teal,C.teal,.20);text(sl,'SPRINT / EVENT 1',1.24,2.57,2.5,.2,{size:12.1,bold:true,color:C.white});text(sl,'A fixed period of one month or less',4.07,2.52,7.8,.27,{size:15,color:'44636E'});line(sl,1.09,3.10,12.23,3.10,'AACFC6',1.5,'none',true);
 const a=[['Sprint Planning','Decide why and what to build.'],['Daily Scrum','Check progress; adapt the plan.'],['Sprint Review','Show results; get feedback.'],['Sprint Retrospective','Improve the way of working.']];
 a.forEach((e,i)=>{let x=1.09+i*2.85;box(sl,x,3.42,2.58,1.58,'F4F8F6','EDF1F0',.13);text(sl,'0'+(i+2),x+.16,3.57,.5,.22,{size:10.8,color:C.teal,bold:true});text(sl,e[0],x+.16,4.0,2.26,.3,{size:13.8,bold:true});text(sl,e[1],x+.16,4.52,2.3,.34,{size:11.4,color:C.muted});});
 text(sl,'SPRINT GOAL   →   USABLE INCREMENT',3.85,5.40,5.6,.25,{size:11.5,bold:true,color:C.teal,align:'center'});
 bar(sl,'Daily Scrum happens every working day. All five events support inspection and adaptation.');
}
// 17 artifacts
{
 const sl=base('SCRUM',17,{notes:'Each Scrum artifact has one associated commitment in the 2020 Scrum Guide.'});smallTag(sl,'Scrum / three artifacts');title(sl,'What the team ','plans and delivers.');
 const a=[['Product Backlog','Ordered list of product needs.','Product Goal'],['Sprint Backlog','Sprint Goal, selected work, and plan.','Sprint Goal'],['Increment','Usable work meeting quality standards.','Definition of Done']];
 a.forEach((e,i)=>{let x=.83+i*4.1;card(sl,x,2.4,3.78,3.85);box(sl,x+.16,2.57,3.44,1.37,['EDF5EF','EAF2F8','EEF4E6'][i],['EDF5EF','EAF2F8','EEF4E6'][i],.13);for(let z=0;z<3;z++)box(sl,x+.93,2.96+z*.28,2.0-z*.23,.15,'9FC9BF','9FC9BF',.03);
 text(sl,e[0],x+.22,4.27,3.35,.36,{size:18,bold:true});text(sl,e[1],x+.22,4.83,3.32,.64,{size:13.4,color:C.muted});box(sl,x+.2,5.66,3.35,.4,'EAF3EE','EAF3EE',.09);text(sl,'Commitment: '+e[2],x+.3,5.77,3.14,.23,{size:11.6,bold:true,color:'276F64',align:'center'});if(i<2)text(sl,'→',x+3.78,3.63,.33,.45,{size:29,color:'83ADA4',align:'center'});});
}
// 18 board
{
 const sl=base('SCRUM',18,{notes:'Use HTML version for moving the task through three columns. PowerPoint shows clear start-to-finish snapshot.'});smallTag(sl,'Scrum / workflow example');title(sl,'Watch a task move from ','planned to done.');
 card(sl,.83,2.15,11.68,4.3);text(sl,'SPRINT GOAL',1.08,2.43,2,.25,{size:10.4,bold:true,color:C.teal,charSpacing:.8});text(sl,'Reception can search patient records',1.07,2.79,7,.38,{size:18,bold:true});
 const cols=[['To do','A7B8BB'],['In progress','39A69C'],['Done','8FBE4A']];
 cols.forEach((a,i)=>{let x=1.07+i*3.73;card(sl,x,3.46,3.44,2.19,{fill:'F2F7F5',border:'E1EAE7'});circle(sl,x+.24,3.74,.13,a[1]);text(sl,a[0],x+.52,3.66,2.58,.3,{size:15.1,bold:true,color:'3D5F64'});if(i===2){box(sl,x+.2,4.33,3.02,.9,C.white,'CBDAD6',.09);box(sl,x+.2,4.33,.05,.9,C.teal,C.teal,0);text(sl,'Patient search by ID',x+.41,4.53,2.58,.27,{size:13.3,bold:true});text(sl,'Tested / Ready to show',x+.41,4.93,2.58,.21,{size:10.8,color:C.muted})}});
 text(sl,'After testing, the usable feature is in Done and ready for Sprint Review.',1.07,5.92,11,.27,{size:12.4,color:C.muted});
}
// 19-20 principles
const princ=[
['Humanity','Remember the people doing the work.'],['Economics','Choose work that gives real value.'],['Mutual benefit','Help customers and teammates together.'],['Self-similarity','Use good patterns at different scales.'],['Improvement','Keep getting a little better.'],['Diversity','Different viewpoints improve decisions.'],['Reflection','Learn from what happened.'],
['Flow','Keep useful work moving smoothly.'],['Opportunity','Treat problems as chances to improve.'],['Redundancy','Use backup checks for important mistakes.'],['Failure','Learn from small failures early.'],['Quality','Do not sacrifice quality to move faster.'],['Baby steps','Make small, safe changes.'],['Accepted responsibility','Own the work you agree to do.']];
for(let n=0;n<2;n++){
 let idx=19+n;const sl=base('XP PRINCIPLES',idx,{notes:n===0?'The first seven principles behind XP, from Extreme Programming Explained by Kent Beck.':'The final seven XP principles. End: DFD understand data, XP build carefully, Scrum deliver together.'});smallTag(sl,'04 / XP principles');
 title(sl,n===0?'The ideas behind ':'Keep learning. ',n===0?'the habits.':'Keep improving.');
 const start=n*7;
 for(let j=0;j<7;j++){
  const [name,def]=princ[start+j];let col=j%2,row=Math.floor(j/2);let x=.83+col*6.06,y=2.03+row*1.12;card(sl,x,y,5.67,.97);box(sl,x+.12,y+.14,.59,.6,'E6F3E9','E6F3E9',.10);text(sl,String(start+j+1).padStart(2,'0'),x+.2,y+.29,.42,.21,{size:12.5,bold:true,color:C.teal,align:'center'});text(sl,name,x+.95,y+.13,4.41,.33,{size:16.8,bold:true});text(sl,def,x+.95,y+.55,4.44,.27,{size:12.2,color:C.muted});
 }
 text(sl,n===0?'Values guide decisions  •  Principles explain why  •  Practices show how':'DFD: understand information   •   XP: build carefully   •   Scrum: deliver together',1.05,6.78,11.2,.24,{size:11.9,bold:true,color:C.teal,align:'center'});
}

(async()=>{const out=path.join(__dirname,'software-engineering-visual-guide.pptx');await pptx.writeFile({fileName:out});console.log('wrote',out,fs.statSync(out).size)})();
