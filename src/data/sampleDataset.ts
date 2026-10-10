import { BorrowerRecord } from '../types';

export const RAW_CSV_DATA = `New Lan Number,Account Name,Contact no.,Emi Amt,BUCKET ,EMI OD ,MAIL ID,EMI Due From
001-017-401-000113,Vaghela Jagdishbhai Mohanbhai,9574455085,5033,X,10066,jagdishvaghela31@gmail.com,05-09-2026
001-017-401-000180,Vaghela Bhanubhai Gotabhai,9510518920,4400,X,8800,bhanuvaghela99@gmail.com,05-09-2026
001-017-401-000231,Patil Monika Rajesh,7622087035,4473,X,8946,Patilmonika15@gmail.com,05-09-2026
001-017-401-000224,Parmar Jagdishbhai Mathurbhai,9054278838,5543,X,11086,jagdish1286@gmail.com,05-09-2026
001-019-401-000287,Bhojani Sharmishthaben Prakashkumar,7046341202,5906,X,11812,sharmisth8921@gmail.com,10-09-2026
001-019-401-000315,Ayar Khodabhai Pratapbhai,8160097323,6882,X,13764,kpahir@48gmail.com,10-09-2026
001-019-401-000211,Raykar Kuldip Kailas,9970625767,5107,X,10214,Kuldipraykar5@gmail.com,10-09-2026
001-019-401-000350,Bhojani Alpeshbhai Jayntibhai,7622082372,6201,X,12402,alpeshbhojani248@gmail.com,10-09-2026
001-019-401-000319,Somabhai Bhojani Vimalaben,8140677854,4961,X,9922,bhojanihitesh15@gmail.com,10-09-2026
001-019-401-000338,Bhai Jayanti ,7046475992,4961,X,9922,s34043156@gmail.com,10-09-2026
001-017-401-000038,Rahulbhai Thakor ,6354383326,2675,X,5350,ithakor1955@gmail.com,10-09-2026
001-019-401-000313,Manojkumar Vaghela ,9316758923,6201,X,12402,vaghelamanoj2006@gmail.com,10-09-2026
001-019-401-000018,Kiranbhai Jagdishbhai Chekhaliya,9723347321,2834,X,5668,kirandharjiya0502@gmail.com,10-09-2026
001-019-401-000305,Bhojani Rameshbhai Ramabhai,7046473114,5155,X,10310,Bharatbharatp281@gmail.com,10-09-2026
001-019-401-000317,Shabhaibhai Bhojani Bhupatbhai,8347822311,4961,X,9922,janibhupatbhai1961@gmail.com,10-09-2026
001-017-401-000032,Sama Sikandar Mithubhai,7572894729,11996,X,23992,sikandarsama85@gmail.com,10-09-2026
001-001-401-003908,Munjariya Rekhaben Manojbhai,9727226502,4084,X,8168,munjariyamanojbhai25@gmail.com,05-09-2026
001-001-401-003406,Nanjibhai Ninama Hirabhai,7600417198,2577,X,5154,khninama1234@gmail.com,05-09-2026
001-001-401-004130,Panchal Madhuben ,7990281604,3535,X,7070,nareshpanchanaresh@gmail.com,05-09-2026
001-001-401-000628,Subhash Namdev Bhatkar,9925133767,4761,X,9522,snbhatkar64@gmail.com,10-09-2026
001-001-401-001625,Somabhai Nagjibhai Prajapati,9427658965,4256,X,4256,somaabhaiprajapati@gmail.com,10-09-2026
001-001-401-000193,BHUPATJI MAFAJI THAKOR,9712464133,4761,X,9522,thakorbhupat271@gmil.com,10-09-2026
001-001-401-003339,Katariya Dineshbhai Ramjibhai,9714232236,3963,X,7926,kdineshbhai86@gmail.com,10-09-2026
001-001-401-002460,Vasava Prahaladbhai ,9726754882,4012,X,8024,mdpowertech01@gmail.com,10-09-2026
001-001-401-001736,Rahematmiya Mahebubmiya Malek,9624305629,4158,X,8316,malikmdrahmat276@gmail.com,10-09-2026
001-001-401-002100,Yasminbibi Amjadkhan Pathan,7990745720,5168,X,10336,ahpathan768@gmail.com,10-09-2026
001-001-401-001889,Girvatsinh Fulabhai Rathod,9726805976,5381,X,10762,rathodsanju971@gmail.com,10-09-2026
001-001-401-000957,Nathu Ram Rathor,9904156410,6566,X,13132,nathuram111@gmail.com,10-09-2026
001-001-401-001687,Bashirbhai Mamadbhai Menda,7990327092,4280,X,8560,bm58615861@gmail.com,10-09-2026
001-001-401-000447,Rameshbhai  Salat,9898780837,11164,X,22328,rameshsalat007@gamil.com,10-09-2026
001-001-401-000338,RINABEN SANJAY KANGAD,8160412763,6082,X,12164,sanjaykangad112@gmail.com,10-09-2026
001-001-401-002788,Maheta Kishorbhai Radhavbhai,9978276156,4256,X,8512,mehtachirag666@gmail.com,10-09-2026
001-001-401-003464,Jerabhai Khant Kantibhai,9099129386,3852,X,7704,khantmukesh473@gmail.com,10-09-2026
001-001-401-003454,Rajeshbhai Chauhan Radhaben,7600719826,7752,X,15504,rajesh180968@yahoo.com,10-09-2026
001-001-401-003315,Malek Intekhabalam ,9978133788,8082,X,16164,9978133788@gmail.com,10-09-2026
001-001-401-002381,Zala Lakshmanbhai Somabhai,9979089508,4619,X,9238,mamamandapdarbar@gmail.com,10-09-2026
001-001-401-002355,Lakum Niramlaben Hanubhai,9974692763,3891,X,7782,nakumdipal7@gmail.com,10-09-2026
001-001-401-001137,Laxman Mevalal Jayswal,7600994485,5472,X,10944,laxman22@gmail.com,10-09-2026
001-001-401-003376,Kailashben Makwana ,9265001379,4229,X,8458,djmakvana77@gmail.com,10-09-2026
001-001-401-002930,Patel Sunilkumar Jashbhai,9904270147,4457,X,8914,sunilpatel0051@gmail.com,10-09-2026
001-001-401-000417,Chhanabhai Hamirbhai Bathvar,9712397365,5977,X,11954,chhanabhaibathvar5871@gmail.com,10-09-2026
001-001-401-003032,Soparmar Sanjaybhai Mohanbhai,7984810528,4158,X,8316,Sodha9952@gmail.com,10-09-2026
001-001-401-002891,Bhoi Sughirbhai Punambhai,9327811461,3599,X,7198,ranjanrajput1524@gmail.com,10-09-2026
001-001-401-003088,Parmar Ambalal Chhotabhai,9714697080,4458,X,8916,rr600326@gmail.com,10-09-2026
001-046-401-001656,Khandekar Sangita Uttamchand,7666797189,7403,X,7403,viratkhandekar65@gmail.com,05-09-2026
001-046-401-001329,Subhedar Subhash Vasudeo,8459991021,2614,X,5228,subhedarsubhash431@gmail.com,10-09-2026
001-046-401-001299,Kodwani Droupadibai Shankarlal,7058699502,3307,X,6614,kodwaniankush665@gmail.com,10-09-2026
001-046-401-001332,Bobate Sudhakar Janardhan,7620752199,4935,X,9870,sudhakarbobate8@gmail.com,10-09-2026
001-046-401-001338,Bisen Kausalabai Savalram,7517415520,3963,X,7926,S3818694@gmail.com,10-09-2026
001-046-401-001431,Maji Biswanath Ranjit,9172974109,3963,X,7926,biswanathmaji358@gmail.com,10-09-2026
001-046-401-001295,Samudre Arati Vinod,9371768639,6809,X,13618,sandeepsamudre1987@gmail.com,10-09-2026
001-046-401-001467,Hingmire Dhondiram Shankar,9309383139,3574,X,7148,gavandirsm57@gmail.com,10-09-2026
001-046-401-001263,Tandekar Sharda Narendra,9284114012,4620,X,9240,tandekarnarendra4@gmail.com,10-09-2026
001-046-401-001298,Agrawal Rahul Prakash,9422143910,4864,X,9728,rahulagrawal230684@gmail.com,10-09-2026
001-046-401-001449,Sheikh Salim Sheikh Shaukat Ali,9096431608,3696,X,7392,samlimshaik24@gmail.com,10-09-2026
001-046-401-001489,Lale Mahendra Gulab,9359975255,4935,X,9870,mahendralale0@gmail.com,10-09-2026
001-046-401-001491,Dohale Mohan Daulat,7517648458,4935,X,9870,ashishdhole110@gmail.com,10-09-2026
001-005-401-000038,Omprakash Ganpat Nimje,8490816558,10037,X,20074,#N/A,03-09-2026
001-005-401-001795,Prajapat Anita ,8530010200,17874,X,35748,8530010200@GMAIL.COM,05-09-2026
001-005-401-001569,Hirabhai Rathod Rameshbhai,8866441435,3671,X,7342,dharmikdharmik664@gmail.com,05-09-2026
001-005-401-001878,Rathod Madhuresh ,9662851314,3749,X,7498,9662851314@GMAIL.COM,05-09-2026
001-005-401-001830,Gosai Shyamgiri Rameshgiri,9979147124,3282,X,6564,9979147124@gmail.com,05-09-2026
001-005-401-002182,Mahajan Pratibhaben Narendrabhai,7359746732,6225,X,6225,7359746732@GMAIL.COM,05-09-2026
001-005-401-002207,Rathod Shilaben Ranglal,8390599072,7340,X,14680,rsandipkumar5018@gmail.com,05-09-2026
001-005-401-000287,Krunal Ranjitbhai Rana,7048111537,5991,X,11982,KRUNALRANA994@GMAIL.COM,10-09-2026
001-005-401-001535,Devi Manju ,9162398655,7342,X,14684,9162398655@GMAIL.COM,10-09-2026
001-005-401-001040,Vasava Ganeshbhai Lavghanbhai,7567736030,3691,X,7382,7567736030@GMAIL.COM,10-09-2026
001-005-401-000578,Indubai Gulab Patil,9898697008,4073,X,8146,Patilananda335@gmail.com,10-09-2026
001-005-401-001248,Bhanderi Ghanshyam Devjibhai,9724329575,2189,X,4378,9724329575@gmail.com,10-09-2026
001-005-401-000820,Iqbal Rasul Bhai Mansuri,9574013966,2834,X,5668,ssjanu86@gmail.com,10-09-2026
001-005-401-000980,Patel Rajesh Gamanlal,9825474996,4450,X,8900,9825474996@GMAIL.COM,10-09-2026
001-005-401-000967,Patel Rajubhai Amratbhai,9979956169,3902,X,7804,9979956169@gmail.com,10-09-2026
001-005-401-001611,Kachariya Savitaben Dhanjibhai,9879161328,3806,X,7612,9879161328@GMAIL.COM,10-09-2026
001-005-401-001491,Boliya Ranabhai Merabhai,9898260709,7084,X,14168,rohitboliya134@gmail.com,10-09-2026
001-005-401-000466,Raval Lakshmiben Dhulabhai,9327365736,3405,X,6810,ravaldalpat53@gmail.com,10-09-2026
001-005-401-000194,Jagdish  Parmar,9726835992,4006,X,4006,parmarjagdish4984@gmail.com,10-09-2026
001-005-401-001019,Solanki Reshmaben Jayantibhai,9879367508,3405,X,6810,jentisolanki1@gmail.com,10-09-2026
001-005-401-000652,Mitulkumar Dipakbhai Patel,9913705971,3088,X,6176,9913705971@GMAIL.COM,10-09-2026
001-005-401-000778,Hetalben Niteshbhai Motisariya,9428113400,3168,X,6336,niteshpatel225@gmail.com,10-09-2026
001-050-401-003117,Jamod Laljibhai Vasharambhai,7041762076,5167,X,10334,ssanjayjamod6@gmail.com,05-09-2026
001-050-401-003278,Parmabhai Damor Kalubhai,9313885722,3865,X,7730,kalubhaid@gmail.com,05-09-2026
001-050-401-003274,Damor Bharatbhai Parmabhai,9106290191,3865,X,7730,bharatbhaidamor@gmail.com,05-09-2026
001-050-401-003442,Mansukhbhai Damor ,9313202730,3865,X,7730,manshukhbhaid@gmail.com,05-09-2026
001-050-401-003720,Bambhava Visabhai ,9106100301,4181,X,8362,bharvadn424@gmail.com,10-09-2026
001-050-401-002480,Kanaji Khant Bharatbhai,8141158656,4449,X,8898,pankajthakor675490@gmail.com,10-09-2026
001-050-401-002228,Boricha Tarun Mohanbhai,9925083121,5485,X,10970,tarunbhai54@gmail.com,10-09-2026
001-004-401-000405,Tanna Nimita  Kamleshbhai,9189802252,4819,X,9638,kamleshtanna6@gmail.com,10-09-2026
001-050-401-001817,Patni Abul Husen,9978857948,4377,X,8754,abdulhusen65@gmail.com,10-09-2026
001-033-401-000044,Chudasama Arvindba Ramdevsinh,9904647437,9428,X,18856,prc86in@gmail.com,10-09-2026
001-004-401-000837,Hansrajbhai Shamjibhai Dhankecha,9904890487,3848,X,7696,Hansrajbhai1963@gmail.com,10-09-2026
001-004-401-001424,Bhanabhai Makwana Thakarshibhai,7016675707,5187,X,10374,makwanaramesh9825@gmail.com,10-09-2026
001-050-401-002382,Hirabhai Khata ,9726931998,4377,X,8754,hirakhata5@gmail.com,10-09-2026
001-050-401-002245,Valani Chetanbhai Natubhai,8780119700,6099,X,12198,chetanvalani1256@gmail.com,10-09-2026
001-001-401-003622,Diwan Yakubsha Ismailsha,7043607252,5957,X,11914,ayandiwen16@gmail.com,05-09-2026
001-001-401-003994,Desai Laljibhai Ramabhai,9909636070,6103,X,12206,bhavnadesai270596@gmail.com,05-09-2026
001-001-401-004120,Ratilal Parmar Rameshbhai,9913204835,3282,X,6564,kamleshparmar24690@gmail.com,05-09-2026
001-001-401-004353,Parmar Rameshbhai Bhikhabhai,9925978638,3270,X,6540,chetanparmar9866@gmail.com,05-09-2026
001-001-401-004407,Darbar Dineshsingh Laxmansingh,8200786484,6355,X,12710,bodanadineshbhai52@gmail.com,05-09-2026
001-001-401-004354,Talpada Sureshbhai Babubhai,8155022417,4619,X,9238,suresh.talpada1983@gmail.com,05-09-2026
001-001-401-004317,Makvana Manjulaben Mukeshbhai,8849448703,3681,X,7362,makawanamitesh781@gmail.com,05-09-2026
001-001-401-000814,Dilipbhai  Bhoi,7600737791,5781,X,11562,drajput66620@gmail.com,10-09-2026
001-001-401-001480,Simaben Nizam Modiya,9726917176,17965,X,35930,shimamodhiya99@gmail.com,10-09-2026
001-001-401-002201,Alpeshkumar Rameshbhai Thakor,9624512788,3740,X,3740,alpeshthakor316@gmail.com,10-09-2026
001-001-401-002478,Bhanushali Jyotiben Manishkumar,9925742382,5153,X,10306,bhanushalibharat155@gmail.com,10-09-2026
001-001-401-002689,Bharvad Navghanbhai Kalubhai,9574212601,6293,X,12586,navghanbharvadnavghanbharvad616@gmail.com,10-09-2026
001-001-401-001754,Mahamadsafi Kasammiya Alve,8460461386,6709,X,13418,Alvekasammiya786@gmail.com,10-09-2026
001-001-401-000696,Urmisha Vipulbhai Patel,9714595807,5101,X,10202,harshpatel.hp9.hp@gmail.com,10-09-2026
001-001-401-002873,Mali Suman Dadaji,9822920126,3891,X,7782,Sharad.khairnar111@gmail.com,10-09-2026
001-001-401-003455,Vaghela Vipulsinh Pratapsinh,7621876724,6712,X,13424,vipulsinhvaghela2406@gmail.com,10-09-2026
001-001-401-002406,Solanki Chandubhai Ravjibhai,7567985528,3392,X,6784,Solankichandu77@gmail.com,10-09-2026
001-001-401-001589,Dhanrajiya Dipakbhai Bhalubhai,6358680033,4487,X,8974,Dipakdhanjariya12@gmail.com,10-09-2026
001-001-401-002833,Zala Laxmanji Dahyaji,6354519075,4644,X,9288,zalasanjay3839@gmail.com,10-09-2026
001-050-401-002407,Khant Kalaji Dhanaji,9712430328,3323,X,6646,khantkala72@gmail.com,10-09-2026
001-001-401-001197,Rajubhai Parshotambhai Solanki,9712798513,4147,X,8294,rajubhaisolanki241@gmail.com,10-09-2026
001-001-401-002955,Bariya Manjibhai Karshanbhai,8140706459,3847,X,7694,rrajput4701@gmail.com,10-09-2026
001-001-401-001286,Pareshbhai Ambalal Pansuriya,9924616893,2813,X,5626,pansuriya_paresh77@gmail.com,10-09-2026
001-001-401-000571,Prabhatbhai Mohanlal Dodiya,9909127088,3586,X,7172,dodiyavipulba@gmail.com,10-09-2026
001-001-401-003459,Vanazara Vijaybhai Dhirubhai,7567511756,4084,X,8168,Vanzaravijay709@gmail.com,10-09-2026
001-001-401-000907,Tarsingbhai Jayantibhai Rathwa,9904843089,10020,X,20040,aayushi_ent@yahoo.com,10-09-2026
001-001-401-002759,Mansuri Taherabibi Mohammedhanif,8347262516,2602,X,5204,mansuritaheera9@gmail.com,10-09-2026
001-001-401-000960,Anas Arifbhai Kasam,9724407377,7945,X,15890,hasankasam786@gmail.com,10-09-2026
001-001-401-001293,Jayantiji Kapurji Thakor,9429553061,3800,X,7600,thakorjayanti@gmail.com,10-09-2026
001-001-401-000295,MANOJ RAMESHBHAI BODANA,9662956777,7122,X,14244,manojbodana46@gmail.com,10-09-2026
001-001-401-002043,Rajubhai Bhikhubhai Rathod,7621867081,4105,X,8210,rajubhairathod@gmail.com,10-09-2026
001-001-401-002718,Modiya Dineshbhai Savjibhai,9601428287,3918,X,3918,juliyasmodiya@gmail.com,10-09-2026
001-050-401-002427,Pagi Bharatji Dahyaji,9638107704,3243,X,6486,pagibharat82@gmail.com,10-09-2026
001-001-401-002311,Vaghora Narshibhai Virabhai,7874712789,2969,X,5938,narshibhaivaghora@gmail.com,10-09-2026
001-021-401-000439,Khan Nafisa ,8319913343,2795,X,5590,nomail@nomail.com,05-09-2026
001-021-401-000400,Bee Farjana ,9039397576,4765,X,9530,pathansikandar945@gmail.com,05-09-2026
001-021-401-000484,Singh Bhupendra ,9111166870,5008,X,10016,Bhupendrathakur6666@gmail.com,05-09-2026
001-021-401-000488,Mehra Shaifali Vilas,9691184698,5749,X,5749,Mehrashefali591@gmail.com,05-09-2026
001-021-401-000170,Singh Shambhu ,8349253195,2553,X,5106,s02909023@gmail.com,10-09-2026
001-021-401-000279,Khan Aashif ,7489326062,4377,X,8754,aarifkhan6@gmail.com,10-09-2026
001-021-401-000379,Dawar Jashwant ,9981024041,4400,X,8800,ndawar900@gmail.com,10-09-2026
001-021-401-000131,Ravi  Jaiswal,9644939939,4864,X,9728,Veernews@gmail.com,10-09-2026
001-021-401-000345,Malviya Abhinav ,7489873358,4449,X,8898,rajamalviya57667@gmail.com,10-09-2026
001-021-401-000371,Ali Sabir ,9753631520,2990,X,5980,sabirkhan199018@gmail.com,10-09-2026
001-021-401-000388,Khan Mujaad ,9993122387,5908,X,11816,khantarif848@gmail.com,10-09-2026
001-021-401-000274,Lal Lakhan ,9617837603,4134,X,8268,lakhanlalbudhni@gmail.com,10-09-2026
001-050-401-002062,Gohil Punabhai Bhagvanbhai,8160080583,6215,X,12430,PUNABHAI@gmail.com,10-09-2026
001-004-401-001330,Subhash Pravinbhai Saresa,7990344750,4985,X,4985,Subhashsaresa44@gmail.com,10-09-2026
001-050-401-002153,Solanki Manojbhai Dhirubhai,8882551780,4922,X,9844,rajeetchudasama@gmail.com,10-09-2026
001-019-401-000368,Mohanbhai Vaghela Ishvarbhai,9904801027,5033,X,10066,vaghelaishwerbhai@gmail.com,10-09-2026
001-040-401-001210,Bamb Krushnanand Kachardas,7666008337,3963,X,7926,krushnanandbamb59@gmail.com,10-09-2026
001-050-401-002791,Kariya Anand Navneetbhai,8141933272,6552,X,13104,anandbhai26@gmail.com,05-09-2026
001-050-401-002832,Sherasiya Jenamben ,9601103195,4473,X,4473,saresiyasufiyan@gmail.com,05-09-2026
001-050-401-003919,Malivad Rayjibhai Nathabhai,9512184531,3963,X,7926,maivadryji81@gmail.com,05-09-2026
001-050-401-003542,Babubhai Khata ,9726583502,4084,X,8168,khatababu83@gmail.com,05-09-2026
001-050-401-002717,Surmabhai Vagdiya ,9586119228,3744,X,7488,hiteshvagadiya555@gmail.com,10-09-2026
001-004-401-001005,Ayubbhai Ismailbhai Sodha,9722125111,5042,X,10084,nirali.mahida6@gamail.com,10-09-2026
001-050-401-002108,Shekh Gulamsha Bhachalsha,6354516437,4169,X,8338,tripurari.K14@gmail.com,10-09-2026
001-050-401-001966,Motibhai Makvana Mukeshbhai,8980367214,3891,X,7782,mukeshbhai01@gmail.com,10-09-2026
001-050-401-002384,Mori Minaben Karashanbhai,9924048387,3914,X,7828,minabenmori@gmail.com,10-09-2026
001-050-401-001755,Kumbhar Ibrahim Ismail,9825857201,5472,X,10944,sahilkumbhar744@gmail.com,10-09-2026
001-035-401-000301,Bano Samim ,9462831994,4449,X,8898,SUFI90751@GMAIL.COM,05-09-2026
001-035-401-000337,Gurjar Lala Ram,7728036285,4692,X,4692,LR2832036@GMAIL.COM,05-09-2026
001-035-401-000377,Mali Khan Chand,8000388075,14629,X,29258,KHANCHANDMALI4@GMAIL.COM,05-09-2026
001-035-401-000389,Rawat Krishna ,8209951702,4449,X,8898,KR8893691@GMAIL.COM,05-09-2026
001-035-401-000559,Devi Geeta ,9783342203,3559,X,7118,SSUNILGOSWAMI67@GMAIL.COM,05-09-2026
001-035-401-000555,Farhan Mohammed ,8209342172,6895,X,13790,MOHSINI145@GMAIL.COM,05-09-2026
001-032-401-000035,Khan Sumar ,6378652331,4693,X,9386,sumarkhan6578@gmail.com,10-09-2026
001-035-401-000141,Mohammad Nur ,8949043434,4499,X,8998,IM562267@GMAIL.COM,10-09-2026
001-035-401-000134,Kumar Mahendra ,9664193051,9225,X,18450,mbhata439@gmail.com,10-09-2026
001-032-401-000007,Kanwar Kokila ,8890779191,4864,X,9728,singhvishwa336@gmail.com,10-09-2026
001-032-401-000037,Ram Rakba ,7568160462,4620,X,9240,narenderchoudhary1818@gmail.com,10-09-2026
001-032-401-000029,Ram Jiva ,8890895665,4742,X,9484,basantsiyag66@gmail.com,10-09-2026
001-035-401-000277,Rawat Gopal Singh,8003239040,6566,X,13132,GOPALSINGH0016011992@GMAIL.COM,10-09-2026
001-035-401-000103,Choudhary Ishika ,8905876108,8511,X,17022,cishika108@gmail.com,10-09-2026
001-035-401-000229,Devi Manju ,7727981665,4571,X,9142,MANUDEVI@GMAIL.COM,10-09-2026
001-032-401-000023,Ram Ghamanda ,9799063340,4027,X,8054,narenderchoudhary1818@gmail.com,10-09-2026
001-035-401-000211,Balan Suresh Kumar,8529524348,6917,X,13834,SURESHKUMAR@GMAIL.COM,10-09-2026
001-035-401-000213,Santosh SANTOSH ,9024493109,6236,X,12472,SANTOSH@GMAIL.COM,10-09-2026
001-035-401-000113,Ram Laxman ,7725934245,4620,X,9240,LAXMANRAM77255@GMAIL.COM,10-09-2026
001-035-401-000287,Gamka Gamka ,8000450830,4741,X,9482,PPOORAN77@GMAIL.COM,10-09-2026
001-032-401-000102,Khan Ahshan ,7374889314,7295,X,14590,raishkhanofficial@gmail.com,10-09-2026
001-020-401-000199,Bangale Akshay Ravindra,8788702260,5072,X,10144,akshaybangale23@gmail.com,10-09-2026`;

