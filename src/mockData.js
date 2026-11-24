// Preview-only mock data (Step 1). Replaced by D1 data in later steps.
// Phone numbers are fake and already in the 9665xxxxxxxx format.
export const pets = [
  { id: 'p1', uuid: 'demo-3f9c1a52-0b7e-4c1d-9a41-7d2e5b8c6f10', name: { ar: 'لونا', en: 'Luna' }, species: 'cat',
    breed: { ar: 'شيرازي', en: 'Persian' }, weight: 4.2, allergies: { ar: 'لا يوجد', en: 'None known' },
    owner: { ar: 'سارة العتيبي', en: 'Sara Al-Otaibi' }, phone: '966500000001', boarding: 'none' },
  { id: 'p2', uuid: 'demo-b81d44e7-52aa-4f0e-8c33-1a9f0d7e2b65', name: { ar: 'ماكس', en: 'Max' }, species: 'dog',
    breed: { ar: 'لابرادور', en: 'Labrador' }, weight: 28.5, allergies: { ar: 'الدجاج', en: 'Chicken' },
    owner: { ar: 'فهد الدوسري', en: 'Fahad Al-Dosari' }, phone: '966500000002', boarding: 'boarding' },
  { id: 'p3', uuid: 'demo-0c6e97d3-7f12-45b8-b2d9-6e4a8c1f3a07', name: { ar: 'بيلا', en: 'Bella' }, species: 'cat',
    breed: { ar: 'شارع', en: 'Domestic shorthair' }, weight: 3.6, allergies: { ar: 'لا يوجد', en: 'None known' },
    owner: { ar: 'نورة القحطاني', en: 'Noura Al-Qahtani' }, phone: '966500000003', boarding: 'grooming' },
]

export const vaccinations = [
  { id: 'v1', petId: 'p1', vaccine: { ar: 'الثلاثي القطط', en: 'FVRCP' }, due: '2026-12-02', state: 'soon' },
  { id: 'v2', petId: 'p2', vaccine: { ar: 'السعار', en: 'Rabies' }, due: '2026-11-10', state: 'overdue' },
  { id: 'v3', petId: 'p3', vaccine: { ar: 'مضاد الديدان', en: 'Deworming' }, due: '2027-02-15', state: 'ok' },
]

export const summaries = {
  exam: { ar: 'فحص عام: نشاط طبيعي، الأسنان نظيفة، لا علامات التهاب.', en: 'General exam: normal activity, clean teeth, no signs of inflammation.' },
  xray: { ar: 'أشعة الصدر: الرئتان والقلب ضمن الحدود الطبيعية.', en: 'Chest X-ray: lungs and heart within normal limits.' },
}

export const clinic = { phone: '966500000000' }
