// Generate an editable 20-slide PowerPoint with native shapes and text.
const pptxgen = require('pptxgenjs');
const pptx = new pptxgen();
pptx.layout='LAYOUT_WIDE';
pptx.author='Software Engineering Teaching Deck';
pptx.subject='Data Flow Diagrams, XP, Scrum and XP principles';
pptx.title='Software Engineering — 20 Clear Slides';
pptx.company='Educational presentation';
pptx.lang='en-US';
pptx.theme={headFontFace:'Aptos Display',bodyFontFace:'Aptos',lang:'en-US'};
const S=pptx.ShapeType, W=13.333,H=7.5;
const C={paper:'F6F7F5',white:'FFFFFF',ink:'1A2B33',muted:'556B73',teal:'0B7069',tealLite:'E4F2EF',gold:'AA7838',goldLite:'FCF0DF',blue:'526C93',blueLite:'E9EEF6',dark:'183039',hair:'D8E1DF',dark2:'223F48',off:'ECF1EF'};
const F='Aptos',FD='Aptos Display';
const slides=[];
function txt(s,t,x,y,w,h,opt={}){s.addText(t,{x,y,w,h,fontFace:F,fontSize:17,color:C.ink,breakLine:false,margin:0,fit:'shrink',valign:'mid',...opt})}
function shape(s,type,x,y,w,h,fill,line=C.hair,r=1){s.addShape(type,{x,y,w,h,rectRadius:r,line:{color:line,width:1.1},fill:{color:fill}})}
function line(s,x1,y1,x2,y2,opt={}){s.addShape(S.line,{x:x1,y:y1,w:x2-x1,h:y2-y1,line:{color:C.muted,width:2.1,...opt}})}
function arr(s,x1,y1,x2,y2){line(s,x1,y1,x2,y2,{endArrowType:'triangle'})}
function card(s,x,y,w,h,title,desc,num='',tSize=19,dSize=15.5){shape(s,S.roundRect,x,y,w,h,C.white);if(num)txt(s,num,x+.23,y+.17,w-.46,.24,{color:C.teal,bold:true,fontSize:13});txt(s,title,x+.23,y+(num?.64:.27),w-.46,.72,{fontFace:FD,bold:true,fontSize:tSize,breakLine:false});txt(s,desc,x+.23,y+(num?1.4:1.16),w-.46,Math.max(.35,h-(num?1.65:1.38)),{fontSize:dSize,color:C.muted,valign:'top',breakLine:false})}
function panel(s,x,y,w,h){shape(s,S.roundRect,x,y,w,h,C.white)}
function footer(s,message=''){line(s,.67,6.76,12.66,6.76,{color:C.hair,width:1});txt(s,'Remember',.68,6.87,1.05,.24,{color:C.teal,bold:true,fontSize:11.7});txt(s,message,1.78,6.86,10.71,.34,{color:C.muted,fontSize:11.3,valign:'top'});}
function base(n,ch,title,subtitle='',foot=''){const s=pptx.addSlide();slides.push(s);s.background={color:C.paper};txt(s,ch.toUpperCase(),.69,.43,7,.34,{color:C.teal,bold:true,fontSize:11.7,charSpacing:1.0});txt(s,`${String(n).padStart(2,'0')} / 20`,11.85,.43,.8,.3,{align:'right',color:C.muted,fontSize:11.5});txt(s,title,.68,.91,11.9,.64,{fontFace:FD,bold:true,fontSize:31.5,breakLine:false});if(subtitle)txt(s,subtitle,.69,1.70,11.90,.47,{fontSize:16.8,color:C.muted});footer(s,foot);return s}
function ext(s,x,y,w,h,name,size=16){shape(s,S.rect,x,y,w,h,C.tealLite,C.teal);txt(s,name,x+.1,y+.1,w-.2,h-.2,{bold:true,fontSize:size,align:'center'});}
function proc(s,x,y,w,h,name,sub=''){shape(s,S.roundRect,x,y,w,h,C.goldLite,C.gold);txt(s,name,x+.1,y+(sub?.15:.22),w-.2,.35,{bold:true,fontSize:15.2,align:'center'});if(sub)txt(s,sub,x+.1,y+.56,w-.2,.28,{fontSize:13.1,color:C.muted,align:'center'});}
function store(s,x,y,w,h,name,sub=''){shape(s,S.rect,x,y,w,h,C.blueLite,C.blue);line(s,x+.21,y,x+.21,y+h,{color:C.blue,width:2});txt(s,name,x+.35,y+(sub?.15:.18),w-.4,.32,{bold:true,fontSize:14.2,align:'center'});if(sub)txt(s,sub,x+.35,y+.51,w-.4,.23,{fontSize:12.5,color:C.muted,align:'center'});}
function label(s,t,x,y,w,align='center'){txt(s,t,x,y,w,.25,{fontSize:11.6,bold:true,color:C.muted,align})}
function notes(s,t){s.addNotes(t)}

