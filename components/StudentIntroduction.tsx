'use client';

import {useRef, useState, type FormEvent} from 'react';
import {ArrowLeft, ArrowRight, BookOpen, Check, GraduationCap} from 'lucide-react';
import {
  courseOptionsFor, initialStudentProfile, interestOptions, standardOptions,
  subjectOptions, validStudentProfile, yearOptionsFor, type StudentProfile,
} from '@/lib/student-profile';

type IntroductionProps = {
  initialProfile?: StudentProfile;
  initialRegion: string;
  busy: boolean;
  error?: string;
  editing?: boolean;
  hasSavedRoute?: boolean;
  onSubmit: (profile: StudentProfile, region: string) => void;
  onCancel?: () => void;
};

const regions = ['All India', 'Andhra Pradesh', 'Telangana'];

export default function StudentIntroduction({
  initialProfile, initialRegion, busy, error, editing = false, hasSavedRoute = false, onSubmit, onCancel,
}: IntroductionProps) {
  const [profile, setProfile] = useState<StudentProfile>(() => ({
    ...(initialProfile || initialStudentProfile),
    interests: [...(initialProfile?.interests || [])],
    subjects: [...(initialProfile?.subjects || [])],
  }));
  const [region, setRegion] = useState(regions.includes(initialRegion) ? initialRegion : 'All India');
  const [step, setStep] = useState(0);
  const [formError, setFormError] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  const courses = courseOptionsFor(profile.standard);
  const years = yearOptionsFor(profile.standard);

  function moveTo(next: number) {
    setFormError('');
    setStep(next);
    requestAnimationFrame(() => {
      heading.current?.focus({preventScroll: true});
      heading.current?.scrollIntoView({block: 'start', behavior: 'auto'});
    });
  }

  function toggle(field: 'interests' | 'subjects', id: string, maximum: number) {
    setFormError('');
    setProfile(current => {
      const previous = current[field];
      const values = previous.includes(id) ? previous.filter(value => value !== id)
        : id === 'unsure' ? ['unsure']
          : [...previous.filter(value => value !== 'unsure'), id].slice(0, maximum);
      return {...current, [field]: values};
    });
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    if (step === 0) {
      if (!profile.standard || (courses.length > 0 && !profile.course) || (years.length > 0 && !profile.year)) {
        setFormError('Please choose your current study details before continuing.');
        return;
      }
      moveTo(1);
      return;
    }
    if (!profile.interests.length || !profile.subjects.length) {
      setFormError('Choose at least one interest and one subject, or select “I’m not sure yet.”');
      return;
    }
    if (!validStudentProfile(profile)) {
      setFormError('Please review your study details and selections.');
      return;
    }
    onSubmit(profile, region);
  }

  function choices(field: 'interests' | 'subjects', options: {id: string; label: string}[], maximum: number) {
    const count = profile[field].filter(value => value !== 'unsure').length;
    return <>
      <p className="introduction-choice-hint" id={`introduction-${field}-hint`}>Choose up to {maximum}. <span>{count} selected</span></p>
      <div className="introduction-choices">
        {options.map(option => {
          const checked = profile[field].includes(option.id);
          const disabled = busy || (!checked && option.id !== 'unsure' && count >= maximum);
          return <label key={option.id} className={`introduction-choice${checked ? ' is-selected' : ''}${disabled ? ' is-disabled' : ''}${option.id === 'unsure' ? ' unsure-choice' : ''}`}>
            <input type="checkbox" name={field} value={option.id} checked={checked} disabled={disabled} onChange={() => toggle(field, option.id, maximum)} aria-describedby={`introduction-${field}-hint`}/>
            <span className="introduction-check" aria-hidden="true">{checked && <Check size={12}/>}</span>
            <span>{option.label}</span>
          </label>;
        })}
      </div>
    </>;
  }

  return <section className="student-introduction" aria-labelledby="introduction-title">
    <div className="introduction-header">
      <span className="introduction-eyebrow">{editing ? 'Your study details' : hasSavedRoute ? 'Your saved career plan' : 'Before you choose your route'}</span>
      <h1 id="introduction-title">{editing ? 'Keep your plan up to date.' : hasSavedRoute ? 'Add your study details.' : 'Start with where you are.'}</h1>
      <p>{editing ? 'Update your current stage and interests. Your chosen career route stays the same.' : hasSavedRoute ? 'Your career route is already saved. Add your current studies and interests to put the right tasks first.' : 'Tell us what you study and enjoy. Then you can explore the options and choose your career route.'}</p>
    </div>

    <div className="introduction-card">
      <ol className="introduction-progress" aria-label="Study details progress">
        {['Current study', 'Interests & subjects'].map((label, index) => <li key={label} className={index === step ? 'current' : index < step ? 'complete' : ''} aria-current={index === step ? 'step' : undefined}>
          <span>{index < step ? <Check size={13}/> : index + 1}</span><strong>{label}</strong>
        </li>)}
      </ol>

      <form onSubmit={submit} className="introduction-form">
        <div className="introduction-section-title">
          <span className="introduction-section-icon" aria-hidden="true">{step === 0 ? <GraduationCap size={22}/> : <BookOpen size={22}/>}</span>
          <div><h2 ref={heading} tabIndex={-1}>{step === 0 ? 'What are you studying now?' : 'What do you enjoy?'}</h2><p>{step === 0 ? 'Your current stage helps us put the right tasks first.' : hasSavedRoute ? 'These answers help tailor your preparation. Your saved route stays the same.' : 'These answers help explain your options. You will make the final choice.'}</p></div>
        </div>

        {step === 0 ? <fieldset className="introduction-study-fields" disabled={busy}>
          <legend className="introduction-sr-only">Current study and admission region</legend>
          <label className="introduction-field wide-field" htmlFor="introduction-standard">Current class or course
            <select id="introduction-standard" value={profile.standard} required onChange={event => {setProfile(current => ({...current, standard: event.target.value, course: '', year: ''})); setFormError('');}}>
              <option value="" disabled>Choose your current stage</option>
              {standardOptions.map(option => <option key={option.id} value={option.id}>{option.label}</option>)}
            </select>
          </label>
          {courses.length > 0 && <label className={`introduction-field${years.length ? '' : ' wide-field'}`} htmlFor="introduction-course">{profile.standard.startsWith('class-') ? 'Subject group' : 'Course or branch'}
            <select id="introduction-course" value={profile.course} required onChange={event => setProfile(current => ({...current, course: event.target.value}))}>
              <option value="" disabled>Choose {profile.standard.startsWith('class-') ? 'your subject group' : 'your course'}</option>
              {courses.map(option => <option key={option.id} value={option.id}>{option.label}</option>)}
            </select>
          </label>}
          {years.length > 0 && <label className="introduction-field" htmlFor="introduction-year">Current year
            <select id="introduction-year" value={profile.year} required onChange={event => setProfile(current => ({...current, year: event.target.value}))}>
              <option value="" disabled>Choose your current year</option>
              {years.map(year => <option key={year} value={year}>{year}</option>)}
            </select>
          </label>}
          <label className="introduction-field wide-field" htmlFor="introduction-region">Admission region
            <select id="introduction-region" value={region} onChange={event => setRegion(event.target.value)}>{regions.map(value => <option key={value} value={value}>{value}</option>)}</select>
            <small>Choose All India if you are considering colleges in different states.</small>
          </label>
        </fieldset> : <div className="introduction-interest-fields">
          <fieldset disabled={busy}><legend>Your interests</legend>{choices('interests', interestOptions, 3)}</fieldset>
          <fieldset disabled={busy}><legend>Subjects you enjoy</legend>{choices('subjects', subjectOptions, 5)}</fieldset>
        </div>}

        {(formError || error) && <p className="form-error introduction-error" role="alert">{formError || error}</p>}
        <div className="introduction-actions">
          {step === 1 ? <button type="button" className="text-control" onClick={() => moveTo(0)} disabled={busy}><ArrowLeft size={15}/>Back</button> : onCancel ? <button type="button" className="text-control" onClick={onCancel} disabled={busy}>Cancel</button> : <span className="introduction-save-note">You can update these details in Profile.</span>}
          <button type="submit" className="button primary" disabled={busy}>{busy ? 'Saving…' : step === 0 ? 'Continue' : editing ? 'Save details' : hasSavedRoute ? 'Continue to my plan' : 'Continue to my route'}{!busy && <ArrowRight size={16}/>}</button>
        </div>
      </form>
    </div>
  </section>;
}
