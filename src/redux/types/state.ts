import {PersistState} from 'redux-persist';

export interface IAuth {
  username: string | null;
  password: string | null;
}
export interface IFirebaseAuth {
  email: string;
  refreshToken: string;
}
export interface IAuthState extends IAuth {
  loggingIn: boolean;
  loggedIn: boolean;
  error?: Error | null;
  firebase?: IFirebaseAuth;
}

export enum Entity {
  'Notice',
  'File',
  'Assignment',
}
export enum Language {
  'zh',
  'en',
}
export interface IPushNotificationSettings {
  agreementAcknowledged: boolean;
  deviceToken?: string;
  enabled: boolean;
  includeHiddenCourses: boolean;
}
export interface IAlarmSettings {
  courseAlarm: boolean;
  courseAlarmOffset?: number;
  assignmentAlarm: boolean;
  assignmentAlarmOffset?: number;
}
export interface ISettingsState {
  calendarSync: boolean;
  courseCalendarId?: string;
  assignmentCalendarId?: string;
  syncedAssignments: {
    [assignmentId: string]: string;
  };
  alarms: IAlarmSettings;
  hasUpdate: boolean;
  lang?: Language | null;
  isCompact: boolean;
  hasUnread: Entity[];
  graduate: boolean;
  pushNotifications: IPushNotificationSettings;
}

export interface ISemestersState {
  isFetching: boolean;
  items: string[];
  error?: Error | null;
}

export interface ICourse {
  id: string;
  name: string;
  teacherName?: string;
}
export interface ICoursesState {
  isFetching: boolean;
  hidden: string[];
  items: ICourse[];
  error?: Error | null;
}

export interface INotice {
  courseId: string;
  id: string;
  title: string;
  publisher: string;
  publishTime: string;
  markedImportant: boolean;
  content: string;
  hasRead: boolean;
  attachmentName?: string;
  attachmentUrl?: string;
  url: string;
}
export interface INoticesState {
  isFetching: boolean;
  unread: string[];
  pinned: string[];
  favorites: string[];
  items: INotice[];
  error?: Error | null;
}

export interface IFile {
  courseId: string;
  id: string;
  title: string;
  description: string;
  size: string;
  fileType: string;
  markedImportant: boolean;
  isNew: boolean;
  uploadTime: string;
  downloadUrl: string;
}
export interface IFilesState {
  isFetching: boolean;
  unread: string[];
  pinned: string[];
  favorites: string[];
  items: IFile[];
  error?: Error | null;
}

export interface IAssignment {
  courseId: string;
  id: string;
  title: string;
  description?: string;
  deadline: string;
  attachmentName?: string;
  attachmentUrl?: string;
  submitted: boolean;
  submitTime?: string;
  submittedContent?: string;
  submittedAttachmentName?: string;
  submittedAttachmentUrl?: string;
  grade?: number;
  gradeLevel?: string;
  gradeTime?: string;
  graderName?: string;
  gradeContent?: string;
  gradeAttachmentName?: string;
  gradeAttachmentUrl?: string;
  studentHomeworkId: string;
}
export interface IAssignmentsState {
  isFetching: boolean;
  unread: string[];
  pinned: string[];
  favorites: string[];
  items: IAssignment[];
  error?: Error | null;
}

export interface PersistPartial {
  _persist: PersistState;
}

export interface IAppState {
  auth: IAuthState & PersistPartial;
  settings: ISettingsState & PersistPartial;
  semesters: ISemestersState;
  currentSemester: string;
  courses: ICoursesState;
  notices: INoticesState;
  files: IFilesState;
  assignments: IAssignmentsState;
}
export type IPersistAppState = IAppState & PersistPartial;
