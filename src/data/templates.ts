import { MasterTemplate, NoticeLanguage } from '../types';

export const DEFAULT_ENGLISH_TEMPLATE: MasterTemplate = {
  language: 'en',
  name: 'Standard English Dunning Notice',
  salutation: 'Dear {{Account Name}}',
  openingParagraph:
    'This communication is issued with reference to the loan facility availed by you under Loan Account No. {{New Lan Number}} and the terms and conditions contained in the Loan Documents executed by you in relation thereto. As per the Loan Documents, you are required to pay the Equated Monthly Instalments ("EMIs") and all other amounts payable on their respective Due Dates. Our records indicate that the EMI(s) due for the month(s) of {{Month}}, remain overdue. The details of the overdue amount are set out below:',
  defaultEventParagraph:
    'Kindly note that, in accordance with the terms and conditions of the Loan Documents, the delay/default in payment of the above-mentioned EMI(s) has resulted in the occurrence of an Event of Default, as defined under the Loan-cum-Hypothecation Agreement. We request you to regularize your loan account by making payment of the overdue amount at the earliest.',
  callToActionParagraph: '',
  legalWarningParagraph:
    'You are hereby called upon to regularize the overdue amount within 7 (Seven) days from the date of this communication, failing which the Lender shall, without prejudice to any other rights available under the Loan Documents or applicable law, be at liberty to initiate appropriate legal proceedings, recovery actions and such other measures as may be deemed necessary for recovery of the Outstanding Obligations',
  disregardParagraph:
    'If you have already made the payment, kindly disregard this communication and share the payment details or transaction reference with us.',
  signoffGreeting: 'Regards,',
  signoffEntity: 'Ratnaafin Capital',
  tableHeaders: {
    dueDate: 'EMI Due Date',
    emiAmount: 'EMI Amount (₹)',
    overdueAmount: 'Overdue Amount (₹)',
  },
};

export const DEFAULT_GUJARATI_TEMPLATE: MasterTemplate = {
  language: 'gu',
  name: 'પ્રમાણભૂત ગુજરાતી નોટિસ (Standard Gujarati Dunning Notice)',
  salutation: 'પ્રિય {{Account Name}}',
  openingParagraph:
    'આ પત્ર તમારા લોન એકાઉન્ટ નં. {{New Lan Number}} વિશે છે. તમારી લોનની શરતો મુજબ, તમારે દર મહિને નક્કી કરેલી તારીખે EMI અને અન્ય ચૂકવવાપાત્ર રકમ સમયસર ભરવાની હોય છે. અમારા રેકોર્ડ મુજબ {{Month}} મહિનાની નીચે દર્શાવેલ EMI હજુ સુધી ભરવામાં આવી નથી.',
  defaultEventParagraph:
    'કૃપા કરીને ધ્યાન આપો કે ઉપર જણાવેલ EMI સમયસર ન ભરવાના કારણે તમારી લોન ડિફોલ્ટમાં ગઈ છે, જે લોનના નિયમો અને શરતો મુજબ છે.',
  callToActionParagraph:
    'તેથી, તમને વિનંતી છે કે શક્ય તેટલી વહેલી તકે બાકી રકમ ભરીને તમારું લોન એકાઉન્ટ નિયમિત કરો.',
  legalWarningParagraph:
    'આ પત્ર મળ્યાની તારીખથી 7 (સાત) દિવસની અંદર બાકી રકમ ભરવાની રહેશે. જો આ સમયગાળામાં ચૂકવણી કરવામાં નહીં આવે, તો લોનના નિયમો અને લાગુ કાયદા મુજબ બાકી રકમની વસૂલાત માટે કાનૂની કાર્યવાહી અથવા અન્ય જરૂરી પગલાં લેવામાં આવી શકે છે.',
  disregardParagraph:
    'જો તમે પહેલેથી જ ચૂકવણી કરી દીધી હોય, તો કૃપા કરીને આ પત્રને અવગણો અને ચૂકવણીની વિગતો અથવા ટ્રાન્ઝેક્શન રેફરન્સ અમને મોકલો.',
  signoffGreeting: 'આભાર,',
  signoffEntity: 'Ratnaafin Capital',
  tableHeaders: {
    dueDate: 'EMI ભરવાની તારીખ',
    emiAmount: 'EMI રકમ (₹)',
    overdueAmount: 'બાકી રકમ (₹)',
  },
};

export const MONTH_NAMES = [
  { value: 'January', label: 'January', labelGu: 'જાન્યુઆરી (January)' },
  { value: 'February', label: 'February', labelGu: 'ફેબ્રુઆરી (February)' },
  { value: 'March', label: 'March', labelGu: 'માર્ચ (March)' },
  { value: 'April', label: 'April', labelGu: 'એપ્રિલ (April)' },
  { value: 'May', label: 'May', labelGu: 'મે (May)' },
  { value: 'June', label: 'June', labelGu: 'જૂન (June)' },
  { value: 'July', label: 'July', labelGu: 'જુલાઈ (July)' },
  { value: 'August', label: 'August', labelGu: 'ઓગસ્ટ (August)' },
  { value: 'September', label: 'September', labelGu: 'સપ્ટેમ્બર (September)' },
  { value: 'October', label: 'October', labelGu: 'ઓક્ટોબર (October)' },
  { value: 'November', label: 'November', labelGu: 'નવેમ્બર (November)' },
  { value: 'December', label: 'December', labelGu: 'ડિસેમ્બર (December)' },
];
