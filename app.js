'use strict';
const slides=[...document.querySelectorAll('.slide')];
let current=0;
const byId=(s)=>document.getElementById(s);
function show(i){
 current=Math.max(0,Math.min(slides.length-1,i));
 for(let n=0;n<slides.length;n++) {slides[n].classList.toggle('active',n===current);slides[n].setAttribute('aria-hidden',n===current?'false':'true');}
 const s=slides[current];byId('slideLabel').textContent=String(current+1).padStart(2,'0')+' OF '+slides.length;
 byId('slideCount').innerHTML=String(current+1).padStart(2,'0')+' <b>/</b> '+slides.length;
 byId('chapterLabel').textContent=s.dataset.chapter;
 byId('progressLine').style.width=((current+1)/slides.length*100)+'%';
 byId('prevSlide').disabled=current===0;byId('nextSlide').disabled=current===slides.length-1;
 byId('notesText').textContent=s.dataset.notes||'No notes';
 byId('liveRegion').textContent='Slide '+(current+1)+' of '+slides.length+': '+s.dataset.title;
 history.replaceState(null,'','#s'+(current+1));
}
byId('prevSlide').addEventListener('click',()=>show(current-1));
byId('nextSlide').addEventListener('click',()=>show(current+1));
byId('fullBtn').addEventListener('click',()=>{if(!document.fullscreenElement)document.documentElement.requestFullscreen?.();else document.exitFullscreen?.()});
const start=Number((location.hash||'').replace('#s',''));
show(Number.isFinite(start)&&start>0?start-1:0);
document.querySelector('.brand').addEventListener('click',e=>{e.preventDefault();show(0)});
document.addEventListener('keydown',e=>{
 const active=document.activeElement;
 if(active && ['INPUT','TEXTAREA','SELECT'].includes(active.tagName))return;
 if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();show(current+1)}
 if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();show(current-1)}
 if(e.key==='Home')show(0);if(e.key==='End')show(slides.length-1);
 if(e.key.toLowerCase()==='f'&&e.key.length===1)byId('fullBtn').click();
 if(e.key.toLowerCase()==='p'&&e.key.length===1)toggleNotes();
 if(e.key==='Escape')byId('notesPanel').hidden=true;
});
function toggleNotes(){byId('notesPanel').hidden=!byId('notesPanel').hidden;}
byId('closeNotes').addEventListener('click',()=>byId('notesPanel').hidden=true);
// A deliberate DFD walkthrough: one detail on each click.
let dfdStep=0;
const dfdSteps=[
 ['Reception collects patient details','This is information from an external entity.'],
 ['The system registers the patient','The process handles the details.'],
 ['Patient information is saved','The data store keeps a patient record.'],
 ['Technician enters lab results','Another process handles new information.'],
 ['The patient receives a report','The output leaves the system as a report.']
];
function updateDfd(){
 const sim=byId('dfdSim');
 sim.querySelectorAll('[data-sim-stage]').forEach(el=>{let n=Number(el.dataset.simStage);el.classList.toggle('visited',n<=dfdStep);el.classList.toggle('focused',n===dfdStep)});
 sim.querySelector('[data-sim-counter]').textContent=String(dfdStep+1).padStart(2,'0');
 sim.querySelector('[data-sim-title]').textContent=dfdSteps[dfdStep][0];sim.querySelector('[data-sim-desc]').textContent=dfdSteps[dfdStep][1];
 sim.querySelector('[data-sim-prev]').disabled=dfdStep===0;sim.querySelector('[data-sim-next]').textContent=dfdStep===4?'Restart ↺':'Next step →';
}
byId('dfdSim').querySelector('[data-sim-prev]').onclick=()=>{dfdStep=Math.max(0,dfdStep-1);updateDfd()};
byId('dfdSim').querySelector('[data-sim-next]').onclick=()=>{dfdStep=dfdStep===4?0:dfdStep+1;updateDfd()};updateDfd();
// TDD stages are intentionally controlled by presenter, no autoplay.
let tddStep=0;
const tddSteps=[
 {title:'Write a test that fails',desc:'Before building search, define the expected result: patient ID 102 should return Amina.',code:'Test: searching ID 102 returns Amina\n\nResult: FAIL\nSearch feature does not exist yet.'},
 {title:'Make the test pass',desc:'Implement the smallest patient-search function that finds ID 102 correctly.',code:'Test: searching ID 102 returns Amina\n\nResult: PASS\nThe search function now works.'},
 {title:'Improve without breaking it',desc:'Clean up the code, run the same test, and keep the behavior correct.',code:'Test: searching ID 102 returns Amina\n\nResult: PASS\nCode is clearer; behavior is unchanged.'}
];
function updateTdd(){let sim=byId('tddSim');sim.querySelectorAll('[data-tdd-stage]').forEach(el=>el.classList.toggle('focused',Number(el.dataset.tddStage)===tddStep));sim.querySelector('[data-tdd-title]').textContent=tddSteps[tddStep].title;sim.querySelector('[data-tdd-desc]').textContent=tddSteps[tddStep].desc;sim.querySelector('[data-tdd-code]').textContent=tddSteps[tddStep].code;sim.querySelector('[data-tdd-prev]').disabled=tddStep===0;sim.querySelector('[data-tdd-next]').textContent=tddStep===2?'Restart ↺':'Next step →'}
byId('tddSim').querySelector('[data-tdd-prev]').onclick=()=>{tddStep=Math.max(0,tddStep-1);updateTdd()};
byId('tddSim').querySelector('[data-tdd-next]').onclick=()=>{tddStep=tddStep===2?0:tddStep+1;updateTdd()};updateTdd();
// Scrum board: a single task progresses through the Sprint.
let scrumStep=0;
const scrumSteps=[
 {column:'todo',label:'Step 1: The team selects a small, valuable task during Sprint Planning.'},
 {column:'progress',label:'Step 2: Developers build patient search and run small tests.'},
 {column:'progress',label:'Step 3: The team checks whether the work meets its Definition of Done.'},
 {column:'done',label:'Step 4: The tested feature is usable and can be shown at the Sprint Review.'}
];
function updateScrum(){let sim=byId('scrumSim');let task=sim.querySelector('[data-board-task]');sim.querySelector(`[data-kanban-col="${scrumSteps[scrumStep].column}"]`).appendChild(task);sim.querySelector('[data-scrum-counter]').textContent=String(scrumStep+1).padStart(2,'0')+' / 04';sim.querySelector('[data-scrum-desc]').textContent=scrumSteps[scrumStep].label;sim.querySelector('[data-scrum-prev]').disabled=scrumStep===0;sim.querySelector('[data-scrum-next]').textContent=scrumStep===3?'Restart ↺':'Next step →';task.style.borderLeftColor=scrumStep===3?'#78b843':'#1c9487';}
byId('scrumSim').querySelector('[data-scrum-prev]').onclick=()=>{scrumStep=Math.max(0,scrumStep-1);updateScrum()};
byId('scrumSim').querySelector('[data-scrum-next]').onclick=()=>{scrumStep=scrumStep===3?0:scrumStep+1;updateScrum()};updateScrum();
