export const MAX_UPLOAD_FILE_SIZE = 5242880; // 5MB
export const DEFAULT_MAX_FILES = 5;
export const DEFAULT_MIN_FILE = 1;
export const OPT_LENGTH = 6;

export enum FormFieldType {
  INPUT = "input", // added
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput", // added
  OTP_INPUT = "otpInput", // added
  SELECT = "select", // added
  RADIO = "radio", // added
  CHECKBOX = "checkbox", //added
  SWITCH = "switch",
  SLIDER = "slider",
  DATE_PICKER = "datePicker", // added
  DROP_ZONE = "dropZone", // added
  SKELETON = "skeleton",
  HIDDEN = "hidden",
  HONEY_POT = "honeyPot",
}

export enum UploaderType {
  MULTIPLE_ANY = "multiple_any",
  SINGLE_ANY = "single_any",
  SINGLE_DOCUMENT = "single_document",
  MULTIPLE_DOCUMENT = "multiple_documents",
  SINGLE_IMAGE = "single_image",
  MULTIPLE_IMAGE = "multiple_images",
}

export const AcceptedFileTypes = {
  document: {
    "application/pdf": [".pdf"],
    "application/msword": [".doc", ".docx"],
    "application/vnd.ms-excel": [".xls", ".xlsx"],
    "text/csv": [".csv"],
  },
  image: { "image/*": [".jpg", ".jpeg", ".png", '.heic', '.heif' ] },
  default: {
   "application/pdf": [".pdf"],
   "application/msword": [".doc", ".docx"],
   "application/vnd.ms-excel": [".xls", ".xlsx"],
   "text/csv": [".csv"],
   "text/plain": [".txt"],
   "image/*": [".jpg", ".jpeg", ".png", '.heic', '.heif' ]
 },

};

export const DATE_YEAR_MIN = 1970
export const DATE_DEFAULT_FORMAT = "yyyy-MM-dd"; // 2022-08-11
export const DATETIME_DEFAULT_FORMAT = "yyyy-MM-dd h:mm a"; // 2022-08-11 1:00 PM
export const DATE_DISPLAY_FORMAT = "dd/MM/yyyy";

export * from "./barangay";
export * from "./region";
export * from "./municipality";
export * from "./province";