export function parseCSV(csvText: string): BorrowerRecord[] {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  // Parse header
  const headerLine = lines[0];
  const headers = headerLine.split(',').map((h) => h.trim().toLowerCase());

  const findIdx = (possibleNames: string[]) => {
    return headers.findIndex((h) => possibleNames.some((p) => h.includes(p)));
  };

  const lanIdx = findIdx(['lan', 'account no', 'loan no']);
  const nameIdx = findIdx(['account name', 'name', 'borrower']);
  const contactIdx = findIdx(['contact', 'mobile', 'phone']);
  const emiAmtIdx = findIdx(['emi amt', 'emi amount', 'instalment']);
  const bucketIdx = findIdx(['bucket']);
  const totalOdIdx = findIdx(['emi od', 'total overdue', 'overdue', 'od amt']);
  const mailIdx = findIdx(['mail', 'email']);
  const dueFromIdx = findIdx(['due from', 'due date', 'emi due']);

  const records: BorrowerRecord[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Simple CSV parse handling potential commas or standard split
    const cols = line.split(',').map((c) => c.trim());
    if (cols.length < 4) continue;

    records.push({
      id: `row-${i}-${cols[lanIdx >= 0 ? lanIdx : 0] || Math.random()}`,
      lanNumber: lanIdx >= 0 ? cols[lanIdx] : cols[0] || '',
      accountName: nameIdx >= 0 ? cols[nameIdx] : cols[1] || '',
      contactNo: contactIdx >= 0 ? cols[contactIdx] : cols[2] || '',
      emiAmt: emiAmtIdx >= 0 ? cols[emiAmtIdx] : cols[3] || '0',
      bucket: bucketIdx >= 0 ? cols[bucketIdx] : cols[4] || '',
      totalOverdue: totalOdIdx >= 0 ? cols[totalOdIdx] : cols[5] || '0',
      mailId: mailIdx >= 0 ? cols[mailIdx] : cols[6] || '',
      emiDueFrom: dueFromIdx >= 0 ? cols[dueFromIdx] : cols[7] || '',
    });
  }

  return records;
}

export const INITIAL_SAMPLE_RECORDS: BorrowerRecord[] = parseCSV(RAW_CSV_DATA);