// 01 — Cover
{
const s=pptx.addSlide();slides.push(s);s.background={color:C.dark};
txt(s,'SOFTWARE ENGINEERING  /  OVERVIEW',.68,.43,7,.32,{fontSize:11.7,bold:true,color:'95CDBE'});txt(s,'01 / 20',11.82,.44,.83,.3,{fontSize:11.7,color:'B9CBCC',align:'right'});
txt(s,'Software systems,',.82,2.03,7.0,.67,{fontFace:FD,fontSize:43,bold:true,color:C.white});txt(s,'explained simply.',.82,2.75,7.7,.73,{fontFace:FD,fontSize:43,bold:true,color:'A4E0CB'});
txt(s,'Data Flow Diagrams · Extreme Programming · Scrum · XP principles',.84,3.74,6.4,.68,{fontSize:18,color:'C1D2D1'});
shape(s,S.roundRect,7.35,1.89,5.17,3.55,C.dark2,'48606B');txt(s,'ONE RUNNING EXAMPLE',7.69,2.18,4.55,.31,{color:'BADED0',fontSize:14,bold:true});
const xs=[7.63,9.27,10.90],tt=['Reception','MediLab','Patient'];for(let i=0;i<3;i++){shape(s,S.roundRect,xs[i],3.02,1.37,1.14,i===1?C.goldLite:C.tealLite,i===1?C.gold:C.teal);txt(s,tt[i],xs[i]+.05,3.33,1.28,.29,{fontSize:12.2,bold:true,align:'center'})}
arr(s,9.04,3.59,9.20,3.59);arr(s,10.68,3.59,10.83,3.59);
txt(s,'One lab example connects all four topics.',7.71,4.49,4.5,.3,{fontSize:13,color:'C1D4D1'});
notes(s,'Introduce the four topics. The same fictional lab example will be used throughout.');
}
// 02 — Example
{
const s=base(2,'Introduction / example','Our example: a small lab','MediLab registers patients, handles laboratory tests and creates reports.','The project example is fictional and intended for teaching.');
const d=[['Receptionist','Registers a patient and creates a test request.'],['Lab technician','Performs a lab test and records its result.'],['Patient','Receives a completed laboratory report.']];
d.forEach((a,i)=>card(s,.72+i*4.18,2.55,3.83,3.1,a[0],a[1],`0${i+1}`,21,17));
notes(s,'Explain the workflow at a human level before the diagrams.');
}
// 03 DFD definition
{
const s=base(3,'01 / Data Flow Diagrams','What is a DFD?','A diagram of how information moves between people, processes and data stores.','A DFD shows data movement, not code execution order or user-interface screens.');
txt(s,'Data Flow Diagram (DFD)',.80,2.35,5.10,.49,{fontSize:23,bold:true});txt(s,'Shows where data comes from, what changes it, where it is stored, and where it goes.',.80,3.02,4.97,1.52,{fontSize:21.0,valign:'top'});
shape(s,S.rect,.80,5.20,4.93,.70,C.tealLite,C.teal);txt(s,'Focus: information, not program instructions',.96,5.39,4.58,.33,{fontSize:15,color:C.teal,bold:true});
panel(s,6.01,2.25,6.55,3.92);ext(s,6.32,3.37,1.72,.85,'Receptionist',13.6);proc(s,8.38,3.31,1.83,.98,'Register','patient');store(s,10.58,3.35,1.68,.88,'D1 Patient','records');arr(s,8.04,3.79,8.38,3.79);arr(s,10.21,3.79,10.58,3.79);label(s,'patient details',7.81,2.98,1.4);label(s,'saved record',10.10,2.98,1.7);
notes(s,'A DFD captures how data enters, is processed, is stored and leaves a system. It is not a flowchart.');
}
// 04 symbols
{
const s=base(4,'01 / Data Flow Diagrams','Four basic DFD symbols','Each shape has one meaning. Use the same shapes throughout the diagrams.','Rectangle = external entity; rounded shape = process; double-bar store = stored data; arrow = data flow.');
const x=[.72,3.88,7.04,10.20],w=2.46;
for(let i=0;i<4;i++)panel(s,x[i],2.40,w,3.43);
ext(s,1.19,2.96,1.52,.65,'Receptionist',12.5);proc(s,4.33,2.93,1.59,.82,'Register','patient');store(s,7.50,3.0,1.50,.69,'D1 Data');arr(s,10.64,3.36,12.17,3.36);
[['External entity','A person or system outside the boundary.'],['Process','An activity that changes or uses data.'],['Data store','Information kept for later use.'],['Data flow','A labeled arrow describing moving information.']].forEach((a,i)=>{txt(s,a[0],x[i]+.17,4.10,w-.34,.4,{fontSize:18,bold:true,align:'center'});txt(s,a[1],x[i]+.17,4.65,w-.34,.85,{fontSize:14.7,color:C.muted,align:'center'});});
notes(s,'Use these same symbols in the following context, level 0 and level 1 diagrams.');
}
// 05 Context diagram
{
const s=base(5,'01 / Data Flow Diagrams','Context diagram','One process represents the entire lab-management system.','A context diagram has external entities and data flows, but no internal data stores.');
panel(s,.70,2.18,11.95,4.22);
ext(s,1.10,2.96,2.18,.72,'Receptionist');ext(s,1.10,4.80,2.18,.74,'Lab technician');proc(s,5.10,3.60,3.17,1.26,'0 · MediLab','Whole lab system');ext(s,10.29,3.84,1.86,.73,'Patient');
arr(s,3.28,3.34,5.10,3.97);label(s,'patient details',3.56,2.96,1.44);
arr(s,5.10,4.58,3.28,5.15);label(s,'work orders',3.52,4.65,1.42);
arr(s,3.28,5.31,5.10,4.73);label(s,'test results',3.62,5.40,1.3);
arr(s,8.27,4.22,10.29,4.22);label(s,'lab report',8.53,3.81,1.38);
notes(s,'The context diagram is a high-level data view. No database store is drawn inside the single system process.');
}
// 06 Level 0
{
const s=base(6,'01 / Data Flow Diagrams','Level 0: inside the system','The one system process is divided into four main processes.','Numbered processes explain the system; D1/D2/D3 are the named data stores.');
panel(s,.69,2.18,11.97,4.26);
const xx=[1.9,4.18,6.46,8.74];
ext(s,.82,3.55,1.02,.68,'Reception',10.9);
[['1.0 Register','patient'],['2.0 Request','lab test'],['3.0 Record','test result'],['4.0 Issue','lab report']].forEach((d,i)=>proc(s,xx[i],3.49,1.97,.82,d[0],d[1]));
ext(s,11.03,3.55,1.16,.68,'Patient',11.4);
arr(s,1.84,3.90,1.90,3.90);for(let i=0;i<3;i++)arr(s,xx[i]+1.97,3.90,xx[i+1],3.90);arr(s,10.71,3.90,11.03,3.90);
store(s,1.98,5.10,1.74,.76,'D1 Patient','records');store(s,4.27,5.10,1.73,.76,'D2 Test','requests');store(s,6.55,5.10,1.73,.76,'D3 Test','results');
for(let i=0;i<3;i++)arr(s,xx[i]+1.0,4.31,xx[i]+1.0,5.10);
ext(s,6.60,2.45,1.64,.56,'Technician',13.0);arr(s,7.43,3.01,7.43,3.49);
notes(s,'The Level 0 DFD decomposes the single lab process into separate numbered processes. The example simplifies some flows to keep the diagram readable.');
}
// 07 Level 1
{
const s=base(7,'01 / Data Flow Diagrams','Level 1: zoom into process 3.0','“Record test result” is divided into three smaller activities.','Level 1 expands one process without changing its overall purpose.');
panel(s,.70,2.18,11.95,4.22);
ext(s,.94,3.47,1.62,.83,'Technician');
proc(s,2.93,3.40,2.43,.96,'3.1 Find request','select test');proc(s,5.75,3.40,2.43,.96,'3.2 Enter values','measurements');proc(s,8.57,3.40,2.45,.96,'3.3 Validate','check values');
arr(s,2.56,3.86,2.93,3.86);arr(s,5.36,3.86,5.75,3.86);arr(s,8.18,3.86,8.57,3.86);
store(s,3.06,5.22,2.15,.72,'D2 Test requests');store(s,8.67,5.22,2.22,.72,'D3 Test results');
arr(s,4.13,5.22,4.13,4.36);arr(s,9.76,4.36,9.76,5.22);
notes(s,'At Level 1, processes 3.1, 3.2 and 3.3 show the internal steps of Record Test Result. D2 feeds the request to 3.1, and 3.3 saves the verified result to D3.');
}
// 08 interactive data
{
const s=base(8,'01 / Data Flow Diagrams','Simulation: follow the data','Step through one patient record, one action at a time.','The HTML deck lets you advance these steps individually by clicking Next.');
const a=[['01','Reception','Enter patient details'],['02','Register','Validate the record'],['03','Patient store','Save data in D1'],['04','Lab test','Record test result'],['05','Report','Send to patient']];
a.forEach((d,i)=>{const x=.70+i*2.46;panel(s,x,2.76,2.17,2.79);txt(s,d[0],x+.23,3.09,1.7,.30,{fontSize:14,bold:true,color:C.teal});txt(s,d[1],x+.23,3.65,1.75,.65,{fontSize:20,bold:true});txt(s,d[2],x+.23,4.55,1.71,.7,{fontSize:16,color:C.muted});if(i<4)arr(s,x+2.17,4.1,x+2.40,4.1);});
notes(s,'Walk through the five stages slowly. In the HTML version each Next step click highlights a stage.');
}
// 09 XP definition
{
const s=base(9,'02 / Extreme Programming','What is Extreme Programming?','XP is an Agile development approach built around high-quality, frequent delivery.','XP focuses on technical collaboration, short feedback loops and tested code.');
txt(s,'Extreme Programming (XP)',.82,2.45,5.08,.49,{fontSize:22.2,bold:true});txt(s,'Helps developers deliver small, reliable software changes and adjust when requirements change.',.82,3.07,4.93,1.6,{fontSize:20.5,valign:'top'});
shape(s,S.rect,.83,5.13,4.96,.77,C.tealLite,C.teal);txt(s,'Test often · Improve often · Ask often',1.02,5.30,4.57,.35,{fontSize:15.4,color:C.teal,bold:true});
panel(s,6.14,2.38,6.40,3.55);let steps=['Plan','Build','Test','Learn'];steps.forEach((a,i)=>{const x=6.48+i*1.49;shape(s,S.roundRect,x,3.48,1.28,.96,C.white,C.hair);txt(s,a,x+.05,3.72,1.16,.35,{fontSize:17.6,bold:true,align:'center'});if(i<3)arr(s,x+1.28,3.95,x+1.43,3.95)});txt(s,'Repeat with the next small improvement',7.10,5.12,4.52,.37,{fontSize:15.5,color:C.muted,align:'center'});
notes(s,'Explain that XP describes how developers build and verify software, complementing team organization frameworks such as Scrum.');
}
// 10 values
{
const s=base(10,'02 / Extreme Programming','The five XP values','These values guide how developers work and make decisions.','Values are the ideas; practices are the concrete activities.');
const a=[['Communication','Share information openly.'],['Simplicity','Build only what is needed now.'],['Feedback','Learn quickly from tests and users.'],['Courage','Change bad code and confront issues.'],['Respect','Care for people and their work.']];
const places=[[.75,2.26],[4.93,2.26],[9.11,2.26],[2.84,4.47],[7.02,4.47]];
a.forEach((d,i)=>card(s,places[i][0],places[i][1],3.50,1.88,d[0],d[1],String(i+1).padStart(2,'0'),18.9,15.2));
notes(s,'These are the five values of XP: communication, simplicity, feedback, courage and respect.');
}
// 11 practices
{
const s=base(11,'02 / Extreme Programming','Six important XP practices','Practical habits that make frequent changes safer.','The six practices shown are examples, not an exhaustive XP checklist.');
const a=[['Pair programming','Two developers collaborate on one task.'],['Test-driven development','Write a failing test before feature code.'],['Continuous integration','Combine small changes and check them often.'],['Refactoring','Improve structure without changing behavior.'],['Simple design','Avoid unneeded complexity.'],['Small releases','Share useful working changes frequently.']];
a.forEach((d,i)=>card(s,.76+(i%3)*4.17,2.27+Math.floor(i/3)*2.02,3.78,1.75,d[0],d[1],String(i+1).padStart(2,'0'),17.3,14.1));
notes(s,'These six practices emphasize collaboration, test-first work, clean code, and frequent usable releases.');
}
// 12 TDD
{
const s=base(12,'02 / Extreme Programming','TDD: Red → Green → Refactor','Write a test, make it pass, then improve the code.','A conceptual demonstration. The actual automated tests run in the developer’s tools.');
const d=[['01 / RED','Test fails','Specify behavior before code.','expect(status("complete"))\n  .toBe("Ready")'],['02 / GREEN','Test passes','Write only enough code to pass.','if (state === "complete")\n  return "Ready"'],['03 / REFACTOR','Improve code','Clean the implementation; retest.','const labels = {\n  complete: "Ready"\n}']];
d.forEach((a,i)=>{const x=.72+i*4.19;panel(s,x,2.45,3.80,3.75);txt(s,a[0],x+.23,2.79,3.31,.29,{fontSize:13,bold:true,color:i===0?'B35D52':i===1?C.teal:C.blue});txt(s,a[1],x+.23,3.29,3.34,.48,{fontSize:22,bold:true});txt(s,a[2],x+.23,3.95,3.35,.59,{fontSize:15.5,color:C.muted});shape(s,S.roundRect,x+.22,4.97,3.35,.82,C.off,C.hair);txt(s,a[3],x+.42,5.09,3.03,.64,{fontFace:'Aptos Mono',fontSize:12.5,breakLine:false});});
notes(s,'RED: first write a failing test. GREEN: implement enough to pass. REFACTOR: improve design while tests keep passing.');
}
// 13 XP iteration
{
const s=base(13,'02 / Extreme Programming','How an XP iteration works','A short cycle produces working software and new feedback.','Keep iterations small; repeat the cycle as user needs become clearer.');
const a=[['Listen','Lab staff request a report-status feature.'],['Choose','Select the smallest useful story.'],['Build & test','Implement, test and refactor.'],['Deliver & learn','Show users and collect feedback.']];
a.forEach((d,i)=>{const x=.75+i*3.12;panel(s,x,2.70,2.82,2.81);txt(s,String(i+1).padStart(2,'0'),x+.24,3.05,2.3,.3,{fontSize:16,color:C.teal,bold:true});txt(s,d[0],x+.24,3.75,2.3,.47,{fontSize:20.6,bold:true});txt(s,d[1],x+.24,4.56,2.33,.72,{fontSize:15.5,color:C.muted});if(i<3)arr(s,x+2.82,4.12,x+3.07,4.12)});
notes(s,'Explain one short XP iteration using the report-status feature. The team chooses a small story, builds and tests, releases, then learns.');
}
// 14 Scrum defined
{
const s=base(14,'03 / Scrum','What is Scrum?','A lightweight framework for collaborating and delivering value through Sprints.','Scrum helps organize work; XP focuses more on technical engineering habits.');
txt(s,'Scrum',.82,2.57,4.7,.55,{fontSize:26.4,bold:true});txt(s,'Teams work in short cycles called Sprints. Each Sprint is one month or less and delivers a usable Increment.',.82,3.22,4.84,1.65,{fontSize:21,valign:'top'});shape(s,S.rect,.81,5.11,4.95,.81,C.tealLite,C.teal);txt(s,'Sprint = one month or less',1.04,5.36,4.4,.34,{fontSize:17.3,color:C.teal,bold:true});
panel(s,6.11,2.41,6.42,3.65);shape(s,S.roundRect,6.43,2.74,5.77,.67,C.tealLite,C.teal);txt(s,'SPRINT',6.67,2.95,5.35,.3,{color:C.teal,fontSize:18,bold:true});const a=['Plan','Work','Review','Adapt'];a.forEach((d,i)=>{let x=6.45+i*1.47;panel(s,x,3.81,1.25,1.35);txt(s,d,x+.09,4.23,1.07,.32,{fontSize:15.9,bold:true,align:'center'});if(i<3)arr(s,x+1.25,4.49,x+1.41,4.49)});
notes(s,'Scrum is a framework built around empirical learning, inspection, and adaptation. It is not just a task board.');
}
// 15 accountabilities
{
const s=base(15,'03 / Scrum','One Scrum Team, three accountabilities','The three accountabilities work together to create a valuable product.','All three accountabilities are within one Scrum Team.');
const a=[['Product Owner','Orders the Product Backlog to maximize product value.'],['Scrum Master','Helps the team and organization use Scrum effectively.'],['Developers','Plan, build and verify a usable Increment in each Sprint.']];
a.forEach((d,i)=>card(s,.72+i*4.19,2.52,3.83,3.15,d[0],d[1],String(i+1).padStart(2,'0'),21.0,16.8));
notes(s,'Use current Scrum terminology accountabilities, not old role labels.');
}
// 16 five events
{
const s=base(16,'03 / Scrum','The five Scrum events','Four specific events happen inside the Sprint.','Scrum events support regular inspection and adaptation.');
shape(s,S.roundRect,.77,2.34,11.83,.78,C.tealLite,C.teal);txt(s,'The Sprint',1.04,2.53,2.8,.35,{fontSize:20.8,bold:true,color:C.teal});txt(s,'A container event — one month or less',7.17,2.54,5.05,.32,{fontSize:15.6,color:C.teal,align:'right'});
const d=[['Sprint Planning','Agree on why, what and how to work.'],['Daily Scrum','Inspect progress and adapt the plan.'],['Sprint Review','Inspect outcomes with stakeholders.'],['Sprint Retrospective','Plan ways to improve teamwork.']];
d.forEach((a,i)=>card(s,.75+i*3.13,3.50,2.81,2.29,a[0],a[1],String(i+1).padStart(2,'0'),17.5,14.2));
notes(s,'Scrum defines five events: Sprint, Sprint Planning, Daily Scrum, Sprint Review, and Sprint Retrospective.');
}
// 17 artifacts
{
const s=base(17,'03 / Scrum','Three Scrum artifacts','Each artifact makes important work visible and has a related commitment.','Commitments: Product Goal, Sprint Goal and Definition of Done.');
const d=[['Product Backlog','An ordered list of what the product needs.','Product Goal'],['Sprint Backlog','Sprint Goal, chosen work and a plan for delivery.','Sprint Goal'],['Increment','A usable, verified improvement to the product.','Definition of Done']];
d.forEach((a,i)=>{let y=2.27+i*1.34;panel(s,.78,y,11.79,1.14);txt(s,a[0],1.08,y+.31,3.1,.52,{fontSize:21,bold:true});txt(s,a[1],4.21,y+.27,5.29,.60,{fontSize:15.4,color:C.muted});shape(s,S.roundRect,10.0,y+.29,2.28,.54,C.tealLite,C.teal);txt(s,a[2],10.07,y+.40,2.15,.3,{fontSize:12.4,bold:true,color:C.teal,align:'center'});});
notes(s,'Each artifact supports transparency. Its commitment helps people focus: Product Goal, Sprint Goal, Definition of Done.');
}
// 18 board
{
const s=base(18,'03 / Scrum','Simulation: one feature in a Sprint','A report-status feature moves from the Product Backlog toward Done.','Browser demo: move the task one step at a time; the PowerPoint shows the starting state.');
const a=['Product Backlog','Sprint Backlog','In progress','Done'];a.forEach((v,i)=>{const x=.73+i*3.16;shape(s,S.roundRect,x,2.57,2.84,3.43,C.off,C.hair);txt(s,v,x+.16,2.91,2.46,.42,{fontSize:18.1,bold:true});line(s,x+.16,3.48,x+2.65,3.48,{color:C.hair,width:1});});
shape(s,S.roundRect,.94,3.75,2.41,1.18,C.white,C.hair);line(s,.94,3.75,.94,4.93,{color:C.teal,width:4});txt(s,'Show report status',1.13,3.95,2.09,.43,{fontSize:16.1,bold:true});txt(s,'Example story · MediLab',1.13,4.42,2.07,.25,{fontSize:12.1,color:C.muted});
notes(s,'This is a visual board example, not a formal four-artifact Scrum model. The HTML version moves the story through states with one click.');
}
// 19/20 principles
const principles=[
['Humanity','Respect people, not just the code.'],['Economics','Focus on work that provides value.'],['Mutual Benefit','Choose actions that help everyone.'],['Self-Similarity','Reuse good ideas at different scales.'],['Improvement','Make the work a little better each time.'],['Diversity','Use different skills and viewpoints.'],['Reflection','Regularly learn from what happened.'],
['Flow','Keep useful work moving smoothly.'],['Opportunity','Treat problems as chances to improve.'],['Redundancy','Use overlapping checks for safety.'],['Failure','Learn from small, inexpensive experiments.'],['Quality','Do not sacrifice quality for speed.'],['Baby Steps','Make small, safe changes.'],['Accepted Responsibility','Own the work you choose to accept.']
];
for(let part=0;part<2;part++){
const n=19+part, s=base(n,'04 / XP principles',part===0?'XP principles: people and value':'XP principles: learning and quality',part===0?'Principles 1–7 explain how XP teams value people and progress.':'Principles 8–14 support safe improvements, quality and ownership.',part===0?'Source: Beck & Andres, Extreme Programming Explained (2nd edition).':'DFD maps data · XP guides engineering · Scrum organizes teamwork.');
principles.slice(part*7,part*7+7).forEach((a,i)=>{const col=i%2,row=Math.floor(i/2),x=.75+col*6.21,y=2.18+row*1.07,w=5.9;panel(s,x,y,w,.92);txt(s,String(part*7+i+1).padStart(2,'0'),x+.22,y+.18,.45,.27,{color:C.teal,fontSize:13.8,bold:true});txt(s,a[0],x+.72,y+.10,w-.91,.32,{fontSize:16.7,bold:true});txt(s,a[1],x+.72,y+.49,w-.93,.26,{fontSize:12.9,color:C.muted});});
notes(s,'These fourteen principle names come from Beck and Andres, Extreme Programming Explained: Embrace Change, second edition. The slide gives classroom-friendly paraphrases.');
}
if(slides.length!==20)throw new Error('Expected 20 slides, got '+slides.length);
pptx.writeFile({fileName:'/mnt/data/software-engineering-20-slides/software-engineering-20-slides.pptx'}).then(()=>console.log('Created editable PowerPoint with',slides.length,'slides')).catch(e=>{console.error(e);process.exit(1)});
