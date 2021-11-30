import { NavModel } from "src/models/nav.model";

export const ADMIN = 'Admin';
export const CUSTOMER = 'Customer';
export const VOICE = 'Voice';
export const FILE = 'File';


export const CLASSWORK = 'classwork';
export const HOMEWORK = 'homework';
export const ASSIGNMENT = 'assignment';
export const IMAGE_CROP_SIZE = 800;
export const QUESTION_TYPES = [
    {
        Id: `one-correct`,
        Name: `Choose correct answer`,
        Icon: ``
    },
    {
        Id: `multi-correct`,
        Name: `Choose multi correct answers`,
        Icon: ``
    },
    {
        Id: `true-or-false`,
        Name: `True or False`,
        Icon: ``
    },
    {
        Id: `essay`,
        Name: `Essay`,
        Icon: ``
    }
];

//'Essay', 'Choose one correct answer' 'True or False', 'Multiple Choice'
export const MENUITEMS: NavModel[] = [
    {
        Name: `Home`,
        Url: ``
    },
    {
        Name: `About Us`,
        Url: `about-us`
    },

    {
        Name: `Contact Us`,
        Url: `contact-us`

    },
    {
        Name: `Login`,
        Url: `login`
    },
    {
        Name: `Sign up`,
        Url: `sign-up`
    }

]


export const ROLES = [
    { Id: 'admins', Name: 'Admin', Class: ['active'] },
    { Id: 'teachers', Name: 'Teacher', Class: [] },
    { Id: 'learners', Name: 'Learner', Class: [] }
];
export const USER_TABS = [
    { Id: 1, Name: 'Person details', Class: ['active'] },
    { Id: 2, Name: 'Subjects', Class: [] },
];
export const SUBMISIONS_TABS = [
    { Id: 1, Name: 'Submited', Class: ['active'] },
    { Id: 2, Name: 'History', Class: [] },
];
export const USER_SUBJECTS_TABS = [
    { Id: 1, Name: 'Current Year', Class: ['active'] },
    { Id: 2, Name: 'Past Years', Class: [] },
];
export const SCORE_ATTEMPT_OPTIONS = [
    { Id: 1, Name: 'Last attempt', Class: ['active'] },
    { Id: 1, Name: 'Highest attempt', Class: [''] },
    { Id: 1, Name: 'Lowest attempt', Class: [''] },
    { Id: 1, Name: 'First attempt', Class: [''] },
];
export const YES_NO_OPTIONS = [
    { Id: 1, Name: 'Yes', Class: ['active'] },
    { Id: 1, Name: 'No', Class: [''] }
];
export const TITLES = ["Mr.", "Mrs.", "Ms.", "Prof.", "Dr."];


export const ASSIGNMENT_STATUSES = {
    STARTED: {
        Name: 'started'
    },

    SUBMITED: {
        Name: 'submited'
    },

    MARKED: {
        Name: 'marked'
    }
}