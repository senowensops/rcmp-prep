import type { Question } from '@/types';

const Q3A=[
{id:'3A-1',text:'<span class="expr">47 + 86 = ?</span>',opts:['123','131','133','143'],correct:2,exp:'47+86=133.' /* TODO: expand explanation */},
{id:'3A-2',text:'<span class="expr">15 × 8 = ?</span>',opts:['110','115','120','125'],correct:2,exp:'15×8=120.' /* TODO: expand explanation */},
{id:'3A-3',text:'<span class="expr">234 + 589 = ?</span>',opts:['813','823','833','843'],correct:1,exp:'234+589=823.' /* TODO: expand explanation */},
{id:'3A-4',text:'<span class="expr">25 × 12 = ?</span>',opts:['275','290','300','325'],correct:2,exp:'25×12=300.' /* TODO: expand explanation */},
{id:'3A-5',text:'<span class="expr">99 + 47 + 13 = ?</span>',opts:['149','157','159','169'],correct:2,exp:'99+47+13=159.' /* TODO: expand explanation */},
{id:'3A-6',text:'<span class="expr">16 × 7 = ?</span>',opts:['102','108','112','122'],correct:2,exp:'16×7=112.' /* TODO: expand explanation */},
{id:'3A-7',text:'<span class="expr">1,245 + 3,678 = ?</span>',opts:['4,823','4,913','4,923','5,023'],correct:2,exp:'1245+3678=4923.' /* TODO: expand explanation */},
{id:'3A-8',text:'<span class="expr">50 × 34 = ?</span>',opts:['1,500','1,600','1,700','1,800'],correct:2,exp:'50×34=1700.' /* TODO: expand explanation */},
{id:'3A-9',text:'<span class="expr">888 + 212 = ?</span>',opts:['1,000','1,100','1,090','1,010'],correct:1,exp:'888+212=1100.' /* TODO: expand explanation */},
{id:'3A-10',text:'<span class="expr">9 × 11 × 3 = ?</span>',opts:['279','287','297','303'],correct:2,exp:'9×11=99, 99×3=297.' /* TODO: expand explanation */},
{id:'3A-11',text:'<span class="expr">456 + 378 = ?</span>',opts:['824','834','814','844'],correct:1,exp:'456+378=834.' /* TODO: expand explanation */},
{id:'3A-12',text:'<span class="expr">65 × 20 = ?</span>',opts:['1,200','1,250','1,300','1,350'],correct:2,exp:'65×20=1300.' /* TODO: expand explanation */},
{id:'3A-13',text:'<span class="expr">777 + 333 = ?</span>',opts:['1,010','1,100','1,110','1,111'],correct:2,exp:'777+333=1110.' /* TODO: expand explanation */},
{id:'3A-14',text:'<span class="expr">14 × 15 = ?</span>',opts:['190','200','210','220'],correct:2,exp:'14×15=210.' /* TODO: expand explanation */},
{id:'3A-15',text:'<span class="expr">2,467 + 1,588 = ?</span>',opts:['3,955','4,045','4,055','4,155'],correct:2,exp:'2467+1588=4055.' /* TODO: expand explanation */}
];

const Q3B=[
{id:'3B-1',text:'<span class="expr">8 + 4 × 3 = ?</span>',opts:['20','36','16','24'],correct:0,exp:'4×3=12, 8+12=20.' /* TODO: expand explanation */},
{id:'3B-2',text:'<span class="expr">48 ÷ 6 − 3 = ?</span>',opts:['4','5','8','6'],correct:1,exp:'48÷6=8, 8−3=5.' /* TODO: expand explanation */},
{id:'3B-3',text:'<span class="expr">(5 + 7) × 4 = ?</span>',opts:['33','48','27','52'],correct:1,exp:'(5+7)=12, 12×4=48.' /* TODO: expand explanation */},
{id:'3B-4',text:'<span class="expr">100 − 6 × 12 = ?</span>',opts:['28','1128','32','24'],correct:0,exp:'6×12=72, 100−72=28.' /* TODO: expand explanation */},
{id:'3B-5',text:'<span class="expr">3 + 18 ÷ 3 × 2 = ?</span>',opts:['14','15','9','12'],correct:1,exp:'18÷3=6, 6×2=12, 3+12=15.' /* TODO: expand explanation */},
{id:'3B-6',text:'<span class="expr">(9 − 3) × (4 + 2) = ?</span>',opts:['30','36','42','24'],correct:1,exp:'6×6=36.' /* TODO: expand explanation */},
{id:'3B-7',text:'<span class="expr">72 ÷ 8 + 5 × 3 = ?</span>',opts:['24','39','27','18'],correct:0,exp:'9+15=24.' /* TODO: expand explanation */},
{id:'3B-8',text:'<span class="expr">4 × (10 − 3) + 6 = ?</span>',opts:['40','34','46','28'],correct:1,exp:'4×7=28, 28+6=34.' /* TODO: expand explanation */},
{id:'3B-9',text:'<span class="expr">60 ÷ (4 + 6) × 3 = ?</span>',opts:['15','18','12','21'],correct:1,exp:'60÷10=6, 6×3=18.' /* TODO: expand explanation */},
{id:'3B-10',text:'<span class="expr">2 + 3 × 4 − 10 ÷ 2 = ?</span>',opts:['7','9','12','5'],correct:1,exp:'3×4=12, 10÷2=5, 2+12−5=9.' /* TODO: expand explanation */},
{id:'3B-11',text:'<span class="expr">5 × 5 − 3 × 3 = ?</span>',opts:['16','22','4','66'],correct:0,exp:'25−9=16.' /* TODO: expand explanation */},
{id:'3B-12',text:'<span class="expr">(12 + 8) ÷ (2 + 3) = ?</span>',opts:['3','4','5','6'],correct:1,exp:'20÷5=4.' /* TODO: expand explanation */},
{id:'3B-13',text:'<span class="expr">7 + 3 × 6 − 4 = ?</span>',opts:['21','56','36','25'],correct:0,exp:'3×6=18, 7+18−4=21.' /* TODO: expand explanation */},
{id:'3B-14',text:'<span class="expr">100 ÷ 4 ÷ 5 = ?</span>',opts:['5','125','10','50'],correct:0,exp:'100÷4=25, 25÷5=5.' /* TODO: expand explanation */},
{id:'3B-15',text:'<span class="expr">8 × (3 + 2) − 6 × 4 = ?</span>',opts:['16','64','2','20'],correct:0,exp:'8×5=40, 6×4=24, 40−24=16.' /* TODO: expand explanation */}
];

export const numericalBasic: Question[] = Q3A;
export const numericalBedmas: Question[] = Q3B;
