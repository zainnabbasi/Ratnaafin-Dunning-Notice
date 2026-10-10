export interface BorrowerRecord {
  id: string;
  lanNumber: string;
  accountName: string;
  contactNo: string;
  emiAmt: number | string;
  bucket: string;
  totalOverdue: number | string;
  mailId: string;
  emiDueFrom: string;
}

export type NoticeLanguage = 'en' | 'gu';

export interface NoticeVariables {
  lanNumber: string;
  accountName: string;
  emiAmt: string;
  totalOverdue: string;
  emiDueFrom: string;
  month: string;
}

export interface MasterTemplate {
  language: NoticeLanguage;
  name: string;
  salutation: string;
  openingParagraph: string;
  defaultEventParagraph: string;
  callToActionParagraph: string;
  legalWarningParagraph: string;
  disregardParagraph: string;
  signoffGreeting: string;
  signoffEntity: string;
  tableHeaders: {
    dueDate: string;
    emiAmount: string;
    overdueAmount: string;
  };
}

export const DEFAULT_LETTERHEAD_URL =
  'https://cdn.prod.website-files.com/690c6973d9b47ca4139c3daf/6aca3179530601c52cf897b4_Letterhead.jpg';

export const DEFAULT_LOGO_URL =
  'https://cdn.prod.website-files.com/67c294789e940b8e55eedf82/6a64b031c8e258e2df148083_PNG_Aligned_Logo.png';

export interface LetterheadConfig {
  backgroundImage: string | null; // Data URL or URL of master letterhead JPG/PNG
  topMargin: number; // in px clearance from top
  bottomMargin: number; // in px clearance from bottom
  leftMargin: number; // in px clearance from left
  rightMargin: number; // in px clearance from right
}

export const DEFAULT_LETTERHEAD_CONFIG: LetterheadConfig = {
  backgroundImage: DEFAULT_LETTERHEAD_URL,
  topMargin: 140,
  bottomMargin: 155,
  leftMargin: 60,
  rightMargin: 60,
};

export interface BatchGenerationProgress {
  isGenerating: boolean;
  current: number;
  total: number;
  currentAccountName?: string;
  status: 'idle' | 'generating' | 'zipping' | 'completed' | 'error';
  errorMessage?: string;
  downloadUrl?: string;
  downloadFilename?: string;
}
