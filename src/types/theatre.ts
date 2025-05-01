// Shared base for form and DB model
export interface BaseTheatre {
  name: string;
  location: string;
  phone: string;
  email: string;
  isActive: boolean;
  isRequested: boolean;
}

// Theatre stored in DB (includes _id and owner)
export interface Theatre extends BaseTheatre {
  _id: string;
  owner: string;
}

// Theatre form values (does not include _id or owner)
export type TheatreFormValues = BaseTheatre;

// Theatre table data (includes key for Table component)
export interface UpdateTheatrePayload extends BaseTheatre {
  id: string;
}
