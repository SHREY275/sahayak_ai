export interface Scheme {
  id: string;
  name: {
    en: string;
    hi: string;
    mr: string;
  };
  eligibility: {
    en: string[];
    hi: string[];
    mr: string[];
  };
  documents: {
    en: string[];
    hi: string[];
    mr: string[];
  };
  amount: string;
  category: 'education' | 'agriculture' | 'healthcare' | 'employment' | 'housing';
  officialLink: string;
}

export const schemes: Scheme[] = [
  {
    id: 'pm-kisan',
    name: {
      en: 'PM-KISAN Scheme',
      hi: 'पीएम-किसान योजना',
      mr: 'पीएम-किसान योजना'
    },
    eligibility: {
      en: ['Small and marginal farmers', 'Landholding up to 2 hectares', 'Indian citizen'],
      hi: ['छोटे और सीमांत किसान', '2 हेक्टेयर तक भूमि', 'भारतीय नागरिक'],
      mr: ['छोटे आणि सीमांत शेतकरी', '२ हेक्टर पर्यंत जमीन', 'भारतीय नागरिक']
    },
    documents: {
      en: ['Aadhaar Card', 'Land Records', 'Bank Account Details'],
      hi: ['आधार कार्ड', 'भूमि रिकॉर्ड', 'बैंक खाता विवरण'],
      mr: ['आधार कार्ड', 'जमीन रेकॉर्ड', 'बँक खाते तपशील']
    },
    amount: '₹6,000/year',
    category: 'agriculture',
    officialLink: 'https://pmkisan.gov.in'
  },
  {
    id: 'pradhan-mantri-awas',
    name: {
      en: 'Pradhan Mantri Awas Yojana',
      hi: 'प्रधानमंत्री आवास योजना',
      mr: 'प्रधानमंत्री आवास योजना'
    },
    eligibility: {
      en: ['Annual income below ₹18 lakh', 'First-time home buyer', 'No other house in family name'],
      hi: ['वार्षिक आय ₹18 लाख से कम', 'पहली बार घर खरीदार', 'परिवार के नाम कोई अन्य घर नहीं'],
      mr: ['वार्षिक उत्पन्न ₹18 लाख पेक्षा कमी', 'प्रथमच घर खरेदी', 'कुटुंबाच्या नावे दुसरे घर नाही']
    },
    documents: {
      en: ['Income Certificate', 'Property Documents', 'Bank Statements'],
      hi: ['आय प्रमाण पत्र', 'संपत्ति दस्तावेज', 'बैंक स्टेटमेंट'],
      mr: ['उत्पन्न प्रमाणपत्र', 'मालमत्ता कागदपत्रे', 'बँक स्टेटमेंट']
    },
    amount: 'Up to ₹2.5 lakh subsidy',
    category: 'housing',
    officialLink: 'https://pmaymis.gov.in'
  },
  {
    id: 'nsf-scholarship',
    name: {
      en: 'National Scholarship Portal',
      hi: 'राष्ट्रीय छात्रवृत्ति पोर्टल',
      mr: 'राष्ट्रीय शिष्यवृत्ती पोर्टल'
    },
    eligibility: {
      en: ['SC/ST/OBC students', 'Family income below ₹2.5 lakh', 'Class 1st to PhD'],
      hi: ['एससी/एसटी/ओबीसी छात्र', 'पारिवारिक आय ₹2.5 लाख से कम', 'कक्षा 1 से पीएचडी तक'],
      mr: ['एससी/एसटी/ओबीसी विद्यार्थी', 'कौटुंबिक उत्पन्न ₹2.5 लाख पेक्षा कमी', 'वर्ग 1 ते पीएचडी']
    },
    documents: {
      en: ['Caste Certificate', 'Income Certificate', 'Marksheets', 'Bank Details'],
      hi: ['जाति प्रमाण पत्र', 'आय प्रमाण पत्र', 'मार्कशीट', 'बैंक विवरण'],
      mr: ['जात प्रमाणपत्र', 'उत्पन्न प्रमाणपत्र', 'मार्कशीट', 'बँक तपशील']
    },
    amount: '₹1,000 - ₹20,000/year',
    category: 'education',
    officialLink: 'https://scholarships.gov.in'
  },
  {
    id: 'ayushman-bharat',
    name: {
      en: 'Ayushman Bharat PM-JAY',
      hi: 'आयुष्मान भारत पीएम-जेएवाई',
      mr: 'आयुष्मान भारत पीएम-जेएवाई'
    },
    eligibility: {
      en: ['SECC 2011 beneficiary', 'Rural and urban poor families', 'No income limit'],
      hi: ['एसईसीसी 2011 लाभार्थी', 'ग्रामीण और शहरी गरीब परिवार', 'कोई आय सीमा नहीं'],
      mr: ['एसईसीसी 2011 लाभार्थी', 'ग्रामीण आणि शहरी गरीब कुटुंबे', 'कोणतीही उत्पन्न मर्यादा नाही']
    },
    documents: {
      en: ['Aadhaar Card', 'Family ID', 'SECC Database verification'],
      hi: ['आधार कार्ड', 'पारिवारिक आईडी', 'एसईसीसी डेटाबेस सत्यापन'],
      mr: ['आधार कार्ड', 'कौटुंबिक आयडी', 'एसईसीसी डेटाबेस पडताळणी']
    },
    amount: '₹5 lakh/family/year',
    category: 'healthcare',
    officialLink: 'https://pmjay.gov.in'
  },
  {
    id: 'mudra-loan',
    name: {
      en: 'Pradhan Mantri MUDRA Yojana',
      hi: 'प्रधानमंत्री मुद्रा योजना',
      mr: 'प्रधानमंत्री मुद्रा योजना'
    },
    eligibility: {
      en: ['Small business owners', 'Non-farm income generating activities', 'Loan up to ₹10 lakh'],
      hi: ['छोटे व्यापारी', 'गैर-कृषि आय गतिविधियां', '₹10 लाख तक ऋण'],
      mr: ['लहान व्यापारी', 'गैर-शेती उत्पन्न क्रियाकलाप', '₹10 लाख पर्यंत कर्ज']
    },
    documents: {
      en: ['Business Plan', 'Identity Proof', 'Address Proof', 'Bank Statements'],
      hi: ['व्यापार योजना', 'पहचान प्रमाण', 'पता प्रमाण', 'बैंक स्टेटमेंट'],
      mr: ['व्यापार योजना', 'ओळख पुरावा', 'पत्ता पुरावा', 'बँक स्टेटमेंट']
    },
    amount: 'Up to ₹10 lakh',
    category: 'employment',
    officialLink: 'https://mudra.org.in'
  },
  {
    id: 'kanyashree',
    name: {
      en: 'Kanyashree Prakalpa',
      hi: 'कन्याश्री प्रकल्प',
      mr: 'कन्याश्री प्रकल्प'
    },
    eligibility: {
      en: ['Girl students aged 13-18', 'Studying in class 8-12', 'Annual family income below ₹1.2 lakh'],
      hi: ['13-18 आयु की छात्राएं', 'कक्षा 8-12 में अध्ययन', 'पारिवारिक आय ₹1.2 लाख से कम'],
      mr: ['13-18 वयातील मुलींसाठी', 'वर्ग 8-12 मध्ये शिक्षण', 'कौटुंबिक उत्पन्न ₹1.2 लाख पेक्षा कमी']
    },
    documents: {
      en: ['School Certificate', 'Age Proof', 'Income Certificate', 'Bank Account'],
      hi: ['स्कूल प्रमाण पत्र', 'आयु प्रमाण', 'आय प्रमाण पत्र', 'बैंक खाता'],
      mr: ['शाळा प्रमाणपत्र', 'वय पुरावा', 'उत्पन्न प्रमाणपत्र', 'बँक खाते']
    },
    amount: '₹750-₹25,000/year',
    category: 'education',
    officialLink: 'https://kanyashree.gov.in'
  },
  {
    id: 'atal-pension',
    name: {
      en: 'Atal Pension Yojana',
      hi: 'अटल पेंशन योजना',
      mr: 'अटल पेन्शन योजना'
    },
    eligibility: {
      en: ['Age 18-40 years', 'Indian citizen', 'Bank account holder'],
      hi: ['18-40 वर्ष आयु', 'भारतीय नागरिक', 'बैंक खाताधारक'],
      mr: ['18-40 वर्षे वय', 'भारतीय नागरिक', 'बँक खाताधारक']
    },
    documents: {
      en: ['Aadhaar Card', 'PAN Card', 'Bank Account Details', 'Nominee Details'],
      hi: ['आधार कार्ड', 'पैन कार्ड', 'बैंक खाता विवरण', 'नॉमिनी विवरण'],
      mr: ['आधार कार्ड', 'पॅन कार्ड', 'बँक खाते तपशील', 'नॉमिनी तपशील']
    },
    amount: '₹1,000-₹5,000/month pension',
    category: 'employment',
    officialLink: 'https://npscra.nsdl.co.in'
  },
  {
    id: 'jan-aushadhi',
    name: {
      en: 'Pradhan Mantri Bharatiya Janaushadhi Pariyojana',
      hi: 'प्रधानमंत्री भारतीय जनऔषधि परियोजना',
      mr: 'प्रधानमंत्री भारतीय जनऔषधी परियोजना'
    },
    eligibility: {
      en: ['All citizens', 'No income restrictions', 'Generic medicine access'],
      hi: ['सभी नागरिक', 'कोई आय प्रतिबंध नहीं', 'जेनेरिक दवा पहुंच'],
      mr: ['सर्व नागरिक', 'कोणत्याही उत्पन्न मर्यादा नाहीत', 'जेनेरिक औषध प्रवेश']
    },
    documents: {
      en: ['Prescription', 'Identity Proof'],
      hi: ['डॉक्टर का पर्चा', 'पहचान प्रमाण'],
      mr: ['डॉक्टरांचे पर्चे', 'ओळख पुरावा']
    },
    amount: '50-90% discount on medicines',
    category: 'healthcare',
    officialLink: 'https://janaushadhi.gov.in'
  },
  {
    id: 'swachh-bharat',
    name: {
      en: 'Swachh Bharat Mission',
      hi: 'स्वच्छ भारत मिशन',
      mr: 'स्वच्छ भारत मिशन'
    },
    eligibility: {
      en: ['Rural households', 'No toilet facility', 'BPL families priority'],
      hi: ['ग्रामीण परिवार', 'शौचालय सुविधा नहीं', 'बीपीएल परिवारों को प्राथमिकता'],
      mr: ['ग्रामीण कुटुंबे', 'शौचालय सुविधा नाही', 'बीपीएल कुटुंबांना प्राधान्य']
    },
    documents: {
      en: ['BPL Card', 'Residence Proof', 'Bank Account'],
      hi: ['बीपीएल कार्ड', 'निवास प्रमाण', 'बैंक खाता'],
      mr: ['बीपीएल कार्ड', 'निवास पुरावा', 'बँक खाते']
    },
    amount: '₹12,000 for toilet construction',
    category: 'housing',
    officialLink: 'https://swachhbharatmission.gov.in'
  },
  {
    id: 'skill-india',
    name: {
      en: 'Skill India Mission',
      hi: 'स्किल इंडिया मिशन',
      mr: 'स्किल इंडिया मिशन'
    },
    eligibility: {
      en: ['Youth aged 15-45', 'School dropouts or unemployed', 'Skill development seekers'],
      hi: ['15-45 आयु के युवा', 'स्कूल छोड़ने वाले या बेरोजगार', 'कौशल विकास चाहने वाले'],
      mr: ['15-45 वयातील तरुण', 'शाळा सोडणारे किंवा बेकार', 'कौशल्य विकास शोधणारे']
    },
    documents: {
      en: ['Age Proof', 'Education Certificate', 'Identity Proof'],
      hi: ['आयु प्रमाण', 'शिक्षा प्रमाण पत्र', 'पहचान प्रमाण'],
      mr: ['वय पुरावा', 'शिक्षण प्रमाणपत्र', 'ओळख पुरावा']
    },
    amount: 'Free training + stipend',
    category: 'employment',
    officialLink: 'https://skillindia.gov.in'
  }
];
