// TODO: Test 2 questions
import type { Question } from '@/types';

const Q2A=[
{id:'2A-1',text:'<strong>Corroborate</strong> means most nearly:',opts:['Contradict','Confirm','Fabricate','Interrogate'],correct:1,exp:'Corroborate = confirm or support with evidence.' /* TODO: expand explanation */},
{id:'2A-2',text:'<strong>Jurisdiction</strong> means most nearly:',opts:['Authority','Location','Verdict','Investigation'],correct:0,exp:'Jurisdiction = official power within a defined area.' /* TODO: expand explanation */},
{id:'2A-3',text:'<strong>Apprehend</strong> means most nearly:',opts:['Release','Approach','Arrest','Observe'],correct:2,exp:'Apprehend = arrest or seize.' /* TODO: expand explanation */},
{id:'2A-4',text:'<strong>Coerce</strong> means most nearly:',opts:['Persuade','Force','Negotiate','Deceive'],correct:1,exp:'Coerce = compel through threats or force.' /* TODO: expand explanation */},
{id:'2A-5',text:'<strong>Candid</strong> means most nearly:',opts:['Secretive','Cautious','Honest','Hostile'],correct:2,exp:'Candid = truthful and straightforward.' /* TODO: expand explanation */},
{id:'2A-6',text:'<strong>Discrepancy</strong> means most nearly:',opts:['Agreement','Difference','Evidence','Summary'],correct:1,exp:'Discrepancy = inconsistency between things.' /* TODO: expand explanation */},
{id:'2A-7',text:'<strong>Mandate</strong> means most nearly:',opts:['Suggestion','Request','Order','Option'],correct:2,exp:'Mandate = official order.' /* TODO: expand explanation */},
{id:'2A-8',text:'<strong>Comply</strong> means most nearly:',opts:['Resist','Challenge','Ignore','Obey'],correct:3,exp:'Comply = act in accordance with a rule.' /* TODO: expand explanation */},
{id:'2A-9',text:'<strong>Detain</strong> means most nearly:',opts:['Release','Hold','Pursue','Warn'],correct:1,exp:'Detain = keep in custody.' /* TODO: expand explanation */},
{id:'2A-10',text:'<strong>Impartial</strong> means most nearly:',opts:['Biased','Unfair','Neutral','Decisive'],correct:2,exp:'Impartial = treating all equally.' /* TODO: expand explanation */},
{id:'2A-11',text:'<strong>Diligent</strong> means most nearly:',opts:['Lazy','Hardworking','Distracted','Impulsive'],correct:1,exp:'Diligent = showing careful persistent effort.' /* TODO: expand explanation */},
{id:'2A-12',text:'<strong>Vigilant</strong> means most nearly:',opts:['Careless','Watchful','Relaxed','Forgetful'],correct:1,exp:'Vigilant = keeping careful watch for danger.' /* TODO: expand explanation */},
{id:'2A-13',text:'<strong>Substantiate</strong> means most nearly:',opts:['Deny','Prove','Question','Assume'],correct:1,exp:'Substantiate = provide evidence to prove something.' /* TODO: expand explanation */},
{id:'2A-14',text:'<strong>Prudent</strong> means most nearly:',opts:['Reckless','Careful','Aggressive','Timid'],correct:1,exp:'Prudent = acting with care and good judgment.' /* TODO: expand explanation */},
{id:'2A-15',text:'<strong>Reprimand</strong> means most nearly:',opts:['Praise','Promote','Scold','Arrest'],correct:2,exp:'Reprimand = a formal expression of disapproval.' /* TODO: expand explanation */}
];

const Q2B=[
{id:'2B-1',text:'<strong>Doctor : Hospital</strong><br>Officer : ____',opts:['City','Detachment','Street','Uniform'],correct:1,exp:'Doctor works in hospital; officer in detachment.' /* TODO: expand explanation */},
{id:'2B-2',text:'<strong>Trial : Verdict</strong><br>Investigation : ____',opts:['Crime','Evidence','Conclusion','Arrest'],correct:2,exp:'Trial→verdict; investigation→conclusion.' /* TODO: expand explanation */},
{id:'2B-3',text:'<strong>Hot : Cold</strong><br>Guilty : ____',opts:['Criminal','Convicted','Innocent','Charged'],correct:2,exp:'Opposites. Guilty↔innocent.' /* TODO: expand explanation */},
{id:'2B-4',text:'<strong>Author : Book</strong><br>Witness : ____',opts:['Crime','Testimony','Police','Lawyer'],correct:1,exp:'Author produces book; witness produces testimony.' /* TODO: expand explanation */},
{id:'2B-5',text:'<strong>Lock : Key</strong><br>Problem : ____',opts:['Mystery','Difficulty','Solution','Crime'],correct:2,exp:'Key opens lock; solution resolves problem.' /* TODO: expand explanation */},
{id:'2B-6',text:'<strong>Eye : See</strong><br>Ear : ____',opts:['Sound','Hear','Listen','Noise'],correct:1,exp:'Eye→see; ear→hear.' /* TODO: expand explanation */},
{id:'2B-7',text:'<strong>Sword : Knight</strong><br>Badge : ____',opts:['Detective','Shield','Authority','Officer'],correct:3,exp:'Knight carries sword; officer carries badge.' /* TODO: expand explanation */},
{id:'2B-8',text:'<strong>Chapter : Book</strong><br>Scene : ____',opts:['Actor','Stage','Play','Script'],correct:2,exp:'Chapter is part of book; scene is part of play.' /* TODO: expand explanation */},
{id:'2B-9',text:'<strong>Microscope : Small</strong><br>Telescope : ____',opts:['Star','Distant','Space','Large'],correct:1,exp:'Microscope→small; telescope→distant.' /* TODO: expand explanation */},
{id:'2B-10',text:'<strong>Honest : Trustworthy</strong><br>Corrupt : ____',opts:['Powerful','Dishonest','Criminal','Wealthy'],correct:1,exp:'Honest→trustworthy; corrupt→dishonest.' /* TODO: expand explanation */},
{id:'2B-11',text:'<strong>Fish : School</strong><br>Wolf : ____',opts:['Den','Pack','Forest','Hunt'],correct:1,exp:'A group of fish is a school; a group of wolves is a pack.' /* TODO: expand explanation */},
{id:'2B-12',text:'<strong>Finger : Hand</strong><br>Toe : ____',opts:['Leg','Shoe','Foot','Ankle'],correct:2,exp:'Finger is part of hand; toe is part of foot.' /* TODO: expand explanation */},
{id:'2B-13',text:'<strong>Guilty : Acquitted</strong><br>Hired : ____',opts:['Employed','Promoted','Terminated','Interviewed'],correct:2,exp:'Opposites. Guilty↔acquitted; hired↔terminated.' /* TODO: expand explanation */},
{id:'2B-14',text:'<strong>Suspect : Accused</strong><br>Witness : ____',opts:['Observer','Victim','Bystander','Informant'],correct:0,exp:'Suspect is formally called accused; witness is an observer.' /* TODO: expand explanation */},
{id:'2B-15',text:'<strong>Rain : Flood</strong><br>Neglect : ____',opts:['Care','Decay','Attention','Repair'],correct:1,exp:'Excessive rain causes flood; prolonged neglect causes decay.' /* TODO: expand explanation */}
];

export const languageSynonyms: Question[] = Q2A;
export const languageAnalogies: Question[] = Q2B;
