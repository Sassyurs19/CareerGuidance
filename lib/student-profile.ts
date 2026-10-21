export type StudentProfile = {
  standard: string;
  course: string;
  year: string;
  interests: string[];
  subjects: string[];
};

type ProfileOption = {id: string; label: string};

export const initialStudentProfile: StudentProfile = {
  standard: '', course: '', year: '', interests: [], subjects: [],
};

export const standardOptions: ProfileOption[] = [
  {id: 'class-8', label: 'Class 8'},
  {id: 'class-9', label: 'Class 9'},
  {id: 'class-10', label: 'Class 10'},
  {id: 'class-11', label: 'Class 11 / Intermediate first year'},
  {id: 'class-12', label: 'Class 12 / Intermediate second year'},
  {id: 'diploma', label: 'Diploma'},
  {id: 'iti', label: 'ITI'},
  {id: 'vocational', label: 'Vocational course'},
  {id: 'degree', label: 'Undergraduate degree'},
  {id: 'postgraduate', label: 'Postgraduate course'},
  {id: 'working', label: 'Finished studying / working'},
];

export const interestOptions: ProfileOption[] = [
  {id: 'technology', label: 'Technology & computing'},
  {id: 'engineering', label: 'Building & engineering'},
  {id: 'healthcare', label: 'Healthcare & helping people'},
  {id: 'science', label: 'Science & research'},
  {id: 'business', label: 'Business & finance'},
  {id: 'design', label: 'Art & design'},
  {id: 'society', label: 'Law & public service'},
  {id: 'communication', label: 'Writing & communication'},
  {id: 'practical', label: 'Practical & hands-on work'},
  {id: 'unsure', label: "I'm not sure yet"},
];

export const subjectOptions: ProfileOption[] = [
  {id: 'mathematics', label: 'Mathematics'},
  {id: 'physics', label: 'Physics'},
  {id: 'chemistry', label: 'Chemistry'},
  {id: 'biology', label: 'Biology'},
  {id: 'computing', label: 'Computer science'},
  {id: 'business', label: 'Business & commerce'},
  {id: 'economics', label: 'Economics'},
  {id: 'social-studies', label: 'History & social studies'},
  {id: 'languages', label: 'Languages & writing'},
  {id: 'art', label: 'Art & design'},
  {id: 'practical', label: 'Workshop & practical subjects'},
  {id: 'unsure', label: "I'm not sure yet"},
];

const schoolCourses: ProfileOption[] = [
  {id: 'mpc', label: 'MPC — Mathematics, Physics & Chemistry'},
  {id: 'bipc', label: 'BiPC — Biology, Physics & Chemistry'},
  {id: 'commerce', label: 'Commerce'},
  {id: 'humanities', label: 'Humanities / Arts'},
  {id: 'other', label: 'Another subject group'},
];

const engineeringCourses: ProfileOption[] = [
  {id: 'branch-cse', label: 'Computer Science Engineering'},
  {id: 'branch-ece', label: 'Electronics & Communication Engineering'},
  {id: 'branch-eee', label: 'Electrical & Electronics Engineering'},
  {id: 'branch-mech', label: 'Mechanical Engineering'},
  {id: 'branch-civil', label: 'Civil Engineering'},
  {id: 'branch-ai', label: 'Artificial Intelligence & Data Science'},
  {id: 'branch-it', label: 'Information Technology'},
  {id: 'branch-chemical', label: 'Chemical Engineering'},
];

const otherDegreeCourses: ProfileOption[] = [
  {id: 'science', label: 'Science / Mathematics'},
  {id: 'lifescience', label: 'Life sciences'},
  {id: 'medicine', label: 'Medicine'},
  {id: 'allied', label: 'Allied health / Nursing / Pharmacy'},
  {id: 'business', label: 'Commerce / Business / Management'},
  {id: 'arts', label: 'Arts / Humanities'},
  {id: 'law', label: 'Law'},
  {id: 'design', label: 'Design'},
  {id: 'other', label: 'Another course'},
];

export function courseOptionsFor(standard: string): ProfileOption[] {
  if (standard === 'class-11' || standard === 'class-12') return schoolCourses;
  if (standard === 'diploma') return [...engineeringCourses, {id: 'other', label: 'Another diploma'}];
  if (standard === 'degree' || standard === 'postgraduate') return [...engineeringCourses, ...otherDegreeCourses];
  if (standard === 'iti') return [
    {id: 'branch-eee', label: 'Electrical trades'},
    {id: 'branch-ece', label: 'Electronics trades'},
    {id: 'branch-mech', label: 'Mechanical / Fitting / Welding trades'},
    {id: 'branch-it', label: 'Computer & IT trades'},
    {id: 'other', label: 'Another trade'},
  ];
  if (standard === 'vocational') return [
    {id: 'branch-it', label: 'Computing & IT'},
    {id: 'business', label: 'Business & commerce'},
    {id: 'allied', label: 'Healthcare assistance'},
    {id: 'design', label: 'Design & creative work'},
    {id: 'other', label: 'Another vocational course'},
  ];
  return [];
}

export function yearOptionsFor(standard: string): string[] {
  if (standard === 'diploma' || standard === 'vocational') return ['Year 1', 'Year 2', 'Year 3'];
  if (standard === 'iti' || standard === 'postgraduate') return ['Year 1', 'Year 2', 'Year 3'];
  if (standard === 'degree') return ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Internship'];
  return [];
}

function validSelections(value: unknown, options: ProfileOption[], maximum: number): value is string[] {
  if (!Array.isArray(value) || !value.length || value.length > maximum) return false;
  if (!value.every(item => typeof item === 'string' && options.some(option => option.id === item))) return false;
  if (new Set(value).size !== value.length) return false;
  return !value.includes('unsure') || value.length === 1;
}

export function validStudentProfile(value: unknown): value is StudentProfile {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const profile = value as Record<string, unknown>;
  const keys = ['standard', 'course', 'year', 'interests', 'subjects'];
  if (Object.keys(profile).length !== keys.length || !Object.keys(profile).every(key => keys.includes(key))) return false;
  if (typeof profile.standard !== 'string' || !standardOptions.some(option => option.id === profile.standard)) return false;
  const courses = courseOptionsFor(profile.standard);
  const years = yearOptionsFor(profile.standard);
  if (typeof profile.course !== 'string' || (courses.length ? !courses.some(option => option.id === profile.course) : profile.course !== '')) return false;
  if (typeof profile.year !== 'string' || (years.length ? !years.includes(profile.year) : profile.year !== '')) return false;
  return validSelections(profile.interests, interestOptions, 3) && validSelections(profile.subjects, subjectOptions, 5);
}

export function studentStandardLabel(profile: StudentProfile): string {
  const standard = standardOptions.find(option => option.id === profile.standard)?.label || 'Study details not added';
  const course = courseOptionsFor(profile.standard).find(option => option.id === profile.course)?.label;
  return [standard, course, profile.year].filter(Boolean).join(' · ');
}
