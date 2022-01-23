export type FoursquareResponse = {
  meta: Meta
  notifications: Notification[]
  response: Response
}

export type Meta = {
  code: number
  requestId: string
  errorDetail?: string
}

export type Notification = {
  type: 'notificationTray'
  item: NotificationItem
}

export type NotificationItem = {
  unreadCount: number
}

export type Response = {
  checkins?: Summary<Checkin>
  checkin?: Checkin
  user?: FoursquareUser
}

export type Summary<T> = {
  count: number
  items: T[]
}

export type Checkin = {
  id: string
  createdAt: number
  type: string
  entities?: []
  shout?: string
  timeZoneOffset: number
  venue: Venue
  likes: Likes
  like: boolean
  isMayor: boolean
  photos: PhotoSummary<Photo>
  posts: Posts
  comments: Summary<Comment>
  source: Source
  sticker?: Sticker
  with?: FoursquareUser[]
  visibility?: 'private'
}

export type CheckinDetail = {
  score: CheckinScore
  user?: FoursquareUser
  checkinShortUrl?: string
} & Checkin

export type Comment = {
  id: string
  createdAt: number
  user: FoursquareUser
  text: string
}

export type FoursquareUser = {
  id: string
  firstName: string
  lastName: string
  gender: string
  countryCode: string
  relationship: string
  photo: Icon
  address?: string
  city?: string
  state?: string
  birthday?: number
  canonicalUrl?: string
  checkins?: Summary<Checkin>
  bio?: string
  contact?: Contact
  createdAt?: number
  friends?: UserSummary<FoursquareUser>
  lists?: Lists
  photos?: Summary<{
    checkin: Checkin
    venue: Venue
    createdAt: number
    height: number
    width: number
    id: string
    prefix: string
    source: Source
    suffix: string
    visibility: 'string'
  }>
}

export type Contact = {
  email: string
  facebook: string
  twitter: string
  verifiedPhone: string
}

export type Likes = {
  count: number
  groups: FoursquareUser[]
  summary?: string
}

export type Lists = {
  count: number
  groups: Summary<List>[]
}

export type List = {
  id: string
  canonicalUrl: string
  collaborative: boolean
  createdAt: number
  description: string
  editable: boolean
  followers: { count: number }
  listItems: { count: number }
  name: string
  photo: Photo
  public: boolean
  updatedAt: number
  url: string
}

export type UserSummary<T> = {
  type: string
} & Summary<T>

export type PhotoSummary<T> = {
  layout?: Layout
} & Summary<T>

export type Photo = {
  id: string
  createdAt: number
  source: Source
  width: number
  height: number
  demoted: boolean
  user: FoursquareUser
  visibility: string
} & Icon

export type Layout = {
  name: string
  left?: LeftRight
  right?: LeftRight
}
export type LeftRight = {
  id: string
}

export type Venue = {
  id: string
  name: string
  location: Location
  categories: Category[]
  closed?: boolean
  locked?: boolean
  reasons?: Summary<Reason>
}

export type Category = {
  id: string
  name: string
  pluralName: string
  shortName: string
  icon: Icon
  primary: boolean
}
export type Icon = {
  prefix: string
  suffix: string
}

export type Source = {
  name: string
  url: string
}

export type Posts = {
  count: number
  textCount: number
}
export type Reason = {
  summary: string
  type: string
  reasonName: string
  target: Target<FluffyObject>
}

export type CheckinScore = {
  total: number
  scores: ScoreElement[]
}

export type ScoreElement = {
  icon: string
  message: string
  points: number
  target?: Target<PurpleObject>
}

export type Target<T> = {
  type: string
  object: T
}

export type PurpleObject = {
  url: string
}
export type FluffyObject = {
  id: string
  type: string
  target: ObjectTarget
  ignorable: boolean
}
export type ObjectTarget = {
  type: string
  url: string
}
export type Sticker = {
  id: string
  name: string
  image: Image
  stickerType: string
  group: StickerGroup
  pickerPosition: PickerPosition
  teaseText: string
  unlockText: string
  bonusText?: string
  points?: number
  bonusStatus?: string
}
export type StickerGroup = {
  name: string
  index: number
}
export type PickerPosition = {
  page: number
  index: number
}
export type Image = {
  prefix: string
  sizes: number[]
  name: string
}
export type Location = {
  address: string
  crossStreet?: string
  lat: number
  lng: number
  labeledLatLngs?: LabeledLatLng[]
  postalCode?: string
  cc: string
  neighborhood?: string
  city: string
  state: string
  country: string
  formattedAddress: string[]
}
export type LabeledLatLng = {
  label: string
  lat: number
  lng: number
}
